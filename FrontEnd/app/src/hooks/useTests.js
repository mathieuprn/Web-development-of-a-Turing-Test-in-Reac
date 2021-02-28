import React, {useState, useEffect} from "react";
import AxiosConfig from "../helper/axiosConfig.js";

export default () => {

    const [test, setTest] = useState([]);
    const [results, setResult] = useState({loading: false});
    const TEST_URL = '/tests/'
    const RESULT_URL = '/results/'
    const IMAGES_URL = '/images/'
    const USER_URL = '/users/'
    const fetchTest = async () => {
        const imageTest = (await AxiosConfig.get(TEST_URL)).data
        setTest(imageTest)
    }
    const sendTest = async (test) => {
        setResult(prevState => ({...prevState, loading: true}))
        try {

            const resultTest = (await AxiosConfig.post(TEST_URL, test)).data
            setTest([])
            setResult(prevState => ({
                ...prevState,
                resultLastTest: resultTest,
                loading: false
            }))
        } catch (e) {
            setResult(prevState => ({...prevState, loading: true}))
        }
    }
    const fetchResults = async () => {
        setResult(prevState => ({...prevState, loading: true}))
        try {
            const resultsTest = (await AxiosConfig.get(RESULT_URL, test)).data

            const images = (await AxiosConfig.get(IMAGES_URL, test)).data
            const finalImages={}
            images.forEach(value=>{
                finalImages[value.id]=value
            })

            const users = (await AxiosConfig.get(USER_URL, test)).data
            const finalUsers={}
            users.forEach(value=>{
                finalUsers[value.id]=value
            })
            setResult(prevState => ({
                ...prevState,
                images: finalImages,
                users: finalUsers,
                requestResults: resultsTest,
                loading: false
            }))
        } catch (e) {
            console.log(e)
        }
    }
    return {test, results, fetchTest, sendTest, fetchResults}

}