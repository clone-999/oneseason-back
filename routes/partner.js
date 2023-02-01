import express from "express";
import { partnerPlaces } from "../controllers/partner";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

router.get("/partner-places", requireSignin, partnerPlaces);

module.exports = router;