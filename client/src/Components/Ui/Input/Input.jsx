import React from 'react';

const Input = (props) => {
    return (
        <input 
            type="text" 
            className="form-control" 
            placeholder={props.placeholder} 
            {...props} 
        />
    );
}

export default Input;
