import React, {PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state){
  //   console.log('[Persons.js] getDerivedStateFromProps', props);
  //   return state;
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[Persons.js shouldComponentUpdate]', nextProps, nextState);
  //   if (
  //     nextProps.persons !== this.props.persons ||
  //     nextProps.changed !== this.props.changed ||
  //     nextProps.clicked !== this.props.clicked
  //   ) {
  //     return true;
  //   }
  //   return false; //do not update
  // }

  //with PureComponent shouldComponentUpdate is not needed since PureComponent performs check on every property that is passed to Persons
  //You don't need implement shouldComponentUpdate or React.meme on every component, because some of the component always update. Only implement
  //them where it effects performance

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getShapShotBeforeUpdate');
    return { mgs: 'Sanpshot!' };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate', prevProps, prevState, snapshot);
  }

  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
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