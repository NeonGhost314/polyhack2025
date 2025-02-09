"use client";
import { useEffect, useRef, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import { Vector as VectorSource } from "ol/source";
import { useMapInteractions } from "./Map/hooks/useMapInteractions";
import { createMapLayers, initialMapControls } from "./Map/utils/mapConfig";
import Compass from "./Map/controls/Compass";
import Legend from "./Map/controls/Legend";
import Toolbar from "./Map/controls/Toolbar";
import Menu from "./Map/controls/Menu";
import "ol/ol.css";

interface MapState {
  isMarkerMode: boolean;
  menuOpen: boolean;
  rotation: number;
}

const OpenLayersMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const vectorSourceRef = useRef(new VectorSource());
  const radiusSourceRef = useRef(new VectorSource());
  
  const [mapState, setMapState] = useState<MapState>({
    isMarkerMode: false,
    menuOpen: false,
    rotation: 0,
  });

  const updateMapState = (updates: Partial<MapState>) => {
    setMapState(prev => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const mapInstance = new Map({
      target: mapRef.current,
      layers: createMapLayers(vectorSourceRef.current, radiusSourceRef.current),
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
        rotation: mapState.rotation,
      }),
      controls: initialMapControls(),
    });

    mapInstance.getView().on("change:rotation", () => {
      updateMapState({ rotation: mapInstance.getView().getRotation() });
    });

    setMap(mapInstance);

    return () => {
      mapInstance.setTarget(undefined);
    };
  }, []);

  useMapInteractions({
    map,
    isMarkerMode: mapState.isMarkerMode,
    vectorSource: vectorSourceRef.current,
    radiusSource: radiusSourceRef.current,
  });

  return (
    <div className="relative w-full h-screen">
      <div
        ref={mapRef}
        className="w-full h-full border-2 border-black"
      />
      <Compass rotation={mapState.rotation} />
      <Legend />
      <Toolbar 
        isMarkerMode={mapState.isMarkerMode} 
        toggleMarkerMode={() => updateMapState({ isMarkerMode: !mapState.isMarkerMode })}
      />
      <Menu 
        isOpen={mapState.menuOpen} 
        onToggle={(open) => updateMapState({ menuOpen: open })}
      />
    </div>
  );
};

export default OpenLayersMap;