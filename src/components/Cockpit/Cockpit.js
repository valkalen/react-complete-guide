import React from 'react';
import classes from './Cockpit.module.css';

const cockpit = (props) => {
    const btnClass = props.showPersons? classes.Red: '';
    const assignedClasses = [];
    if (props.persons.length <= 2) {
      assignedClasses.push(classes.red); //classes = ['red']
    }
    if (props.persons.length <= 1) {
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

export default cockpit;