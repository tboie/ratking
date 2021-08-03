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

// CSS
import "./entity-earth.scss";

// React
import { RefObject } from "react";

// Typescript DataProps type
import { DataProps } from "../layout/layout-grid";

import {
  Viewer,
  Scene,
  Entity,
  ImageryLayer,
  CesiumComponentRef,
  PolylineGraphics,
} from "resium";

import {
  PolylineDashMaterialProperty,
  Color,
  Cartesian3,
  createWorldImagery,
  IonWorldImageryStyle,
  Ion,
  Viewer as CesiumViewer,
} from "cesium";

// Cesium API Key
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyOGQ2ODQ0NS0wMDI3LTRjZjYtODkwMi03OTFhZDdkZTI0MTMiLCJpZCI6NTE2ODMsImlhdCI6MTYxODI1OTI4Mn0.D8EmfzgisLREfPbsHUIR4fki2k8Wa_PZQNG7xA22LHg";

type EarthProps = {
  forwardedRef: RefObject<CesiumComponentRef<CesiumViewer>> | null;
} & DataProps;

const Earth = ({ data, forwardedRef, setSelectedData }: EarthProps) => {
  return (
    <Viewer
      full
      ref={forwardedRef}
      // Options for full screen and transparent BG
      skyBox={false}
      infoBox={false}
      fullscreenButton={false}
      baseLayerPicker={false}
      contextOptions={{ webgl: { alpha: true } }}
    >
      <Scene backgroundColor={Color.TRANSPARENT} />

      {/* globe skin */}
      <ImageryLayer
        imageryProvider={createWorldImagery({
          style: IonWorldImageryStyle.AERIAL_WITH_LABELS,
        })}
      />

      {
        // TODO: deal with objects missing lng and lat.
        // IDEA: use "directory" property "country, city" vals in instagram place json
        //       in combo with google geocode service to fill missing coordinates in data
        data.length &&
          data
            .filter((l) => l.lng && l.lat)
            .map((loc, idx: number) => (
              <Entity
                key={idx}
                point={{ pixelSize: 16, color: Color.CYAN }}
                position={Cartesian3.fromDegrees(loc.lng, loc.lat, 100)}
                onClick={(moment, entity) =>
                  setSelectedData && setSelectedData(loc)
                }
                onMouseEnter={() => (document.body.style.cursor = "pointer")}
                onMouseLeave={() => (document.body.style.cursor = "auto")}
              >
                {/*
                <LabelGraphics
                  text={loc.name}
                  font="20px Arial"
                  fillColor={Color.CYAN}
                  outlineColor={Color.BLACK}
                  outlineWidth={1}
                  style={LabelStyle.FILL_AND_OUTLINE}
                  pixelOffset={Cartesian2.fromArray([0, 0])}
              />*/}
                {idx > 0 && data[idx - 1]?.lng && data[idx - 1].lat ? (
                  <PolylineGraphics
                    width={4}
                    positions={[
                      Cartesian3.fromDegrees(loc.lng, loc.lat, 100),
                      Cartesian3.fromDegrees(
                        data[idx - 1].lng,
                        data[idx - 1].lat,
                        100
                      ),
                    ]}
                    material={
                      new PolylineDashMaterialProperty({ color: Color.CYAN })
                    }
                  />
                ) : null}
              </Entity>
            ))
      }
    </Viewer>
  );
};

export default Earth;
