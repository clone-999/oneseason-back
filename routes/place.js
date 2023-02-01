import express from "express";
import { create, read, update, upload, uploadByLink } from "../controllers/place";

const router = express.Router();

// middleware
import { requireSignin } from "../middlewares";

router.post('/upload-by-link', uploadByLink);

router.post('/upload', upload);

router.post("/place", requireSignin, create);
router.put("/place/:slug", requireSignin, update);
router.get("/place/:slug", read);

module.exports = router;