import React from "react";
import "../styles/UserRanking.css";
import PropTypes from "prop-types";


/**
 * this components display the information about a user
 * @param ranking
 * @param userName
 * @param level
 * @param score
 * @param bold if true the text of the component is bold
 * @param special if true the component only return ...
 * @returns {JSX.Element}
 */
export default function UserRanking({ranking, userName, level, score, bold = false, special = false}) {
    return (<div className={`${bold && 'text-bold'} userRanking`}>
        {
            !special ?
                <div className="userRanking-flex">
                    <span className="userRanking-user"><span>{ranking}
                    </span>
                        <hr className="userRanking-user-hr"/>
                        <span>{userName}</span>
                    </span>
                    <span className="userRanking-level">{level}</span>
                    <span className="userRanking-score">{score}</span>

                </div> :
                <div className="userRanking-flex">
                    <span>...</span>
                </div>
        }
        <hr className={`${bold && 'userRanking-hr-special'} userRanking-hr`}/>

    </div>)
}

UserRanking.propTypes = {
    /** A text displayed in the component */
    ranking: PropTypes.string,
    /** The name displayed */
    userName: PropTypes.string,
    /** The level of the user */
    level: PropTypes.string,
    /** The score of the user */
    score: PropTypes.string,
    /** A boolean which indicated wether the text is bold or not */
    bold: PropTypes.bool,
    /** A boolean which indicated wether the text is special or not  */
    special: PropTypes.bool,
};
