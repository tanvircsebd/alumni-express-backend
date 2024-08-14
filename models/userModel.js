const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please add the username"],
    },
    email:{
        type: String,
        required: [true, "please include the email"],
        unique: [true, "Email address already taken"],
    },
    password:{
        type: String,
        required: [true, "please add the user password"],
    },
},
{
    timestamps: true,
}
)


module.exports = mongoose.model("User", userSchema);