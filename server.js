import express from 'express';
import mongoose from 'mongoose';
import { shortURL, getOriginalURL } from './Controllers/url.js';

const app = express();

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://localhost:27017/test', {
    dbName: 'shorturls',
  })
  .then(() => console.log('Connected to MongoDB..!'))
  .catch((err) => console.error(err));

app.get('/', (req, res) => {
  res.render('index.ejs', { shortURL: null });
});

app.post('/shorten', shortURL);

app.get('/:shortCode', getOriginalURL);

const PORT = 1000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
