import React from 'react';
import '../styles/UserRanking.css'
import ResultBar from "./ResultBar";
import Button from "./Button";
import {AI_IMAGE, STAT_BUTTON_TEST, REAL_IMAGE, USER_RESULT_TITLE} from "../helper/StatConst";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

/**
 * this component is really similar to AIResults but it display just of the user test
 * if the user has no test result we display a button that redirect the user to the test
 * @param resultDisplay
 * @param user
 * @returns {JSX.Element}
 */
export default function UserResults({resultDisplay, user}) {


    return (
        <div>
            {user && resultDisplay.score[1].includes(user.id.toString()) ?
                <div>
                    <h1 className="title-userResult">{USER_RESULT_TITLE}</h1>
                    <div className="AIResult">
                        {
                            Object.keys(resultDisplay.user).map((value, index) =>
                                <div className="AIResult-div" key={index}>
                                    <h2>{value}</h2>
                                    <h3>{AI_IMAGE}</h3>
                                    <ResultBar score={resultDisplay.user[value][1]}/>
                                    <h3>{REAL_IMAGE}</h3>
                                    <ResultBar score={resultDisplay.user[value][0]}/>

                                </div>
                            )
                        }

                    </div>
                    }
                </div> :

                <div className="stat-btn">

                    <Link to="/test">
                        <Button className="but btn-blue" text={STAT_BUTTON_TEST}/>
                    </Link>
                </div>}

        </div>
    );
}

UserResults.propTypes = {
    /** The score to be displayed*/
    resultDisplay: PropTypes.object,
    /** An object which contains attributes such as 'id' or 'level' */
    user: PropTypes.object,
};
