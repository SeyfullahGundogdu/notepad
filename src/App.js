import React from 'react';
import './index.scss';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value: "",
      token:"",
      text:""
    }
    this.pathName="";
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  handleSaveClick(){
    const saveNoteOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({data: this.state.value})
    };  
    fetch('http://34.91.60.161:7373/save', saveNoteOptions)
      .then(response => response.text())
      .then((data) => {
        this.setState({token: data})
        console.log("token: " + this.state.token);
        window.location.pathname = this.state.token;
      });
  }
  componentDidMount(){
    if(window.location.pathname !== "/"){
      this.pathName = window.location.pathname.slice(1)
      const getNoteOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: this.pathName
      };
      console.log(this.pathName);
      fetch('http://34.91.60.161:7373/get', getNoteOptions)
        .then(response => response.text())
        .then((data) => {
          this.setState({value: data})
          console.log("value is " + data);
        });
    }
  }
  
  
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  render(){
    let textArea;
    if(this.pathName === ""){
      textArea = <textarea value={this.state.value} onChange={this.handleChange} placeholder="Enter your note here."/>
    } else {
      textArea = <textarea value={this.state.value} onChange={this.handleChange} placeholder="Enter your note here." readOnly />
    }
    return (
      <div className="container">
        {this.pathName !== "" &&
          <h2>Your Note Is:</h2>
        }
        {textArea}
        {this.pathName === "" &&
          <button className="save-button" onClick={this.handleSaveClick}>
            <div>
              <i className="save-icon material-icons">save</i>
              <p>Save</p>
            </div>
          </button>
        }
      </div>
    )
  }
}
export default App;
