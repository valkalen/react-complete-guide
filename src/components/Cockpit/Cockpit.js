import React, { useEffect } from 'react';
import classes from './Cockpit.module.css';

const Cockpit = (props) => {
  //use useEffect instead of componentDidMount and componentDidUpdate, the same effect
  //this useEffect will only run on componentDidMount and componentWillUnmount events
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    //Http request go here
    //you can have multiple useEffects
    //if you need to check the state, use useState functional hook
    const timer = setTimeout(() => {
      alert('Saved data to cloud');
    }, 1000);
    return () => {
      clearTimeout(timer);
      console.log('[Cockpit.js] clean up work in useEffect'); //similar to componentWillUnmount
    }
  }, []); //add to the array objects that you want to run the effect when they change, for example [props.persons]
  //if you only want to run the effect only once just like componentDidMount, then you leave the array blank, []

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] clean up work in 2nd useEffect'); //similar to componentWillUnmount
    }
  }); //no argument array, means it will run on every update cycle

  const btnClass = props.showPersons ? classes.Red : '';
  const assignedClasses = [];
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); //classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); //classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!!!</p>
      <button
        className={btnClass}
        onClick={props.clicked}>Toggle Person
      </button>
    </div>
  );
};

export default React.memo(Cockpit); //similar to shouldComponentUpdate, it memorizes the state of a component