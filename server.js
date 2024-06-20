require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }))

app.get('/getTile/:zoom/:x/:y', (req, res) => {
    fetch(`https://api.lightboxre.com/v1/spatialstream/GetMap.aspx?sld=SS.Prop.BDE.ParcelDetail/styles/ParcelDetail/default.sld.xml&layers=ss.base.parcels/ParcelTiles&x=${req.params.zoom}&y=${req.params.y}&z=${req.params.x}`, { 
        headers: {
            "Content-Type": "image/png",
            // Your Lightbox key will come from the .env file
            "x-api-key": process.env.LIGHTBOX_API_KEY
        }
    })
        .then(response => response.arrayBuffer())
        .then(image => {
            res.contentType('image/png');
            res.send(Buffer.from(image));
        })
        .catch(error => console.error(error));
})

app.listen(port, () => {
  console.log(`Proxy listening on port ${port}`);
})

