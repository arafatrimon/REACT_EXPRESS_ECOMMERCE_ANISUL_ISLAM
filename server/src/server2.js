const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const isLoggedIn = (req, res, next) => {
  const login = true;
  if (login) {
    req.body.id = 101;
    next();
  } else {
    return res.status(401).json({ message: "Please login first" });
  }
};

app.get("/test", (req, res) => {
  res.status(200).send({
    message: "Api is working .....",
  });
});

app.get("/api/user", isLoggedIn, (req, res) => {
  console.log(req.body.id);
  res.status(200).send({
    message: "User Profile is return",
  });
});
//client error handling
app.use((req,res,next)=>{
res.status(404).json({message:'route not found'})
next()
})

//server error handling
app.use((err,req,res,next)=>{
    console.error(err.stack)
  res.status(500).send('Something broke!')
    })

app.listen(3001, () => {
  console.log(`Server is running at port : http://localhost:3001`);
});
