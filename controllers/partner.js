import User from "../models/user";
import Place from "../models/place";

export const partnerPlaces = async (req, res) => {
    try {
      const places = await Place.find({ partner: req.auth._id })
        .populate("partner", "name")
        .sort({ createdAt: -1 })
        .exec();
      res.json(places);
    } catch (err) {
      console.log(err);
    }
};