import React, {useState} from 'react'
import '../styles/styleScreens/ResultStyle.css'
import {Spinner} from "../components/Spinner";
import Image from "../components/Image";
import {Redirect} from "react-router-dom";
import {Title} from "../components/Typo";
import Button from "../components/Button";
import {RESULT_TITLE, TEXT_BAD_RESULT, TEXT_AVERAGE_RESULT, TEXT_GOOD_RESULT, BUTTON_TEST} from "../helper/ResultConst";
import {Link} from 'react-router-dom';

/**
 *
 * @param results result has an element resultLastTest that contains the information useful for this page
 * @returns {JSX.Element}
 * @constructor
 */
const ResultScreen = ({results}) => {

    //function to check if the user succeed the test
    const testTrue = (test) => {
        return (test.userGuess && test.image.version === 0) || (!test.userGuess && test.image.version !== 0)
    }
    //function that calculate the score
    const calculateScore = () => {
        let score = 0;
        results.resultLastTest.forEach((value) => {
            if (testTrue(value)) {
                score = 1 + score;
            }
        })
        return score
    }

    return (
        <div>

            {
                !results.loading ? results.resultLastTest ?

                    <div className="result-container">
                        <Title className="img-result-title" text={RESULT_TITLE}/>
                        <div className="result-sub-container">
                            <div className="result-score-container">

                                <div
                                    className=" title img-result-title">{`${calculateScore()}/${results.resultLastTest.length}`}</div>
                                <div className="img-result-text width-screen-500">
                                    {calculateScore() < 5 ? TEXT_BAD_RESULT :
                                        calculateScore() < 7 ?
                                            TEXT_AVERAGE_RESULT : TEXT_GOOD_RESULT}
                                </div>
                                <Link to={"/test"}>
                                    <Button
                                        className="but btn-blue img-result-btn"
                                        text={BUTTON_TEST}

                                    />
                                </Link>

                            </div>
                            <div className="img-result-container">
                                {results.resultLastTest.map((item, index) => <div key={index}>
                                    <Image

                                        classNameImg="img-thumb"
                                        classNameDot={`${testTrue(item) ? 'green' : 'red'}`}
                                        url={"http://localhost:8000" + item.image.image}/></div>)}
                            </div>
                        </div>
                    </div> : <Redirect to={"test"}/> : <Spinner/>
            }
        </div>
    )
}

export default ResultScreen
