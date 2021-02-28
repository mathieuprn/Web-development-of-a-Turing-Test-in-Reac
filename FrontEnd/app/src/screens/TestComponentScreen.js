import React, {useState} from "react";
import Button from "../components/Button";

import '../styles/ComponentTest.css'
import ButtonGroup from "../components/ButtonGroup";
import Image from "../components/Image";
import imgTest from "../img/sar.jpg";
import {Title} from "../components/Typo";

import ScrollList from "../components/ScrollList";
import {TYPE_HORIZONTAL, TYPE_IMAGE, TYPE_IMAGE_TEXT, TYPE_TEST, TYPE_VERTICAL} from "../helper/const";

const LORA = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan tincidunt sapien. Aenean auctor felis eget ex suscipit, quis euismod diam gravida. Integer ultrices, ligula at convallis mollis, tortor nibh vehicula erat, ac efficitur ipsum dolor ut justo. In hac habitasse platea dictumst. Nullam vel semper nulla. Aenean sagittis ante sit amet venenatis semper. Aenean venenatis lacus in tellus consequat varius. Donec accumsan scelerisque lorem, viverra egestas neque cursus in. Curabitur finibus dolor sit amet diam sollicitudin, vitae rutrum elit semper. Aenean aliquet lectus in augue fermentum efficitur. Duis sodales mauris vitae luctus sodales."

export default () => {
    const [state, setState] = useState('');
    const [numTab, setNumTab] = useState(0)
    const LIST_TAB_TITLE = [
        'Onglet 1',
        'Onglet 2',
        'Onglet 3'
    ]
    const [radioButton, setRadioButton] = useState(0)
    const LIST_RADIO_BUTTON = [
        'button 1',
        'button 2',
        'button 3'
    ]
    const [over, setOver] = useState(false);
    const [hover, setHover] = useState(0);
    const [test, setTest] = useState(0);
    const LIST_TEST_IMAGE = [
        imgTest,
        imgTest,
        imgTest,
        imgTest,
        imgTest,
        imgTest,
        imgTest,
    ]
    const LIST_TEST_IMAGE_TEXT = [
        {image: imgTest, text: `1text le consectetur adipiscing elit. Morbi accumsan tincidunt sapien. Aene`},
        {image: imgTest, text: `2text leconsectetur adipiscing elit. Morbi accumsan tincidunt sapien. Aene`},
        {image: imgTest, text: `3text consectetur adipiscing elit. Morbi accumsan tincidunt sapien. Aene`},
        {image: imgTest, text: `4text consectetur adipiscing elit. Morbi accumsan tincidunt sapien. Aene`},
        {image: imgTest, text: `5text consectetur adipiscing elit. Morbi accumsan tincidunt sapien. Aene`},
        {image: imgTest, text: `6text consectetur adipiscing elit. Morbi accumsan tincidunt sapien. Aene`},

    ]
    const list_button_image = Array.apply(null, Array(LIST_TEST_IMAGE.length)).map(function () {
        return ''
    })
    console.log(numTab, "onglet affiché")
    console.log(radioButton, "radio button coché")
    console.log(state, "l'input")
    console.log(hover)
    return (
        <div className="comp">
            <br/><br/>
            <Button className="but" handleClick={() => (console.log("click sur but"))} text="Exemple de boutton"/>
            <br/><br/>
            <Button className="but btn-red" handleClick={() => (console.log("click sur but re"))}
                    text="Exemple boutton rouge"/>
            <br/><br/>
            <Button isDisabled={true} handleClick={() => (console.log("test"))} className="but"
                    text="Exemple boutton disabled"/>
            <br/><br/>

            <br/>
            <ButtonGroup
                classNameDiv={"handle-tab width-tab"}
                classNameBtn={"but btn-tab"}
                setTabNum={setNumTab}
                numbTab={numTab}
                tabList={LIST_TAB_TITLE}
            />
            <br/>
            <ButtonGroup
                classNameDiv={"radio"}
                classNameBtn={"but btn-radio"}
                setTabNum={setRadioButton}
                numbTab={radioButton}
                tabList={LIST_RADIO_BUTTON}
            />
            <br/>
            <Image className="green" url={imgTest}/>
            <br/>
            <Image className="red" url={imgTest}/>
            <br/>
            <Image url={imgTest}/>
            <br/>
            <Title text="Ceci est un exemple pour un titre "/>

            <br/>
            <Image classNameDiv={over ? `rotateRight` : null} url={imgTest}/>
            <br/>
            <Button
                className="but "
                text="test du comportement hover"
                handleMouseEnter={() => setOver(true)}
                handleMouseLeave={() => setOver(false)}
            />
            <br/>
            <br/>

            <ButtonGroup
                classNameDiv={"radio circle-container handle-tab"}
                classNameBtn={"but circle"}
                numbTab={test}
                tabList={list_button_image}
                typeButtonGroup={TYPE_TEST}
            />
            <br/>
            <br/>
            <ScrollList
                classNameDiv="scrollList-div"
                currentItem={test}
                tabList={LIST_TEST_IMAGE}
                type={TYPE_IMAGE}
                classNameElement={hover === 1 ? 'rotateRight' : hover === -1 ? 'rotateLeft' : ''}
                direction={TYPE_VERTICAL}
            />
            <br/>
            <ScrollList
                classNameDiv="scrollList-div"
                currentItem={test}
                tabList={LIST_TEST_IMAGE}

                classNameElement={hover === 1 ? 'rotateRight' : hover === -1 ? 'rotateLeft' : ''}
                direction={TYPE_HORIZONTAL}
            />
            <br/>
            <ScrollList
                type={TYPE_IMAGE_TEXT}
                currentItem={test}
                classNameDiv={"scrollList-div-text-image"}
                classNameElement={"text-image-div"}
                tabList={LIST_TEST_IMAGE_TEXT}
            />
            <Button
                className="but btn-red"
                handleClick={() => {

                    if (test < LIST_TEST_IMAGE.length - 1) {
                        setTest(test + 1)

                    }

                }}
                handleMouseEnter={() => setHover(-1)}
                handleMouseLeave={() => setHover(0)}
                text="Exemple boutton rouge"
            />
            <Button
                className="but"
                handleClick={() => {

                    if (test < LIST_TEST_IMAGE.length - 1) {
                        setTest(test + 1)

                    }

                }}
                handleMouseEnter={() => setHover(1)}
                handleMouseLeave={() => setHover(0)}
                text="Exemple de boutton"
            />
            <br/>
            <br/>
            <div className={'text-image-div'}>
                <Image url={imgTest}/>

            </div>

        </div>)
}