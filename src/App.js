import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { database } from './firebase.js'
import display from './display.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:null,
      name:null,
      text:null
    }
    this.getNotes = this.getNotes.bind(this);
    this.clickData = this.clickData.bind(this);
  }

  componentDidMount(){
    this.getNotes();
  }

  getNotes() {
    var roots = database.ref().child('infors');
    var node = this
    roots.on('value', function(snapshot) {
      console.log(snapshot.val());
      node.setState({
        data:snapshot.val()
      })
    });
  }
  
  pushNote(note) {
    console.log(note.name,note.text)
    var roots = database.ref().child('infors');
    roots.push({
      kevin: 'Nice to do something'
    })
  }

  clickData(e){
    console.log(e)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

          <form onSubmit={() => {this.pushNote}}>
              <div className='form-group'>
                <input
                  onClick={() => {this.clickData}}
                  type='text'
                  name='name'
                  className='form-control no-border'
                  placeholder='name'
                />
              </div>
              <div className='form-group'>
                <input
                    type='text'
                    name='text'
                    className='form-control no-border'
                    placeholder='text'
                  />
              </div>
              <div className='form-group'>
                <button className='btn btn-primary col-sm-12 center-block'>input</button>
              </div>
            </form>
          {
            
          }
      </div>
    );
  }
}

export default App;
