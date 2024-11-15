// import { useEffect, useState } from "react";

// const  Location=()=>{
//     const [city, setCity] = useState("");
//     const [postcode, setPostcode] = useState("");
//     const [suburb, setSuburb] = useState("");

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const latitude = position.coords.latitude;
//                 const longitude = position.coords.longitude;
//                 const apiUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=94a31a12441043a19518c9efa5ede83b`;
//                 fetch(apiUrl)
//                     .then(response => response.json())
//                     .then((res) => {
//                         const properties = res.features[0].properties;
//                         setCity(properties.city);
//                         setPostcode(properties.postcode);
//                         setSuburb(properties.suburb);
//                     })
//             });
//     }, []);

//     return (
//         <>
//             <h3>{suburb} / {city} / {postcode}</h3>
//         </>
//     );
// };
// export default Location;


import React, { useEffect, useState } from "react";

function Location(){
    const [add,setAdd] = useState('')
    // https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}
    
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(pos=>{
            const {latitude,longitude} = pos.coords;
            console.log(latitude,longitude)
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            fetch(url).then(res=>res.json()).then(data=>setAdd(data.address))
        })
    },[])
    console.log(add,"sfsfh")
    console.log(add);
    
    return(
        <>
            <p>road : {add.road}</p>
            <p>city : {add.city}</p>
            <p>country :{add.country}</p>
        </>
    )
}

export default Location;