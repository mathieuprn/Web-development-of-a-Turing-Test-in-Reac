import React, {useState, useEffect} from 'react'
import '../styles/styleScreens/ResultStyle.css'
import '../styles/styleScreens/StatStyle.css'
import {useLocation} from 'react-router-dom'
import ButtonGroup from "../components/ButtonGroup";
import {STAT_LIST_TAB} from "../helper/StatConst";
import {resultByType, scoreByUser, userResult} from "../hooks/statFunctions";
import {Spinner} from "../components/Spinner";
import Ranking from "../components/Ranking";
import AIResults from "../components/AIResults";
import UserResults from "../components/UserResults";

/**
 *  Stat screen can display the ranking/ the ai result or the user result
 * @param results
 * @param fetchResults function that fetch the result with an api call and store this information in results
 * @param user connected user
 * @returns {JSX.Element}
 * @constructor
 */
const StatScreen = ({results, fetchResults, user}) => {
    const location = useLocation();
    const [resultDisplay, setResultDisplay] = useState({})
    const [tabDisplay, setTabDisplay] = useState(0)

    //fetch results at the api
    useEffect(() => {
        fetchResults()

    }, [location ])
    //set the state with processed results
    useEffect(() => {
        setResultDisplay({
                type: resultByType(results.requestResults, results.users, results.images),
                score: scoreByUser(results.requestResults, results.users, results.images),
                user: userResult(results.requestResults, results.users, results.images, user)
            })

    }, [results, tabDisplay])

    return (
        <div>

            {
                !results.loading ?
                    <div className="statScreen">
                        <div>
                            <ButtonGroup
                                classNameDiv={"handle-tab width-tab"}
                                classNameBtn={"but btn-tab"}
                                setTabNum={setTabDisplay}
                                numbTab={tabDisplay}
                                tabList={STAT_LIST_TAB}
                            />
                            {
                                tabDisplay === 0 && resultDisplay.score &&
                                <Ranking
                                    resultDisplay={resultDisplay}
                                    user={user}
                                />
                            }

                            {
                                tabDisplay === 1 && resultDisplay.type && Object.keys(resultDisplay.type).length > 0 &&
                                <AIResults
                                    resultDisplay={resultDisplay}
                                />
                            }
                            {
                                tabDisplay === 2 && resultDisplay.score && resultDisplay.user&&
                                <UserResults
                                    resultDisplay={resultDisplay}
                                    user={user}
                                />
                            }
                        </div>
                    </div>
                    :
                    <div className="statScreen-spinner">
                        <Spinner/>
                    </div>
            }
        </div>
    )

}

export default StatScreen
