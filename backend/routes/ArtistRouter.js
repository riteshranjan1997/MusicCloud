const express = require("express");
const router = express.Router();

const {
    loginUser,
    editUser,
} = require("../controllers/ArtistController");

router.get("/login", loginUser);
router.post("/editprofile", editUser);

module.exports = router;
