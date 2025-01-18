// "use client";
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   GoogleMap,
//   LoadScript,
//   InfoWindow,
//   Autocomplete,
// } from "@react-google-maps/api";
// import { toast } from "react-toastify";


// // Defining a UserInfo interface for type safety
// interface UserInfo {
//   token: string;
// }

// const Map: React.FC = () => {
//   const mapRef = useRef<google.maps.Map | null>(null);
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const [location,]

//   const containerStyle = {
//     width: "100%",
//     height: "300px",
//   };

//   const defaultCenter = currentLocation || { lat: 51.505, lng: -0.09 };

//   // Retrieve userInfo from localStorage
//   const storedUserInfo = localStorage.getItem("user-info");
//   const userInfo: UserInfo | null = storedUserInfo
//     ? JSON.parse(storedUserInfo)
//     : null;

//   // Handle map click and select location
//   const handleMapClick = async (e: google.maps.MapMouseEvent) => {
//     if (e.latLng) {
//       const lat = e.latLng.lat();
//       const lng = e.latLng.lng();

//       const geocoder = new google.maps.Geocoder();

//       try {
//         const { results } = await geocoder.geocode({ location: { lat, lng } });

//         setSelectedLocation({
//           lat,
//           lng,
//           address: results?.[0]?.formatted_address || "Address not found",
//         });
//       } catch (error) {
//         console.error("Geocoding error: ", error);
//       }
//     }
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyAmB63Ixx1tDyUyEvQ4KE1ymOM2YANXPn0"
//       libraries={["places"]}
//       id="google-map-load-script" // Add the 'id' prop here
//     >
//       <div style={{ position: "relative", height: "100%" }}>
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={defaultCenter}
//           zoom={13}
//           onClick={handleMapClick}
//           onLoad={(map) => {
//             mapRef.current = map;
//           }}
//         >
//           {selectedLocation && (
//             <InfoWindow
//               position={{
//                 lat: selectedLocation.lat,
//                 lng: selectedLocation.lng,
//               }}
//             >
//               <div>
//                 Latitude: {selectedLocation.lat}, Longitude:{" "}
//                 {selectedLocation.lng}
//                 <br />
//                 Address: {selectedLocation.address}
//               </div>
//             </InfoWindow>
//           )}
//         </GoogleMap>
//       </div>
//     </LoadScript>
//   );
// };

// export default Map;
