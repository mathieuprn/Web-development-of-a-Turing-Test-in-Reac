import React from "react";
import PropTypes from "prop-types";

export default RadioButtonsSarTypeList;
/**
 * A component made for the TestScreen, for the SAR Type guess.
 */
function RadioButtonsSarTypeList(props) {
  const sarTypesTop = [
    "Pure Ocean Swell (POS)",
    "Wind Streaks (WS)",
    "Micro Convec. Cell (MCC)",
    "Low Wind Area (LWA)",
    "Biological Slicks (BS)",
  ];
  const sarTypesBottom = [
    "Sea Ice (SI)",
    "Rain Cell (RC)",
    "Iceberg (IB)",
    "Atmospheric Front (AF)",
    "Oceanic Front (OF)",
  ];

  const doArrayTop = sarTypesTop.map((value, index) => (
    <RadioButtonSarType
      key={index}
      index={index}
      classNameLabel={"RadioButtonLabel"}
      classNameButton={"RadioButton"}
      buttonText={value}
      isChecked={props.selectedRadioButtonValue === value}
      onChange={(event) =>
        props.setSelectedRadioButtonValue(event.target.value)
      }
      handleMouseEnter={() => props.setHover(-2)}
      handleMouseLeave={() => props.setHover(0)}
    />
  ));
  const doArrayBottom = sarTypesBottom.map((value, index) => (
    <RadioButtonSarType
      key={index}
      index={index}
      classNameLabel={"RadioButtonLabel"}
      classNameButton={"RadioButton"}
      buttonText={value}
      isChecked={props.selectedRadioButtonValue === value}
      onChange={(event) =>
        props.setSelectedRadioButtonValue(event.target.value)
      }
      handleMouseEnter={() => props.setHover(-2)}
      handleMouseLeave={() => props.setHover(0)}
    />
  ));
  return (
    <div className="RadioButtonsList">
      <div className="RadioButtonRow">{doArrayTop}</div>
      <div className="RadioButtonRow">{doArrayBottom}</div>
    </div>
  );
}

function RadioButtonSarType({
  classNameLabel,
  index,
  buttonText,
  classNameButton,
  isChecked,
  onChange,
  handleMouseEnter,
  handleMouseLeave,
}) {
  return (
    <label
      className={classNameLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        type="radio"
        name={"RadioButton " + index}
        value={buttonText}
        className={classNameButton}
        checked={isChecked}
        onChange={onChange}
      />
      {buttonText}
    </label>
  );
}

RadioButtonsSarTypeList.propTypes = {
  /** The actual SAR Type guess */
  selectedRadioButtonValue: PropTypes.string,
  /** A function used to change the SAR Type guess value stored */
  setSelectedRadioButtonValue: PropTypes.func,
  /** A function used to change the style of a component if the mouse enters it for example */
  setHover: PropTypes.func,
};

RadioButtonSarType.propTypes = {
  /** The style class name of the Label of each button */
  classNameLabel: PropTypes.string,
  /** The index of the button in the list */
  index: PropTypes.number,
  /** The text displayed on the button */
  buttonText: PropTypes.string,
  /** The style class name of each button */
  classNameButton: PropTypes.string,
  /** A boolean which indicates wether the button is disabled or not */
  isChecked: PropTypes.bool,
  /** A function called when the selected value of the radio button group changes */
  onChange: PropTypes.func,
  /** Function called when the mouse enters the component */
  handleMouseEnter: PropTypes.func,
  /** Function called when the mouse leaves the component */
  handleMouseLeave: PropTypes.func,
};
