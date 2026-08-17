https://mr-d0nut.github.io/radio/

# Ràdio

Reproductor web d'emissores en directe (API de [Radio Browser](https://www.radio-browser.info/)),
amb cercador mundial, preferides i un gadget flotant per damunt de l'escriptori.

Un sol fitxer: `index.html`.

## Emissores que només emeten per http

Una pàgina servida per HTTPS no pot reproduir un stream `http://`: el navegador
ho bloqueja (*mixed content*) i no es pot desactivar.

L'aplicació ho resol sola, sense configurar res:

1. Prova el mateix stream per `https://`. Unes quantes emissores hi responen.
2. Busca si la mateixa emissora és repetida a la base de dades amb una altra
   URL que sí que funcioni.
3. Si res funciona, ofereix el botó **▶ Obrir en pestanya**: el stream s'obre
   en una pestanya pròpia, on el navegador sí que el reprodueix perquè ja no
   és contingut mixt.

## Emissores pròpies

Radio Browser no ho té tot (Ràdio Esparreguera, per exemple, no hi és).
Amb el botó **+** pots afegir qualsevol emissora amb el seu nom i la URL del
stream. Es desen al navegador i surten al capdamunt de la llista.

## Notes

- El gadget flotant *always-on-top* fa servir Document Picture-in-Picture:
  només Chrome/Edge 116+. A Safari i Firefox s'obre en una finestra a part;
  a iOS no està disponible.
- A iOS el volum és de maquinari: els controls de volum s'amaguen sols.
