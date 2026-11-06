# FoodBridge

One-page homepage for FoodBridge, a same-night bridge between edible surplus and NGOs, shelters, and community kitchens.

The page is a static site: `index.html`, `css/styles.css`, and `js/main.js`. The surplus board is a browser demo. Listing food, claiming a pickup, and saving volunteer interest never leave the device.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Deploy on Vercel

1. Push this folder to a public GitHub repository.
2. In Vercel, import the repository.
3. Framework preset: **Other**. No build command. Output directory: the repository root.
4. Deploy. The live URL is the submission link.

Or with the Vercel CLI, from this folder:

```bash
npx vercel
```

## Deploy on Render

Create a **Static Site**, set the publish directory to the repository root, and leave the build command empty.

## Submission notes

- Live deployment URL
- GitHub repository URL
- The design prompt in `PROMPT.md`
