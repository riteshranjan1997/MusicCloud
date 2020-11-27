const Artist = require("../models/ArtistsModel");
const Joi = require("joi");

const loginValidation = (data) => {
  console.log("in login validation ", data);
  const schema = Joi.object({
    user_id: Joi.string().min(6).required().email(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};

// const editValidation = (data) => {
//   const schema = Joi.object({
//     user_id: Joi.string().min(6).email(),
//     artist_title: Joi.string().min(3),
//     password: Joi.string().min(5),
//     deleteAlbumId: Joi.string(),
//     artist_user_id: Joi.string(),
//   });
//   return schema.validate(data);
// };

const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    console.log("error in login is", error);
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });
  }

  const userData = await Artist.findOne({ artist_user_id: req.body.user_id });
  if (!userData) {
    return res.status(400).json({ error: true, message: "User not exists" });
  }

  if (userData) {
    if (userData.artist_password === req.body.password) {
      // const accessToken = jwt.sign(user, process.env.SECRET_KEY_TO_ACCESS);
      res.status(200).json({
        error: false,
        userData,
        message: "Login Successful",
      });
    } else {
      return res
        .status(400)
        .json({ error: true, message: "incorrect password" });
    }
  } else {
    return res.status(400).json({ error: true, message: "Artist Not found" });
  }
};

const editUser = async (req, res) => {
  // const { error } = editValidation(req.body);
  // if (error) {
  //   console.log("error in editvalidation is", error);
  //   return res
  //     .status(400)
  //     .json({ error: true, message: error.details[0].message });
  // }
  console.log(req.body)
  const userData = await Artist.findOne({
    artist_id: req.body.artist_id,
  });

  if (!userData) {
    return res.status(400).json({ error: true, message: "User not exists" });
  }

  console.log(userData)

  if (userData) {
    await Artist.findOne({ artist_id: req.body.artist_id }).then((data) => {
      if (req.body.artist_title !== "" || req.body.artist_title) {
        data.artist_title = req.body.artist_title;
      }
      if (req.body.newAlbumId) {
        data.artist_albums.push(req.body.newAlbumId);
      }
      if (req.body.deleteAlbumId) {
        let indexPos = data.artist_albums.findIndex(req.body.deleteAlbumId);
        data.artist_albums.splice(indexPos, 1);
      }
      if (req.body.password) {
        console.log("true")
        data.artist_password = req.body.password;
      }
      if (req.body.user_id) {
        data.artist_user_id = req.body.user_id;
      }
      data.save().then(() => res.status(200).json({ status: "Success", message: "user data updated!" }))
        .catch((err) =>
          res.status(403).json({ message: "something went wrong" })
        );
    }).catch((err) => res.status(403).json({ message: "something went wrong" , error: err}))
  }
};

module.exports = {
  loginUser,
  editUser,
};
