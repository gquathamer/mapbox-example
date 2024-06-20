mapboxgl.accessToken = 'pk.eyJ1IjoiZ3F1YXRoYW1lciIsImEiOiJja2lpMmdmbzIwbHYxMnNsYzgwN21iMnMwIn0.yTPtuK_tkqkmU_zsJpWOrQ';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-104.96975965067962, 39.76779362796033], // starting position [lng, lat]
    zoom: 16 // starting zoom
    /* transformRequest: (url, resourceType) => {
        if (resourceType === 'Tile' && url.startsWith('https://api.lightboxre.com/v1/spatialstream')) {
        // Add custom headers
            return {
                url: url,
                headers: {
                    'x-api-key': 'EVJMzVqdlvNMxYYEXO86zb05fyPi3XFz',
                    'content-type': 'image/png'
                // Add any other custom headers as needed
                }
            };
        } else {
        // For other requests, return the original URL
            return { url: url };
        }
    } */
});

map.on('load', () => {
    map.addSource('LightBoxSmartParcel', {
        type: 'raster',
        //tiles: ['https://api.lightboxre.com/v1/parcels/us/tile/{z}/{x}/{y}?color=ff00ff'],
        tiles: ['http://localhost:3000/getTile/{z}/{x}/{y}'],
        tileSize: 256
    });
    map.addLayer({
        'id': 'lightbox-parcels',
        'type': 'raster',
        'source': 'LightBoxSmartParcel',
        'minzoom': 16,
        'maxzoom': 21
    });   
});