import React from 'react';
import './Person.css';
//import Aux from '../../hoc/Aux';
import PropTypes from 'prop-types';
import classes from './Person.module.css'
import withClass from '../../hoc/withClass2';

class Person extends React.Component {
    render() {
        console.log('[Person.js] rendering...');
        // return (
        //     <div className={classes.Person}>
        //         <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
        //         <p>{this.props.children}</p>
        //         <input type="text" onChange={this.props.changed} value={this.props.name}></input>
        //     </div>
        // );

        //one way to render adjacent JSX elements without a div wrapper(remember React can only return a single element)
        // return [
        //     <p key='1' onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>,
        //     <p key='2'>{this.props.children}</p>,
        //     <input key='3' type="text" onChange={this.props.changed} value={this.props.name}></input>
        // ];

        //another way but it is a work around by the guy from the Udemy, he created his own component wrapper
        // return (
        //     <Aux>
        //         <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
        //         <p>{this.props.children}</p>
        //         <input type="text" onChange={this.props.changed} value={this.props.name}></input>
        //     </Aux>
        // );

        //the way I want to use in the future 
         return (
            <React.Fragment>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}></input>
            </React.Fragment>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, classes.Person);