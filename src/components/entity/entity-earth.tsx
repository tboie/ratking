import "./entity-earth.scss";

/* START README

1) Create a craco.config.js in root
2) Add the following to it:

module.exports = {
  plugins: [
    {
      plugin: require("craco-cesium")(),
    },
  ],
};

3) in package.json, use craco for scripts. 
  ex)
    "scripts": {
      "start": "craco start",
      "build": "craco build",
      "test": "craco test",
      "eject": "react-scripts eject"
    }

END README */

import {
  Viewer,
  Scene,
  Entity,
  ImageryLayer,
  CameraFlyTo,
  CesiumComponentRef,
} from "resium";

import {
  Color,
  Cartesian3,
  EasingFunction,
  IonImageryProvider,
  Viewer as CesiumViewer,
} from "cesium";

import { useRef } from "react";

import Volcanos from "../../../public/data/volcano_db.json";

const Earth = () => {
  const ref = useRef<CesiumComponentRef<CesiumViewer>>(null);

  const cameraFly = () => {
    if (ref.current?.cesiumElement) {
      const volcano = Volcanos[Math.floor(Math.random() * Volcanos.length)];

      ref.current?.cesiumElement.camera.flyTo({
        destination: Cartesian3.fromDegrees(
          volcano.Longitude,
          volcano.Latitude,
          100
        ),
        duration: 10,
        complete: cameraFly,
        maximumHeight: 99999000,
        easingFunction: EasingFunction.QUARTIC_IN_OUT,
      });
    }
  };

  return (
    <Viewer
      full
      ref={ref}
      skyBox={false}
      infoBox={false}
      fullscreenButton={false}
      baseLayerPicker={false}
      contextOptions={{ webgl: { alpha: true } }}
    >
      <Scene backgroundColor={Color.TRANSPARENT} />

      <ImageryLayer
        imageryProvider={new IonImageryProvider({ assetId: 3812 })}
        alpha={0.5}
        brightness={2.0}
      />

      <CameraFlyTo
        destination={Cartesian3.fromDegrees(139.767052, 35.681167, 100)}
        duration={10}
        onComplete={() => {
          cameraFly();
        }}
      />

      {Volcanos.map((p, idx) => (
        <Entity
          key={idx}
          point={{ pixelSize: 10 }}
          position={Cartesian3.fromDegrees(p.Longitude, p.Latitude, 100)}
        />
      ))}
    </Viewer>
  );
};

export default Earth;
