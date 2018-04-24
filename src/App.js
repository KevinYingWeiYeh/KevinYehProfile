import React, { Component } from 'react';
import './App.css';
import { database } from './firebase.js'
import _ from 'lodash'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:null,
      name:null,
      text:null
    }
    this.getNotes = this.getNotes.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.pushNote = this.pushNote.bind(this);
  }

  componentDidMount(){
    this.getNotes();
  }

  getNotes() {
    let node = this;
    database.on('value', function(snapshot) {
      node.setState({
        data:snapshot.val()
      })
    });
  }
  
  pushNote(e) {
    e.preventDefault()
    console.log(this.state.name,this.state.text)
    database.push({
      name: this.state.name,
      text: this.state.text
    })
  }

  handleChange(e){
    console.log(e.target.name,e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deleteNote(key){
    database.child(key).remove()
  }

  renderNotes(){
    return _.map(this.state.data, (note, key) => {
      return (
        <div style={{padding: 10}} key = {key}>
          <div className=" jumbotron panel panel-default">
            <p>Name：{note.name}</p>
            <p>Text：{note.text}</p>
            <button className='btn btn-danger btn-xs center-block' onClick={() => this.deleteNote(key)}>Delete</button>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Kevin Yeh Personal Profile Ver 0.1 April.24 2018 </h1>
        </header>
          <div className='container-fluid '>
            <form style={{padding: 10}} onSubmit={this.pushNote}>
                <div className='form-group'>
                  on-line messager 
                  <input
                    onChange={this.handleChange}
                    value={this.state.account}
                    type='text'
                    name='name'
                    className='form-control no-border'
                    placeholder='Your name:'
                  />
                </div>
                <div className='form-group'>
                  <input
                      onChange={this.handleChange}
                      value={this.state.account}
                      type='text'
                      name='text'
                      className='form-control no-border'
                      placeholder='The text you want to tell Kevin Yeh'
                    />
                </div>
                <div className='form-group'>
                  <button className='btn btn-primary col-sm-12 center-block'>input</button>
                </div>
              </form>
            </div>
            <br/>
          {
            this.renderNotes()
          }
      </div>
    );
  }
}

export default App;
