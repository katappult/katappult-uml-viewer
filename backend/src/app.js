import express from "express";
import tabsRoutes from "./routes/tabsRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", tabsRoutes);

export default app;
