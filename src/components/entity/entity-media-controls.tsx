import "./entity-media-controls.scss";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

// Typescript DataProps type
import { DataProps } from "../../app/resiumig/app-resiumig";

type MediaControlsProps = {} & DataProps;

const MediaControls = ({
  data,
  selectedData,
  setSelectedData,
}: MediaControlsProps) => {
  return (
    <div className="entity-media-controls">
      <FontAwesomeIcon icon={faStepBackward} onClick={() => {}} />
      <FontAwesomeIcon icon={faPlay} onClick={() => {}} />
      <FontAwesomeIcon icon={faStepForward} onClick={() => {}} />
    </div>
  );
};

export default MediaControls;
