import React from "react";
import "../styles/Button.css";
import PropTypes from "prop-types";


/**
 ** @author amaury
 * component of button
 * @param handleClick handle click
 * @param handleMouseEnter to manage hover effect
 * @param handleMouseLeave to manage hover effect
 * @param className for the css style
 * @param text displayed text
 * @param isDisabled handle if the button is able
 * @returns {JSX.Element}
 * @constructor
 */
export default function Button({
                                   handleClick,
                                   handleMouseEnter = null,
                                   handleMouseLeave = null,
                                   className,
                                   text,
                                   isDisabled = false,
                               }) {
    return (
        <button
            className={className}
            disabled={isDisabled}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {text}
        </button>
    );

}

Button.propTypes = {
    /** Function called after a click on the button*/
    handleClick: PropTypes.func,
    /** Function called when the mouse of the user enters the button*/
    handleMouseEnter: PropTypes.func,
    /** Function called when the mouse of the user leaves the button*/
    handleMouseLeave: PropTypes.func,
    /** Style class name of the button */
    className: PropTypes.string,
    /** The text displayed on the button*/
    text: PropTypes.string,
    /** A boolean indicating wether the button is disabled*/
    isDisabled: PropTypes.bool,
};
