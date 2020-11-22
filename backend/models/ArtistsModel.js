const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema(
    {
        artist_id: {
            type: String,
            required: true,
            trim: true,
        },
        artist_title: {
            type: String,
            required: true,
            trim: true,
        },
        artist_albums: {
            type: Array
        },
        artist_logo: {
            type: String,
        },
        artist_user_id: {
            type: String,
            required: true,
            trim: true,
        },
        artist_password:{
            type: String,
            required: true,
            trim: true,
        }
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("Artists", artistSchema);
