const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const users = require("./users");
const app = express();
port = 3000;

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/home", (req, res) => {
  res.render("home", {
    layout: "layouts/main-layouts",
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    layout: "layouts/main-layouts",
  });
});

// route untuk mengelola permintaan login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // cari pengguna berdasarkan username
  const user = users.find((user) => user.username === username);

  // periksa apakah pengguna ditemukan dan password cocok
  if (user && user.password === password) {
    // jika cocok, beri respon berhasil
    res.redirect("/home");
  } else {
    // jika tidak cocok maka respon gagal
    res.status(401).send("username atau password salah");
  }
});

// mulai sserver
app.listen(port, () => {
  console.log(`server berjalan di http://localhost:${port}`);
});
