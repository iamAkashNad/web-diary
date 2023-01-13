const Note = require("../models/note.model");
const isFill = require("../util/isFill.util");

exports.getAllNotesOfUser = async (req, res, next) => {
  const userId = res.locals.authUserId;
  let notes;
  try {
    notes = await Note.find({ userId }, { userId: 0 });
  } catch (error) {
    return next(error);
  }

  notes = notes.map(note => {
    const newNote = {
        ...note._doc,
    };
    newNote.hrDate = newNote.date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    });
    return newNote;
  });

  res.json(
    !notes || notes.length === 0
      ? { message: "You doesn't have any notes till now!", notes: [] }
      : { message: "All your notes!", notes }
  );
};

exports.createNote = async (req, res, next) => {
  const userId = res.locals.authUserId;
  const { title, description } = req.body;
  if (!isFill(title) || !isFill(description) || description.trim().length < 60) {
    return res.json({ invalid: true, message: "Please write a valid note!" });
  }

  try {
    const isExist = await Note.findOne({ title, userId });
    if (isExist) {
      return res
        .json({ sameTitle: true, message: "You have already a note with same title!" });
    }
  } catch (error) {
    return next(error);
  }

  let tag;
  if (req.body.tag && req.body.tag.trim()) {
    tag = req.body.tag.trim().charAt(0).toUpperCase() + (req.body.tag.trim().length > 1 ? req.body.tag.trim().substring(1).toLowerCase() : "");
    if(tag.length > 15) tag = tag.slice(0, 15);
  }
  const note = new Note({ userId, title, description, tag, date: new Date() });
  try {
    await note.save();
  } catch (error) {
    return next(error);
  }
  res.status(201).json({ message: "Your note is successfully saved!" });
};

exports.editNote = async (req, res, next) => {
  const userId = res.locals.authUserId;
  const noteId = req.params.noteId;

  try {
    const note = await Note.findOne({ _id: noteId });
    if (!note || userId !== note.userId.toString()) {
      return res.json({ notFound: true, message: "Note not found!" });
    }
    const { title, description } = req.body;
    if (!isFill(title) || !isFill(description) || description.trim().length < 60) {
      return res
        .json({ invalid: true, message: "Please write a valid inputs for editing a note!" });
    }
    const isExist = await Note.findOne({ title, userId });
    if (isExist && isExist._id.toString() !== noteId) {
      return res
        .json({ sameTitle: true, message: "You have already a note with same title!" });
    }
    await Note.updateOne({ _id: noteId }, { $set: { title, description } });
  } catch (error) {
    return next(error);
  }

  res.status(201).json({ message: "Note updated successfully!" });
};

exports.deleteNote = async (req, res, next) => {
  const userId = res.locals.authUserId;
  const noteId = req.params.noteId;

  try {
    const result = await Note.deleteOne({ _id: noteId, userId: userId });
    if (result.deletedCount === 0) {
      return res.json({ notFound: true, message: "Note not found" });
    }
  } catch (error) {
    return next(error);
  }
  res.status(201).json({ message: "Note is deleted successfully!" });
};
