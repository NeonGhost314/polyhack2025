"use client";

import { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

const OpenLayersMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0], // Coordinates in EPSG:3857
        zoom: 2,
      }),
    });

    return () => map.setTarget(undefined); // Cleanup on unmount
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100vh", border: "2px solid black" }}
    />
  );
};

export default OpenLayersMap;