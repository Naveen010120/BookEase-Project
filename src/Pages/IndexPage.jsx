/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { selectedValueShare } from "../App";

function IndexPage({ data, setData }) {
  const [places, setPlaces] = useState([]);
  const { selectedValue } = useContext(selectedValueShare);  

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, []);

  console.log('Selected Value:', selectedValue);
  console.log('Places:', places);

  // ✅ Filter by search query first
  const searchFiltered = places.filter(place =>
    place.title?.toLowerCase().includes(data?.toLowerCase() || "")
  );

  // ✅ Filter by price range
  const filteredPlaces = searchFiltered.filter((place) => {
    const price = parseInt(place.price);
    if (selectedValue === "Price" || !selectedValue) return true;  // Show all if no filter
    if (selectedValue === "9999") return price >= 5000 && price <= 9999;
    if (selectedValue === "19999") return price >= 10000 && price <= 19999;
    if (selectedValue === "20000") return price >= 20000;
    return true;
  });

  return (
    <>
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <Link key={place._id} to={'/place/' + place._id} className="block">
              <div className="bg-gray-200 rounded-2xl overflow-hidden">
                {place.photos?.[0] && (
                  <img
                    className="w-full h-48 object-cover"
                    src={'https://bookease-apis.onrender.com/uploads/' + place.photos[0]}
                    alt={place.title}
                  />
                )}
              </div>
              <div className="p-2">
                <h2 className="font-bold text-lg">{place.address}</h2>
                <h3 className="text-sm text-gray-500">{place.title}</h3>
                <div className="mt-1 text-sm">
                  <span className="font-bold">₹{place.price}</span> per night
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No places found</p>
        )}
      </div>
    </>
  );
}

export default IndexPage;
