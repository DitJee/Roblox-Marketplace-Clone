import express, { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "Default route",
    version: "1.0.0",
  });
});

export default router;
