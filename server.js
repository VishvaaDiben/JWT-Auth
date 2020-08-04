require('dotenv').config()
//relearn this jwt

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

const posts = [{ username: "Diben", title: "Post by Diben" }, {username: "Vishvaa", title: "Post by Vishvaa"}];

app.get("/posts",authenticateToken, (req, res) => {
    // req.user
  res.json(posts.filter(post => post.username === req.user.name));
})

//Middleware
function authenticateToken(req, res, next){
 //verify user and get request
 const authHeader = req.headers['authorization']
 const token = authHeader && authHeader.split(' ')[1] 
 if (token == null) return res.sendStatus(401)

 jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
     if (err) return res.sendStatus(403)
     req.user = user
     next()
 })
}

app.listen(3000);
