const mongoose = require("mongoose");

const alumniSchema = mongoose.Schema(
    {
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name:{
            type: String,
            required: [true, "Alumni Name is mandatory"],
        },
        email:{
            type: String,
            required: [true, "please include the email"],
        },
        phone:{
            type: String,
            required: [true, "please include the phone number"],
        },
        nNumber:{
            type: String,
            required: [true, "Alumni nNumber is mandatory"],
        },
        department:{
            type: String,
            required: [true, "please include the Department Name"],
        },
        session:{
            type: String,
            required: [true, "please include the session"],
        },
    },
    {
        timestamps: true,
    }
)


module.exports = mongoose.model("Alumni", alumniSchema);