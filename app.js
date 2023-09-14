const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const homeRoutes = require("./routes/home.js");
const authRoutes = require("./routes/auth.js");
const adminRoutes = require("./routes/admin.js");
require("dotenv").config();
require("./config/dbConnection.js")();
require("./config/passport.js")(passport);



app.set("view engine", "ejs");
app.use(expressLayouts);
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());




// Routes
app.use(homeRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use((req,res) => {
	res.status(404).render("404page", { title: "Page not found" });
});


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server is running at http://localhost:${port}`));