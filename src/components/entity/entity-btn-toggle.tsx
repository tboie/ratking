// SCSS
import "./entity-btn-toggle.scss";

// Font Awesome Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type BtnToggleProps = {
  text: string;
  on: boolean;
  icon?: IconDefinition;
  click?: () => void;
};

const BtnToggle = ({ text, icon, on, click }: BtnToggleProps) => (
  <button
    className={`entity-btn-toggle ${on ? "on" : ""}`}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      click && click();
    }}
  >
    {text}
    {icon && <FontAwesomeIcon icon={icon} />}
  </button>
);

export default BtnToggle;
