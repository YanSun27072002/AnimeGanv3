// server/index.js
import {getresult} from "./imageToimage2.js";

import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';


// Sử dụng middleware CORS
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors(
  {
    origin: '*',
    optionsSuccessStatus: 200
  }
));
app.use(bodyParser.json());

app.post('/upload', async (req, res) => {
  const imageData = req.body.image;
  const result = await getresult(imageData)
  res.json({base64: result})
});

const corsOptions = {
  origin: function(origin, callback){
callback(null,true);
  }
}
app.use(cors(corsOptions));
// app.post("/api/generated", async (req, res) => {
//   const image = req.body.image;
//   console.log("co chay nha")
// });
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});