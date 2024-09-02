import express from "express";
import entityRoutes from "./routes/entityRoutes.js";
import positionRoutes from "./routes/positionRoutes.js";
import viewPortRoutes from "./routes/viewPortRoutes.js";
const app = express();

app.use(express.json());
app.use("/api/entities", entityRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/viewport", viewPortRoutes);

export default app;
