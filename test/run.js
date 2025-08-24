import Mocha from 'mocha';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mocha = new Mocha();

const testFile = path.join(__dirname, 'Bird.js');
mocha.addFile(testFile);

mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0; // exit with 1 if tests fail
});