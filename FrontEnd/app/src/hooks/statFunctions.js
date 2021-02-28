import {LEVEL_1, LEVEL_2, LEVEL_3} from "../helper/StatConst";

const level = (nb) => nb === 2 ? LEVEL_1 : nb === 1 ? LEVEL_2 : LEVEL_3
const score = (list) => {
    let score = 0
    list.forEach(value => {
        if (value) {
            score = score + 1;
        }
    })
    score = score / list.length * 10
    score = Math.round(score * 10) / 10
    return score
}
//function that sorts results by user name
export const scoreByUser = (resultsRequest, users, images) => {
    const sortResultsName = {}


    let userOrderByScore = []
    //check if resultsRequest is not null and then for each user take the result of all his tests
    if (resultsRequest) {
        resultsRequest.forEach(value => {
            const image = images[value.image]
            if (sortResultsName[value.user]) {
                sortResultsName[value.user] = [...sortResultsName[value.user], value.userGuess === (image.version === 0)]

            } else {
                sortResultsName[value.user] = [value.userGuess]

            }
        })
    }
    //calculate the score and the calculate the ranking of each user
    Object.keys(sortResultsName).forEach(value => {

            const rate = score(sortResultsName[value])
            sortResultsName[value] = {
                score: rate,
                name: users[value].name,
                level: level(users[value].level)
            }
            if (userOrderByScore.length === 0) {
                userOrderByScore.push(value)
            } else {
                let index = 0
                while (index < userOrderByScore.length && sortResultsName[value].score < sortResultsName[userOrderByScore[index]].score) {
                    index = index + 1

                }

                function insertAt(array, index, ...elements) {
                    array.splice(index, 0, ...elements);
                }

                insertAt(userOrderByScore, index, value)
            }
        }
    )
    return ([sortResultsName, userOrderByScore])
}
export const resultByType = (resultsRequest, users, images) => {
    const sortResultsType = {}
    if (resultsRequest) {
        resultsRequest.forEach(value => {
            const image = images[value.image]
            if (!sortResultsType[image.type]) {
                sortResultsType[image.type] = {
                    0: [],
                    1: []
                }
            }

            if (image.version === 0) {
                sortResultsType[image.type] =
                    {
                        ...sortResultsType[image.type],
                        0: [...sortResultsType[image.type][0],
                            value.userGuess === (image.version === 0)]
                    }
            } else {
                sortResultsType[image.type] =
                    {
                        ...sortResultsType[image.type],
                        1: [...sortResultsType[image.type][1],
                            value.userGuess === (image.version === 0)
                        ]
                    }
            }

        })
        Object.values(sortResultsType).forEach(value => {
            value[0] = score(value[0])
            value[1] = score(value[1])
        })
    }
    return (sortResultsType)

}
export const userResult = (resultsRequest, users, images, user) => {

    let results = []
    if (resultsRequest && user) {
        resultsRequest.forEach((value) => {

            if (value.user === user.id) {
                results.push(value)
            }
        })
    return resultByType(results, users, images)
    }
    return []

}