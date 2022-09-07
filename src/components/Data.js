import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Data = (props) => {
  const location = useLocation();
  const data = location.state;
  return (
    <>
      <div className="h-full w-full mb-14 grid justify-items-center">
        <div className="border-2 mt-14 rounded-3xl shadow-lg p-10 overflow-hidden grid">
          Greetings<br />
          AS per your requirements find rates as below...
          <div>
        {data.map((element,index) =>
        <div key={index} className="m-5"> 
          <p>*{element.hotel_name}</p>
          <p>{element.price}</p>
        </div>
        )}
        </div>
        </div>
        
      </div>
      <div className='flex justify-center'>
        <button type="Submit" className="bg-emerald-500 border-2 rounded-full font-bold p-2 px-5 text-white">
          <Link to="/">New Form</Link>
        </button>
        <button type="Submit" className="bg-emerald-500 border-2 rounded-full font-bold p-2 px-5 text-white">
          Copy to Clipboard
        </button>
      </div>
    </>
  )
}

export default Data;