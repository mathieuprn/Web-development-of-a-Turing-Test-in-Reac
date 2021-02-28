import React from "react";
import "../styles/Image.css";
import PropTypes from "prop-types";


/**
 * this component display an image with a border + can display a round/dot
 *
 * @param url url of this image
 * @param classNameDot used to defined the color of the dot /round
 * @param classNameDiv  used to defined the style css of the div
 * @param classNameImg  used to defined the style css of the img
 * @returns {JSX.Element}
 * @constructor
 */
export default function Image({
                                  url,
                                  classNameDot,
                                  classNameDiv,
                                  classNameImg,
                              }) {
    return (
        <div className={`img-div ${classNameDiv}`}>
            <span className={`dot ${classNameDot}`}></span>
            <img className={`img ${classNameImg}`} alt="" src={url}/>
        </div>
    );
}

Image.propTypes = {
    /** The url of the image */
    url: PropTypes.string,
    /** The style class name of the span */
    classNameDot: PropTypes.string,
    /** The style class name of the div */
    classNameDiv: PropTypes.string,
    /** The style class name of the image */
    classNameImg: PropTypes.string,
};
