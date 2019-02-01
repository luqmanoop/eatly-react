import express from 'express';
import { join } from 'path';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '/index.html'));
});

app.listen(PORT, () => `listening on port ${PORT}`);
