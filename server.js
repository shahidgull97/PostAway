import app from "./index.js";
import { connectionToDb } from "./src/config/db.js";

app.listen(3000, async () => {
  await connectionToDb();
  console.log("Server is running at port 2000");
});
