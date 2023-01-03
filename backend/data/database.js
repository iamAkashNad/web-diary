const mongoose = require("mongoose");

const connect = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect("mongodb://127.0.0.1:27017/diary");
}

const getDb = () => {
    return mongoose;
}

module.exports = {
    connect: connect,
    getDb: getDb
};
