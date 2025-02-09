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
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100vh", border: "2px solid black" }}
    />
  );
};

export default OpenLayersMap;