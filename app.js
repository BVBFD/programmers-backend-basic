const express = require("express");
const usersRouter = require("./routes/users");
const channelsRouter = require("./routes/channels");

const app = express();
app.use(express.json());
app.listen(8080);

app.use("/users", usersRouter);
app.use("/channels", channelsRouter);
