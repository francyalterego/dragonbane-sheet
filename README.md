# Scheda Dragonbane

App per compilare la scheda personaggio di [Dragonbane](https://freeleaguepublishing.com/games/dragonbane/)
direttamente nel browser e scaricarla come PDF pronto per la stampa — senza backend, senza database,
niente lascia il tuo computer.

## Come funziona

Il template PDF originale (piatto, senza campi modulo) è incluso nell'app in `src/assets/scheda-template.pdf`.
Quando compili il form, [pdf-lib](https://pdf-lib.js.org/) scrive i valori sul PDF alle coordinate esatte
di ogni campo (mappate in `src/pdf/fieldMap.ts`), tutto lato client. L'anteprima a schermo usa
[pdf.js](https://mozilla.github.io/pdf.js/) per renderizzare il risultato in tempo reale.

## Sviluppo locale

```bash
npm install
npm run dev
```

## Build di produzione

```bash
npm run build
```

Genera una cartella `dist/` statica, distribuibile ovunque (GitHub Pages, Netlify, Vercel, o anche
aperta localmente da file).

## Deploy su GitHub Pages

Il workflow in `.github/workflows/deploy.yml` builda e pubblica automaticamente ad ogni push su `main`.
Basta abilitare, nelle impostazioni del repository (Settings → Pages), "Source: GitHub Actions".

## Ricalibrare le posizioni dei campi sul PDF

Se cambi il template PDF o noti un campo leggermente disallineato, modifica le coordinate in
`src/pdf/fieldMap.ts` (origine in basso a sinistra, in punti PDF) e verifica con:

```bash
node scripts/generate-test-fill.cjs
```

che genera `test-fill.pdf` con dati di prova su tutti i campi.
