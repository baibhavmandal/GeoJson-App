import NodeGeocoder from "node-geocoder";
import dotenv from "dotenv";

// Load environment variables from config.env
dotenv.config({ path: "../config/config.env" });

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "bjjkBvB5iAnEe1p6IOMLfMXb1Dk1lvKv",
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder;
