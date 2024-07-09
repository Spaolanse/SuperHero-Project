import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const api_key = //Your API key here;

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/hero", async (req, res) => {
  const name = req.body.hero;
  try {
    const result = await axios.get(
      `https://superheroapi.com/api/${api_key}/${name}`
    );
    res.render("hero.ejs", {
      id: result.data.id,
      image: result.data.image.url,
      name: result.data.name,
      biography: result.data.biography,
    });
  } catch (error) {
    res.render("index.ejs");
  }
});

app.post("/heroprev", async (req, res) => {
  const name = parseInt(req.body.hero) - 1;
  try {
    const result = await axios.get(
      `https://superheroapi.com/api/${api_key}/${name}`
    );
    res.render("hero.ejs", {
      id: result.data.id,
      image: result.data.image.url,
      name: result.data.name,
      biography: result.data.biography,
    });
  } catch (error) {
    res.render("index.ejs");
  }
});

app.post("/heronext", async (req, res) => {
  const name = parseInt(req.body.hero, 10) + 1;
  try {
    const result = await axios.get(
      `https://superheroapi.com/api/${api_key}/${name}`
    );
    res.render("hero.ejs", {
      id: result.data.id,
      image: result.data.image.url,
      name: result.data.name,
      biography: result.data.biography,
    });
  } catch (error) {
    res.render("index.ejs");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});