const cors = require("cors");
const express = require("express");
const app = express();
const { errorHandler } = require("./middleware");
const { createUploadsDir } = require("./utils");
const path = __dirname + '/dist';
require("./db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

createUploadsDir();

// Api routes
app.use("/api", require("./routes"));
app.use(express.static(path))
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});
app.use('/uploads', express.static(`${__dirname}/uploads`));

// Error handling middleware - should be the last
app.use(errorHandler);

const __PORT__ = 5000;

// Init server
app.listen(__PORT__, () => {
  console.log(`App is listening at :${__PORT__}`);
});
