import React from "react";
import "../styles/UserRanking.css";
import UserRanking from "./UserRanking";
import PropTypes from "prop-types";


/**
 * component that display the ranking of the user
 * it shows the first 5 and the last one if the user connected is not last and not in the first 5 he is also showed
 * @param resultDisplay a dict of this form : {... score:[{idUser:{name,score,level}},[idUser1, idUser2....]]} the first element of the array score contains the information about each user the second one is the ranking
 * @param user the information of the connected user can be null
 * @returns {JSX.Element}
 */






export default function Ranking({resultDisplay, user}) {
    return (
        <div>
            <div>
                <UserRanking
                    ranking="Rank"
                    userName="Name"
                    level="Level"
                    score="Score"
                    bold={true}
                />
                {resultDisplay.score[1].map((item, index) => (
                    <div key={index}>{
                        index < 5 ?
                            <UserRanking
                                ranking={index + 1}
                                userName={resultDisplay.score[0][item]['name']}
                                score={resultDisplay.score[0][item]['score']}
                                level={resultDisplay.score[0][item]['level']}
                                bold={user && item === user.id.toString()}
                            /> : null
                    }
                    </div>))}
                {user && resultDisplay.score[1].indexOf(user.id.toString()) > 4 &&
                <div>
                    {user && resultDisplay.score[1].indexOf(user.id.toString()) > 5
                    && <UserRanking special={true}/>
                    }
                    <UserRanking
                        ranking={resultDisplay.score[1].length}
                        userName={
                            resultDisplay.score[0][
                                resultDisplay.score[1][resultDisplay.score[1].length - 1]
                                ]["name"]
                        }
                        score={
                            resultDisplay.score[0][
                                resultDisplay.score[1][resultDisplay.score[1].length - 1]
                                ]["score"]
                        }
                        level={
                            resultDisplay.score[0][
                                resultDisplay.score[1][resultDisplay.score[1].length - 1]
                                ]["level"]
                        }
                        bold={false}
                    />
                </div>}
                {
                    resultDisplay.score[1].length > 5 &&
                    resultDisplay.score[1].indexOf(user.id.toString()) + 1 !== resultDisplay.score[1].length &&
                    <div>
                        {
                            resultDisplay.score[1].length > 6 &&
                            (user ? resultDisplay.score[1].indexOf(user.id.toString()) : true) !== resultDisplay.score[1].length &&
                            <UserRanking special={true}/>
                        }
                        <UserRanking
                            ranking={resultDisplay.score[1].length}
                            userName={resultDisplay.score[0][resultDisplay.score[1][resultDisplay.score[1].length - 1]]['name']}
                            score={resultDisplay.score[0][resultDisplay.score[1][resultDisplay.score[1].length - 1]]['score']}
                            level={resultDisplay.score[0][resultDisplay.score[1][resultDisplay.score[1].length - 1]]['level']}
                            bold={false}
                        />
                    </div>}
            </div>
        </div>
    )
}


Ranking.propTypes = {
    /** The score to be displayed */
    resultDisplay: PropTypes.object,
    /** An object which contains attributes such as 'id' or 'level' */
    user: PropTypes.object,
};
