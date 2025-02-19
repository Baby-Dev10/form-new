import express from "express";
import {
  getAllSessions,
  updateSessionStatus,
  updatePricing,
  updatePremiumPlans,
  getStats,
} from "../controllers/adminController";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const router = express.Router();

// Apply authentication and admin check to all routes
router.use(auth, isAdmin);

router.get("/sessions", getAllSessions);
router.patch("/sessions/:id/status", updateSessionStatus);
router.patch("/pricing", updatePricing);
router.patch("/premium-plans", updatePremiumPlans);
router.get("/stats", getStats);

export default router;
