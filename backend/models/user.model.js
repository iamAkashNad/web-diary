const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        default: "Not Mentioned"
    },
    bio: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const User = mongoose.model("users", userShema);

userShema.method("findUserByEmail", async () => {
    const user = await User.findOne({ email: this.email });
    return user;
});

module.exports = User;
