import React, { Component } from 'react'
import logo from './flan_logo_eng_white_bg.png'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import './App.css';
import gcm from 'node-gcm'

class App extends Component {

  constructor(props) {
    super(props)
    this.sender = new gcm.Sender('AIzaSyCTjFXhiconyIyI6eSFzlUgE16DC97lNiU')
    this.registrationTokens = ['e94EA69sqMo:APA91bF6lD_2virW3dI4EZKheGOu7k7WDxIvf2FGhYauT8QfO-4urKsnlJRypT0l0wRrG-WvdeprQ1uyEJ687xH06P_ANVXMuw81iJFsc7Oh-OYK3avNWW4iBWXRGEeQDzzDHHeWiS91']
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)    
    this.state = {
      input: '',
    }
  }

  componentDidMount() {    
    // ...
  }

  handleClick() {
    // Prepare a message to be sent
    if(this.state.input === '') {
      alert('content can not be null')
      return      
    }

    let message = new gcm.Message({
      data: { key1: this.state.input }
    });
    
    this.sender.send(message, { registrationTokens: this.registrationTokens }, 10, function (err, response) {
      if (err) console.error(err);
      else console.log(response);
    });
  }

  handleChange(e) {
    this.setState({ input: e.target.value })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">YOUR PERSONAL TRAVEL ASSISTANT</h1>
        </header>
        <div className="App-gcm">
          <TextField
            id="gcm"
            label="gcm message"
            multiline
            margin="normal"
            onChange={ this.handleChange }
          />
          <br/>
          <br/>
          <Button raised color="accent" onClick={ this.handleClick }>
            send message
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
