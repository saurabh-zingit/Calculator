import React from 'react';

const Button = (props) => {
  console.log(12345,props.state)
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Button;