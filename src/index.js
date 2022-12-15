import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import {Textfit} from "react-textfit";

var number = ''
var result = 0

function Screen(props){
  return(
    <Textfit className='screen' mode='single' max={70}>
      {props.value}
    </Textfit>
  )
}

function Numbers(props){
  return(
    <button className='number' onClick= {props.onClick}>
      {props.value}
    </button>
  )
}

function Operations(props){
  return(
    <button className='operation' onClick={props.onClickop}>
      {props.value}
    </button>
  )
}

function Board(props){
  return(
    <div className='board'>
      {props.children}
    </div>
  )
}
class Wrapper extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value : 0,
      value1 : 0,
      value2 : 0,
      sign : '',
    }
  }  
  renderNumber(i){
    return(<Numbers
            value = {i}
            onClick={()=> this.handlenumbers(i)}
            />)            
  }
  renderOperation(i){
    return(<Operations
    value = {i}
    onClickop={() => this.handleOperations(i)}
    />
    )
  }
  handlenumbers(i){
    console.log(typeof(number))
    if (i ==='.' && number.includes('.'))
      console.log('Ya tiene la coma')
    else
      number = number ? ''+number+i : number + i;

    if(this.state.sign === '' || this.state.sign === '?'){
      this.setState({
        value1 : +number,
        value : number,
      })}
    else{
      this.setState({
        value2: +number,
        value : number,
      })
    }
  }
  handleOperations(i){
    number = ''
    this.setState({
        sign : i,
    })
    if(i === '='){
      switch(this.state.sign){
        case '/':
          result = this.state.value1 / this.state.value2
          console.log('/')
          break;
        case '+':
          result = this.state.value1 + this.state.value2
          console.log('+')
          break;
        case '-':
          result = this.state.value1 - this.state.value2
          console.log('-')
          break;
        case '*':
          result = this.state.value1 * this.state.value2
          console.log('*')
          break;
      }
      this.setState({
        value : result,
        value1 : result,
        sign : '?'
      })

      console.log(this.state.value1 + ', ' + this.state.value2 + ', ' + result)
    }
    if(i === 'C'){
      console.log('C')
      this.setState({
        value : '',
        sign : '', 
      })  
    }
  }
  render(){
    return(
      <Board>
        <div className='calculator-screen'>
          <Screen
          value = {this.state.value}
          />
          
        </div>
        <div className='calculator-row'>
          {this.renderOperation('C')}
          {this.renderOperation('/')}
        </div>
        <div className='calculator-row'>
          {this.renderNumber(7)}
          {this.renderNumber(8)}
          {this.renderNumber(9)}
          {this.renderOperation('+')}
        </div>
        <div className='calculator-row'>
          {this.renderNumber(4)}
          {this.renderNumber(5)}
          {this.renderNumber(6)}
          {this.renderOperation('-')}
        </div>
        <div className='calculator-row'>
          {this.renderNumber(3)}
          {this.renderNumber(2)}
          {this.renderNumber(1)}
          {this.renderOperation('*')}
        </div>
        <div className='calculator-row'>
          {this.renderNumber(0)}
          {this.renderNumber('.')}
          {this.renderOperation('=')}
        </div>
      </Board>
    )
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Wrapper/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
