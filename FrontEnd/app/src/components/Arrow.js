import React from "react";
import "../styles/Button.css";
import PropTypes from "prop-types";

/** A button-arrow, used to change the element displayed in a displayer */
export default function Arrow({
  handleClick,
  handleMouseEnter = null,
  handleMouseLeave = null,
  className,
  img,
  isDisabled = false,
  text,
}) {
  return (
    <button
      className={className}
      disabled={isDisabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {img}
      {text}
    </button>
  );
}

Arrow.propTypes = {
  /** The function called when the arrow is clicked */
  handleClick: PropTypes.func,
  /** The function called when the mouse enters the arrow */
  handleMouseEnter: PropTypes.func,
  /** The function called when the mouse leaves the arrow */
  handleMouseLeave: PropTypes.func,
  /** The style class name of the arrow */
  className: PropTypes.string,
  /** The image displayed on the button (which represents an arrow) */
  img: PropTypes.object,
  /** Boolean which indicates wether the arrow is activated */
  isDisabled: PropTypes.bool,
  /** The text displayed on the arrow button */
  text: PropTypes.string,
};
