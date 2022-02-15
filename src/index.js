const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');

app.use(express.json());

// Serve static assets
app.use(express.static(__dirname + "/public"))

// Handlebar configs
const hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "mainLayout",
  layoutsDir: __dirname + "/resources/views/layouts/",
  partialsDir: [__dirname + "/resources/views/partials"]
})

// Setup Handlebar config
app.engine("hbs", hbs.engine);

// View engine setup
app.set("views", path.join(__dirname, "resources", "views"));
app.set("view engine", "hbs");

// Define routes
app.use(require('./routes/main.routes'))

// Start application
app.listen(3000, () => {
  console.log('listening to port 3000')
})