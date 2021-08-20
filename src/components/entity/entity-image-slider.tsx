import "./entity-image-slider.scss";

// React
import { useEffect, useRef } from "react";

// React Router
import { useLocation } from "react-router-dom";

// Image Slider React Component
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

// Typescript DataProps type
import { DataProps } from "../layout/layout-grid";

type ImageSliderProps = {} & DataProps;

const ImageSlider = ({
  data,
  selectedData,
  setSelectedData,
}: ImageSliderProps) => {
  let url = useLocation();
  let imgRefs = useRef<HTMLImageElement[]>([]);
  let cancelClick = false;

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slidesPerView: 10,
    mode: "free-snap",
    spacing: 10,
    loop: false,
    centered: true,
    afterChange: (slider) =>
      setSelectedData && setSelectedData(data[slider.details().relativeSlide]),
    breakpoints: {
      "(min-width: 0px)": {
        slidesPerView: 5,
        mode: "free-snap",
      },
      "(min-width: 481px)": {
        slidesPerView: 7,
        mode: "free-snap",
      },
      "(min-width: 769px)": {
        slidesPerView: 10,
        mode: "free-snap",
      },
    },
  });

  useEffect(() => {
    slider?.moveToSlide(selectedData!.idx);
  }, [selectedData!.idx]);

  const genPhotoURL = (d: any) =>
    `${url.pathname}/${d.photo}${d.numPhotos > 1 ? "_1" : ""}.jpg`;

  return (
    <div className="entity-image-slider" ref={sliderRef}>
      <span className="image-slider-line-center left" />
      <span className="image-slider-line-center right" />

      {data.map((d, idx) => (
        <div
          key={idx}
          className={`keen-slider__slide ${
            selectedData!.idx === idx ? "selected" : ""
          }`}
          onClick={() => !cancelClick && setSelectedData && setSelectedData(d)}
          onMouseDown={() => (cancelClick = false)}
          onMouseLeave={() => (cancelClick = true)}
        >
          <span className={`date`}>{d.photo.split("_")[0] || ""}</span>
          <img
            ref={(ele) => ele && imgRefs.current.push(ele)}
            src={genPhotoURL(d)}
            alt={""}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
