// SCSS
import "./app-resiumig.scss";

// React
import { useEffect, useMemo, useRef, useState } from "react";

// Layout
import Layout from "../../components/layout/layout-grid";

// Components
import Earth from "../../components/entity/entity-earth";
import Stars from "../../components/entity/entity-stars";

// Cesium & Resium Imports
import { Viewer as CesiumViewer } from "cesium";
import { CesiumComponentRef } from "resium";
import Cartesian3 from "cesium/Source/Core/Cartesian3";
import { useParams } from "react-router-dom";

// Data Model Obj Type
export type Location = {
  idx: number;
  id: number;
  name: string;
  slug: string;
  lat: number;
  lng: number;
  photo: string;
  numPhotos: number;
  caption: string;
};

// Component Data Props Type
export type DataProps = {
  data: Location[]; // User data array
  selectedData?: Location; // Selected obj from user data
  setSelectedData: (val: Location) => void; // Earth HTML element (child ref)
};

// First Mount Flag
let firstLoad = true;

// Component
const ResiumIG = () => {
  let { user } = useParams<{ user: string }>();
  const [data, setData] = useState<Location[]>([]);
  const [selectedData, setSelectedData] = useState<Location>();
  const cesiumViewer = useRef<CesiumComponentRef<CesiumViewer>>(null);

  // Retrieve user data
  async function getData(url: string) {
    fetch(url)
      .then((resp) => resp.json())
      .then((d) => {
        // TODO: set data idx prop in python script
        // append idx property to location obj (move to python script)
        setData(
          d.locations.map((loc: Location, i: number) => {
            loc.idx = i;
            return loc;
          })
        );
        setSelectedData(d.locations[0]);
      });
  }

  // Get user data on mount if url includes user
  useEffect(() => {
    if (user) {
      getData(`${window.location.href}/filenames.json`);
    }
  }, []);

  // Selected data changed, fly to it
  useEffect(() => {
    const cesiumEle = cesiumViewer.current?.cesiumElement;
    const { lat, lng } = { ...selectedData };

    if (!firstLoad && selectedData && cesiumEle && lng && lat) {
      cesiumEle.camera.flyTo({
        destination: Cartesian3.fromDegrees(lng, lat, 1000),
        duration: 2,
        maximumHeight: 1000000,
      });
    }

    firstLoad && (firstLoad = false);
  }, [selectedData]);

  // Re-render earth when user data changes (user in url changed)
  const EarthComponent = useMemo(() => {
    return (
      <Earth
        data={data}
        setSelectedData={setSelectedData}
        forwardedRef={cesiumViewer}
      />
    );
  }, [data]);

  // Data props for widget components
  const p = {
    data: data,
    selectedData: selectedData,
    setSelectedData: setSelectedData,
  };

  return (
    <>
      <Stars />
      {data && selectedData && (
        <>
          {EarthComponent}
          <Layout {...p} />
        </>
      )}
    </>
  );
};

export default ResiumIG;
