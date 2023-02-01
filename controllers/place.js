const imageDownloader = require('image-downloader');
import slugify from "slugify";
const fs = require('fs');
import Place from "../models/place";
const cloudinary = require('../utils/cloudinary');

export const uploadByLink = async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
      url: link,
      dest: __dirname + '/uploads/' +newName,
    });
    res.json(newName);
}

export const upload = async (photos, res) => {
  try {
    let imagesBuffer = [];
    
    for (let i =0; i < photos.length;  i++){
      let imageUrl = photos[i].url;
      if (imageUrl.includes("http")) {
        imagesBuffer.push({
          public_id: null,
          url: imageUrl
        })
      } else {
        const result = await cloudinary.uploader.upload(imageUrl, {
          folder: "banners",
          width: 1920,
          crop: "scale"
        });
  
        imagesBuffer.push({
          public_id: result.public_id,
          url: result.secure_url
        })
      }

    }
    return imagesBuffer;

  } catch (error) {
    console.log(error);
    return res.status(400).send("Image upload failed. Try again.");
  }
}

export const create = async (req, res) => {
  try {
    const alreadyExist = await Place.findOne({
        slug: slugify(req.body.title.toLowerCase()),
    });
    if (alreadyExist) return res.status(400).send("Title is taken");
    
    if (req.body.photos = await upload(req.body.photos, res)) {
      const place = await new Place({
        slug: slugify(req.body.title),
        partner: req.auth._id,
        ...req.body,
      }).save();

      res.json(place);
    }
  } catch (err) { 
    console.log(err);
    return res.status(400).send("Place create failed. Try again.");
  }
}

export const update = async (req, res) => {
    try {
      const { slug } = req.params;
      // console.log(slug);
      const place = await Place.findOne({ slug }).exec();
      // console.log("PLACE FOUND => ", place);
      if (req.auth._id != place.partner) {
        return res.status(400).send("Unauthorized");
      }
  
      const updated = await Place.findOneAndUpdate({ slug }, req.body, {
        new: true,
      }).exec();
  
      res.json(updated);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err.message);
    }
};

export const read = async (req, res) => {
  try {
    const place = await Place.findOne({ slug: req.params.slug })
      .populate("partner", "_id name")
      .exec();
    res.json(place);
  } catch (err) {
    console.log(err);
  }
};

export const places = async (req, res) => {
  const all = await Place.find({ published: true })
    .populate("partner", "_id name")
    .exec();
  res.json(all);
};
