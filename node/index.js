const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const PORT = 8080;
const ALGORITHM = "sha512";
app.listen(PORT, () => console.log(`PORT: ${PORT}`));

const secret = speakeasy.generateSecret({
  name: "jh-test",
  length: 10,
  algorithm: ALGORITHM,
});

const url = speakeasy.otpauthURL({
  secret: secret.ascii,
  label: "akdl911215@gmail.com",
  algorithm: ALGORITHM,
});

app.get("/qr", (req, res) => {
  qrcode.toDataURL(url, (err, data) => {
    // const str = data?.split(",");
    // console.log("str : ", str);

    res.json({
      img: data,
    });
  });
});

app.post("/auth", (req, res) => {
  const verified = speakeasy.totp.verify({
    secret: secret.base32,
    encoding: "base32",
    algorithm: ALGORITHM,
    token: req?.body?.token,
  });

  res.json({
    loggedIn: verified,
  });
});
