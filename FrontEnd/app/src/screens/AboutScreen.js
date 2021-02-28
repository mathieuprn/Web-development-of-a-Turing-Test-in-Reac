import React, {useState} from 'react'
import '../styles/styleScreens/AboutStyle.css'
import ButtonGroup from "../components/ButtonGroup";
import {ABOUT_LIST_TAB} from "../helper/AboutConst";
import ScrollList from "../components/ScrollList";

/**
 * the about us screen is almost a static screen it just uses the component ButtonGroup and ScrollList to give a dynamic aspect
 * @returns {JSX.Element}
 * @constructor
 */
const AboutScreen = () => {
    const [numTab, setNumTab] = useState(0)

    return (
        <div className="aboutus-container">
            <ButtonGroup
                classNameDiv={"handle-tab width-tab"}
                classNameBtn={"but btn-tab"}
                setTabNum={setNumTab}
                numbTab={numTab}
                tabList={Object.keys(ABOUT_LIST_TAB)}
            />
            <ScrollList tabList={Object.values(ABOUT_LIST_TAB)} currentItem={numTab} classNameDiv="aboutus-text"/>
        </div>
    )
}

export default AboutScreen
