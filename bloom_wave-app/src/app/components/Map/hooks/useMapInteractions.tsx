import { useEffect, useCallback } from 'react';
import { Feature, Map } from 'ol';
import { Point, Circle } from 'ol/geom';
import { Vector as VectorSource } from 'ol/source';
import { createMarkerStyle, createRadiusStyle } from '../utils/mapConfig';
import Signal from '../../Signal'
interface MapInteractionsProps {
  map: Map | null;
  isMarkerMode: boolean;
  vectorSource: VectorSource;
  radiusSource: VectorSource;
}

export const useMapInteractions = ({
  map,
  isMarkerMode,
  vectorSource,
  radiusSource,
}: MapInteractionsProps) => {
  const handleFeatureHover = useCallback((feature: Feature, radiusSource: VectorSource) => {
    const geometry = feature.getGeometry();
    if (!geometry || geometry.getType() !== "Point") {
      radiusSource.clear();
      return;
    }

    const coordinates = geometry.getCoordinates();
    const radiusFeature = new Feature({
      geometry: new Circle(coordinates, 1000),
    });
    radiusFeature.setStyle(createRadiusStyle());
    radiusSource.clear();
    radiusSource.addFeature(radiusFeature);
  }, []);

  const addMarker = useCallback((coordinate: number[], vectorSource: VectorSource) => {
    const marker = new Feature({
      geometry: new Point(coordinate),
    });
    marker.setStyle(createMarkerStyle());
    vectorSource.addFeature(marker);
  }, []);

  useEffect(() => {
    if (!map) return;

    const handlePointerMove = (event: any) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      const targetElement = map.getTargetElement();

      if (isMarkerMode) {
        targetElement.style.cursor = "crosshair";
        return;
      }

      if (event.dragging) {
        targetElement.style.cursor = "grabbing";
        return;
      }

      if (!feature) {
        targetElement.style.cursor = "grab";
        radiusSource.clear();
        return;
      }

      targetElement.style.cursor = "pointer";
      handleFeatureHover(feature as Feature, radiusSource);
    };

    const handleClick = (event: any) => {
      if (isMarkerMode) {
        addMarker(event.coordinate, vectorSource);
        const coordinates = event.coordinate;  // Get coordinates from map click
         const type = "pollution";              // This could be dynamic based on user input or map context
          const description = "Pollution detected in this location"; // Custom message
        console.log(coordinates);
        const signal = new Signal(coordinates, type, description);
        console.log(signal.sendToServer());  // Send the signal to the backend
      }
    };

    map.on('pointermove', handlePointerMove);
    map.on('click', handleClick);

    return () => {
      map.un('pointermove', handlePointerMove);
      map.un('click', handleClick);
    };
  }, [map, isMarkerMode, handleFeatureHover, addMarker]);
};