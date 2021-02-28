import React from "react";
import "../styles/Button.css";
import "../styles/ButtonGroup.css";
import "../styles/ScrollList.css";
import {TYPE_HORIZONTAL, TYPE_IMAGE, TYPE_IMAGE_TEXT} from "../helper/const";
import Image from "./Image";
import PropTypes from "prop-types";


/**
 * this component is a kind of carousel
 * @param tabList list of element of the carousel
 * @param currentItem item currently display
 * @param type define the type of displayed elements  can be image, title image text or just text
 * @param classNameDiv for the css of the div
 * @param classNameElement for the css of the element
 * @param direction direction of the scroll can be horizontal or vertical
 * @returns {JSX.Element}
 * @constructor
 */
export default function ScrollList({
                                       tabList,
                                       currentItem = 1,
                                       type,
                                       classNameDiv,
                                       classNameElement,
                                       direction = TYPE_HORIZONTAL,
                                   }) {

    return (
        <div className={`scrollList-div ${classNameDiv}`}>
            {tabList.map((item, index) => (
                <div
                    key={index}
                    style={
                        direction === TYPE_HORIZONTAL
                            ? {right: ` ${(+currentItem - index) * 100}% `}
                            : {bottom: ` ${(+currentItem - index) * 100}% `}
                    }
                    className="scrollList-element"
                >
                    {type === TYPE_IMAGE ? (
                        <Image classNameDiv={classNameElement} url={item}/>
                    ) : type === TYPE_IMAGE_TEXT ?

                        <div className={classNameElement}>
                            <h1>{item.title}</h1>
                            <div className="scrollList-image">
                                <Image url={item.image}/>
                                <p>{item.text}</p>
                            </div>
                        </div> : (
                            <p className="text">{item}</p>
                        )}
                </div>
            ))}

        </div>
    )

}


ScrollList.propType = {
    /** For each element of the array, an element is created in the ScrollList */
    tabList: PropTypes.array,
    /** The index of the element currently displayed */
    currentItem: PropTypes.number,
    /** The type of scroll list (if it shows images or not for instance) */
    type: PropTypes.string,
    /** The style class name of the scroll list */
    classNameDiv: PropTypes.string,
    /** The style class name of each element of the list */
    classNameElement: PropTypes.string,
    /** The direction of the scroll list (if the elements comes from the top or from the left, ...) */
    direction: PropTypes.string,
};
