import React, { useReducer } from 'react'
import axios from 'axios'


const NoHotelForm = () => {
    const initialState = {
        checkInDate: '',
        numberOfPerson:'',
        vehicle: '',
        pickUpFrom: '',  
        dropTo: '',
        southGoaTour: '',
        northGoaTour: '',
        serviceChargePerCouple: '',
        serviceChargePerAdult: '',
        serviceChargePerChild: '',
    };
    const [nameState, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'checkInDate':
                return {
                    ...state,
                    checkInDate: action.value,
                }
            case 'numberOfPerson':
                return {
                    ...state,
                    numberOfPerson: action.value,
                }
            case 'vehicle':
                return {
                    ...state,
                    vehicle: action.value,
                }
            case 'pickUpFrom':
                return {
                    ...state,
                    pickUpFrom: action.value,
                }
            case 'dropTo':
                return {
                    ...state,
                    dropTo: action.value,
                }
            case 'southGoaTour':
                return {
                    ...state,
                    southGoaTour: action.value,
                }
            case 'northGoaTour':
                return {
                    ...state,
                    northGoaTour: action.value,
                }
            case 'serviceChargePerCouple':
                return {
                    ...state,
                    serviceChargePerCouple: action.value,
                }
            case 'serviceChargePerAdult':
                return {
                    ...state,
                    serviceChargePerAdult: action.value,
                }
            case 'serviceChargePerChild':
                return {
                    ...state,
                    serviceChargePerChild: action.value,
                }

            case 'SUBMIT':
                return {
                    ...initialState,
                };
            default:
                return state;
        }

    }, initialState)
    const changeHandler = (event, type) => {
        dispatch({
            type,
            value: event.target.value,
        });
    };

    const submitHandler = (event) => {
        console.log(nameState)
        event.preventDefault();
        axios.post('https://kashishholidays.in/formula_v2/form_data.php', { nameState })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

        dispatch({
            type: 'SUBMIT'
        })
    };

    return (
        <>
           <div>
                <form onSubmit={submitHandler}>
                    <div className='flex justify-between'>
                        <label htmlFor='date'>Checkin Date:</label>
                            <input
                                type="date"
                                value={nameState.checkInDate}
                                onChange={(event) => changeHandler(event, 'checkInDate')}
                                className="border-2 p-1 rounded-md ml-2"
                            />
                        </div>
                        <div className="mt-7 flex justify-between">
                            <label htmlFor='text'>Number of Person:</label>
                            <input
                                type="text"
                                value={nameState.numberOfPerson}
                                onChange={(event) => changeHandler(event, 'numberOfPerson')}
                                className="border-2 p-1 rounded-md ml-2"
                            />
                        </div>
                        <div className="mt-7 flex justify-between" >
                            <label htmlFor='text'>Vehicle:</label>
                            <select className="border-2 p-1 rounded-md ml-2"
                                value={nameState.vehicle}
                                onChange={(event) => changeHandler(event, 'vehicle')}>
                                <option>Select Vehicle</option>
                                <option>Small Car (upto 3 pax)</option>
                                <option>Innova (upto 7 flex justify-between  pax)</option>
                                <option>Winger 10 - 12</option>
                                <option>Ertiga (upto 5 pax)</option>
                                <option>13 - 17 flex justify-between  seater</option>
                                <option>18 - 20 seater</option>
                                <option>25 - 27 flex justify-between  seater</option>
                                <option>30 - 35 seater</option>
                                <option>40 seater bus</option>
                            </select>
                        </div>
                        <div className="mt-7 flex justify-between" >
                            <label htmlFor='text'>Pickup from:</label>
                            <select className="border-2 p-1 rounded-md ml-2"
                                value={nameState.pickUpFrom}
                                onChange={(event) => changeHandler(event, 'pickUpFrom')}>
                                <option>No</option>
                                <option>Thivim Railway Station</option>
                                <option>Karmali Railway Station</option>
                                <option>Madgoan Railway Station</option>
                                <option>Airport</option>
                                <option>Mapusa Bus Stop</option>
                                <option>Panjim Bus Stop</option>
                                <option>Vasco Railway Station</option>
                            </select>
                        </div>
                        <div className="mt-7 flex justify-between" >
                            <label htmlFor='text'>Drop to:</label>
                            <select className="border-2 p-1 rounded-md ml-2"
                                value={nameState.dropTo}
                                onChange={(event) => changeHandler(event, 'dropTo')}>
                                <option>No</option>
                                <option>Thivim Railway Station</option>
                                <option>Karmali Railway Station</option>
                                <option>Madgoan Railway Station</option>
                                <option>Airport</option>
                                <option>Mapusa Bus Stop</option>
                                <option>Panjim Bus Stop</option>
                                <option>Vasco Railway Station</option>
                            </select>
                        </div>
                        <div className="mt-7 flex justify-between" >
                            <label htmlFor='text'>South Goa tour:</label>
                            <select className="border-2 p-1 rounded-md ml-2"
                                value={nameState.southGoaTour}
                                onChange={(event) => changeHandler(event, 'southGoaTour')}>
                                <option>No</option>
                                <option>SIC</option>
                                <option>PVT</option>
                            </select>
                            <label htmlFor='text' className="ml-5">North Goa tour:</label>
                            <select className="border-2 p-1 rounded-md ml-2"
                                value={nameState.northGoaTour}
                                onChange={(event) => changeHandler(event, 'northGoaTour')}>
                                <option>No</option>
                                <option>SIC</option>
                                <option>PVT</option>
                            </select>
                        </div>
                        <div className="mt-7 flex justify-between" >
                            <label htmlFor='text'>Service charge per couple:</label>
                            <input
                                type="text"
                                value={nameState.serviceChargePerCouple}
                                onChange={(event) => changeHandler(event, 'serviceChargePerCouple')}
                                className="border-2 p-1 rounded-md ml-2"
                            />
                        </div>
                        <div className="mt-7 flex justify-between" >
                            <label htmlFor='text'>Service charge per adult:</label>
                            <input
                                type="text"
                                value={nameState.serviceChargePerAdult}
                                onChange={(event) => changeHandler(event, 'serviceChargePerAdult')}
                                className="border-2 p-1 rounded-md ml-2"
                            />
                        </div>
                        <div className="mt-7 flex justify-between" >
                            <label htmlFor='text'>Service charge per child:</label>
                            <input
                                type="text"
                                value={nameState.serviceChargePerChild}
                                onChange={(event) => changeHandler(event, 'serviceChargePerChild')}
                                className="border-2 p-1 rounded-md ml-2"
                            />
                        </div>
                        {/* <div className="mt-7">
                            <button disabled={!nameState} type="Submit" className="bg-sky-500 border-2 rounded-lg p-2 px-5 mt-60 text-white">Submit</button>
                        </div> */}
                    </form>
                    </div>
             


  

        </>
    )
}

export default NoHotelForm;