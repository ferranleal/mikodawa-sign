import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronRight,
  Code2,
  Copy,
  FileCheck2,
  Fingerprint,
  KeyRound,
  Menu,
  Monitor,
  PenLine,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import {
  API,
  CENTRAL,
  buttonExample,
  createExample,
  endpoints,
  responseExample,
  statusExample,
} from "./docs";

function Brand() {
  return (
    <a className="brand" href="#" aria-label="Mikodawa Sign, inicio">
      <img src="/sign-icon.svg" alt="" />
      <span>
        Mikodawa <b>Sign</b>
      </span>
    </a>
  );
}
function Code({ children, label }: { children: string; label: string }) {
  const [notice, setNotice] = useState("");
  return (
    <div className="code-block">
      <div className="code-bar">
        <span>
          <i />
          {label}
        </span>
        <button
          onClick={() => {
            void navigator.clipboard
              .writeText(children)
              .then(() => setNotice("Copiado"))
              .catch(() => setNotice("Selecciona el texto para copiar"));
          }}
          aria-label={`Copiar ${label}`}
        >
          <Copy size={14} />
          {notice || "Copiar"}
        </button>
      </div>
      <pre>
        <code>{children}</code>
      </pre>
    </div>
  );
}
function Phone({ done = false }: { done?: boolean }) {
  return (
    <div className={`phone ${done ? "is-done" : ""}`}>
      <div className="phone-camera" />
      <div className="phone-top">
        <span>9:41</span>
        <span>••• ▰</span>
      </div>
      <div className="phone-brand">
        <img src="/sign-icon.svg" alt="" />
        Mikodawa Sign
      </div>
      <div className="phone-heading">
        <small>{done ? "TODO LISTO" : "TU PRÓXIMA FIRMA"}</small>
        <h3>{done ? "Así de fácil." : "Tú tienes la última palabra."}</h3>
      </div>
      <div className="phone-document">
        <span className="document-icon">
          <FileCheck2 size={23} />
        </span>
        <span className="document-tag">
          {done ? "CONFIRMADO" : "SOLICITUD DE FIRMA"}
        </span>
        <h4>Un nuevo comienzo</h4>
        <p>Contrato de colaboración</p>
        <div className="document-lines">
          <i />
          <i />
          <i />
        </div>
        <svg
          className="signature"
          viewBox="0 0 210 55"
          aria-label="Firma ilustrativa"
        >
          <path d="M12 38C40 0 50 5 36 27S16 50 44 33 81 15 69 31 55 44 86 31 99 21 101 33 114 25 126 31 158 36 191 24M20 49L197 38" />
        </svg>
      </div>
      <div className="phone-fingerprint">
        {done ? <CheckCheck size={33} /> : <Fingerprint size={33} />}
        <span>
          {done ? "Decisión registrada" : "Revisa. Confirma. Continúa."}
        </span>
      </div>
      <div className="phone-bottom">
        <span>⌂</span>
        <PenLine size={19} />
        <QrCode size={19} />
        <span>◉</span>
      </div>
    </div>
  );
}
function Demo() {
  const [step, setStep] = useState(0);
  const names = [
    "Crea una solicitud",
    "Ábrela en el móvil",
    "Revisa y confirma",
    "Recibe la respuesta",
  ];
  return (
    <section id="como-funciona" className="section process">
      <div className="section-heading">
        <p className="eyebrow">DEL «¿ME LO FIRMAS?» AL «YA ESTÁ»</p>
        <h2>
          Cuatro pasos.
          <br />
          <span>Cero complicaciones.</span>
        </h2>
        <p>
          De tu aplicación al móvil y de vuelta. Sigue el recorrido de una
          solicitud.
        </p>
      </div>
      <div className="demo-layout">
        <div className="demo-steps">
          {names.map((name, index) => (
            <button
              key={name}
              aria-pressed={step === index}
              onClick={() => setStep(index)}
              className={step === index ? "selected" : ""}
            >
              <span className="step-number">0{index + 1}</span>
              <div>
                <h3>{name}</h3>
                <p>
                  {
                    [
                      "Tu servidor indica qué hay que firmar o autorizar y recibe un enlace único.",
                      "Un QR en el ordenador. Un botón si ya estás en el móvil.",
                      "La persona lee la solicitud y confirma su decisión desde Sign.",
                      "Central verifica la firma del dispositivo y tu aplicación consulta el resultado.",
                    ][index]
                  }
                </p>
              </div>
              <ChevronRight size={20} />
            </button>
          ))}
        </div>
        <div className="demo-stage" aria-live="polite">
          <div className="stage-label">
            <span className="live-dot" /> RECORRIDO INTERACTIVO · ILUSTRACIÓN
          </div>
          <div className="stage-flow">
            <div className={`flow-node ${step === 0 ? "active" : ""}`}>
              <Monitor />
              <small>Tu aplicación</small>
            </div>
            <span className="flow-connector" />
            <div
              className={`flow-node ${step === 1 || step === 2 ? "active" : ""}`}
            >
              <Smartphone />
              <small>Mikodawa Sign</small>
            </div>
            <span className="flow-connector" />
            <div className={`flow-node ${step === 3 ? "active" : ""}`}>
              <ShieldCheck />
              <small>Central</small>
            </div>
          </div>
          <div className="demo-request">
            <div className="demo-request-head">
              <span>
                <FileCheck2 size={18} /> Presupuesto #1042
              </span>
              <span className={`status ${step === 3 ? "complete" : ""}`}>
                {step === 3 ? "Confirmado" : "Pendiente"}
              </span>
            </div>
            {step === 0 && (
              <div className="demo-content">
                <Code2 size={38} />
                <h3>Una petición, una intención clara.</h3>
                <p>«Acepto el presupuesto #1042 por 240 €»</p>
                <code>POST /v1/sign/requests</code>
              </div>
            )}
            {step === 1 && (
              <div className="demo-content">
                <QrCode size={88} strokeWidth={1.2} />
                <h3>Del escritorio a tu mano.</h3>
                <p>Escanea el QR o abre Sign desde el botón.</p>
              </div>
            )}
            {step === 2 && (
              <div className="demo-content">
                <Fingerprint size={68} strokeWidth={1.2} />
                <h3>Tu decisión, desde tu dispositivo.</h3>
                <p>Lee el contenido y confirma o rechaza la solicitud.</p>
              </div>
            )}
            {step === 3 && (
              <div className="demo-content">
                <span className="success-icon">
                  <Check size={38} />
                </span>
                <h3>Tu aplicación ya puede continuar.</h3>
                <p>Estado confirmado y evidencia criptográfica disponible.</p>
                <code>status: "confirmed"</code>
              </div>
            )}
          </div>
          <button className="demo-next" onClick={() => setStep((step + 1) % 4)}>
            {step === 3 ? "Volver a empezar" : "Siguiente paso"}{" "}
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
function Documentation() {
  const [tab, setTab] = useState<"create" | "status" | "button">("create");
  return (
    <section id="documentacion" className="section documentation">
      <div className="docs-intro">
        <p className="eyebrow">HECHO PARA DESARROLLADORES</p>
        <h2>
          Tu app.
          <br />
          Nuestra firma.
          <br />
          <span>Una buena conexión.</span>
        </h2>
        <p>
          REST, JSON y una cuenta gratuita en Mikodawa Central. Integra Sign en
          tu web, tu aplicación o tu próximo proyecto.
        </p>
        <a href={CENTRAL} className="button primary">
          Registrar mi aplicación <ArrowUpRight size={18} />
        </a>
        <div className="docs-facts">
          <span>
            <Check size={15} /> Sin suscripción a Forge o Vault
          </span>
          <span>
            <Check size={15} /> Secreto protegido en tu servidor
          </span>
          <span>
            <Check size={15} /> QR y apertura directa de la app
          </span>
        </div>
      </div>
      <div className="docs-panel">
        <nav className="code-tabs" aria-label="Ejemplos de integración">
          {(
            [
              ["create", "01. Crear"],
              ["button", "02. Mostrar"],
              ["status", "03. Consultar"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              aria-pressed={tab === value}
              onClick={() => setTab(value)}
              className={tab === value ? "active" : ""}
            >
              {label}
            </button>
          ))}
        </nav>
        <Code
          label={
            tab === "button" ? "JavaScript · navegador" : "cURL · servidor"
          }
        >
          {tab === "create"
            ? createExample
            : tab === "status"
              ? statusExample
              : buttonExample}
        </Code>
        {tab === "create" && (
          <details>
            <summary>
              Ver respuesta de creación <ArrowDown size={14} />
            </summary>
            <Code label="JSON · ejemplo de respuesta">{responseExample}</Code>
          </details>
        )}
        <p className="code-note">
          Base de la API: <code>{API}</code>
        </p>
      </div>
      <div className="docs-reference">
        <article>
          <span className="mini-label">01 / CREDENCIALES</span>
          <h3>Dos valores. Dos lugares.</h3>
          <p>
            Registra una aplicación en{" "}
            <a href={CENTRAL}>Central → Mikodawa Sign</a>. Recibirás un ID
            público <code>sign_app_…</code> y un secreto <code>sign_sk_…</code>,
            visible una sola vez. Envía el ID en <code>X-Sign-App</code> y el
            secreto como Bearer desde tu backend.
          </p>
          <p>
            El navegador recibe únicamente el enlace de la solicitud. Puedes
            renovar el secreto o revocar la aplicación desde Central.
          </p>
        </article>
        <article>
          <span className="mini-label">02 / CONTENIDO</span>
          <h3>Una firma sabe qué firma.</h3>
          <p>
            Envía <code>title</code> (hasta 190 caracteres),{" "}
            <code>summary</code> (hasta 4000), <code>kind</code> y{" "}
            <code>expiresIn</code> (60–3600 segundos; 600 por defecto). Para{" "}
            <code>signature</code>, añade el SHA-256 real del documento en{" "}
            <code>documentHash</code> y, opcionalmente, un{" "}
            <code>documentUrl</code> HTTPS para revisarlo.
          </p>
          <p>
            Para <code>authorization</code>, el resumen debe describir
            exactamente la acción que se autoriza.
          </p>
        </article>
        <article>
          <span className="mini-label">03 / ESTADOS Y EVIDENCIA</span>
          <h3>Una respuesta que puedes comprobar.</h3>
          <p>
            Consulta desde tu servidor cada 3–5 segundos mientras el estado sea{" "}
            <code>pending</code>. Los estados finales son <code>confirmed</code>
            , <code>rejected</code>, <code>cancelled</code> y{" "}
            <code>expired</code>. Detén las consultas al recibir uno.
          </p>
          <p>
            La respuesta incluye fecha, hash de evidencia, perfil declarado y la
            prueba RSA con clave pública, mensaje y firma. Conserva también el
            documento original.
          </p>
        </article>
        <article>
          <span className="mini-label">04 / REINTENTOS Y LÍMITES</span>
          <h3>Control desde el primer día.</h3>
          <p>
            Usa una <code>Idempotency-Key</code> única por operación (1–128
            caracteres: letras, números, punto, guion, dos puntos o guion bajo).
            Repetirla con otro contenido responde <code>409</code>. Repetirla
            con el mismo contenido devuelve la solicitud existente, sin repetir
            el secreto del QR: si perdiste el enlace, cancela y crea otra con
            una clave nueva.
          </p>
          <p>
            Hasta 20 aplicaciones activas por cuenta y 1000 solicitudes por
            aplicación y día UTC. No hay webhooks en esta versión.
          </p>
        </article>
      </div>
      <div className="api-reference">
        <h3>La API, de un vistazo.</h3>
        <div className="endpoint-list">
          {endpoints.map(([method, path, description]) => (
            <div key={path + method}>
              <b className={method.toLowerCase()}>{method}</b>
              <code>{path}</code>
              <span>{description}</span>
            </div>
          ))}
        </div>
        <p>
          Errores: <code>401</code> credenciales inválidas · <code>404</code> no
          encontrado · <code>409</code> conflicto o solicitud finalizada ·{" "}
          <code>422</code> datos inválidos · <code>429</code> límite alcanzado ·{" "}
          <code>503</code> migración pendiente.
        </p>
      </div>
    </section>
  );
}
function Download() {
  const android = import.meta.env.VITE_ANDROID_STORE_URL as string | undefined;
  const ios = import.meta.env.VITE_IOS_STORE_URL as string | undefined;
  return (
    <section id="descargar" className="section download">
      <div>
        <p className="eyebrow">LLÉVATE TU FIRMA CONTIGO</p>
        <h2>
          El siguiente paso
          <br />
          está en tu bolsillo.
        </h2>
        <p>
          Mikodawa Sign para Android e iOS. Descarga gratuita y acceso con tu
          perfil, también si no utilizas la Suite.
        </p>
        <div className="store-links">
          {[
            ["Android", android],
            ["iOS", ios],
          ].map(([platform, url]) =>
            url && /^https:\/\//.test(url) ? (
              <a
                key={platform}
                href={url}
                className="store-button"
                target="_blank"
                rel="noreferrer"
              >
                <Smartphone />
                <span>
                  <small>Descarga gratuita</small>
                  {platform}
                  <ArrowUpRight size={16} />
                </span>
              </a>
            ) : (
              <div key={platform} className="store-button unavailable">
                <Smartphone />
                <span>
                  <small>Publicación en tienda pendiente</small>
                  {platform}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="download-art">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <img src="/sign-icon.svg" alt="Mikodawa Sign" />
        <span className="floating-label">
          <Fingerprint size={18} /> Tu decisión. Tu móvil.
        </span>
      </div>
    </section>
  );
}
export default function App() {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className={menu ? "open" : ""} aria-label="Navegación principal">
            <a href="#como-funciona" onClick={() => setMenu(false)}>
              Cómo funciona
            </a>
            <a href="#posibilidades" onClick={() => setMenu(false)}>
              Para qué sirve
            </a>
            <a href="#documentacion" onClick={() => setMenu(false)}>
              Desarrolladores
            </a>
          </nav>
          <a className="header-cta" href={CENTRAL}>
            Mi espacio Sign <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-button"
            aria-label={menu ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="contenido">
        <section className="hero section">
          <div className="hero-copy">
            <p className="hero-badge">
              <span className="live-dot" /> UNA APP. MUCHAS POSIBILIDADES.
            </p>
            <h1>
              Tu firma.
              <br />
              En <span>todas</span>
              <br />
              partes<span className="blue-dot">.</span>
            </h1>
            <p className="hero-description">
              Firma un documento. Autoriza una acción.
              <br />
              Registra tu jornada. Todo desde tu móvil,
              <br />
              con <strong>Mikodawa Sign.</strong>
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#descargar">
                Conoce la app <ArrowRight size={19} />
              </a>
              <a className="button secondary" href="#documentacion">
                <Code2 size={18} /> Integra Sign
              </a>
            </div>
            <div className="hero-footnote">
              <span>
                <Check size={14} /> Descarga gratuita
              </span>
              <span>
                <Check size={14} /> Android e iOS
              </span>
              <span>
                <Check size={14} /> Abierto a todos
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-orbit" />
            <div className="hero-orbit second" />
            <div className="art-grid" />
            <span className="art-label top">
              <ShieldCheck size={18} />
              <span>
                Tu dispositivo.
                <br />
                <strong>Tu decisión.</strong>
              </span>
            </span>
            <Phone />
            <span className="art-label bottom">
              <span className="small-check">
                <Check size={18} />
              </span>
              <span>
                Una confirmación.
                <br />
                <strong>Y todo sigue.</strong>
              </span>
            </span>
            <div className="art-caption">MENOS FRICCIÓN. MÁS ACCIÓN.</div>
          </div>
          <div className="hero-scroll">
            <span>DESCUBRE LO QUE PUEDES HACER</span>
            <ArrowDown size={16} />
          </div>
        </section>
        <section className="ecosystem-strip">
          <span>Dentro y fuera de la Suite</span>
          <a href="https://vault.mikodawa.com">
            <FileCheck2 /> Mikodawa Vault
          </a>
          <a href="https://forge.mikodawa.com">
            <Sparkles /> Mikodawa Forge
          </a>
          <span className="your-app">
            <Code2 /> Y tu próxima aplicación <ArrowUpRight size={15} />
          </span>
        </section>
        <section id="posibilidades" className="section possibilities">
          <div className="section-heading split">
            <div>
              <p className="eyebrow">MUCHO MÁS QUE UN TRAZO</p>
              <h2>
                Hay decisiones
                <br />
                que merecen <span>un Sign.</span>
              </h2>
            </div>
            <p>
              Una experiencia familiar para las personas.
              <br />
              Un punto de conexión para tus procesos.
            </p>
          </div>
          <div className="use-cards">
            <article className="use-card">
              <div className="card-visual document-visual">
                <div className="paper">
                  <FileCheck2 size={24} />
                  <i />
                  <i />
                  <i />
                  <svg viewBox="0 0 140 40">
                    <path d="M5 30C30 0 45 0 30 20S28 38 58 22 72 35 99 18 110 24 135 17" />
                  </svg>
                  <span>
                    <Check size={13} /> Firmado
                  </span>
                </div>
                <div className="visual-chip">
                  <PenLine size={18} />
                </div>
              </div>
              <span className="mini-label">01 / DOCUMENTOS</span>
              <h3>
                Del documento
                <br />
                al «de acuerdo».
              </h3>
              <p>
                Revisa y firma las solicitudes de Vault o de aplicaciones que
                integren Sign. Un QR conecta el documento con tu móvil.
              </p>
              <a href="#como-funciona">
                Así funciona <ArrowRight size={16} />
              </a>
            </article>
            <article className="use-card blue-card">
              <div className="card-visual auth-visual">
                <div className="auth-ring">
                  <Fingerprint size={58} strokeWidth={1.3} />
                </div>
                <span className="auth-chip">
                  <ShieldCheck size={16} /> Tú confirmas
                </span>
              </div>
              <span className="mini-label">02 / AUTORIZACIONES</span>
              <h3>
                Un sí que
                <br />
                queda registrado.
              </h3>
              <p>
                Aceptar un presupuesto, dar consentimiento o aprobar una
                operación. Envía una solicitud clara y recibe la decisión.
              </p>
              <a href="#documentacion">
                Conecta tu aplicación <ArrowRight size={16} />
              </a>
            </article>
            <article className="use-card">
              <div className="card-visual time-visual">
                <div className="time-widget">
                  <span>
                    <i /> JORNADA EN CURSO
                  </span>
                  <strong>09:41</strong>
                  <div>
                    <span>Entrada registrada</span>
                    <Check size={16} />
                  </div>
                </div>
                <span className="time-pill">Forge + Sign</span>
              </div>
              <span className="mini-label">03 / FICHAJES</span>
              <h3>
                Tu jornada,
                <br />a un gesto.
              </h3>
              <p>
                Registra entradas y salidas en empresas vinculadas con Forge. El
                fichaje sigue conectado a su gestión de jornada.
              </p>
              <a href="https://forge.mikodawa.com">
                Descubre Forge <ArrowUpRight size={16} />
              </a>
            </article>
          </div>
        </section>
        <Demo />
        <section className="freedom section">
          <div className="freedom-symbol">
            <img src="/sign-icon.svg" alt="" />
            <span className="free-tag">0 €</span>
            <div className="freedom-ring" />
          </div>
          <div>
            <p className="eyebrow">UNA PUERTA ABIERTA</p>
            <h2>
              No necesitas la Suite.
              <br />
              <span>Solo algo que confirmar.</span>
            </h2>
            <p>
              Sign es una app de descarga gratuita que puede utilizar cualquier
              persona. Y cualquier desarrollador puede integrar firmas y
              autorizaciones con una cuenta gratuita de Mikodawa Central.
            </p>
            <div className="freedom-checks">
              <span>
                <Check /> Sin contratar Forge
              </span>
              <span>
                <Check /> Sin contratar Vault
              </span>
              <span>
                <Check /> Con tu propia aplicación
              </span>
            </div>
            <a href={CENTRAL} className="text-link">
              Entra en Central y registra tu app <ArrowRight size={17} />
            </a>
          </div>
        </section>
        <section className="trust section">
          <div className="section-heading">
            <p className="eyebrow">CLARO ANTES. TRAZABLE DESPUÉS.</p>
            <h2>
              Cada decisión tiene <span>su rastro.</span>
            </h2>
          </div>
          <div className="trust-grid">
            <article>
              <KeyRound />
              <h3>Clave en el dispositivo</h3>
              <p>
                La app firma con una clave privada no exportable generada en el
                dispositivo. Central verifica la respuesta con su clave pública.
              </p>
            </article>
            <article>
              <QrCode />
              <h3>Un enlace por solicitud</h3>
              <p>
                El QR contiene un token temporal de esa operación. Caduca y la
                solicitud deja de admitir nuevas decisiones.
              </p>
            </article>
            <article>
              <ShieldCheck />
              <h3>Evidencia consultable</h3>
              <p>
                Tu aplicación obtiene la decisión, la fecha y una prueba
                criptográfica vinculada al contenido de la solicitud.
              </p>
            </article>
          </div>
          <p className="trust-note">
            El perfil del firmante contiene datos declarados por la persona. La
            integración externa registra decisiones y evidencias; no verifica
            por sí sola la identidad documental ni modifica o sella un PDF.
            Vault mantiene su propio proceso documental.
          </p>
        </section>
        <Documentation />
        <Download />
        <section className="faq section">
          <p className="eyebrow">LAS COSAS CLARAS</p>
          <h2>Puede que te lo estés preguntando.</h2>
          {[
            [
              "¿Necesito una suscripción para integrar Sign?",
              "No. Regístrate en Mikodawa Central y abre el apartado Mikodawa Sign. Puedes registrar aplicaciones y consultar su actividad sin suscribirte a Forge, Vault ni otro producto.",
            ],
            [
              "¿Qué diferencia hay entre firmar y autorizar?",
              "La firma de documento vincula la decisión a su SHA-256. Una autorización vincula la decisión al título y al resumen de una acción. En ambos casos la persona revisa la solicitud antes de confirmar.",
            ],
            [
              "¿Hace falta Firebase para las firmas externas?",
              "No. La app envía la confirmación por HTTPS a Central y tu servidor consulta el resultado. El cron caduca solicitudes; la confirmación se procesa cuando llega. Los fichajes y las notificaciones de Forge mantienen su flujo.",
            ],
            [
              "¿La API envía webhooks?",
              "Esta versión ofrece consulta de estado. Tu servidor consulta mientras la solicitud siga pendiente y deja de hacerlo cuando recibe un estado final.",
            ],
            [
              "¿Dónde están las descargas?",
              "Los botones de Android e iOS se activan cuando estén configurados los enlaces oficiales de las tiendas. Hasta entonces mostramos su disponibilidad pendiente.",
            ],
          ].map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span>+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
        <section className="final-cta section">
          <span className="eyebrow">TU PRÓXIMA CONEXIÓN EMPIEZA AQUÍ</span>
          <h2>
            Dale un Sign
            <br />a tu aplicación<span>.</span>
          </h2>
          <a href={CENTRAL} className="button light">
            Crear mi integración <ArrowUpRight size={20} />
          </a>
          <p>Una cuenta gratuita en Central. Todo listo para empezar.</p>
        </section>
      </main>
      <footer className="site-footer section">
        <Brand />
        <p>Tu firma. En todas partes.</p>
        <nav aria-label="Información legal">
          <a href="https://mikodawa.com/politica-de-privacidad">Privacidad</a>
          <a href="https://mikodawa.com/aviso-legal">Aviso legal</a>
          <a href="https://mikodawa.com">
            Mikodawa <ArrowUpRight size={13} />
          </a>
        </nav>
      </footer>
    </>
  );
}
