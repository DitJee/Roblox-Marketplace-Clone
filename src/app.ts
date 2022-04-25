import "dotenv/config";
import server from "./server";

const PORT = parseInt(process.env.PORT || "4000");
const starter = new server();

(async function main() {
  try {
    const port = await starter.start(PORT);
    console.log(`Running on port ${port}`);
  } catch (err) {
    console.log(err);
  }
})();

export default starter;
