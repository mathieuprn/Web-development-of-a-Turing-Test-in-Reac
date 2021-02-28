import React from "react";
import "../styles/Button.css";
import "../styles/ButtonGroup.css";
import Button from "./Button";
import {TYPE_RADIO, TYPE_TEST} from "../helper/const";
import PropTypes from "prop-types";


/**
 * this component ButtonGroup is used in 2 contexts
 * first has a sort of radio button group(only one of a list of button can be selected)
 * secondly for the test of welcome page or test page with the circle button
 *
 * @param tabList list which contains the text of the buttons
 * @param setTabNum change numTab (the button selected)
 * @param checked this props is used for the test page when the user position is different from numbTab
 * @param numbTab
 * @param classNameDiv to handle the style of the list
 * @param classNameBtn to handle the style of the buttons
 * @param typeButtonGroup props that defined the use case can be TYPE_RADIO or TYPE_TEST
 * @returns {JSX.Element}
 */



export default function ButtonGroup({
                                        tabList,
                                        setTabNum = null,
                                        checked = null,
                                        numbTab,
                                        classNameDiv,
                                        classNameBtn,
                                        typeButtonGroup = TYPE_RADIO,
                                    }) {
    /**
     *depending on type the buttons disabled are not the same this function handle this
     *
     * @param index
     * @returns {boolean}
     */
    const handleIsDisabled = (index) => {
        return typeButtonGroup === TYPE_RADIO
            ? index === numbTab
            : typeButtonGroup === TYPE_TEST && index > numbTab;
    };
    return (
        <div className={classNameDiv}>
            {tabList.map((item, index) => (
                <Button
                    key={index}
                    handleClick={setTabNum && (() => setTabNum(index))}
                    text={item}
                    isDisabled={handleIsDisabled(index)}
                    className={`${classNameBtn} ${
                        checked === index ? " circle-highlighted" : " "
                    }`}
                />
            ))}
        </div>
    );

}

ButtonGroup.propTypes = {
    /** An array, for each element of the array, a button is created */
    tabList: PropTypes.array,
    /** A function called when a button is clicked */
    setTabNum: PropTypes.func,
    /** The button which should be highlighted (for instance if the image
     * number 4 is displayed then the corresponding button should be highlighted) */
    checked: PropTypes.number,
    /** The number of buttons */
    numbTab: PropTypes.number,
    /** The style class name of the button Group */
    classNameDiv: PropTypes.string,
    /** The style class name of each button */
    classNameBtn: PropTypes.string,
    /** The type of button group, 'radio' for example */
    typeButtonGroup: PropTypes.string,
};
