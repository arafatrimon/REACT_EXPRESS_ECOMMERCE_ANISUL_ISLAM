const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const { seedUser } = require("./controllers/seedController");
const { seedRouter } = require("./routers/seedRouter");
const { errorResponse } = require("./controllers/responseController");
const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many requests from this IP. Please Try again later",
});
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/seed", seedRouter);

app.get("/test", (req, res) => {
  res.status(200).send({
    message: "Api is working .....",
  });
});

//client error handling

// app.use((req,res,next)=>{
// next(createError(404,'route not found'))
// })

//server error handling
app.use((err, req, res, next) => {
  // return res.status(err.status || 500).json({
  //   success:false,
  //   message:err.message
  // })
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});
module.exports = app;
