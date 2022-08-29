const express = require("express");
//const passport = require("passport");
const cors = require('cors');
const { register, login } = require("./controllers/auth.controller");
let user;
 const passport=require("./configs/passport")
const app = express();

app.use(express.json());
app.use(passport.initialize())
app.use(cors())

passport.serializeUser(function({user, token}, done){
  done(null, {user, token})
})

passport.deserializeUser(function({user, token}, done){
  done( {user, token})
})

// app.use("/users", userController) // /register /login
app.post("/register", register);
app.post("/login", login);




app.get('/auth/google',
  passport.authenticate('google', { scope :[ 'email', 'profile' ] },

));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}),

function  (req, res) {

  return res.send({user: req.user})

}

)
module.exports = app;
