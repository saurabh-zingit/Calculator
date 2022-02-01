import React, { Component } from 'react';
import Calc from "./components/Calc";
import Display from "./components/Display";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import "./App.css";
import { useState } from "react";
import axios from 'axios';
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      sign: "", // selected sign
      num: 0,   // entered value
      res: 0,   // result
      btns:[]
    };
  }

  componentDidMount = () => {
    this.getCalculatorData();
  }

  getCalculatorData = async () =>{
    await axios.get('http://localhost:4000/api')
    .then((response) => {
      const data=response.data[0].buttons;
      this.setState({
        btns:data
      });
    })
    .catch((err)=>{
      console.error(123,err);
      alert('Error retrieving data',err);
    });
  }

  numClick = (no) => {
    this.setState({
      num: Number(this.state.num.toString()+no.toString())
    }); 
  };

  decimalClick = () => {
    this.setState({
      num: this.state.num.toString()+"."
    }); 
  };

  signClick = (sign) => {
    this.setState({
      sign: sign,
      res: this.state.num?this.state.num:this.state.res,
      num: 0
    });  
  };  

  equalsClick = () => {
    const sign=this.state.sign;
    if(sign) {
      if(sign==="+") this.setState({
        res:this.state.num+this.state.res,
        num:0
      });  
      else if(sign==="-") this.setState({
        res:this.state.res-this.state.num,
        num:0
      });  
      else if(sign==="X") this.setState({
        res:this.state.res*this.state.num,
        num:0
      });
      else {
        if(this.state.num===0) this.setState({
          res:"Can't divide by 0",
          num:0
        });  
        else this.setState({
          res:this.state.res/this.state.num,
          num:0
        });
      }
    }
  };

  invertClick = () => {
    this.setState({
      num:0,
      res:this.state.num*-1
    });
  };

  percentClick = () => {
    this.setState({
      res:this.state.num/100,
      num:0
    });
  };

  resetClick = () => {
    this.setState({
      sign: "", // selected sign
      num: 0,   // entered value
      res: 0,   // result
    });
  };

  handleClick = (e) => {
    console.log(e.target.innerText)
    const btn=e.target.innerText;
    return btn === "C" ? this.resetClick(btn) :
    btn === "=" ? this.equalsClick(btn) :
    btn === "." ? this.decimalClick(btn) :
    btn === "+-" ? this.invertClick(btn) :
    btn==="+" || btn==="-" || btn==="X" || btn==="/" ? this.signClick(btn) :
    btn === "%" ? this.percentClick(btn) :
    this.numClick(btn)        
  };  
  
  render(){
    return (
      <Calc>
        <Display value={this.state.num ? this.state.num : this.state.res}/>
        <ButtonBox>
          {
            this.state.btns.map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={this.handleClick}
                  state={this.state}
                />
              );
            })
          }
         </ButtonBox>
      </Calc>    
    );
  }
}

export default App;