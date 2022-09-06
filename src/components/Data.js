import React from 'react'
import { Link } from 'react-router-dom';

const Data = () => {
  return (
    <>
      <div className="h-full w-full mb-14 grid justify-items-center">
        <div className="border-2 mt-14 rounded-3xl shadow-lg p-10 overflow-hidden grid lg:grid-cols-2 sm:grid-cols-1">
          Greetings<br />
          AS per your requirements find rates as below...
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