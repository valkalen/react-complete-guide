import React from 'react';
import './Person.css';
//import Aux from '../../hoc/Aux';
import PropTypes from 'prop-types';
import classes from './Person.module.css'
import withClass from '../../hoc/withClass2';
import AuthContext from '../../../context/auth-context';

class Person extends React.Component {
    //belongs to the second way of uising ref 2.
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        //belongs to the first way of using reference 1.
        //this.inputElement.focus();


        //belongs to the second way of using reference 2.
        this.inputElementRef.current.focus();
    }

    render() {
        console.log('[Person.js] rendering...');
        //the way I want to use in the future 
        return (
            <React.Fragment>
                <AuthContext.Consumer>
                    {(context) => context.authenticated? <p>Authenticated</p> : <p>Please log in</p> }
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input
                    type="text"
                    //belongs to the first way of using ref 1.
                    //ref={(inputElement) => {this.inputElement = inputElement}}
                    onChange={this.props.changed}
                    //belongs to the second way of using ref 2.
                    ref={this.inputElementRef}
                    value={this.props.name}
                />
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