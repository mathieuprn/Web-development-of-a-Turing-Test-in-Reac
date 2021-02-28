import React from "react";
import "../styles/Button.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faQuestionCircle, faTimesCircle, faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";


/**
 * this component is just a second version of Button used for display a button with an icon in the test page
 */
export default function ButtonIcon({handleClick, handleMouseEnter = null, handleMouseLeave = null, className, isDisabled = false, iconQuestion, testPage = true, left, size}) {
    return (
        <button
            className={className}
            disabled={isDisabled}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            {testPage ?
                <div>

                    {iconQuestion ?
                        <FontAwesomeIcon icon={faQuestionCircle} size='2x'/>
                        :
                        <FontAwesomeIcon icon={faTimesCircle} size='2x'/>
                    }
                </div>
                :
                <div>

                    {left ?
                        <FontAwesomeIcon icon={faChevronLeft} size={size}/> :
                        <FontAwesomeIcon icon={faChevronRight} size={size}/>

                    }
                </div>
            }
        </button>
    )
}

ButtonIcon.propTypes = {
    /** Function called when a button is pressed */
    handleClick: PropTypes.func,
    /** Function called when the mouse enters the button */
    handleMouseEnter: PropTypes.func,
    /** Function called when the mouse leaves the button */
    handleMouseLeave: PropTypes.func,
    /** The style class name of the button */
    className: PropTypes.string,
    /** A boolean which indicates wether the button is disabled of not */
    isDisabled: PropTypes.bool,
    /** A boolean which indicates wether the button should show a question mark or a times symbol */
    iconQuestion: PropTypes.bool,
};
