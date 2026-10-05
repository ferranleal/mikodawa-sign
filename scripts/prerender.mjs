#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");
const clientDir = join(root, "dist", "client");
const distDir = join(root, "dist");

const products = {
  atlas: [
    "introduccion",
    "primeros-pasos",
    "configuracion",
    "primera-factura",
    "ventas",
    "compras",
    "articulos",
    "tesoreria",
    "fiscalidad",
    "usuarios-y-permisos",
    "integraciones",
    "mcp",
    "preguntas-frecuentes",
  ],
  forge: [
    "introduccion",
    "primeros-pasos",
    "configuracion",
    "dashboard",
    "proyectos",
    "kanban",
    "listas-todo",
    "planificacion",
    "calendario",
    "recursos",
    "analisis-y-tiempos",
    "usuarios-y-permisos",
    "horas-atlas",
    "integraciones",
    "mcp",
    "preguntas-frecuentes",
  ],
  flow: [
    "introduccion",
    "primeros-pasos",
    "configuracion",
    "lienzo",
    "nodos",
    "datos-y-expresiones",
    "ejecuciones",
    "plantillas",
    "usuarios-y-permisos",
    "operacion-y-seguridad",
    "integraciones",
    "mcp",
    "preguntas-frecuentes",
  ],
  bridge: [
    "introduccion",
    "primeros-pasos",
    "configuracion",
    "panel",
    "recursos",
    "acceso-hub",
    "comunicaciones",
    "selecciones",
    "cartas-publicas",
    "publicaciones",
    "citas",
    "actividad-hub",
    "usuarios-y-permisos",
    "seguridad-hub",
    "integraciones",
    "mcp",
    "preguntas-frecuentes",
  ],
  hub: [
    "introduccion",
    "acceso",
    "inicio-y-proyectos",
    "categorias",
    "publicaciones",
    "novedades",
    "perfil-y-sesion",
    "preguntas-frecuentes",
  ],
  vault: [
    "introduccion",
    "primeros-pasos",
    "configuracion",
    "documentos",
    "firmas",
    "verificaciones",
    "plantillas",
    "usuarios-y-permisos",
    "integraciones",
    "mcp",
    "preguntas-frecuentes",
  ],
  sense: [
    "introduccion",
    "primeros-pasos",
    "configuracion",
    "documentos",
    "consultas",
    "prompts",
    "extracciones",
    "usuarios-y-permisos",
    "integraciones",
    "mcp",
    "preguntas-frecuentes",
  ],
  signal: [
    "introduccion",
    "primeros-pasos",
    "configuracion",
    "planes",
    "editor",
    "perfiles",
    "destinos",
    "usuarios-y-permisos",
    "integraciones",
    "mcp",
    "preguntas-frecuentes",
  ],
  tower: [
    "introduccion",
    "primeros-pasos",
    "configuracion",
    "monitores",
    "fuentes",
    "alertas",
    "historial",
    "usuarios-y-permisos",
    "integraciones",
    "mcp",
    "preguntas-frecuentes",
  ],
};

const routes = [
  "/",
  ...Object.entries(products).flatMap(([product, topics]) => [
    `/${product}`,
    ...topics.map((topic) => `/${product}/${topic}`),
  ]),
];

if (!existsSync(clientDir)) {
  throw new Error(`[prerender] Expected client build output at ${clientDir}. Run the build first.`);
}

function assertNonEmptyBody(html, route) {
  const body = html
    .match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]
    ?.replace(/<!--[^]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .trim();
  if (!body) throw new Error(`[prerender] ${route} produced an empty or invalid <body>.`);
}

function resolveServerEntry() {
  const candidates = [];
  const packagePath = join(distDir, "package.json");
  if (existsSync(packagePath)) {
    const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
    if (typeof packageJson.main === "string") {
      candidates.push(join(distDir, packageJson.main.replace(/^\.\//, "")));
    }
  }
  candidates.push(
    join(distDir, "server", "index.mjs"),
    join(distDir, "server", "index.js"),
    join(distDir, "server", "server.mjs"),
    join(distDir, "server", "server.js"),
  );
  const entry = [...new Set(candidates)].find(existsSync);
  if (!entry) throw new Error(`[prerender] TanStack server output was not found in ${distDir}.`);
  return entry;
}

async function loadServer() {
  const entry = resolveServerEntry();
  console.log(`[prerender] Using server entry ${entry}`);
  const server = (await import(pathToFileURL(entry).href)).default;
  if (!server || typeof server.fetch !== "function") {
    throw new Error(`[prerender] ${entry} does not export a compatible fetch handler.`);
  }
  return server;
}

async function renderRoute(server, route) {
  const env = { ASSETS: { fetch: async () => new Response("", { status: 404 }) } };
  const ctx = { waitUntil: () => {}, passThroughOnException: () => {} };
  let url = `http://localhost${route}`;

  for (let hop = 0; hop < 5; hop += 1) {
    const response = await server.fetch(new Request(url, { redirect: "manual" }), env, ctx);
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) break;
      url = location.startsWith("http") ? location : `http://localhost${location}`;
      continue;
    }
    if (!response.ok) {
      throw new Error(`[prerender] SSR failed for ${route} (HTTP ${response.status}).`);
    }
    return response.text();
  }
  throw new Error(`[prerender] Too many redirects while rendering ${route}.`);
}

const server = await loadServer();
for (const route of routes) {
  const html = await renderRoute(server, route);
  assertNonEmptyBody(html, route);
  const outputDir = route === "/" ? clientDir : join(clientDir, route.slice(1));
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, "index.html");
  writeFileSync(outputPath, html, "utf8");
  console.log(`[prerender] ${route} -> ${outputPath} (${html.length} bytes)`);
}

const htaccess = `# Auto-generated by scripts/prerender.mjs
Options -MultiViews
DirectoryIndex index.html
RewriteEngine On

# Serve prerendered routes and static assets directly.
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Client-side fallback for unknown routes.
RewriteRule ^ index.html [L]

<IfModule mod_headers.c>
  <FilesMatch "\\.(?:js|css|woff2?|ttf|otf|eot|svg|png|jpg|jpeg|gif|webp|avif|ico)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml
</IfModule>
`;

writeFileSync(join(clientDir, ".htaccess"), htaccess, "utf8");
console.log(`[prerender] Wrote dist/client/.htaccess.`);
console.log(`[prerender] OK — ${routes.length} routes ready for deployment.`);
