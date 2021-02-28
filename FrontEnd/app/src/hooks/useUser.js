import {useState, useEffect} from "react";
import AxiosConfig from "../helper/axiosConfig";
import {useCookies} from "react-cookie";

//handle local data of a user (his name, level and email)
export default () => {
    //default user=null
    const [user, setUser] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['userId']);
    const BASE_URL = "/users/"
    //fetch data of a user with his id
    const fetchUser = async (id) => {
        try {
            const url = `${BASE_URL}${id}/`
            const result = await AxiosConfig.get(url)
            setUser(result.data)

        } catch (e) {
            console.log(e)
        }
    }
    //delete cookie
    const deleteCookie = () => {
        removeCookie('userId')
    }
    //check if a mail is correct
    const mailCorrect = (mail) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail);
    };
    //create a user and store locally data of the user
    const createUser = async (user) => {
        try {
            if (!mailCorrect(user.email)) {
                delete user.email
            }
            const result = await AxiosConfig.post(BASE_URL, user)
            setUser(result.data)
            setCookie('userId', result.data.id)
        } catch (e) {
            console.log(e)
        }
    }
    //delete local data of a user
    const initUser = () => {
        setUser(null)
    }
    //useEffect that deal with cookies
    //when cookies value change
    // if cookies.userId is defined it fetches the data of the user
    // else it initUser (delete local data)
    useEffect(() => {
        if (cookies.userId) {
            fetchUser(cookies.userId)
        } else {
            initUser()
        }
    }, [cookies])


    return {user, createUser, deleteCookie}
}