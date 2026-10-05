export const API = "https://api.mikodawa.com";
export const CENTRAL =
  "https://mikodawa.com/login?redirect=%2Fdashboard%2Fsign";
export const createExample = `curl -X POST https://api.mikodawa.com/v1/sign/requests \\
  -H "Authorization: Bearer $SIGN_SECRET" \\
  -H "X-Sign-App: $SIGN_APP_ID" \\
  -H "Idempotency-Key: pedido-2026-0001" \\
  -H "Content-Type: application/json" \\
  -d '{
    "kind": "authorization",
    "title": "Autorizar el presupuesto #1042",
    "summary": "Acepto el presupuesto #1042 por 240 €.",
    "expiresIn": 600
  }'`;
export const responseExample = `{
  "requestId": "<id de la solicitud>",
  "status": "pending",
  "expiresAt": "<fecha ISO 8601>",
  "qrPayload": "mikodawa-sign://central?attempt=...&secret=...",
  "appUrl": "mikodawa-sign://central?attempt=...&secret=..."
}`;
export const statusExample = `curl https://api.mikodawa.com/v1/sign/requests/$REQUEST_ID \\
  -H "Authorization: Bearer $SIGN_SECRET" \\
  -H "X-Sign-App: $SIGN_APP_ID"`;
export const buttonExample = `// En tu servidor: crea la solicitud con las credenciales.
// Entrega al navegador solo requestId, qrPayload y appUrl.
const button = document.querySelector('#firmar');
button.href = request.appUrl;
// Genera el QR localmente a partir de request.qrPayload.
// Consulta el estado desde TU servidor cada 3–5 segundos.
// Detén la consulta al confirmar, rechazar, cancelar o caducar.`;
export const endpoints = [
  ["POST", "/v1/sign/requests", "Crear solicitud · 201"],
  ["GET", "/v1/sign/requests/:id", "Consultar estado y evidencia · 200"],
  ["DELETE", "/v1/sign/requests/:id", "Cancelar solicitud pendiente · 200"],
] as const;
