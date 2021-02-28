import Button from "../components/Button";

import React,{useEffect} from "react";


export default ({
                    user,
                    test,
                    fetchResults,
                    fetchTest,
                    createUser,
                    deleteCookie,
                    sendTest,
                    results
                }) => {
    console.log(user)
    console.log(test)
    console.log(results)
    if(test[0]){

        console.log(test[0].image)
    }
    useEffect(() => {
        fetchResults()
    }, [])


    return (
        <div>
            <Button text="create user" handleClick={() => createUser({name: "nom de moi", level: 1})}/>
            <Button text="delete cookies" handleClick={() => deleteCookie()}/>
            <Button text="begin test" handleClick={() => fetchTest()}/>
            <Button text="end test" handleClick={
                () => sendTest(
                    {
                        user: user.id,
                        imageTests: [{
                            image: 4,
                            userGuess: "True"
                        }]
                    }
                )
            }
            />


        </div>
    )
}