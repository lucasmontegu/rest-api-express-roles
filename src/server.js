import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { createRoles } from "./libs/initialSetup";

const app = express();
createRoles();

// Call middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Set all routes from routes folder
app.use("/api/v1", routes);

export default app;
