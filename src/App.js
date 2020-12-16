import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import classes from './App.module.css'


class App extends Component {
  state = {
    persons: [
      { id: 1, name: "Val", age: 28 },
      { id: 2, name: "Max", age: 29 },
      { id: 3, name: "Karen", age: 30 }
    ],
    otherState: 'hey',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: "Max", age: 29 },
        { name: "Karen", age: 31 }
      ]
    })
  }
  deletePersonHandler = (index) => {
    const persons = [...this.state.persons]; //copy the array first, slice() without args does the same thing
    persons.splice(index, 1);
    this.setState({ persons: persons });
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = { ...this.state.persons[personIndex] }; //person is an object
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  }


  render() {

    let btnClass = '';

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              key={person.id}
              name={person.name}
              age={person.age}
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangeHandler(event, person.id)}
            />
          })}
        </div>
      );


      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red); //classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold); //classes = ['red', 'bold']
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!!!</p>
        <button
          className={btnClass}
          onClick={this.switchNameHandler.bind(this, "Valik")}>Switch Name
          </button>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Person
        </button>
        {persons}
       
      </div>
    
    );
  
  }
}

export default App;
