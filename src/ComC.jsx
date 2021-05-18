import React, { useContext } from 'react';
import ComA from './ComA'
import {FirstName, LastName} from './App'

const ComC = () => {
    
    const fname = useContext(FirstName);
    const lname = useContext(LastName);

    return(
        <>
            <h2>What is {fname} {lname}</h2>
        </>
    )
}

export default ComC