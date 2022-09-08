import React, { useEffect, useState } from 'react'
import axios from 'axios';

const baseURL = 'http://holidaypackages.exploreindiataxi.com/publicGetAllHotels.php';
const Hotels = (props) => {
    const [isAllHotelChecked, setIsChecked] = useState(false);
    const [isThreeStarHotelChecked, setThreeStarChecked] = useState(false);
    const [isFourStarHotelChecked, setFourStarChecked] = useState(false);
    const [isUpgradedHotelChecked, setUpgradedChecked] = useState(false);
    const [isNoHotelChecked, setNoHotelChecked] = useState(false);

    const [hotels, setHotels] = useState({ threeStar: [], fourStar: [], fiveStar: [] });

    const handleCheckedChange = (event) => {
        if(event.target.type === 'all-hotel'){
            hotels.threeStar.forEach((element) => {
                element.checked = event.target.value;
            });
            hotels.fourStar.forEach((element) => {
                element.checked = event.target.value;
            });
            hotels.fiveStar.forEach((element) => {
                element.checked = event.target.value;
            });
            if (event.target.value) {
                setIsChecked(true);
                setThreeStarChecked(false);
                setFourStarChecked(false);
                setUpgradedChecked(false);
                setNoHotelChecked(false);
                props.setFormVisibility(true);
            } else {
                setIsChecked(false);
            }
        } else if(event.target.type === 'three-star'){
            hotels.threeStar.forEach((element) => {
                element.checked = event.target.value;
            });
            if (event.target.value) {
                setThreeStarChecked(true);
                setIsChecked(false);
                setFourStarChecked(false);
                setUpgradedChecked(false);
                setNoHotelChecked(false);
                props.setFormVisibility(true);
                hotels.fourStar.forEach((element) => {
                    element.checked = false;
                });
                hotels.fiveStar.forEach((element) => {
                    element.checked = false;
                });
            } else {
                setThreeStarChecked(false);
            }
        }  else if(event.target.type === 'four-star'){
            hotels.fourStar.forEach((element) => {
                element.checked = event.target.value;
            });
            if (event.target.value) {
                setFourStarChecked(true);
                setIsChecked(false);
                setThreeStarChecked(false);
                setUpgradedChecked(false);
                setNoHotelChecked(false);
                props.setFormVisibility(true);
                hotels.threeStar.forEach((element) => {
                    element.checked = false;
                });
                hotels.fiveStar.forEach((element) => {
                    element.checked = false;
                });
            } else {
                setFourStarChecked(false);
            }
        }  else if(event.target.type ==='upgraded-hotel'){
            hotels.fiveStar.forEach((element) => {
                element.checked = event.target.value;
            });
            if (event.target.value) {
                setUpgradedChecked(true);
                setIsChecked(false);
                setThreeStarChecked(false);
                setFourStarChecked(false);
                setNoHotelChecked(false);
                props.setFormVisibility(true);
                hotels.fourStar.forEach((element) => {
                    element.checked = false;
                });
                hotels.threeStar.forEach((element) => {
                    element.checked = false;
                });
                props.addHotels(hotels.fiveStar);
            } else {
                setUpgradedChecked(false);
            }
        }
        
    }
    

    const handleSingleCheckedChange = (event) => {
        if (event.target.element.star === '5') {
            hotels.fiveStar.forEach((element) => {
                    if (element.id === event.target.element.id) {
                        element.checked = event.target.value;
                    }
            })
        } else if (event.target.element.star === '3') {
            hotels.threeStar.forEach((element) => {
                if (element.id === event.target.element.id) {
                    element.checked = event.target.value;
                }
                
        })
        } else if (event.target.element.star === '4') {
            hotels.fourStar.forEach((element) => {
                if (element.id === event.target.element.id) {
                    element.checked = event.target.value;
                }
        })
        }
        setHotels({ threeStar: hotels.threeStar, fiveStar: hotels.fiveStar, fourStar: hotels.fourStar });
    }

    const handleNoHotelCheckedChange = (event) => {
        if (event.target.value) {
            setUpgradedChecked(false);
            setIsChecked(false);
            setThreeStarChecked(false);
            setFourStarChecked(false);
            setNoHotelChecked(true);
            hotels.fourStar.forEach((element) => {
                element.checked = false;
            });
            hotels.fiveStar.forEach((element) => {
                element.checked = false;
            });
            hotels.threeStar.forEach((element) => {
                element.checked = false;
            });
            props.setFormVisibility(false);
        } else  {
            setNoHotelChecked(false);
            props.setFormVisibility(true)
        }
        }

    function saveHotel(e) { 
        e.preventDefault();
        let arr = [];
        arr =  arr.concat(hotels.fiveStar.filter(element => element.checked));
        arr =  arr.concat(hotels.fourStar.filter(element => element.checked));
        arr =  arr.concat(hotels.threeStar.filter(element => element.checked));
        props.addHotels(arr);
    }
    const id = props.stateId
    useEffect(() => {
        // console.log('use called')
        if(id){axios.get(`${baseURL}?stateId=${id}`).then((response) => {
            // console.log(response.data.data)
            const threeStar = [];
            const fourStar = [];
            const fiveStar = [];
            if(response.data && response.data.data && response.data.data.length > 0){
                response.data.data.map((element) => {
                    if (element.star === "5") {
                         element.checked = false;
                        fiveStar.push(element);
                    } else if (element.star === '3') {
                        element.checked = false;
                        threeStar.push(element);
                    } else if (element.star === '4') {
                        element.checked = false;
                        fourStar.push(element);
                    }
                    return true;
                })
            }
            setHotels({ threeStar: threeStar, fiveStar: fiveStar, fourStar: fourStar });
        })};
    }, [id]) ;
    if (!hotels) return null;


    return (
        <>
            <div>
                <form>
                    <div>
                        <input
                            type="Checkbox"
                            required
                            checked={isAllHotelChecked}
                            className="mr-2"
                            onChange={(e) => {
                                handleCheckedChange({
                                  target: {
                                    name: e.target.name,
                                    value: e.target.checked,
                                    type:"all-hotel"
                                  },
                                });
                            }}/>
                        <label className="mr-2">All Hotel</label>
                        <input
                            type="Checkbox"
                            checked={isThreeStarHotelChecked}
                            className="mr-2"
                            onChange={(e) => {
                                handleCheckedChange({
                                  target: {
                                    name: e.target.name,
                                    value: e.target.checked,
                                    type:"three-star"
                                  },
                                });
                            }}
                        />
                        <label className="mr-2">3 Star</label>
                        <input
                            type="Checkbox"
                            checked={isFourStarHotelChecked}
                            className="mr-2"
                            onChange={(e) => {
                                handleCheckedChange({
                                  target: {
                                    name: e.target.name,
                                    value: e.target.checked,
                                    type:"four-star"
                                  },
                                });
                            }}
                        />
                        <label className="mr-2">4 Star</label>
                        <input
                            type="Checkbox"
                            checked={isUpgradedHotelChecked}
                            className="mr-2"
                            onChange={(e) => {
                                handleCheckedChange({
                                  target: {
                                    name: e.target.name,
                                    value: e.target.checked,
                                    type:"upgraded-hotel"
                                  },
                                });
                            }}
                        />
                        <label className="mr-2">Upgraded Hotel</label>
                        <input
                            type="Checkbox"
                            className="mr-2"
                            checked={isNoHotelChecked}
                            onChange={(e) => {
                                handleNoHotelCheckedChange({
                                  target: {
                                    name: e.target.name,
                                    value: e.target.checked,
                                  },
                                });
                            }}
                        />
                        <label className="mr-2">No Hotel/Pickup,Drop</label>
                        <button className='bg-emerald-500 border-2 rounded-full font-bold p-2 text-white' onClick={(e) => saveHotel(e)}>
                            Add
                        </button>
                    </div>
                </form>
                <div className="grid">
                    <div>
                        <div className="text-center mt-5 mb-2 border rounded-lg bg-green-300 font-bold">3 Star</div>
                        {/* <div className='h-60 overflow-y-auto'> */}
                        <table className=" font-[poppins] border w-full shadow-lg ">
                            <tbody className="text-center rounded-lg">
                                {hotels.threeStar.map((element,index) => 
                                    <tr key={index} className=" hover:bg-gray-400 cursor-pointer duration-300">
                                        <td className="border-x border-y p-3">
                                            <input type="Checkbox" id={element.id}
                                                    onChange={(e) => {
                                                        handleSingleCheckedChange({
                                                          target: {
                                                            name: e.target.name,
                                                            value: e.target.checked,
                                                            element: element,
                                                          },
                                                        });
                                                    }}
                                                checked={element.checked}
                                            />
                                        </td>
                                        <td className="border-y">{element.hotel_name}</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                        {/* </div> */}
                    </div>
                    <div>
                        <div className="text-center mt-5 mb-2 border rounded-lg bg-green-300 font-bold">4 Star</div>
                        {/* <div className='h-60 overflow-y-auto '> */}
                        <table className=" font-[poppins] border w-full shadow-lg ">
                            <tbody className="text-center rounded-lg">
                                {hotels.fourStar.map((element,index) =>
                                    <tr key={index} className=" hover:bg-gray-400 cursor-pointer duration-300">
                                        <td className="border-x border-y p-3">
                                            <input type="Checkbox"
                                             checked={element.checked}
                                                      onChange={(e) => {
                                                        handleSingleCheckedChange({
                                                          target: {
                                                            name: e.target.name,
                                                            value: e.target.checked,
                                                            element: element,
                                                          },
                                                        });
                                                    }}
                                            />
                                        </td>
                                        <td className="border-y">{element.hotel_name}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {/* </div> */}
                    </div>
                    <div className=''>
                        <div className='text-center mt-5 mb-2 border rounded-lg bg-green-300 font-bold'>Upgraded Hotel</div>
                        <div className='h-60 overflow-y-auto border-b-0 '>
                        <table className=" font-[poppins] border w-full shadow-lg">
                            <tbody className="text-center rounded-lg">
                                {hotels.fiveStar.map((element,index) =>
                                    <tr key={index} className=" hover:bg-gray-400 cursor-pointer duration-300 ">
                                        <td className="border-x border-y p-3">
                                            <input type="Checkbox"
                                            checked={element.checked}
                                                      onChange={(e) => {
                                                        handleSingleCheckedChange({
                                                          target: {
                                                            name: e.target.name,
                                                            value: e.target.checked,
                                                            element: element,
                                                          },
                                                        });
                                                    }}
                                            />
                                        </td>
                                        <td className="border-y">{element.hotel_name}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hotels