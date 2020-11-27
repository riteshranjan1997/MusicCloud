const Albums = require("../models/AlbumsModel");

// for searching the albums
const getAlbumSearch = async (req, res) => {
  try {
    let album;
    // filter part
    if (req.query.filter) {
      album = await Albums.find({
        album_title: req.body.title,
        album_genre: req.query.filter,
      }).then((data) => data);
    } else {
      album = await Albums.find({ album_title: req.body.title }).then(
        (data) => data
      );
    }
    // check for data
    // if (Album.length === 0) {
    //   res.status(400).json({error:true, message:"Albums not found"});
    // }
    // sorting
    if (req.query.sortby) {
      console.log("true");
      if (req.query.sortby === "asc") {
        album = album.sort((a, b) => a.album_realese - b.album_realese);
      }
      if (req.query.sortby === "desc") {
        album = album.sort((a, b) => b.album_realese - a.album_realese);
      }
    }
    // pagenation
    let limit = req.query.limit || 10;
    let page = req.query.page || 1;

    let start_index = (page - 1) * limit;
    let end_index = page * limit;
    album = album.slice(start_index, end_index);
    return res.status(200).json({ error: false, data: album });
  } catch (err) {
    res.status(400).json(err);
  }
};

//get all albums data
const getAlbums = async (req, res) => {
  //

  try {
    let album;
    // filter part
    if (req.query.filter) {
      album = await Albums.find({
        album_genre: req.query.filter,
      }).then((data) => data);
    } else {
      album = await Albums.find().then((data) => data);
    }
    console.log(album, "before check");
    // check for data
    // if (Album.length === 0) {
    //   res.status(400).json({error:true, message:"Albums not found"});
    // }
    console.log(album, "before sorting");
    // sorting
    if (req.query.sortby) {
      console.log("true");
      if (req.query.sortby === "asc") {
        album = album.sort((a, b) => a.album_realese - b.album_realese);
      }
      if (req.query.sortby === "desc") {
        album = album.sort((a, b) => b.album_realese - a.album_realese);
      }
    }
    console.log(album, "after sorting");
    // pagenation
    let limit = req.query.limit || 10;
    let page = req.query.page || 1;

    let start_index = (page - 1) * limit;
    let end_index = page * limit;
    album = album.slice(start_index, end_index);
    return res.status(200).json({ error: false, data: album });
  } catch (err) {
    res.status(400).json(err);
  }

  //

  // const page = Number.parseInt(req.query.page);
  // const limit = Number.parseInt(req.query.limit);

  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;

  // const results = {};

  // if (endIndex < (await Albums.countDocuments().exec())) {
  //   results.next = {
  //     page: page + 1,
  //     limit: limit,
  //   };
  // }

  // if (startIndex > 0) {
  //   results.prev = {
  //     page: page - 1,
  //     limit: limit,
  //   };
  // }

  // results.totalItem = await Albums.countDocuments();

  // try {
  //   results.current = await Albums.find().limit(limit).skip(startIndex).exec();
  //   res.status(200).json(results);
  // } catch (e) {
  //   res.status(400).json({ message: e.message });
  // }
};

//get single album data
const getAlbumData = (req, res) => {
  let query = req.params.id;

  Albums.findOne({ album_id: query })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: true, message: "No Such album Found" });
      }
    })
    .catch((err) =>
      res
        .status(404)
        .json({ message: "No Such album Found", error: true, details: err })
    );
};

// add new album
const addAlbum = (req, res) => {
  // if (req.body.name === "" || !req.body.name) {
  //   res.status(400).json({ message: "name can't be empty" });
  //   return;
  // } else if (req.body.blood_group === "" || !req.body.blood_group) {
  //   res.status(403).json({ message: "blood_group can't be empty" });
  //   return;
  // } else if (req.body.email === "" || !req.body.email) {
  //   res.status(403).json({ message: "email can't be empty" });
  //   return;
  // } else if (req.body.city === "" || !req.body.city) {
  //   res.status(403).json({ message: "city can't be empty" });
  //   return;
  // } else if (req.body.gender === "" || !req.body.gender) {
  //   res.status(403).json({ message: "gender can't be empty" });
  //   return;
  // } else {
  const data = new Albums({
    album_id: album_id,
    album_genre: album_genre,
    album_title: album_title,
    album_artist_id: album_artist_id,
    album_artist_title: album_artist_title,
    album_total_no: album_total_no,
    album_cover_img: album_cover_img,
    album_artist_logo: album_artist_logo,
    album_songs_list: album_songs_list,
  });

  data
    .save()
    .then(() =>
      res.status(200).json({
        status: "Success",
        message: "New album has been added to the database",
      })
    )
    .catch((err) => res.status(400).json({ status: "Failed", message: err }));
  // }
};

//edit album data
const editAlbumData = (req, res) => {
  // let query = req.body.id
  //   Albums.findOne({ album_id: query }).then(data => {
  //     data.save().then(() => res.status(200).json({ status: "Success", message: "Student data updated!" })).catch(err => res.status(403).json({ message: "something went wrong" }))
  //   }).catch(err => res.status(403).json({ message: "something went wrong", q: err }))
  // }
  // else {
  //   res.status(403).json({ message: "Cannot change email" });
  //   return
  // }
};

//delete album
const deleteAlbum = (req, res) => {
  // let query = req.params.email;
  // Students.findOne({ email: query })
  //   .then((student) => {
  //     Students.findByIdAndDelete(student.id).then(() =>
  //       res.status(200).json({
  //         status: "Success",
  //         message: "person has been removed from the database",
  //       })
  //     );
  //   })
  //   .catch((err) => res.status(404).json({ message: "No Such person Found" }));
};

// add new song
const addSong = (req, res) => {
  // let query = req.body.email;
  // Albums.findOne({ email: query }).then((data) => {
  //   if (data) {
  //     res.status(403).json({ message: "preson already exist" });
  //     return;
  //   }
  // });
  // if (req.body.name === "" || !req.body.name) {
  //   res.status(400).json({ message: "name can't be empty" });
  //   return;
  // } else if (req.body.blood_group === "" || !req.body.blood_group) {
  //   res.status(403).json({ message: "blood_group can't be empty" });
  //   return;
  // } else if (req.body.email === "" || !req.body.email) {
  //   res.status(403).json({ message: "email can't be empty" });
  //   return;
  // } else if (req.body.city === "" || !req.body.city) {
  //   res.status(403).json({ message: "city can't be empty" });
  //   return;
  // } else if (req.body.gender === "" || !req.body.gender) {
  //   res.status(403).json({ message: "gender can't be empty" });
  //   return;
  // } else {
  //   const data = new Students({
  //     name: req.body.name,
  //     blood_group: req.body.blood_group,
  //     email: req.body.email,
  //     city: req.body.city,
  //     gender: req.body.gender,
  //   });
  //   data
  //     .save()
  //     .then(() =>
  //       res.status(200).json({
  //         status: "Success",
  //         message: "New person has been added to the database",
  //       })
  //     )
  //     .catch((err) => res.status(400).json({ status: "Failed", message: err }));
  // }
};

//edit song data
const editSongData = (req, res) => {
  // let query1 = req.body.email
  // let query2 = req.params.email
  // if (query1 === query2) {
  //   Students.findOne({ email: query1 }).then(data => {
  //     data.name = req.body.name
  //     data.blood_group = req.body.blood_group,
  //       data.city = req.body.city
  //     data.image_link = req.body.image_link
  //     data.gender = req.body.gender
  //     data.save().then(() => res.status(200).json({ status: "Success", message: "Student data updated!" })).catch(err => res.status(403).json({ message: "something went wrong" }))
  //   }).catch(err => res.status(403).json({ message: "something went wrong", q: err }))
  // }
  // else {
  //   res.status(403).json({ message: "Cannot change email" });
  //   return
  // }
};

//delete song from album
const deleteSong = (req, res) => {
  // let query = req.params.email;
  // Students.findOne({ email: query })
  //   .then((student) => {
  //     Students.findByIdAndDelete(student.id).then(() =>
  //       res.status(200).json({
  //         status: "Success",
  //         message: "person has been removed from the database",
  //       })
  //     );
  //   })
  //   .catch((err) => res.status(404).json({ message: "No Such person Found" }));
};

module.exports = {
  getAlbumSearch,
  getAlbums,
  getAlbumData,
  addAlbum,
  editAlbumData,
  deleteAlbum,
  addSong,
  editSongData,
  deleteSong,
};

// app.get("/api/students", paginatedResults(Students), (req, res) => {
//   res.json(res.pagination);
// });
