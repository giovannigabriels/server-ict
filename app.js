if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

const cors = require("cors");
const Item = require("./models/item");
const { mongoConnect } = require("./config");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/items", async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findOne(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/items", async (req, res) => {
  try {
    const { name, description, price, category, imgUrl } = req.body;
    await Item.insertOne({ name, description, price, category, imgUrl });
    res.status(201).json({ message: "Success add item" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    await Item.delete(req.params.id);
    res.status(200).json({ message: `Success delete Item` });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/items/:id", async (req, res) => {
  try {
    const { name, description, price, category, imgUrl } = req.body;
    await Item.update(
      { name, description, price, category, imgUrl },
      req.params.id
    );
    res.status(200).json({ message: `Success edit Item` });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

mongoConnect().then((db) => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
