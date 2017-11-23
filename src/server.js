import express from 'express';
import proxy from 'http-proxy-middleware';
import compression from 'compression';
import { resolve } from 'path';

const app = express();
const backendUrl = 'http://localhost:3001';

app.use('/api', proxy({
  target: backendUrl,
  pathRewrite: {
    '^/api': '',
  },
}));

app.use('/public/uploads', proxy({
  target: backendUrl,
  pathRewrite: {
    '^/public': '',
  },
}));

app.use(compression());
app.use(express.static(resolve(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '..', 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log('Running');
});
