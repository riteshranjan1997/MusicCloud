const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const ArtistData = require("./artists.json");
const AlbumsData = require("./albums.json");

const Albums = require("./models/AlbumsModel");
const Artists = require("./models/ArtistsModel");

const AlbumsRoute = require("./routes/AlbumRouter");
const ArtistsRoute = require("./routes/ArtistRouter");

const app = express();
dotenv.config();
app.use(express.json());


// connection to database
mongoose.connect(
    process.env.ATLAS_URI,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log("Connection to DB failed");
        } else {
            console.log("Database is successfully connected");
            Albums.find()
                .then((data) => {
                    if (data.length === 0) {
                        Albums.insertMany(AlbumsData)
                            .then(() => console.log("Initial Data of albums is Added to the database"))
                            .catch((err) => console.log("Error: " + err));
                    } else {
                        console.log("initial data is allready present");
                    }
                })
                .catch((err) => console.log("Error: " + err));
            Artists.find().then((data) => {
                if (data.length === 0) {
                    Artists.insertMany(ArtistData)
                        .then(() => console.log("Initial Data of artist is Added to the database"))
                        .catch((err) => console.log("Error: " + err));
                } else {
                    console.log("initial data is allready present");
                }
            })
            
        }
    }
);

//parent route
app.use("/album", AlbumsRoute);
app.use("/artist", ArtistsRoute);


app.listen(5000, () => {
    console.log("The server is up and running");
});
