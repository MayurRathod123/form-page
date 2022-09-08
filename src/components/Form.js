import React, { useEffect, useReducer,useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import moment from 'moment';

const baseURL = "http://holidaypackages.exploreindiataxi.com/publicGetallCar.php";

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
        tourPackage: '',
        serviceChargePerCouple: '',
        serviceChargePerAdult: '',
        serviceChargePerChild: '',
        numberOfPerson:'',
    };
    const isVisible = props.isVisible;
  
    // console.log(Hotels);
    const [dates, setDates] = useState();
    const [car, setCar] = useState();
    const [carDetails, setCarDetails] = useState();

    // useEffect(() => {
    //     axios.get(baseURL).then((response) => {
    //     console.log(response.data, "###################")
    //     setCar(response.data.data);
    //   });
    // }, []);
    // if(!car) return null;

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
                console.log(action.value)
                car.forEach(element => {
                    if (+element.id === +action.value) {
                        setCarDetails(element);
                    }
                });
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
            case 'tourPackage':
                return {
                    ...state,
                    tourPackage: action.value,
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
    const priceCalculationData  =  {Hotels:  props.selectedHotels, formData: nameState, carData: carDetails};
    const changeHandler = (event, type) => {
        dispatch({
            type,
            value: event.target.value,
        });
    };
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SUBMIT'
        })
    };
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setCar(response.data.data);
          });
    }, []);
    if(!car) return null;

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
                        disabled
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
                         {car.map((element,index) => <option key={index} value={element.id} >{element.name}</option>)}
                    </select>
                </div>
                <div className="mt-7 flex justify-between" >
                    <label htmlFor='text'>Pickup from:</label>
                    <select className="border-2 p-1 rounded-md ml-2"
                        value={nameState.pickUpFrom}
                        onChange={(event) => changeHandler(event, 'pickUpFrom')}>
                        <option>No</option>
                        <option>Railway Station</option>
                        <option>Airport</option>
                        <option>Bus Stop</option>
                    </select>
                </div>
                <div className="mt-7 flex justify-between" >
                    <label htmlFor='text'>Drop to:</label>
                    <select className="border-2 p-1 rounded-md ml-2"
                        value={nameState.dropTo}
                        onChange={(event) => changeHandler(event, 'dropTo')}>
                        <option>No</option>
                        <option>Railway Station</option>
                        <option>Airport</option>
                        <option>Bus Stop</option>
                    </select>
                </div>
                <div className="mt-7 flex justify-between" >
                    <label htmlFor='text'>Tour Package:</label>
                    <select className="border-2 p-1 rounded-md ml-2"
                        value={nameState.tourPackage}
                        onChange={(event) => changeHandler(event, 'tourPackage')}>
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
                        <Link to="/data" state={priceCalculationData}>Submit</Link>
                    </button>
                </div>
                </div>
                
            </form>

        </>
    )
}

export default Form