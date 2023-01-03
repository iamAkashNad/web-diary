const express = require("express");
const bodyParser = require("body-parser");
// const session = require("express-session");

const mongoose = require("./data/database");

const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");

const getUserId = require("./middlewares/getUserId.middleware");
const errorHandlerMiddlewares = require("./middlewares/errorHandler.middlewares");

const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user/auth", authRoutes);
app.use("/notes", getUserId, noteRoutes);

app.use(errorHandlerMiddlewares.resourceNotFound);
app.use(errorHandlerMiddlewares.expressDefaultErrorHandler);

mongoose.connect().then(() => {
    app.listen(5050);
}).catch(error => {
    console.log("Database connection failed!");
});
