import { useReducer, useEffect } from "react";
import { useCookies } from "react-cookie";
import { NUMBER_IMAGES_TEST } from "../helper/const";

/**
 * This file is used to update the TestScreen, depending on how the user uses it.
 * @author rcaby
 * @param {*} state - The actual state of the hook
 * @param {*} action - Has different attributes, they depend on the 'type' attribute
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "testEnd":
      // The test is over, cookies will be deleted.
      action.removeCookie("cookiesTest");
      return state;
    case "radioGuess":
      // A new value is selected for the SAR Type of the image
      if (state.responses.length - 1 >= state.actualIndex) {
        // Updating old answer
        state.responses[state.actualIndex][1] = action.radioGuess;
      }
      return { ...state, actualRadioGuess: action.radioGuess };
    case "fromNorth":
      // The user wants to switch to another image
      if (state.responses.length <= action.newIndex) {
        // Reset the SAR Type guess, because the user has not answered it yet.
        state.actualRadioGuess = "";
        return {
          ...state,
          actualIndex: action.newIndex,
        };
      } else {
        // Loading a previous SAR Type guess.
        return {
          ...state,
          actualIndex: action.newIndex,
          actualRadioGuess: state.responses[action.newIndex][1],
        };
      }

    case "fromSouth":
      // The user answered an image, the answer has to be saved and the next image (if it exists) has to be displayed
      const oldIndex = state.actualIndex;
      const newIndex = oldIndex + 1;
      const radioGuess = state.actualRadioGuess;

      if (oldIndex >= state.responses.length) {
        // There was no answer for this image, adding it.
        // There is no answer for the next image.

        if (oldIndex < NUMBER_IMAGES_TEST - 1) {
          // The next image exists.
          // Reset SAR Type guess, updating actualIndex.
          return {
            ...state,
            actualRadioGuess: "",
            actualIndex: newIndex,
            responses: [...state.responses, [action.userGuess, radioGuess]],
          };
        } else {
          // The next image does not exist.
          return {
            ...state,
            responses: [...state.responses, [action.userGuess, radioGuess]],
          };
        }
      } else {
        // There is already an anwser for this image, updating it.
        state.responses[oldIndex] = [action.userGuess, radioGuess];
        if (
          state.actualIndex < NUMBER_IMAGES_TEST &&
          state.responses.length === newIndex &&
          newIndex !== NUMBER_IMAGES_TEST
        ) {
          // There is a next image but it was not answered yet
          // Updating actualIndex.
          return { ...state, actualRadioGuess: "", actualIndex: newIndex };
        } else if (
          state.actualIndex < NUMBER_IMAGES_TEST &&
          newIndex !== NUMBER_IMAGES_TEST
        ) {
          // The next image exists and has been answered, loading it.
          const oldRadioGuess = state.responses[newIndex][1];
          return {
            ...state,
            actualRadioGuess: oldRadioGuess,
            actualIndex: newIndex,
          };
        }
        return state;
      }
    default: {
      return;
    }
  }
};

export default () => {
  /** Cookies used to save the answers of the user if he wants to end the test later */
  const [cookies, setCookie, removeCookie] = useCookies(["cookiesTest"]);
  /** Loading cookies or initializing new ones */
  const initialState =
    cookies.cookiesTest === undefined ||
    cookies.cookiesTest.responses === undefined
      ? {
          actualIndex: 0,
          responses: [],
          actualRadioGuess: "",
        }
      : {
          actualIndex: cookies.cookiesTest.actualIndex,
          responses: cookies.cookiesTest.responses,
          actualRadioGuess: cookies.cookiesTest.actualRadioGuess,
        };
  const [state, dispatch] = useReducer(reducer, initialState);

  /** Functions calling the differents cases, corresponding to the different actions */
  const changeIndexFromNorth = (newIndex) => {
    dispatch({ type: "fromNorth", newIndex: newIndex });
  };
  const changeIndexFromSouth = (userGuess) => {
    dispatch({
      type: "fromSouth",
      userGuess: userGuess,
    });
  };
  const changeRadioGuess = (radioGuess) => {
    dispatch({
      type: "radioGuess",
      radioGuess: radioGuess,
    });
  };
  const endTestCookies = () => {
    dispatch({
      type: "testEnd",
      removeCookie: removeCookie,
    });
  };

  useEffect(() => {
    // Updating cookies after an action
    setCookie("cookiesTest", state);
  }, [state]);

  return {
    state,
    changeIndexFromNorth,
    changeIndexFromSouth,
    changeRadioGuess,
    endTestCookies,
  };
};
