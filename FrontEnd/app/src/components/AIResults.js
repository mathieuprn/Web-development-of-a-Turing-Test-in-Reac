import React from 'react';
import '../styles/UserRanking.css'
import ResultBar from "./ResultBar";
import PropTypes from "prop-types";
import {AI_IMAGE, AI_RESULT_TITLE, REAL_IMAGE} from "../helper/StatConst";

/**
 *this component is displayed for AI result in the stat screen. For each type of image it compare the results of real and ia images
 * @param resultDisplay a Object with a key type (the only used here) the value for resultDisplay.type is a dict of this form {imageType:[score for real image, score for IA image]}
 * @returns {JSX.Element}
 */
const AIResults = ({resultDisplay}) => {
    return (
        <div className="AIResult">
            <h1 className="title-userResult">{AI_RESULT_TITLE}</h1>
            {
                Object.keys(resultDisplay.type).map((value, index) =>
                    <div className="AIResult-div" key={index}>
                        <h2>{value}</h2>
                        <h3>{AI_IMAGE}</h3>
                        <ResultBar score={resultDisplay.type[value][1]}/>
                        <h3>{REAL_IMAGE}</h3>
                        <ResultBar score={resultDisplay.type[value][0]}/>

                    </div>
                )
            }
        </div>)
}
export default AIResults
AIResults.propTypes = {
    /** The Score to be displayed. */
    resultDisplay: PropTypes.object.isRequired,
}
