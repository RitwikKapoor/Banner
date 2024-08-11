import express from "express";
import {
  bannerAll,
  bannerLinkUpdate,
  bannerTextUpdate,
  bannerTimerUpdate,
  bannerVisibilityUpdate,
} from "../controllers/bannerController.js";
import { jwtCheck } from "../middlewares/jwtCheck.js";

const router = express.Router();

router.get("/all", bannerAll);
router.post("/vis", jwtCheck, bannerVisibilityUpdate);
router.post("/text", jwtCheck, bannerTextUpdate);
router.post("/link", jwtCheck, bannerLinkUpdate);
router.post("/timer", jwtCheck, bannerTimerUpdate);

export { router as bannerRoute };
