const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumsSchema = new Schema(
  {
    album_id: {
      type: String,
      required: true,
      trim: true,
    },
    album_genre: {
      type: String,
      trim: true,
    },
    album_title: {
      type: String,
      required: true,
      trim: true,
    },
    album_artist_id: {
      type: String,
      required: true,
      trim: true,
    },
    album_artist_title: {
      type: String,
      required: true,
      trim: true,
    },
    album_total_songs: {
      type: String,
      required: true,
      trim: true,
    },
    album_cover_img:{
      type: String,
    },
    album_artist_logo: {
      type: String,
  },
    album_songs_list:{
      type:Array
    },
    album_description:{
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Albums", albumsSchema);
