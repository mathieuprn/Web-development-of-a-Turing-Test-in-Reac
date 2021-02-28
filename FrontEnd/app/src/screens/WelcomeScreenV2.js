import React, {useState} from 'react'
import '../styles/styleScreens/WelcomeStyle.css';
import ButtonWelcome from "../components/ButtonWelcome";
import ScrollListWelcome from "../components/ScrollListWelcome";
import Background from "../img/background.png"
const WelcomeScreenV2 = ({user}) => {

    const [finish, setFinish] = useState(false);
    var sectionStyle = {
        backgroundImage: `url(${Background})`
    };
    return (
        <div style={sectionStyle} className="welcome-div-screen">
            <div className="welcome-div">
                <h1>Welcome</h1>
                <p>Thanks for your participation and your time !</p>
            </div>
            <ScrollListWelcome setFinish={setFinish}/>
            <ButtonWelcome finish={finish} user={user}/>
        </div>
    )
}

export default WelcomeScreenV2;
