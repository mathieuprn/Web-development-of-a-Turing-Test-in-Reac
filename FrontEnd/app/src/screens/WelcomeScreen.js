import React, {useState} from 'react'
import '../styles/styleScreens/WelcomeStyle.css';

import Image from "../components/Image";
import Button from "../components/Button";
import ButtonGroup from "../components/ButtonGroup";
import { Link } from 'react-router-dom';
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import ScrollList from "../components/ScrollList";
import {TYPE_HORIZONTAL, TYPE_IMAGE, TYPE_TEST, TYPE_IMAGE_TEXT, TYPE_VERTICAL} from "../helper/const";

import imgTest from "../img/sar.jpg";
import satellite from "../img/satellite.jpeg";
import turing from "../img/turing.jpeg";
import science from "../img/help_science.png";

const LORA = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan tincidunt sapien. Aenean auctor felis eget ex suscipit, quis euismod diam gravida. Integer ultrices, ligula at convallis mollis, tortor nibh vehicula erat, ac efficitur ipsum dolor ut justo. In hac habitasse platea dictumst. Nullam vel semper nulla. Aenean sagittis ante sit amet venenatis semper. Aenean venenatis lacus in tellus consequat varius. Donec accumsan scelerisque lorem, viverra egestas neque cursus in. Curabitur finibus dolor sit amet diam sollicitudin, vitae rutrum elit semper. Aenean aliquet lectus in augue fermentum efficitur. Duis sodales mauris vitae luctus sodales."


const WelcomeScreen = () => {

    const [state, setState] = useState('');
    const [hover, setHover] = useState(0);
    const [test, setTest] = useState(0);
    const LIST_TEST_IMAGE = [
        imgTest,
        imgTest,
        imgTest,
        imgTest,
        
    ]
    const list_button_image = Array.apply(null, Array(LIST_TEST_IMAGE.length)).map(function () {
        return ''
    })

    const LIST_TEST_IMAGE_TEXT = [
        {image:satellite, title: `What is the project ?`, text:`Le but de ce projet est d'améliorer une Intelligence Artificielle créant des images SAR virtuelles`},
        {image:imgTest, title: `What is SAR ?`, text:`SAR est un radar imageur qui effectue un traitement des données reçues afin d'améliorer la résolution en azimut. Le traitement effectué permet d'affiner l'ouverture de l'antenne.`},
        {image:turing, title: `How to improve the IA ? `, text:`Pour améliorer l'IA en question, nous allons effectuer un Test de Turing. Nous allons alors vous montrer des images virtuelles faites par l'IA et des images réelles. Vous allez devoir déterminer celles qui sont fausses et celles qui sont vrais. Vos réponses seront prises en compte pour améliorer l'IA. `},
        {image:science, title: `Ready to help science ? `, text:`Êtes-vous prêt à aider la science ? A améliorer notre intelligence artificielle créant des images SAR virtuelles ? Ne perdons pas de temps, et commencons de suite !`},
        {image:imgTest, title: `My Title 5`, text:`5text consectetur adipiscing elit. Morbi accumsan tincidunt sapien. Aene`},
        {image:imgTest, title: `My Title 6`, text:`6text consectetur adipiscing elit. Morbi accumsan tincidunt sapien. Aene`},
    ]


    return (
        <>

            

            
            <div className="scrollList-button">
                
                <button 
                    className="arrow"
                    onClick={() =>{
                        if (test >0) {
                            setTest(test - 1)

                        }       
                    }}
                    handleMouseEnter={() => setHover(-1)}
                    handleMouseLeave={() => setHover(0)}> 
                        <AiFillCaretLeft size='35px'/> 
                </button>
                
                <ScrollList
                type={TYPE_IMAGE_TEXT}
                currentItem={test}
                classNameDiv={"scrollList-div-text-image"}
                classNameElement={"text-image-div"}
                tabList={LIST_TEST_IMAGE_TEXT}
                />
           
                <button 
                    className="arrow"
                    onClick={() =>{
                        if (test < LIST_TEST_IMAGE.length - 1) {
                            setTest(test + 1)

                        }       
                    }}
                    handleMouseEnter={() => setHover(-1)}
                    handleMouseLeave={() => setHover(0)}> 
                        <AiFillCaretRight size='35px' /> 
                </button>

            </div>
            
            <ButtonGroup
                classNameDiv={"radio circle-container handle-tab "}
                classNameBtn={"but circle"}
                numbTab={test}
                tabList={list_button_image}
                typeButtonGroup={TYPE_TEST}
            />

            <Link to='/evaluation' >
                <Button
                className="but btn-black"
                handleClick={() => {
                   

                }}
                handleMouseEnter={() => setHover(-1)}
                handleMouseLeave={() => setHover(0)}
                text="Get Started"
                />
            </Link>

        </>
    );

}

export default WelcomeScreen;
