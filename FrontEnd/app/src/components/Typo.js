import React from "react";

import PropTypes from "prop-types";

/** Some styled text area */
export const Title = ({ text, className }) => (
  <p className={`title ${className}`}>{text}</p>
);




Title.propTypes = {
  /** The text to be displayed */
  text: PropTypes.string,
  /** The style class name of the component */
  className: PropTypes.string,
};


