import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const port = 3000;

app.use(express.static(path.join(dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
