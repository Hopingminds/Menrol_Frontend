"use client";
import React, { useState, useRef } from "react";
import {
    GoogleMap,
    LoadScript,
    InfoWindow,
    Marker,
} from "@react-google-maps/api";

interface MapProps {
    numberOfLocations?: number;
}

// Chandigarh coordinates
const CHANDIGARH_CENTER = { lat: 30.7333, lng: 76.7794 };

// Define locations around Chandigarh
const CHANDIGARH_LOCATIONS = [
    { name: "Sector 17", lat: 30.7352, lng: 76.7867 },
    { name: "IT Park", lat: 30.7283, lng: 76.8461 },
    { name: "Sukhna Lake", lat: 30.7421, lng: 76.8181 },
    { name: "Rock Garden", lat: 30.7418, lng: 76.8083 },
    { name: "Panchkula", lat: 30.6942, lng: 76.8606 },
    // { name: "Mohali", lat: 30.7046, lng: 76.7179 },
    // { name: "Elante Mall", lat: 30.7051, lng: 76.8014 },
    // { name: "PGI", lat: 30.7650, lng: 76.7751 },
    // { name: "Railway Station", lat: 30.7211, lng: 76.8432 },
    // { name: "Capitol Complex", lat: 30.7605, lng: 76.8057 }
];

const AllotedLabourMap: React.FC<MapProps> = ({
    numberOfLocations = 10
}) => {
    const [activeInfoWindow, setActiveInfoWindow] = useState<number | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);

    const containerStyle = {
        width: "100%",
        height: "500px",
    };

    // Custom marker with glitter effect
    const CustomMarker: React.FC<{
        position: google.maps.LatLngLiteral;
        title: string;
        index: number;
        onClick: () => void;
    }> = ({ position, title, onClick }) => {
        return (
            <Marker
                position={position}
                title={title}
                onClick={onClick}
                icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: '#8B0000',
                    fillOpacity: 1,
                    strokeWeight: 2,
                    strokeColor: '#8B0000',
                    // animation: google.maps.Animation.BOUNCE,
                }}
            />
        );
    };

    const handleMarkerClick = (index: number) => {
        setActiveInfoWindow(activeInfoWindow === index ? null : index);
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyAmB63Ixx1tDyUyEvQ4KE1ymOM2YANXPn0"
            libraries={["places"]}
        >
            <div style={{ position: "relative", height: "100%" }}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={CHANDIGARH_CENTER}
                    zoom={12}
                    onLoad={(map) => {
                        mapRef.current = map;
                    }}
                    options={{
                        styles: [
                            {
                                featureType: "all",
                                elementType: "all",
                                stylers: [
                                    { saturation: 30 },
                                    { lightness: 10 }
                                ]
                            }
                        ]
                    }}
                >
                    {CHANDIGARH_LOCATIONS.slice(0, numberOfLocations).map((location, index) => (
                        <React.Fragment key={`location-${index}`}>
                            <CustomMarker
                                position={{ lat: location.lat, lng: location.lng }}
                                title={location.name}
                                index={index}
                                onClick={() => handleMarkerClick(index)}
                            />
                            {activeInfoWindow === index && (
                                <InfoWindow
                                    position={{ lat: location.lat, lng: location.lng }}
                                    onCloseClick={() => setActiveInfoWindow(null)}
                                >
                                    <div className="p-2">
                                        <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                                        <p className="text-sm">Latitude: {location.lat.toFixed(4)}</p>
                                        <p className="text-sm">Longitude: {location.lng.toFixed(4)}</p>
                                    </div>
                                </InfoWindow>
                            )}
                        </React.Fragment>
                    ))}
                </GoogleMap>
            </div>
        </LoadScript>
    );
};

export default AllotedLabourMap;