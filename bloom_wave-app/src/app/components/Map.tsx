"use client";

import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import "ol/ol.css";

const OpenLayersMap = () => {
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(new VectorSource()); // Source for vector features

  useEffect(() => {
    if (!mapRef.current) return;

    // Create the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSourceRef.current, // Add the vector source to the map
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]), // Convert lon/lat to EPSG:3857
        zoom: 2,
      }),
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
        <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>Legend</h3>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
          <img
            src="https://openlayers.org/en/latest/examples/data/icon.png"
            alt="Marker Icon"
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
          />
          <span>Marker</span>
        </div>
        {/* Add more legend items as needed */}
      </div>
    </div>
  );
};

export default OpenLayersMap;