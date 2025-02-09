"use client";

import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Point, Circle } from "ol/geom";
import { Feature } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon, Fill, Stroke } from "ol/style";
import { defaults as defaultControls, Zoom } from "ol/control";
import Graticule from "ol/layer/Graticule"; // Import the Graticule layer
import { ScaleLine } from "ol/control";

import "ol/ol.css";

const OpenLayersMap = () => {
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(new VectorSource()); // Source for marker features
  const radiusSourceRef = useRef(new VectorSource()); // Source for radius feature
  const [rotation, setRotation] = useState(0); // State to track map rotation

  useEffect(() => {
    if (!mapRef.current) return;

    // Create custom zoom controls positioned at the bottom-right
    const zoomControls = new Zoom({
      className: "ol-zoom-bottom-right", // Custom class for styling
    });

    const scaleLineControl = new ScaleLine({
      units: "metric", // Display in meters/kilometers
      bar: true, // Show a bar scale
      steps: 4, // Number of bar divisions
      text: true, // Show text labels
      minWidth: 100, // Minimum width of the scale bar
      //className: "custom-scale-line", // Custom class for styling
    });

    // Create the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSourceRef.current, // Add the vector source for markers
        }),
        new VectorLayer({
          source: radiusSourceRef.current, // Add the vector source for the radius
        }),
        new Graticule({
          // Add the Graticule layer for the grid
          strokeStyle: new Stroke({
            color: "rgba(0, 0, 0, 0.2)", // Light gray grid lines
            width: 1, // Line width
          }),
          showLabels: true, // Show labels for meridians and parallels
          intervals: [10], // Interval between grid lines (in degrees)
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]), // Convert lon/lat to EPSG:3857
        zoom: 2,
        rotation: rotation, // Set initial rotation
      }),
      controls: defaultControls({ attribution: false , zoom: false }).extend([zoomControls,scaleLineControl]), // Use custom zoom controls
    });


  map.addControl(scaleLineControl);

    // Listen for map rotation changes
    map.getView().on("change:rotation", () => {
      setRotation(map.getView().getRotation()); // Update rotation state
    });

    // Add click event listener to the map
    map.on("click", (event) => {
      const coordinate = event.coordinate; // Get the clicked coordinate

      // Create a new feature with a Point geometry
      const marker = new Feature({
        geometry: new Point(coordinate),
      });

      // Style the marker
      marker.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png", // URL to a marker icon
            scale: 0.5, // Adjust the size of the icon
          }),
        })
      );

      // Add the marker to the vector source
      vectorSourceRef.current.addFeature(marker);
    });

    // Add hover effect to markers
    map.on("pointermove", (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);

      // Clear the radius source if no feature is hovered
      if (!feature) {
        radiusSourceRef.current.clear();
        return;
      }

      // Check if the feature has a geometry
      const geometry = feature.getGeometry();
      if (!geometry) {
        radiusSourceRef.current.clear();
        return;
      }

      // Check if the geometry is a Point
      if (geometry.getType() !== "Point") {
        radiusSourceRef.current.clear();
        return;
      }

      // Get the coordinates of the hovered feature
      const coordinates = geometry.getCoordinates();

      // Create a circle geometry around the coordinates
      const radiusFeature = new Feature({
        geometry: new Circle(coordinates, 100000), // Radius in meters (100 km)
      });

      // Style the radius
      radiusFeature.setStyle(
        new Style({
          fill: new Fill({
            color: "rgba(255, 0, 0, 0.2)", // Semi-transparent red
          }),
          stroke: new Stroke({
            color: "rgba(255, 0, 0, 0.8)", // Solid red border
            width: 2,
          }),
        })
      );

      // Add the radius feature to the radius source
      radiusSourceRef.current.clear();
      radiusSourceRef.current.addFeature(radiusFeature);
    });

    // Cleanup on unmount
    return () => map.setTarget(undefined);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Map Container */}
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%", border: "2px solid black" }}
      />

      {/* Compass Container */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "50%",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          zIndex: 1, // Ensure the compass is above the map
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            transform: `rotate(${rotation}rad)`, // Rotate the compass based on map rotation
            transition: "transform 0.2s ease", // Smooth rotation animation
          }}
        >
          {/* Compass Icon (You can replace this with an SVG or custom icon) */}
          <img
            src="https://cdn.discordapp.com/attachments/555884477809819648/1338006769246404721/1075485_compass_destination_east_north_south_icon.svg?ex=67a98368&is=67a831e8&hm=a0b9450e5bcc412e4f950f872b07d5a0c83e2f874d1208e8884943dda70e900c&" // Replace with your compass icon
            alt="Compass"
            style={{ width: "70px", height: "70px" }}
          />
        </div>
      </div>

      {/* Legend Container */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          zIndex: 1, // Ensure the legend is above the map
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" ,color: "black"}}>Legend</h3>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
          <img
            src="https://openlayers.org/en/latest/examples/data/icon.png"
            alt="Marker Icon"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
          />
          <span style={{color: "black"}}>Marker </span>
        </div>
        {/* Add more legend items as needed */}
      </div>
    </div>
  );
};

export default OpenLayersMap;