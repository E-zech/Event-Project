import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const htmlPath = join(__dirname, '..', 'public', 'page404.html');
const cssPath = join(__dirname, '..', 'public', 'page404.css');
const keyFramesPath = join(__dirname, '..', 'public', 'keyFrames.css');

const readFileSync = (filePath) => fs.readFileSync(filePath, 'utf8');

async function getContent(res) {
    try {
        const htmlContent = await readFileSync(htmlPath);
        const cssContent = await readFileSync(cssPath);
        const keyFramesContent = await readFileSync(keyFramesPath);

        const page404 = `
      ${htmlContent}
      <style>${cssContent}</style>
      <style>${keyFramesContent}</style>
    `;
        // res.locals.errorMessage = 'Route was not found';
        // res.status(404).send(page404);

    } catch (error) {
        res.status(500).send('404 Page Was Not Found');
    }
}

export { htmlPath, cssPath, keyFramesPath, readFileSync, getContent };
