import React from 'react';
import Calc from "./components/Calc";
import Display from "./components/Display";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import "./App.css";
import { useState } from "react";

const btns = [
  "C", "+-", "%", "/",
  7, 8, 9, "X",
  4, 5, 6, "-",
  1, 2, 3, "+",
  0, ".", "=",
];

const App = () => {
  let [calc, setCalc] = useState({
    sign: "", // selected sign
    num: 0,   // entered value
    res: 0,   // result
  });

const numClick = (num) => {
    setCalc({
      ...calc,
      num: Number(calc.num.toString()+num.toString())
    })    
    
  };

  const decimalClick = () => {
    setCalc({
      ...calc,
      num: calc.num.toString()+"."
    })
  };

  const signClick = (sign) => {
    setCalc({
      ...calc,
      sign: sign,
      res: calc.num?calc.num:calc.res,
      num: 0
    });
    
  };

  const equalsClick = () => {
    const sign=calc.sign;
    if(sign) {
      if(sign==="+") setCalc({
        ...calc,
        res:calc.num+calc.res,
        num:0
      });
      else if(sign==="-") setCalc({
        ...calc,
        res:calc.res-calc.num,
        num:0
      });
       else if(sign==="X") setCalc({
        ...calc,
        res:calc.res*calc.num,
        num:0
      });
      else {
        if(calc.num===0) setCalc({
          ...calc,
          res:"Can't divide by 0",
          num:0
        });
        else setCalc({
          ...calc,
          res:calc.res/calc.num,
          num:0
          });
      }
    }
  };

  const invertClick = () => {
    setCalc({
      ...calc,
      num:0,
      res:calc.num*-1
    })
  };

  const percentClick = () => {
    setCalc({
      ...calc,
      res:calc.num/100,
      num:0
    })
  };

  const resetClick = () => {
    setCalc({
    sign: "", // selected sign
    num: 0,   // entered value
    res: 0,   // result
  })
  };

  const handleClick=(e)=>{
    // console.log(e.target.innerText)
    const btn=e.target.innerText;
    return btn === "C" ? resetClick(btn) :
    btn === "=" ? equalsClick(btn) :
    btn === "." ? decimalClick(btn) :
    btn === "+-" ? invertClick(btn) :
    btn==="+" || btn==="-" || btn==="X" || btn==="/" ? signClick(btn) :
    btn === "%" ? percentClick(btn) :
    numClick(btn)        
  };
  return (
    <Calc>
      <Display value={calc.num ? calc.num : calc.res}/>
      <ButtonBox>
        {
          btns.map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={handleClick}
              />
            );
          })
        }
      </ButtonBox>
    </Calc>    
  );
};

export default App;