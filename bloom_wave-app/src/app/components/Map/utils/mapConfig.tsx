import { Style, Icon, Fill, Stroke } from "ol/style";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Vector as VectorLayer } from "ol/layer";
import Graticule from "ol/layer/Graticule";
import { defaults as defaultControls, Zoom, ScaleLine } from "ol/control";

import VectorSource from "ol/source/Vector";

export const createMapLayers = (vectorSource: VectorSource, radiusSource: VectorSource) => [
    new TileLayer({ source: new OSM() }),
    new VectorLayer({ source: vectorSource }),
    new VectorLayer({ source: radiusSource }),
    new Graticule({
        strokeStyle: new Stroke({
            color: "rgba(0, 0, 0, 0.2)",
            width: 1,
        }),
        showLabels: true,
        intervals: [1000 / 111000],
    }),
];

export const createMarkerStyle = () =>
    new Style({
        image: new Icon({
            src: "/fish.png",
            scale: 0.01,
        }),
    });

export const createRadiusStyle = () =>
    new Style({
        fill: new Fill({
            color: "rgba(255, 0, 0, 0.2)",
        }),
        stroke: new Stroke({
            color: "rgba(255, 0, 0, 0.8)",
            width: 2,
        }),
    });

export const initialMapControls = () => {
    const zoomControls = new Zoom({
        className: "ol-zoom-bottom-right",
    });

    const scaleLineControl = new ScaleLine({
        units: "metric",
        bar: true,
        steps: 4,
        text: true,
        minWidth: 100,
    });

    return defaultControls({ attribution: false, zoom: false }).extend([
        zoomControls,
        scaleLineControl,
    ]);
};
