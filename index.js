const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

//defining the port
const PORT = process.env.PORT || 3001;

const app = express();

//adding the required middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//localhost lisetening
db.once('open',()=>{
    app.listen(PORT,()=>{
        console.log(`App listening on http://localhost:${PORT}`)
    })
})