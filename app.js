const express = require("express");
const path = require("path");
const QRCode = require("qrcode");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "Public")));

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/generate", (req, res, next) => {
  const text = req.body.text;
  QRCode.toDataURL(text)
  .then((url) => {
    res.redirect(`/show?url=${encodeURIComponent(url)}`);
  })
  .catch(err => {
    console.log(err);
  })
});

app.get('/show',(req,res,next) => {
    const url = req.query.url;
    res.render('show',{qrCodeURL: url});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
