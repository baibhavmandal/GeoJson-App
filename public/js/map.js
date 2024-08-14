mapboxgl.accessToken =
  "pk.eyJ1IjoiYmFpYmhhdm1hbmRhbCIsImEiOiJjbHpzOTdzcDUxaTB1MmlzMzJtbTd4dXRrIn0.QOV93DhZZWyFrlE_guYm4w";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [88.16495, 26.60617],
});

async function getStores() {
  const res = await fetch("http://localhost:5000/api/v1/stores");
  const data = await res.json();

  const stores = data.data.map((store) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1],
        ],
      },
      properties: {
        storeId: store.storeId,
      },
    };
  });

  loadMap(stores);
}

function loadMap(stores) {
  map.on("load", () => {
    // Add an image to use as a custom marker
    map.loadImage("../pin.png", (error, image) => {
      if (error) throw error;
      map.addImage("custom-marker", image);
      // Add a GeoJSON source (stores)
      map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores,
        },
      });

      // Add a symbol layer
      map.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "icon-image": "custom-marker",
          // get the storeId name from the source's "storeId" property
          "text-field": ["get", "storeId"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 1.25],
          "text-anchor": "top",
          "icon-size": 0.1,
        },
      });
    });
  });
}

getStores();
