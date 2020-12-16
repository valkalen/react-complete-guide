import React from 'react';
import Person from './Person/Person';

class Persons extends React.Component {
  // static getDerivedStateFromProps(props, state){
  //   console.log('[Persons.js] getDerivedStateFromProps', props);
  //   return state;
  // }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[Persons.js shouldComponentUpdate]',nextProps, nextState);
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('[Persons.js] getShapShotBeforeUpdate');
    return {mgs: 'Sanpshot!'};
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('[Persons.js] componentDidUpdate', prevProps, prevState, snapshot);
  }
  render() {
    console.log('[Persons.js rendering...]');
    return this.props.persons.map((person, index) => {
      return (<Person
        key={person.id}
        name={person.name}
        age={person.age}
        click={() => this.props.clicked(index)}
        changed={(event) => this.props.changed(event, person.id)}
      />
      )
    })
  }
};

export default Persons;