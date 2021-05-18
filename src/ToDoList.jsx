import React from 'react';

const ToDoList = (props) => {
    return (
        <>
        <li> {props.text} <span onClick={() => {
           return props.onSelect(props.id);
        }}>x</span></li>
        </>
    );
}

export default ToDoList;