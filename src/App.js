
import './App.css';
import React,{useEffect,useState} from 'react';
import Form from './components/Form';
import Hotels from './components/Hotels';
import axios from 'axios';

const baseURL = "http://holidaypackages.exploreindiataxi.com/publicGetallState.php";

function App() {
  const [currentState, setCurrentState] = useState();
   
  const [stateId, setStateId] = useState();


    const handleChangeState = (event) => {
      console.log(event.target.value,"mmmmm")
      setStateId(event.target.value)
    }

    console.log(stateId,"nnnnn")
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      console.log(response.data)
      setCurrentState(response.data.data);
    });
  }, []);
  if(!currentState) return null;
  return (
    <>
    <div className="lg:bg-emerald-500 pb-2 sm:bg-green-500 text-white h-24 lg:w-full sm:w-full flex">
    <select className="font-semibold border-2 p-2 rounded-md ml-48 mt-10 bg-emerald-500 text-white text-2xl" onChange={handleChangeState}>
    {currentState.map((element) => <option value={element.id} >{element.state}</option>)}
    </select>
    </div>
      <div className="h-full w-full mb-14 grid justify-items-center">
        <div className="border-2 mt-14 rounded-3xl shadow-lg p-10 overflow-hidden grid lg:grid-cols-2 sm:grid-cols-1">
          <div className='pr-10'>
            <Form />
          </div>
          <div>
          <Hotels stateId={stateId}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
