import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Popup from "reactjs-popup";
import Button from "../components/Button";
import ScrollList from "../components/ScrollList";
import ButtonGroup from "../components/ButtonGroup";
import { Spinner } from "../components/Spinner";
import ButtonIcon from "../components/ButtonIcon";
import RadioButtonsSarTypeList from "../components/RadioButtonsSarTypeList";
import "../styles/styleScreens/TestStyle.css";
import "../styles/Button.css";
import useReducerTestScreen from "../hooks/useReducerTestScreen";
import {
  TYPE_HORIZONTAL,
  TYPE_IMAGE,
  TYPE_TEST,
  NUMBER_IMAGES_TEST,
} from "../helper/const";
import {
  testTips,
  trueImageButtonText,
  falseImageButtonText,
  endTestButtonText,
} from "../helper/TestScreenConst";
/**
 * The file of the TestScreen. Cookies are set to save every answer from the user,
 * and will be load if he leaves and comes back.
 * The screen shows a list of buttons, each is linked with an image. There is also a displayer for
 * images, a radio buttons group to choose the SAR type (if the user's level is Expert and two
 * buttons to answer the test.
 * The screen redirects users if they have not been evaluated and displays a spinner if
 * the database takes too long to respond.
 * There is also a button 'tips' to explain how to answer the test and a 'leave' button, which
 * delete cookies from the test.
 * Most of the logic of the page is located in 'useReducerTestScreen.js' (for instance : how the screen
 * should react to a clic on a button).
 * Note : It is easy to modifiy the text on this page, all the constant are in TestScreenConst.js
 * @author rcaby
 * @param {*} propsTestScreen - You can see the props supposed to be in propsTestScreen at the end of the file.
 */
function TestScreen(propsTestScreen) {
  /**
   * The constants, or state variable of the screen.
   * - hover : allows to change the style of a button (when someone is about to clic it
   * for instance when the mouse enters the button)
   * - hasWaited : indicates wether the screen has waited long enough for the user's data to be loaded.
   * - leaveTest : indicates wether the user asked to leave the test (which would mean cookies deletion).
   * - openPopUp : indicates wether the tips popup should be displayed.
   * - endOfTest : indicates wether the user ended the test (then answers have to be sent and cookies deleted)
   * - closeModal : function used to close the tips popup.
   * - list_button_image : creation of the list of the buttons linked to the images, used to create a component.
   */
  const [hover, setHover] = useState(0);
  const [hasWaited, setHasWaited] = useState(false);
  const [leaveTest, setLeaveTest] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [endOfTest, setEndOfTest] = useState(false);
  const closeModal = () => setOpenPopUp(false);
  const list_button_image = Array.apply(null, Array(NUMBER_IMAGES_TEST)).map(
    function () {
      return "";
    }
  );
  // Used only one time, to get the images and to load the user's data.
  useEffect(() => {
    propsTestScreen.fetchTest();
    setTimeout(() => {
      setHasWaited(true);
    }, 1000);
  }, []);
  /**
   * Link is made here with the useReducer dedicated to this page
   * - the state of the useReducer, which contains :
   *    + actualIndex : the image viewed by the user.
   *    + responses : the array of the responses.
   *    + actualRadioGuess : the actual SAR Type guess (will stay at "" for most users).
   * - changeIndexFromNorth : change the image displayed by jumping directly to it (from number 4 to 1 for instance).
   * - changeIndexFromSouth : change the image to the next one, and save the answer of the user (because pressing on of
   *                          the south buttons is giving an answer).
   * - changeRadioGuess : change the actual SAR Type guess of the user.
   * - endTestCookies : delete the cookies linked to the test.
   */
  const {
    state,
    changeIndexFromNorth,
    changeIndexFromSouth,
    changeRadioGuess,
    endTestCookies,
  } = useReducerTestScreen();

  return (
    <div>
      {propsTestScreen.user !== null ? (
        <div>
          {propsTestScreen.test.length > 0 && !leaveTest ? ( // if images have been loaded and the user does not want to leave.
            <div className="TestScreen">
              {!endOfTest && (
                <Popup
                  open={openPopUp}
                  closeOnDocumentClick
                  onClose={closeModal}
                >
                  <div className="modal">{testTips}</div>
                </Popup>
              )}
              {!endOfTest && (
                <div className="topElements">
                  <div className="topButtons">
                    <ButtonIcon
                      iconQuestion={true}
                      className={"btn-icon"}
                      handleClick={() => setOpenPopUp((o) => !o)}
                    />
                    <ButtonIcon
                      className={"btn-icon btn-icon-red"}
                      handleClick={() =>
                        userLeavesTest(endTestCookies, setLeaveTest)
                      }
                    />
                  </div>
                  <ButtonGroup
                    classNameDiv={"radio radio-test handle-tab"}
                    classNameBtn={"but circle"}
                    numbTab={state.responses.length - 1}
                    setTabNum={changeIndexFromNorth}
                    tabList={list_button_image}
                    typeButtonGroup={TYPE_TEST}
                    checked={state.actualIndex}
                  />
                </div>
              )}
              {!endOfTest && (
                <ScrollList
                  classNameDiv="scrollList-div scrollList-div-test-image ImagePanel"
                  currentItem={state.actualIndex}
                  tabList={ExtractImages(propsTestScreen.test)}
                  type={TYPE_IMAGE}
                  classNameElement={
                    hover === -1
                      ? "rotateRight"
                      : hover === 1
                      ? "rotateLeft"
                      : ""
                  }
                  direction={TYPE_HORIZONTAL}
                />
              )}

              {propsTestScreen.user.level >= 3 && !endOfTest && (
                <RadioButtonsSarTypeList
                  selectedRadioButtonValue={state.actualRadioGuess}
                  setSelectedRadioButtonValue={changeRadioGuess}
                  setHover={setHover}
                />
              )}
              {!endOfTest && (
                <div className="SouthButtonRow">
                  <Button
                    className={
                      state.responses.length > state.actualIndex &&
                      state.responses[state.actualIndex][0]
                        ? "but btn-highlight"
                        : "but"
                    }
                    handleMouseEnter={() => setHover(-1)}
                    handleMouseLeave={() => setHover(0)}
                    handleClick={() => {
                      setHover(0);
                      changeIndexFromSouth(true);
                    }}
                    text={trueImageButtonText}
                  />
                  <Button
                    className={
                      state.responses.length > state.actualIndex &&
                      !state.responses[state.actualIndex][0]
                        ? "but btn-red btn-highlight"
                        : "but btn-red"
                    }
                    handleMouseEnter={() => setHover(-1)}
                    handleMouseLeave={() => setHover(0)}
                    handleClick={() => {
                      setHover(0);
                      changeIndexFromSouth(false);
                    }}
                    text={falseImageButtonText}
                  />
                </div>
              )}
              {state.responses.length === NUMBER_IMAGES_TEST && ( // Each image has been answered
                <Button
                  className="but btn-blue"
                  handleMouseEnter={() => setHover(-1)}
                  handleMouseLeave={() => setHover(0)}
                  handleClick={() =>
                    endTest(
                      propsTestScreen.test,
                      state.responses,
                      propsTestScreen.user,
                      propsTestScreen.sendTest,
                      setEndOfTest,
                      endTestCookies
                    )
                  }
                  text={endTestButtonText}
                />
              )}
            </div>
          ) : endOfTest ? (
            <Redirect to={"result"} />
          ) : leaveTest ? (
            <Redirect to={"welcomeV2"} />
          ) : (
            <div className="TestScreen">
              <Spinner />
            </div>
          )}
        </div>
      ) : hasWaited && propsTestScreen.user == null ? (
        // The user has not been evaluated.
        <Redirect to="evaluation" />
      ) : (
        // Still loading the user's data
        <div className="TestScreen">
          <Spinner />
        </div>
      )}
    </div>
  );
}

/**
 * Function used to extract images from the props of the TestScreen. They are received as an array of objects
 * whose one attribute is 'image', a path to the image which has to be extracted. This function makes an array
 * with those images.
 */
function ExtractImages(notExtractedImages) {
  const NUMBER_IMAGES = notExtractedImages.length;
  const images = [];
  for (let i = 0; i < NUMBER_IMAGES; i++) {
    images.push("http://localhost:8000" + notExtractedImages[i].image);
  }
  return images;
}

/**
 * Function called to end the test.
 * @param test - The array which contains the list of images selected for the test, their ids etc.
 * @param responses - The array of answers from the user.
 * @param user - The user object (which contains his id for instance)
 * @param sendTest - The function called to send 'responses'.
 * @param setEndOfTest - Function to change the 'endOfTest' boolean : components will not be displayed anymore
 * @param endTestCookies - Function which delete cookies in the useReducer of this screen.
 */
function endTest(
  test,
  responses,
  user,
  sendTest,
  setEndOfTest,
  endTestCookies
) {
  const results = [];
  for (let i = 0; i < test.length; i++) {
    results.push({
      image: test[i].id,
      userGuess: responses[i][0] + "",
      sarTypeGuess: responses[i][1],
    });
  }
  endTestCookies();
  sendTest({ user: user.id, imageTests: results });
  setEndOfTest(true);
}

/**
 * Function called when the user leaves the test and will start from the beginning next time.
 * @param {func} endTestCookies - Delete the cookies of the test.
 * @param {func} setLeaveTest - Change the value of the 'leaveTest' boolean.
 */
const userLeavesTest = (endTestCookies, setLeaveTest) => {
  endTestCookies();
  setLeaveTest(true);
};

TestScreen.propTypes = {
  /** An array which contains objects whose one attribute will be (after fetching) a path to one image*/
  test: PropTypes.array,
  /** A function used to send the results of the test */
  sendTest: PropTypes.func,
  /** A function used to get images from database, and to set them in 'test' */
  fetchTest: PropTypes.func,
  /** An object which contains an id or a level for instace. */
  user: PropTypes.object,
};

export default TestScreen;
