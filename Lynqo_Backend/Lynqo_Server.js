import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
