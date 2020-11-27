const express = require("express");
const router = express.Router();

const {
    loginUser,
    editUser,
} = require("../controllers/ArtistController");

router.post("/login", loginUser);
router.post("/editprofile", editUser);

module.exports = router;
