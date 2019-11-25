import React, { Component } from 'react'
import axios from 'axios'
import Sketch from 'react-p5'

import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

const centerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

export default class game extends Component {
    x=50
    y=50
  constructor(props){
    super(props)
    this.state={
      speedX:0,
      selectedFile: null
    }
    this.setup=this.setup.bind(this)
    this.draw=this.draw.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
    
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    );
  }
   componentDidMount(){
     axios.get('http://localhost:1000/run').then(res=>{
       console.log(res.data.speed)
       this.setState({speedX:res.data.speed})
     }).catch(err=>{
       console.log(err)
     })
   }
    setup = (p5, canvasParentRef) => {
      p5.createCanvas(1000, 600).parent(canvasParentRef)
    }
    draw = (p5)=> {
      
      p5.background(0)
      p5.ellipse(this.x, this.y, 70, 70)
      // NOTE: Do not use setState in draw function or in functions that is executed in draw function... pls use normal variables or class properties for this purposes
      this.x=this.x+this.state.speedX
    }

    onChangeHandler=event=>{

      this.setState({
        selectedFile: event.target.files[0],
        loaded: 0,
      })
  
  }
  onClickHandler = () => {
    const data = new FormData() 
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:1000/upload", data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res)
      })
}

    
   
    render() {
      return (<div>

<Grid container>
      <Grid item lg={4} xs={6}>

     <h1 align="center">Please upload your file</h1>
     <div className={centerStyle}>
     <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput}  name="file" onChange={this.onChangeHandler}/>
        </label>
        <br />
        <Button onClick={this.onClickHandler}>Submit</Button>
      </form>
     </div>
     
      </Grid>
      <Grid item lg={8} xs={6}>
      <Sketch setup={this.setup} draw={this.draw} />

      <Grid container>
      <Grid item lg={4} xs={4}>
      <Button
            variant="contained"
            color="primary"
          >Play</Button>
      </Grid>
      <Grid item lg={4} xs={4}>
      <Button
            variant="contained"
            color="primary"
          >Next turn</Button>
      </Grid>
      <Grid item lg={4} xs={4}>
      <Button
            variant="contained"
            color="primary"
          >Previous turn</Button>
      </Grid>
      </Grid>
      
         
          
      </Grid>

      </Grid>


      </div>
      
      )

    }
}


