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
import Compass from "./Compass";
import Legend from "./Legend";
import Toolbar from "./Toolbar";
import Menu from "./controls/Menu";



const OpenLayersMap = () => {
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(new VectorSource()); // Source for marker features
  const radiusSourceRef = useRef(new VectorSource()); // Source for radius feature
  const [menuOpen, setMenuOpen] = useState(false);
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
          intervals: [1000/111000], // Interval between grid lines (in degrees)
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]), // Convert lon/lat to EPSG:3857
        zoom: 2,
        rotation: rotation, // Set initial rotation
      }),
      controls: defaultControls({ attribution: false, zoom: false }).extend([
        zoomControls,
        scaleLineControl,
      ]), // Use custom zoom controls
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
        geometry: new Circle(coordinates, 1000), // Radius in meters (100 km)
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

      <Compass />
      <Legend />
      <Toolbar isMarkerMode={undefined} toggleMarkerMode={undefined} />
      <Menu menuOpen={false} setMenuOpen={function (open: boolean): void {
        throw new Error("Function not implemented.");
      } } />
      </div>

  );
};

export default OpenLayersMap;