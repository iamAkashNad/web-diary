const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({path: __dirname + "/.env"});
// const session = require("express-session");

const mongoose = require("./data/database");

const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");

const cors = require("./middlewares/cors.middleware");
const getUserId = require("./middlewares/getUserId.middleware");
const errorHandlerMiddlewares = require("./middlewares/errorHandler.middlewares");

const app = express();

app.use(cors);
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
