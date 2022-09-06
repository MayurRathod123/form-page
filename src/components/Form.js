import React, { useReducer,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import moment from 'moment';


const Form = (props) => {
    const initialState = {
        checkInDate: '',
        numberOfNight: '',
        checkOutDate: '',
        numberOfCouple: '',
        mealPlan: '',
        extraAdultWithMattress: '',
        extraChildWithoutMattress: '',
        vehicle: '',
        pickUpFrom: '',
        dropTo: '',
        southGoaTour: '',
        northGoaTour: '',
        serviceChargePerCouple: '',
        serviceChargePerAdult: '',
        serviceChargePerChild: '',
        numberOfPerson:'',
    };
    const isVisible = props.isVisible;
    const [dates, setDates] = useState();

    const [nameState, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'checkInDate':
                setDates(action.value);
                return {
                    ...state,
                    checkInDate: action.value,
                }
            case 'numberOfNight':
                return {
                    ...state,
                    numberOfNight: action.value,
                    checkOutDate : moment(dates).add(action.value, 'd').format('YYYY-MM-DD')
                }
            case 'checkOutDate':
                return {
                    ...state,
                    checkOutDate: action.value,
                }
            case 'numberOfCouple':
                return {
                    ...state,
                    numberOfCouple: action.value,
                }
            case 'mealPlan':
                return {
                    ...state,
                    mealPlan: action.value,
                }
            case 'extraAdultWithMattress':
                return {
                    ...state,
                    extraAdultWithMattress: action.value,
                }
            case 'extraChildWithoutMattress':
                return {
                    ...state,
                    extraChildWithoutMattress: action.value,
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
            case 'numberOfPerson':
                    return {
                        ...state,
                        numberOfPerson: action.value,
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
        // console.log(nameState)
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

                {isVisible ? <div className="mt-7 flex justify-between ">
                    <label htmlFor='text'>Number Of Night:</label>
                    <input
                        type="number"
                        value={nameState.numberOfNight}
                        onChange={(event) => { changeHandler(event, 'numberOfNight') }}
                        className="border-2 p-1 rounded-md ml-2"
                    />
                </div> : ''}

                {isVisible ? '' : <div className="mt-7 flex justify-between ">
                    <label htmlFor='text'>Number Of Person:</label>
                    <input
                        type="number"
                        value={nameState.numberOfPerson}
                        onChange={(event) => { changeHandler(event, 'numberOfPerson') }}
                        className="border-2 p-1 rounded-md ml-2"
                    />
                </div>}
                {isVisible ?  <div className="mt-7 flex justify-between">
                    <label htmlFor='date'>Checkout Date:</label>
                    <input
                        type="date"
                        value={nameState.checkOutDate}
                        onChange={(event) => changeHandler(event, 'checkOutDate')}
                        className="border-2 p-1 rounded-md ml-2"
                    />
                </div> : '' }
                {isVisible ?  <div className="mt-7 flex justify-between">
                    <label htmlFor='text'>Number of Couple:</label>
                    <input
                        type="number"
                        value={nameState.numberOfCouple}
                        onChange={(event) => changeHandler(event, 'numberOfCouple')}
                        className="border-2 p-1 rounded-md ml-2"
                    />
                </div> : '' }
                {isVisible ?  <div className="mt-7 flex justify-between">
                    <label htmlFor='text'>Meal Plan:</label>
                    <select className="border-2 p-1 rounded-md ml-2"
                        value={nameState.mealPlan}
                        onChange={(event) => changeHandler(event, 'mealPlan')}>

                        <option>CP</option>
                        <option>MAP</option>
                        <option>AP</option>
                    </select>
                </div> : '' }
                {isVisible ?  <div className="mt-7 flex justify-between" >
                    <label htmlFor='text'>Extra adult with mattress:</label>
                    <input
                        type="text"
                        value={nameState.extraAdultWithMattress}
                        onChange={(event) => changeHandler(event, 'extraAdultWithMattress')}
                        className="border-2 p-1 rounded-md ml-2"
                    />
                </div> : '' }
                {isVisible ?  <div className="mt-7 flex justify-between" >
                    <label htmlFor='text'>Extra child without mattress:
                    </label>
                    <input
                        type="text"
                        value={nameState.extraChildWithoutMattress}
                        onChange={(event) => changeHandler(event, 'extraChildWithoutMattress')}
                        className="border-2 p-1 rounded-md ml-2"
                    />
                </div> : '' }
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
                        type="number"
                        value={nameState.serviceChargePerCouple}
                        onChange={(event) => changeHandler(event, 'serviceChargePerCouple')}
                        className="border-2 p-1 rounded-md ml-2"
                    />
                </div>
                <div className="mt-7 flex justify-between" >
                    <label htmlFor='text'>Service charge per adult:</label>
                    <input
                        type="number"
                        value={nameState.serviceChargePerAdult}
                        onChange={(event) => changeHandler(event, 'serviceChargePerAdult')}
                        className="border-2 p-1 rounded-md ml-2"
                    />
                </div>
                <div className="mt-7 flex justify-between" >
                    <label htmlFor='text'>Service charge per child:</label>
                    <input
                        type="number"
                        value={nameState.serviceChargePerChild}
                        onChange={(event) => changeHandler(event, 'serviceChargePerChild')}
                        className="border-2 p-1 rounded-md ml-2"
                    />
                </div>
                <div className="m-auto">
                <div className="mt-7">
                    <button disabled={!nameState} type="Submit" className="bg-emerald-500 border-2 rounded-full font-bold p-2 px-5 mt-60 text-white">
                        <Link to="/data">Submit</Link>
                    </button>
                </div>
                </div>
                
            </form>

        </>
    )
}

export default Form