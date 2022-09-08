import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Data = (props) => {
  const location = useLocation();
  const priceCalculationData = location.state;
  console.log(priceCalculationData);
  const priceModel = [];
  if (priceCalculationData && priceCalculationData.Hotels && priceCalculationData.Hotels.length > 0 && priceCalculationData.formData) {
    priceCalculationData.Hotels.forEach(Hotel => {
      let price = 0;
        if (priceCalculationData.formData.numberOfNight && priceCalculationData.formData.numberOfCouple) {
          price += +Hotel.price * (+priceCalculationData.formData.numberOfNight * +priceCalculationData.formData.numberOfCouple);
        }
        if (priceCalculationData.formData.mealPlan && priceCalculationData.formData.numberOfNight) {
          if (priceCalculationData.formData.mealPlan === 'MAP') {
                price += (+Hotel.map_price * priceCalculationData.formData.numberOfNight);
          } else if (priceCalculationData.formData.mealPlan === 'AP') {
            price += (+Hotel.ap_price * priceCalculationData.formData.numberOfNight);
          } else if (priceCalculationData.formData.mealPlan === 'CP') {
            price += (+Hotel.cp_price * priceCalculationData.formData.numberOfNight);
          }
        }
        if (Hotel.adult_with_mattress && priceCalculationData.formData.numberOfNight && priceCalculationData.formData.extraAdultWithMattress) {
          price += (+Hotel.adult_with_mattress * +priceCalculationData.formData.numberOfNight * +priceCalculationData.formData.extraAdultWithMattress);
        }
        if (Hotel.child_with_mattress && priceCalculationData.formData.numberOfNight && priceCalculationData.formData.extraChildWithoutMattress) {
          price += (+Hotel.child_with_mattress * +priceCalculationData.formData.numberOfNight * +priceCalculationData.formData.extraChildWithoutMattress);
        }
        if (Hotel.pickup_price && priceCalculationData.formData.pickUpFrom) {
          price += +Hotel.pickup_price;
        }
        if (Hotel.drop_price && priceCalculationData.formData.dropTo) {
          price += +Hotel.pickup_price;
        }
        if (priceCalculationData.formData.serviceChargePerCouple && priceCalculationData.formData.numberOfCouple) {
          price += (+priceCalculationData.formData.serviceChargePerCouple * +priceCalculationData.formData.numberOfCouple);
        }
        if (priceCalculationData.formData.serviceChargePerAdult && priceCalculationData.formData.extraAdultWithMattress) {
          price += (+priceCalculationData.formData.serviceChargePerAdult * +priceCalculationData.formData.extraAdultWithMattress);
        }
        if (priceCalculationData.formData.serviceChargePerChild && priceCalculationData.formData.extraChildWithoutMattress) {
          price += (+priceCalculationData.formData.serviceChargePerChild * +priceCalculationData.formData.extraChildWithoutMattress);
        }
        if (priceCalculationData.carData && priceCalculationData.formData.vehicle && priceCalculationData.formData.tourPackage) {
          if (priceCalculationData.formData.tourPackage === 'SIC') {
                price += +priceCalculationData.carData.sic_charge;
          }
          if (priceCalculationData.formData.tourPackage === 'PVT') {
            price += +priceCalculationData.carData.pvt_charge;
          }
        }
        priceModel.push({hotel_name: Hotel.hotel_name, price: price})
    });
  }
  return (
    <>
      <div className="h-full w-full mb-14 grid justify-items-center">
        <div className="border-2 mt-14 rounded-3xl shadow-lg p-10 overflow-hidden grid h-80 overflow-y-auto">
          Greetings<br />
          AS per your requirements find rates as below...
          <div>
        {priceModel && priceModel.length > 0 ? priceModel.map((element,index) =>
        <div key={index} className="m-5"> 
          <p>*{element.hotel_name}</p>
          <p>{element.price}</p>
        </div>
        ): ''} 
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