import React, { Component } from 'react'
import logo from './flan_logo_eng_white_bg.png'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import './App.css';
import gcm from 'node-gcm'
import { GCM_ACCOUNT } from './Config'

class App extends Component {

  constructor(props) {
    super(props)
    this.sender = new gcm.Sender(GCM_ACCOUNT.SENDER)
    this.registrationTokens = [GCM_ACCOUNT.TOKEN]
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
      data: { message: this.state.input }
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
