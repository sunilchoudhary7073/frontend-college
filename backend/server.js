const express = require("express")
const app = express()
const port = 4000
const path = require("path");
const cors = require("cors");


const dbAsync = require("./config/db")
const router = require("./router/AdminRouter/indexAdmin")
const frontedrouter = require("./router/frontedRouter/frontedIndex")
dbAsync()

app.use(cors());
app.use(express.json())
app.use(router)
app.use(frontedrouter)


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads/"))


app.listen(port, () => {
  console.log("Server running on port", port);
});