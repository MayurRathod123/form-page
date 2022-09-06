import React, { useEffect, useState } from 'react'
import axios from 'axios';

const baseURL = 'http://holidaypackages.exploreindiataxi.com/publicGetAllHotels.php';
const Hotels = (props) => {
    const [isAllHotelChecked, setIsChecked] = useState(false);
    const [isThreeStarHotelChecked, setThreeStarChecked] = useState(false);
    const [isFourStarHotelChecked, setFourStarChecked] = useState(false);
    const [isUpgradedHotelChecked, setUpgradedChecked] = useState(false);

    const [hotels, setHotels] = useState({ threeStar: [], fourStar: [], fiveStar: [] });

    const handleCheckedChange = (event) => {
        // console.log(event, 'evwent')
        if(event.target.type === 'all-hotel'){
            if (event.target.value) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        } else if(event.target.type === 'three-star'){
            if (event.target.value) {
                setThreeStarChecked(true);
            } else {
                setThreeStarChecked(false);
            }
        }  else if(event.target.type === 'four-star'){
            if (event.target.value) {
                setFourStarChecked(true);
            } else {
                setFourStarChecked(false);
            }
        }  else if(event.target.type === 'upgraded-hotel'){
            if (event.target.value) {
                setUpgradedChecked(true);
            } else {
                setUpgradedChecked(false);
            }
        }
        
    }
    

    const handleSingleCheckedChange = (event) => {
    // console.log(props.setFormVisibility(true))
    }

    const handleNoHotelCheckedChange = (event) => {
        if (event.target.value) {
            props.setFormVisibility(false);
        } else  {
            props.setFormVisibility(true)
        }
       
        }


    // console.log(props, "props called")
    const id = props.stateId
    useEffect(() => {
        // console.log('use called')
        axios.get(`${baseURL}?stateId=${id}`).then((response) => {
            // console.log(response.data.data)
            const threeStar = [];
            const fourStar = [];
            const fiveStar = [];
            if(response.data && response.data.data && response.data.data.length > 0){
                response.data.data.map((element) => {
    
                    if (element.star === "5") {
                        fiveStar.push(element);
                    } else if (element.star === '3') {
                        threeStar.push(element);
                    } else if (element.star === '4') {
                        fourStar.push(element);
                    }
                    return true;
                })
            }
            // console.log(threeStar, fourStar, fiveStar);
            setHotels({ threeStar: threeStar, fiveStar: fiveStar, fourStar: fourStar });
        });
    }, [props.stateId]);
    if (!hotels) return null;


    return (
        <>
            <div>
                <form>
                    <div>
                        <input
                            type="Checkbox"
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
                    </div>
                </form>
                <div className="grid">
                    <div>
                        <div className="text-center mt-5 mb-2">3 Star</div>
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
                                                          },
                                                        });
                                                    }}
                                                checked={isAllHotelChecked || isThreeStarHotelChecked}
                                            />
                                        </td>
                                        <td className="border-y">{element.hotel_name}</td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="text-center mt-5 mb-2">4 Star</div>
                        <table className=" font-[poppins] border w-full shadow-lg ">
                            <tbody className="text-center rounded-lg">
                                {hotels.fourStar.map((element,index) =>
                                    <tr key={index} className=" hover:bg-gray-400 cursor-pointer duration-300">
                                        <td className="border-x border-y p-3">
                                            <input type="Checkbox"
                                                      onChange={(e) => {
                                                        handleSingleCheckedChange({
                                                          target: {
                                                            name: e.target.name,
                                                            value: e.target.checked,
                                                          },
                                                        });
                                                    }}
                                                checked={isAllHotelChecked || isFourStarHotelChecked}
                                            />
                                        </td>
                                        <td className="border-y">{element.hotel_name}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className='text-center mt-5 mb-2'>Upgraded Hotel</div>
                        <table className=" font-[poppins] border w-full shadow-lg ">
                            <tbody className="text-center rounded-lg">
                                {hotels.fiveStar.map((element,index) =>
                                    <tr key={index} className=" hover:bg-gray-400 cursor-pointer duration-300">
                                        <td className="border-x border-y p-3">
                                            <input type="Checkbox"
                                                onChange={handleSingleCheckedChange}
                                                checked={isAllHotelChecked || isUpgradedHotelChecked}
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
        </>
    )
}

export default Hotels