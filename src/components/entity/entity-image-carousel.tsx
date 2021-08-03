import "./entity-image-carousel.scss";

// React Router
import { useLocation } from "react-router-dom";

// React Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// Typescript DataProps type
import { DataProps } from "../layout/layout-grid";

type ImageCarouselProps = {} & DataProps;

const ImageCarousel = ({ selectedData }: ImageCarouselProps) => {
  let url = useLocation();

  // posts with multiples images end in _1, _2, _3, etc..
  const genPhotoURL = () => {
    let imgSrc = `${url.pathname}/${selectedData!.photo}.jpg`;
    return selectedData!.numPhotos > 1
      ? imgSrc.replace(".jpg", "_1.jpg")
      : imgSrc;
  };

  return (
    <div className="entity-image-carousel">
      <Carousel showThumbs={false} showArrows={true} emulateTouch={true}>
        {new Array(selectedData!.numPhotos).fill(0).map((i, idx) => (
          <div className="carousel-content-container" key={idx}>
            <img src={genPhotoURL()} />
            <span className="legend">{selectedData!.caption}</span>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
