import { createContext, useState, useEffect } from 'react';
import ToDoList from './ToDoList';
import ComA from './ComA'
import axios from 'axios';

// Redux

const {redux, createStore, combineReducers, applyMiddleware  } = require('redux');

const initStateBooks = {
    numberOfBooks:10
}
const initStatePens = {
    numberOfPens:5
}

// Action Function Define
function buyBook(){
    return {
        type : "Buy_Book",
        info : "My Book Redux"
    }
}

function buyPen(){
    return {
        type : "Buy_Pen",
        info : "My Pen Redux"
    }
}

// (prevState, action)=> newState

const bookReducer = (state = initStateBooks, action) => {
    switch(action.type){
        case "Buy_Book" : return {
            ...state,
            numberOfBooks: state.numberOfBooks -1
        }
        default : return state;
    }
} 
const penReducer = (state = initStatePens, action) => {
    switch(action.type){
        case "Buy_Pen" : return {
            ...state,
            numberOfPens: state.numberOfPens + 2
        }
        default : return state;
    }
} 

const Reducer = combineReducers({
    Books: bookReducer,
    Pens : penReducer
})


const logger = store => {
    return next => {
        return action => {
            const result = next(action);
            console.log("middleware log", result);
            return result;
        }
    }
}

const store = createStore(Reducer, applyMiddleware(logger));
console.log('initial State ', store.getState());
const unsubscribe = store.subscribe(()=>{console.log('Updated State Value', store.getState())});
store.dispatch(buyBook());
store.dispatch(buyPen());
unsubscribe();


// End

const FirstName = createContext();
const LastName = createContext();

function App() {
    const state = useState();
    const [count, setCount] = useState(0);
    const IncFun = () => {
        setCount(count + 1);
    }
    const DicFun = () => {
        if(count > 0){
            setCount(count - 1);
        }
    }

    const [num, setNumCount] = useState(0);
    const IncNumFun = () => {
        setNumCount(num + 1);
    }
    const DicNumFun = () => {
        if(num > 0){
            setNumCount(num - 1);
        }
    }

    const [myNum, setMyNum] = useState(0);

    const MyNumFun = () => {
        setMyNum(myNum + 1);
    }

    useEffect(() => {
        document.title= `You Click me ${myNum}` 
    },[myNum])


    const [chgNum, setChgNum] = useState(0);

    useEffect(() => {
        async function getData() {
            const res = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${chgNum}`
            );
            console.log(res.data.name);
        }
        getData();
    });

    let Time = new Date().toLocaleTimeString();

    const [CrntTime, setCrntTime] = useState(Time);

    const getTimeFun = () => {
        Time = new Date().toLocaleTimeString();
        setCrntTime(Time);
    }
    setInterval(getTimeFun, 1000)

    let insClr = "#ccc"
    const [Clr, SetClr] = useState(insClr);

    const ChgClrFun = () => {
        let newClr = "green"
        SetClr(newClr);
    }

    const onlyflName = ['Rahul', 'Sharma']
    const bioData = [1,...onlyflName, 26, 'Male']


    // form Part

    const [fullName, setFullName] = useState({
        fName : "",
        lName : "" ,
        email : "",
        phone : "",
    });

    const inputEvent = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        console.log(name);

        setFullName((preValue) => {
            return{
                ...preValue,
                [name] : value
            }
        });

       /* setFullName((preValue) => {
            console.log(preValue);
            if(name === "fName"){
                return{
                    fName : value,
                    lName : preValue.lName,
                    email : preValue.email,
                    phone : preValue.phone, 
                }
            }  else  if(name === "lName"){
                return{
                    lName : value, 
                    fName : preValue.fName,
                    email : preValue.email,
                    phone : preValue.phone, 
                }
            } else  if(name === "email"){
                return{
                    email : value, 
                    lName : preValue.lName,
                    fName : preValue.fName,
                    phone : preValue.phone, 
                }
            } else  if(name === "phone"){
                return{
                    phone : value, 
                    lName : preValue.lName,
                    fName : preValue.fName,
                    email : preValue.email, 
                }
            } 

        });*/
    }

    const onSubmits = (event) => {
        event.preventDefault();
        alert('Eneter');
    }

    // end

    // todo List

    const [item, setItem] = useState("");
    const [listItem, setListItem] = useState([]);

    const EventChange = (event) => {
        setItem(event.target.value);
    }

    const EventClick = () => {
       setListItem((oldItem) => {
            return[...oldItem, item];
       });
       setItem(" ");
    };

    const onDelete = (id) => {
        setListItem((oldItem) => {
            return oldItem.filter((crntItem, index) => {
                return index !== id;
            });
        });
    }

    // end

    

    return ( 
        <>
        <div style={{ background: Clr }}>
        <h2> {count} </h2>   
        <button onClick={IncFun} > Increase </button>  
        <button onClick={DicFun}> Dicrease </button>   

        <h2> {num} </h2>   
        <button onClick={IncNumFun} > Increase </button>  
        <button onClick={DicNumFun}> Dicrease </button>  

        <h2>{Time}</h2>
        <button onClick={getTimeFun} >Get Time</button> 
        <button onClick={ChgClrFun}>Change Colour</button>
        
        <form onSubmit={onSubmits}>
            <h2>Hello {fullName.fname} {fullName.lname}</h2>
            <input
                type="text"
                placeholder="Name"
                name="fName"
                onChange={inputEvent}
                value={fullName.fname}
            />
            <br /><br />
            <input
                type="text"
                placeholder="Last Name"
                name="lName"
                onChange={inputEvent}
                value={fullName.lname}
            />
            <br /><br />
            <input
                type="text"
                placeholder="Email"
                name="email"
                onChange={inputEvent}
                value={fullName.email}
            />
            <br /><br />
            <input
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={inputEvent}
                value={fullName.phone}
            />
            <br /><br />
            <button type="submit">Click Me</button>
            <br /><br />
        </form>

        <div className="mainDiv">
            <h2>TODO List</h2>                
            <br/>
            <input type="text" placeholder="Enter your Item" value={item} onChange={EventChange} /> <br /><br />
            <button type="submit" value={item} onClick={EventClick}>Enter</button>
            
                <ul>
                    {listItem.map((listItemVal, index) => {
                        return (
                            <ToDoList 
                            key = {index}
                            id = {index}
                            text={listItemVal} 
                            onSelect={onDelete}    
                        /> 
                        )
                    })}
                </ul>
            
        </div>

        </div>


        <FirstName.Provider value={"Rahul Sharma"}>
            <LastName.Provider value={"webDeveloper"}>
                <ComA />
            </LastName.Provider>
        </FirstName.Provider>
        
        
        <button onClick={MyNumFun} >Click Me usestate / UseEffects {myNum}</button>
         
         <h2>You Select {chgNum}</h2>
         <select value="2" onChange={(event) => {
             setChgNum(event.target.value);
         }}>
             <option> 2</option>
             <option>4</option>
             <option>6</option>
             <option>8</option>
             <option>10</option>
         </select>            

        </> 
    );
};

export default App;
export { FirstName , LastName};