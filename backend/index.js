// const express = require('express')
// const bodyParser = require("body-parser")
// const cors = require("cors")
// const AuthRouter = require("./Routes/AuthRouter")
// const path = require('path')

// require("dotenv").config();
// require("./Models/db")

// const app = express()

// app.use(bodyParser.json())
// app.use(cors())

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.use("/auth", AuthRouter)

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'dist')));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
//   });
// }

// const port = process.env.PORT || 8080;

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const path = require('path');

require("dotenv").config();
require("./Models/db");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use("/auth", AuthRouter);

// Serve static files from the dist folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  // Catch-all route to handle any frontend route and serve index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
