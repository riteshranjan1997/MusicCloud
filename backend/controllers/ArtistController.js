const Artist = require("../models/ArtistsModel");
const Joi = require("joi");

const loginValidation = (data) => {
  console.log("in login validation ", data)
  const schema = Joi.object({
    user_id: Joi.string().min(6).required().email(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};


const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    console.log("error in login is", error)
    return res
      .status(400)
      .json({ error: true, message: error.details[0].message });
  }

  const userData = await Artist.findOne({ artist_user_id: req.body.user_id });
  if (!userData) {
    return res.status(400).json({ error: true, message: "Email not exists" });
  }

  if (userData) {

    if (userData.artist_password === req.body.password) {
      // const accessToken = jwt.sign(user, process.env.SECRET_KEY_TO_ACCESS);
      res
        .status(200)
        .json({
          error: false,
          userData,
          message: "Login Successful",
        });
    }
    else {
      return res.status(400).json({ error: true, message: "incorrect password" });
    }

  }
  else {
    return res.status(400).json({ error: true, message: "Artist Not fount" });
  }
};

const editUser = async (req, res) => {
  try {
    
    updates.forEach(update => req.author[update] = req.body[update]);
    await req.author.save();
    res.send(req.author)
  } catch (e) {
    res.status(400).send(e)
  }
}

module.exports = {
  loginUser,
  editUser,
};
