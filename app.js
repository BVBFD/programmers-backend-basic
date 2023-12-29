// express 모듈
const express = require("express");
const app = express();

// json 형태로 request 받기 위함
app.use(express.json());

// dotenv 모듈
const dotenv = require("dotenv");
dotenv.config();

// Router 모듈
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const likesRouter = require("./routes/likes");
const cartsRouter = requrie("./routes/carts");
const ordersRouter = require("./routes/orders");

app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/carts", cartsRouter);
app.use("/likes", likesRouter);
app.use("/orders", ordersRouter);

app.listen(process.env.PORT);
