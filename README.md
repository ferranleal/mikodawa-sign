# MikoDawa Sign

Web pública de Sign: producto, recorrido interactivo, documentación REST y acceso al espacio de desarrolladores de Central. React + TypeScript + Vite. Sin autenticación ni secretos de API en esta web.

```sh
npm ci
npm run dev
npm run lint
```

`npm run build` genera `dist` para el hosting estático de `sign.mikodawa.com`. La web utiliza una sola página con navegación por anclas, sin reglas de fallback de rutas.

Configura `VITE_ANDROID_STORE_URL` y `VITE_IOS_STORE_URL` con los enlaces oficiales cuando las apps estén publicadas. Sin enlaces muestra publicación pendiente. No contiene descargas ficticias.

La API y los datos residen en `suiteback/mikodawa`, el dashboard en `suitefront/mikodawa` y el flujo móvil en `sign-app`. El despliegue de esta web no instala la migración ni publica los cambios de Central o de la app.
