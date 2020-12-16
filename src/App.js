
//Hooks way
// import React, { useState } from 'react';
// import './App.css';
// import Person from './Person/Person';

// const app = () =>{ 
//   const [personsState, setPersonsState] = useState({
//     persons: [
//       {name: "Val", age: 28},
//       {name: "Max", age: 29},
//       {name: "Karen", age: 30}
//     ],
//     otherState:  'hey'
//   });

//You can have as many useState cases as you want
// Hooks completly replace NOT merge state. Make sure you don't loose your other state. Work around is to create multiple useStates
//   const switchNameHandler = () => {
//   setPersonsState({
//     persons: [
//       {name: "Valentino", age: 28},
//       {name: "Max", age: 29},
//       {name: "Karen", age: 31}
//     ]
//   })}

//   return (
//     <div className="App">
//       <h1>Hi, I'm a React App</h1>
//       <button onClick={switchNameHandler}>Switch Name</button>
//       <Person name={personsState.persons[0].name} age={personsState.persons[0].age}>My Hobbies: none</Person>
//       <Person name={personsState.persons[1].name} age={personsState.persons[1].age}/>
//       <Person name={personsState.persons[2].name} age={personsState.persons[2].age}>My Hobbies: Snowboarding</Person>
//     </div>
//   );
//   // return React.createElement('div',{className: 'App'}, React.createElement('h1', null, 'Hello Val!'));

// }

// export default app;


import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import classes from './App.module.css'
//import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
//import styled from 'styled-components';
//import Radium, {StyleRoot} from 'radium';



// const StyledButton = styled.button`
//     background-color: ${props => props.alt? 'red': 'green'};
//     color: white;
//     font: inherit;npm run 
//     border: 1px solid blue;
//     padding: 8px;
//     cursor: pointer;

//     &:hover {
//       background-color: ${props => props.alt? 'salmon': 'lightgreen'};
//       color: black;
//     }
//   `;


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
    //console.log('Was clicked');
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: "Max", age: 29 },
        { name: "Karen", age: 31 }
      ]
    })
  }
  deletePersonHandler = (index) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons]; //copy the array first, slice() without args does the same thing
    persons.splice(index, 1);
    this.setState({ persons: persons });
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = { ...this.state.persons[personIndex] }; //person is an object
    //const person = Object.assign({}, this.state.persons[personIndex]); alternative to the methond above
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
    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ':hover': {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // };
    let btnClass = '';

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            //return <ErrorBoundary key={person.id}>
            return <Person
              key={person.id}
              name={person.name}
              age={person.age}
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangeHandler(event, person.id)}
            />
            //</ErrorBoundary>
          })}
        </div>
      );
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // }

      btnClass = classes.Red;
    }

    //let classes = ['red', 'bold'].join(' ');

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red); //classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold); //classes = ['red', 'bold']
    }

    return (
      //<StyleRoot>
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!!!</p>
        <button
          //style={style}
          className={btnClass}
          //key='key1'
          //alt = {this.state.showPersons}
          onClick={this.switchNameHandler.bind(this, "Valik")}>Switch Name
          </button>
        <button
          className={btnClass}
          //key='key2'
          // alt = {this.state.showPersons}
          onClick={this.togglePersonsHandler}>Toggle Person
            {/* or you can do this onClick={()=>this.togglePersonsHandler()}>Toggle Person*/}
        </button>
        {persons}
        {/* alternative syntax
          this.state.showPersons === true?
          <div>
          <Person 
              name={this.state.persons[0].name} 
              age={this.state.persons[0].age}>My Hobbies: none</Person>
          <Person 
              name={this.state.persons[1].name} 
              age={this.state.persons[1].age}
              click={this.switchNameHandler.bind(this, "Valentin")}
              changed={this.nameChangeHandler}/>
          <Person 
              name={this.state.persons[2].name} 
              age={this.state.persons[2].age}>My Hobbies: Snowboarding</Person>
        </div> : null*/
        }
      </div>
      //  </StyleRoot>
    );
    // return React.createElement('div',{className: 'App'}, React.createElement('h1', null, 'Hello Val!'));
  }
}

//export default Radium(App);
export default App;
