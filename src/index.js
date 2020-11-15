import { config } from "./config/index";
import app from "./server";
import "./libs/database";

app.listen(config.port, () => {
  console.log(`Server start on port ${config.port}!`);
});
