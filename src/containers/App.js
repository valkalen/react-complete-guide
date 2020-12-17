import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.module.css'
//import WithClass from '../components/hoc/WithClass';
import withClass from '../components/hoc/withClass2';


class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
  };

  state = {
    persons: [
      { id: 1, name: "Val", age: 28 },
      { id: 2, name: "Max", age: 29 },
      { id: 3, name: "Karen", age: 30 }
    ],
    otherState: 'hey',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  };

  //depricated!!!1 use either constructor or getDerivedStateFromProps
  // componentWillMount(){ 
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  };

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  };
  deletePersonHandler = (index) => {
    const persons = [...this.state.persons]; //copy the array first, slice() without args does the same thing
    persons.splice(index, 1);
    this.setState({ persons: persons });
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => p.id === id);
    const person = { ...this.state.persons[personIndex] }; //person is an object
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({ persons: persons });

    //when state depends on the previous states, you should use functions to update your state
    //the reason why is because React schedules updates and they might turn out to be out of sync in the end
    //this.setState({changeCounter: this.state.changeCounter + 1}); - incorrect way of updating the state
    //the right way would be this
    this.setState((prevState, props)=> {
      return {changeCounter: prevState.changeCounter + 1};
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    });
  };


  render() {
    console.log('[App.js] render');

    let persons = null;
    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangeHandler}
      />
    };
    //the first way of using Higher order components
    //this way is best used when you are adding some styling or html to your component
    // return (
    //   <WithClass classes={classes.App}>
    //     <button onClick={() => { this.setState({ showCockpit: false }) }}>Remove Cockpit</button>
    //     {this.state.showCockpit ? <Cockpit
    //       title={this.props.appTitle}
    //       showPersons={this.state.showPersons}
    //       personsLength={this.state.persons.length}
    //       clicked={this.togglePersonsHandler}
    //     /> : null}
    //     {persons}
    //   </WithClass>
    // );

    return (
      <React.Fragment>
        <button onClick={() => { this.setState({ showCockpit: false }) }}>Remove Cockpit</button>
        {this.state.showCockpit ? <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          clicked={this.togglePersonsHandler}
        /> : null}
        {persons}
      </React.Fragment>
    );
  }
}

//another way of creating a HOC
//this way is best used when you need to add some javascript login to your component, send some analytics data or perform some additional http request
export default withClass(App, classes.App);
