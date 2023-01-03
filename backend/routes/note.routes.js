const express = require("express");

const noteController = require("../controllers/note.controller");

const router = express.Router();

router.get("/", noteController.getAllNotesOfUser);

router.post("/create", noteController.createNote);

router.patch("/:noteId/edit", noteController.editNote);

router.delete("/:noteId/delete", noteController.deleteNote);

module.exports = router;
