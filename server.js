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
    console.log(`https://api.lightboxre.com/v1/spatialstream/GetMap.aspx?layers=ss.base.parcels/ParcelTiles&z=${req.params.zoom}&y=${req.params.y}&x=${req.params.x}`);
    fetch(`https://api.lightboxre.com/v1/spatialstream/GetMap.aspx?layers=ss.base.parcels/ParcelTiles&z=${req.params.zoom}&y=${req.params.y}&x=${req.params.x}`, { 
        headers: {
            // Your Lightbox key will come from the .env file
            "x-api-key": process.env.LIGHTBOX_API_KEY
        }
    })
        .then(response => {
            console.log(response);
            return response.arrayBuffer()
        })
        .then(image => {
            res.contentType('image/png');
            res.send(image);
        })
        .catch(error => console.error(error));
})

app.listen(port, () => {
  console.log(`Proxy listening on port ${port}`);
})

