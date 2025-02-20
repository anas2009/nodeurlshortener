import { Url } from '../Models/Url.js';
import shortid from 'shortid';

export const shortURL = async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = shortid.generate();

  const shortUrl = `http://localhost:1000/${shortCode}`;

  const newUrl = new Url({
    longUrl,
    shortCode,
  });

  await newUrl.save();

  console.log(newUrl);
  res.render('index.ejs', { shortURL: shortUrl });
};

export const getOriginalURL = async (req, res) => {
  const shortCode = req.params.shortCode;

  const url = await Url.findOne({ shortCode });
  url ? res.redirect(url.longUrl) : res.sendStatus(404);
};
