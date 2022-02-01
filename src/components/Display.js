import React from 'react';
import { Textfit } from 'react-textfit';

const Display = (props) => {
  return (
    <Textfit className='display' mode="single" max={70}>
      {props.value}
    </Textfit>
  );
};

export default Display;