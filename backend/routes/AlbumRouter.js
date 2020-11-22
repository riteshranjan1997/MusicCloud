const express = require("express");
const router = express.Router();
const {
    getAlbumSearch,
    getAlbums,
    getAlbumData,
    addAlbum,
    addSong,
    editAlbumData,
    editSongData,
    deleteAlbum,
    deleteSong,
} = require("../controllers/AlbumController");


router.get("/api/serach", getAlbumSearch);
router.get("/api/albums",   getAlbums);
router.get("/api/album/:id", getAlbumData);

router.post("/api/addAlbum", addAlbum),
// send album id in params
router.post("/api/addsong", addSong)

router.post("/api/addAlbum", addAlbum)
router.post("/api/edit/album/:id", editAlbumData);
// pass album id and songid in params
router.post("/api/edit/song", editSongData)
router.delete("/api/album/:id", deleteAlbum);
// pass album id and songid in params
router.delete("/api/delete/song", deleteSong)

module.exports = router;
