import React from "react";
import "../styles/ResultBar.css";
import PropTypes from "prop-types";


/**
 * component that represent the ratio of good answer
 * @param score an number that represent the ratio of good answer 0<= score<10
 * @returns {JSX.Element}
 */


export default function ResultBar({ score }) {
  return (
    <div className="resultBar">
      {typeof score === "number" && (
        <>
          <div
            className="resultBar-green"
            style={{ width: `${score * 10}%` }}
          />
          <div
            className="resultBar-red"
            style={{ width: `${(10 - score) * 10}%` }}
          />
        </>
      )}
      <div className="resultBar-middle" />
    </div>
  );
}

ResultBar.propTypes = {
  /** The score displayed */
  score: PropTypes.number,
};
