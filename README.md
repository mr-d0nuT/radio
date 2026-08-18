https://mr-d0nut.github.io/radio/

# Ràdio

Emissores de ràdio en directe i podcasts d'arreu del món, en un sol fitxer
HTML. Sense servidor propi, sense comptes i sense dependències: només
[Radio Browser](https://www.radio-browser.info/) per a les emissores i el
catàleg d'Apple per als podcasts.

## Què fa

- **15 països i 10 idiomes.** Les banderes canvien alhora la llista i la
  llengua de la interfície, i els noms de les regions es tradueixen.
- **Totes les emissores de cada país**, no una mostra: 6.504 als Estats
  Units, 1.092 a Espanya. Es pinten per tandes mentre baixes.
- **Podcasts per país**, amb la llista d'episodis, barra d'avanç i tot el
  que ja fa el reproductor.
- **Equalitzador real.** Llegeix l'espectre del so que sona amb la Web Audio
  API. Cinc estils; es canvien tocant-lo.
- **El fons es tenyeix** amb el color del logotip de l'emissora. Les que no
  en tenen, amb un color propi tret del seu nom.
- **Gadget flotant** per damunt de l'escriptori (Document Picture-in-Picture).
- **Preferits**, fins a deu d'emissores i deu de podcasts, per separat.
- **Es desa al dispositiu.** En tornar, la llista surt a l'instant i només
  es comprova si aquell país ha canviat: una consulta d'1,5 kB.

## Detalls que costen de veure

Bona part de la feina és envoltar les febleses de les fonts:

- **Streams http en una pàgina https.** El navegador els bloqueja i no es pot
  desactivar. Es prova el mateix stream per https, després altres fitxes de
  la mateixa emissora, i si res funciona s'ofereix obrir-lo en una pestanya.
- **La redirecció d'enacast** perd les capçaleres CORS, i això deixava 46
  emissores sense equalitzador. S'hi va directament, saltant-la.
- **Canals de podcast il·legibles.** Un mateix programa sol tenir-ne més d'un;
  si el que dona Apple no es pot llegir, es proven els altres.
- **Feeds en ISO-8859-1.** `response.text()` sempre descodifica en UTF-8, així
  que els accents sortien trencats. Es llegeixen en cru i es descodifiquen amb
  la codificació que declaren.
- **Emissores penjades** que ni responen ni fallen: hi ha un temps màxim
  d'espera abans de passar a la següent.
- **Duplicats**: la mateixa emissora hi surt sovint dues vegades. Es filtren
  per stream i per nom.

## Emissores que no hi són

Radio Browser no ho té tot: **25 ràdios municipals catalanes** hi falten
(Esparreguera, Granollers, Vic, Cambrils...). Venen incloses. Amb el botó **+**
en pots afegir qualsevol altra amb el nom i la URL del stream.

Per als podcasts en català, Apple no té botiga catalana, així que es busca per
productora — Catalunya Ràdio, RAC1, La Sotana, VilaWeb — i es filtra.

## Límits coneguts

- El gadget flotant *always-on-top* només va a Chrome i Edge 116+. A Safari i
  Firefox s'obre en una finestra a part; a iOS no hi és.
- L'equalitzador necessita que el servidor de l'emissora enviï capçaleres CORS.
  Les que no ho fan sonen igual, però sense barres.
- A iOS el volum és de maquinari: els controls s'amaguen sols.
- El llistat de podcasts és el top 100 de cada país. Per a la resta, el cercador
  arriba a tot el catàleg.

---

©mr_d0nuT
