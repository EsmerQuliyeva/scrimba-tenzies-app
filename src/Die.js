import React from "react";

const Die = (props) => {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "#ffffff",
  };
  return (
    <div className="btns">
      <button style={style} onClick={props.holdDice}>
        {props.value}
      </button>
    </div>
  );
};

export default Die;


