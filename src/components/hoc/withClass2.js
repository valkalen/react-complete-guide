import React from 'react';
//passing props to the hoc components
const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            {<WrappedComponent {...props}/>}
        </div>
    );
};

export default withClass;