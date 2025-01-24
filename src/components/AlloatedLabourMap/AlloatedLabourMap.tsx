"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    GoogleMap,
    LoadScript,
    InfoWindow,
    Marker,
} from "@react-google-maps/api";
import axios from "axios";

interface ServiceProvider {
    _id: string;
    name: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
    rating: number;
    phone: string;
    profileImage?: string;
}

interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
}

interface Provider {
    _id: string;
    name: string;
    location: {
        coordinates: [number, number];
    };
    rating: number;
    phone: string;
    profileImage: string;
}

interface Subcategory {
    eligibleProviders: Provider[];
}

interface Result {
    subcategories: Subcategory[];
}

interface ApiResponse {
    data: {
        results: Result[];
    };
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
console.log(GOOGLE_MAPS_API_KEY);

const AllotedServiceProviderMap: React.FC = () => {
    const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>([]);
    const [activeInfoWindow, setActiveInfoWindow] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [mapCenter, setMapCenter] = useState({ lat: 30.7333, lng: 76.7794 });
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const mapRef = useRef<google.maps.Map | null>(null);


    const containerStyle = {
        width: "100%",
        height: "500px",
    };

    const calculateMapCenter = (providers: ServiceProvider[]) => {
        if (providers.length === 0) return { lat: 30.7333, lng: 76.7794 };

        const lats = providers.map(p => p.location.coordinates[0]);
        const lngs = providers.map(p => p.location.coordinates[1]);

        return {
            lat: (Math.min(...lats) + Math.max(...lats)) / 2,
            lng: (Math.min(...lngs) + Math.max(...lngs)) / 2
        };
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserInfo(parsedUser);
            } catch (err) {
                console.error('Failed to parse user info');
                console.log(err);
            }
        }
    }, []);

    const fetchServiceProviders = async () => {
        if (!userInfo) return;

        try {
            const response = await axios.get('https://api.menrol.com/api/v1/fetchEligibleServiceProviders', {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });

            const providers = (response as ApiResponse).data.results.flatMap(
                (result: Result) =>
                    result.subcategories.flatMap(
                        (subcategory: Subcategory) => subcategory.eligibleProviders
                    )
            );

            const validProviders: ServiceProvider[] = providers
                .filter((provider: Provider) =>
                    provider.location &&
                    provider.location.coordinates &&
                    provider.location.coordinates.length === 2 &&
                    !isNaN(provider.location.coordinates[0]) &&
                    !isNaN(provider.location.coordinates[1])
                )
                .map((provider: Provider) => ({
                    _id: provider._id,
                    name: provider.name,
                    location: {
                        type: 'Point', // Add the missing 'type' property
                        coordinates: provider.location.coordinates
                    },
                    rating: provider.rating,
                    phone: provider.phone,
                    profileImage: provider.profileImage,
                }));

            if (validProviders.length > 0) {
                setServiceProviders(validProviders);
                setMapCenter(calculateMapCenter(validProviders));
            } else {
                setError('No valid service provider locations found');
            }
            setLoading(false);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to fetch service providers');
            setLoading(false);
        }
    };


    useEffect(() => {
        if (userInfo) {
            fetchServiceProviders();
        }
    }, [userInfo]);

    const handleMarkerClick = (providerId: string) => {
        setActiveInfoWindow(activeInfoWindow === providerId ? null : providerId);
    };

    if (loading) return <div>Loading service providers...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <LoadScript
            googleMapsApiKey={"AIzaSyAmB63Ixx1tDyUyEvQ4KE1ymOM2YANXPn0"}
            libraries={["places"]}
        >
            <div style={{ position: "relative", height: "100%" }}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={mapCenter}
                    zoom={10}
                    onLoad={(map) => {
                        mapRef.current = map;
                    }}
                >
                    {serviceProviders.map((provider) => (
                        <React.Fragment key={provider._id}>
                            <Marker
                                position={{
                                    lat: provider.location.coordinates[0],
                                    lng: provider.location.coordinates[1]
                                }}
                                title={provider.name}
                                onClick={() => handleMarkerClick(provider._id)}
                            />
                            {activeInfoWindow === provider._id && (
                                <InfoWindow
                                    position={{
                                        lat: provider.location.coordinates[0],
                                        lng: provider.location.coordinates[1]
                                    }}
                                    onCloseClick={() => setActiveInfoWindow(null)}
                                >
                                    <div className="p-2">
                                        {provider.profileImage && (
                                            <img
                                                src={provider.profileImage}
                                                alt={provider.name}
                                                className="w-16 h-16 rounded-full mx-auto mb-2"
                                            />
                                        )}
                                        <h3 className="font-bold text-lg mb-2">{provider.name}</h3>
                                        <p className="text-sm">Rating: {provider.rating}/5</p>
                                        <p className="text-sm">Phone: {provider.phone}</p>
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

export default AllotedServiceProviderMap;