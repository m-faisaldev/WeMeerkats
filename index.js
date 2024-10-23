const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");

dotenv.config({ path: "./config.env" });

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.text({ type: "/" }));
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

require("./database/connection");

const learnerRouter = require("./router/learnerAuth");
const mentorRouter = require("./router/mentorAuth");

app.use(learnerRouter);
app.use(mentorRouter);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
