const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Place = require("./models/Place");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const download = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const Booking = require("./models/Booking");
const mime = require("mime-types");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "aljdfa;lkfda;lfkjda;lsfkjalk;f";
const bucket = "merkasin-booking-app";

app.use(express.json());
//endpoint for uploads folder -- serves everythings from uploads folder
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

//Zjb9ZWvOmkPsOG7m

const uploadToS3 = async (path, originalname, mimetype) => {
  const client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newfileName = Date.now() + "." + ext;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newfileName,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newfileName}`;
};

const getUserDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
};

app.get("/api/test", (req, res) => {
  res.json("test ok");
});

app.post("/api/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/api/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(userDoc);
      });
    } else {
      res.status(422).json("passnot ok");
    }
  } else {
    res.json("not found");
  }
});
app.get("/api/profile", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    const userData = await getUserDataFromReq(req);
    const { name, email, _id } = await User.findById(userData.id);
    res.json({ name, email, _id });
  } else {
    res.json(null);
  }
});

app.post("/api/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newfileName = "photo_" + Date.now() + ".jpg";
  await download.image({
    url: link,
    dest: "/tmp/" + newfileName,
  });
  const url = await uploadToS3(
    "/tmp/" + newfileName,
    newfileName,
    mime.lookup("/tmp/" + newfileName)
  );
  res.json(url);
});

const photosMiddleware = multer({ dest: "/tmp" });
app.post("/api/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  // * the array given to the end point is used in the middleware multer function.
  const uploadedFiles = [];
  // * putting proper filename with extension after downloading for each photo uploaded
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }

  res.json(uploadedFiles);
});
app.post("/api/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const userData = await getUserDataFromReq(req);
  const { placeDoc } = await Place.create({
    owner: userData.id,
    title,
    address,
    photos: addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  });

  res.json(placeDoc);
});
app.get("/api/user-places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const { id } = userData;
  res.json(await Place.find({ owner: id }));
});
app.get("/api/places/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Place.findById(id));
});
// * for Updating existing place
app.put("/api/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const userData = await getUserDataFromReq(req);
  const placeDoc = await Place.findById(id);
  if (userData.id === placeDoc.owner.toString()) {
    placeDoc.set({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
  }
  await placeDoc.save();
  res.json("ok");
});
app.get("/api/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Place.find());
});

app.post("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, name, numberOfGuests, phone, price } = req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    name,
    numberOfGuests,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/api/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json("logged out");
});

app.listen(8080);
