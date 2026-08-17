# Ràdio

Reproductor web d'emissores en directe (API de [Radio Browser](https://www.radio-browser.info/)),
amb cercador mundial, preferides i un gadget flotant per damunt de l'escriptori.

**En directe:** https://mr-d0nut.github.io/radio/

Un sol fitxer: `index.html`.

## Emissores que només emeten per http

Una pàgina servida per HTTPS no pot reproduir un stream `http://`: el navegador
ho bloqueja (*mixed content*) i no hi ha cap manera de desactivar-ho.

L'aplicació ho intenta resoldre en dos passos:

1. **Prova el mateix stream per https.** Funciona en una minoria d'emissores
   (6 de 34, en la llista catalana).
2. **Passa pel teu relay**, si en configures un amb el botó ⚙.

### Desplegar el relay

`worker.js` és un Cloudflare Worker que fa de pont https → http.

```
npm create cloudflare@latest radio-relay -- --type=hello-world
# substitueix src/index.js pel contingut de worker.js
npx wrangler deploy
```

Enganxa la URL resultant (`https://radio-relay.EL-TEU-COMPTE.workers.dev`) al botó ⚙.
Queda desada al navegador; no es publica enlloc.

El Worker només deixa passar contingut d'àudio i llistes de reproducció, per no
convertir-se en un proxy obert de propòsit general.

## Notes

- El gadget flotant *always-on-top* fa servir Document Picture-in-Picture:
  només Chrome/Edge 116+. A Safari i Firefox s'obre en una finestra a part;
  a iOS no està disponible.
- A iOS el volum és de maquinari: els controls de volum s'amaguen sols.
