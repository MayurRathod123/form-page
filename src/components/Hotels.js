import React, { useEffect, useState } from 'react'
import axios from 'axios';

const baseURL = 'http://holidaypackages.exploreindiataxi.com/publicGetAllHotels.php';
const Hotels = (props) => {
    const [isChecked, setIsChecked] = useState(false);

    const [hotels, setHotels] = useState({threeStar: [], fourStar: [], fiveStar: []});

    const handleCheckedChange = e => {
        setIsChecked(!isChecked);
    }

    console.log(props,"props called")
    // const id = props.stateId
    useEffect(() => {
        console.log('use called')
        axios.get(`${baseURL}?stateId=${1}`).then((response) => {
          console.log(response.data.data)
          const threeStar = [];
          const fourStar = [];
          const fiveStar = [];
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
          console.log(threeStar, fourStar, fiveStar);
          setHotels({threeStar: threeStar, fiveStar: fiveStar, fourStar: fourStar});
        });
      }, []);
      if(!hotels) return null;

    
    return (
        <>
            <div>
                <form>
                    <div>
                        <input
                            type="Checkbox"
                            onChange={handleCheckedChange}
                            checked={isChecked}
                            className="mr-2"
                        />
                        <label className="mr-2">All Hotel</label>
                        <input
                            type="Checkbox"
                            className="mr-2"
                        />
                        <label className="mr-2">3 Star</label>
                        <input
                            type="Checkbox"
                            className="mr-2"
                        />
                        <label className="mr-2">4 Star</label>
                        <input
                            type="Checkbox"
                            className="mr-2"
                        />
                        <label className="mr-2">Upgraded Hotel</label>
                        <input
                            type="Checkbox"
                            className="mr-2"
                        />
                        <label className="mr-2">No Hotel/Pickup,Drop</label>
                    </div>
                </form>
                <div className="grid">      
                    <div>
                        <div className="text-center mt-5">3 Star</div>
                        <table className=" font-[poppins] border-2 border-black w-full">
                            <tbody className="text-center">
                            {hotels.threeStar.map((element) => 
                                        <tr className=" hover:bg-gray-400 cursor-pointer duration-300">
                                        <td className="border-x-2 border-y-2 border-black p-3">
                                            <input type="Checkbox"
                                                checked={isChecked} />
                                        </td>
                                        <td className="border-y-2 border-black">{element.hotel_name}</td>
                                    </tr>   
                                )}
                                
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="text-center mt-5">4 Star</div>
                        <table className=" font-[poppins] border-2 border-black w-full">
                            <tbody className="text-green-900 text-center">
                            {hotels.fourStar.map((element) => 
                                        <tr className=" hover:bg-gray-400 cursor-pointer duration-300">
                                        <td className="border-x-2 border-y-2 border-black p-3">
                                            <input type="Checkbox"
                                                checked={isChecked} />
                                        </td>
                                        <td className="border-y-2 border-black">{element.hotel_name}</td>
                                    </tr>   
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className='text-center mt-5'>Upgraded Hotel</div>
                        <table className=" font-[poppins] border-2 border-black w-full">
                            <tbody className="text-green-900 text-center">

                                {hotels.fiveStar.map((element) => 
                                        <tr className=" hover:bg-gray-400 cursor-pointer duration-300">
                                        <td className="border-x-2 border-y-2 border-black p-3">
                                            <input type="Checkbox"
                                                checked={isChecked} />
                                        </td>
                                        <td className="border-y-2 border-black">{element.hotel_name}</td>
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