import express from "express";

import {
  createViewPort,
  getAllViewPort,
  getViewPortByName,
  updateViewPortByName,
  deleteAllViewPort,
  deleteViewPortByName,
} from "../controllers/viewPortController.js";

const router = express.Router();

router.post("/", createViewPort);
router.get("/", getAllViewPort);
router.get("/:name", getViewPortByName);
router.put("/:name", updateViewPortByName);
router.delete("/:name", deleteViewPortByName);
router.delete("/", deleteAllViewPort);

export default router;
