import React from "react";
import "../styles/Button.css";
import "../styles/ButtonGroup.css";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import Button from "./Button";
import {WELCOME_BUTTON_EVALUATION, WELCOME_BUTTON_TEST} from "../helper/WelcomeConst";

/**
 *Button use to welcome the user
 * @param finish boolean that defined if the user as read the instruction
 * @param user user currently connected, null if user not connected
 * @returns {JSX.Element}
 * @constructor
 */
export default function ButtonWelcome({
                                          finish,
                                          user,
                                      }) {
    return (
        <div className="button-Welcome">
            {
                user ?
                    <Link to="/test">
                        <Button className="but" text={WELCOME_BUTTON_TEST}/>
                    </Link> :
                    <Link to="/evaluation">
                        <Button className="but" isDisabled={!finish} text={WELCOME_BUTTON_EVALUATION}/>
                    </Link>
            }
        </div>
    )


}



