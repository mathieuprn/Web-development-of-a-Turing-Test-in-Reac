import React, {useState} from "react";
import ScrollList from "./ScrollList";
import {TYPE_IMAGE_TEXT, TYPE_TEST} from "../helper/const";
import {WELCOME_LIST_TEST_IMAGE_TEXT} from "../helper/WelcomeConst";
import ButtonGroup from "./ButtonGroup";
import ButtonIcon from "./ButtonIcon";


export default function ({setFinish}) {
    const [state, setState] = useState(0);
    const list_button = Array.apply(null, Array(WELCOME_LIST_TEST_IMAGE_TEXT.length)).map(function () {
        return ''
    })
    const handleButtonCLick = (plus) => {
        if (plus === 1 && state < 3 || plus === -1 && state > 0) {
            setState(prevState => prevState + plus)
            if(plus+state===3){
                setFinish(true)
            }
        }
    }

    return (
        <div className="scrollList-welcome">
            <div className="scrollList-welcome-flex">

                <ButtonIcon
                    className={`btn-arrow ${state===0&&'none-display'}`}
                    size='4x'
                    handleClick={() => handleButtonCLick(-1)} left={true}
                    testPage={false}
                />
                <ScrollList
                    type={TYPE_IMAGE_TEXT}
                    currentItem={state}
                    classNameDiv={"scrollList-div-text_image"}
                    classNameElement={"text-image-div"}
                    tabList={WELCOME_LIST_TEST_IMAGE_TEXT}
                />
                <ButtonIcon
                    className={`btn-arrow ${state<3?'btn-arrow-green':'none-display'}`}
                    size='4x'
                    handleClick={() => handleButtonCLick(1)} left={false}
                    testPage={false}
                />
            </div>
            <ButtonGroup
                classNameDiv={"button-circle-welcome"}
                classNameBtn={"but circle"}
                numbTab={state}
                tabList={list_button}
                typeButtonGroup={TYPE_TEST}
                setTabNum={setState}
            />
        </div>
    )
}
