const express = require("express");
const Book = require("../models/book-model");
const verifyToken = require("../middleware/middleware");
const router = express.Router();
router.post("/create-book", verifyToken, async (req, res) => {
  try {
    const book = new Book({ ...req.body });
    await book.save();
    res.status(200).json({ message: "Created Book", book });
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "There is an error",
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "There is an error",
    });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    if (book) {
      res.status(200).send(book);
    } else {
      res.status(404).json({
        message: "There is no book ",
      });
    }
  } catch (error) {
    console.log(err);
    res.status(500).json({
      message: "There is an error",
    });
  }
});
router.put("/edit/:id", verifyToken, async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const updated = await Book.findByIdAndUpdate(id, body);
    if (!updated) {
      res.status(404).json({
        message: "There is no book ",
      });
    } else {
      res.status(200).send(updated);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There is an error",
    });
  }
});
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({
        message: "There is no book ",
      });
    } else {
      res.status(200).send(deleted);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There is an error",
    });
  }
});
module.exports = router;
