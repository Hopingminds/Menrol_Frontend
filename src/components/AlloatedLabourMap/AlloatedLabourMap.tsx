"use client";
import React, { useState, useEffect, useRef } from "react";
import { OlaMaps } from "olamaps-web-sdk";
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

const API_KEY = "rxMokzPXrhVgC0u414Bdl2JN1By2MIjLpoqsytwU";

const AllotedServiceProviderMap: React.FC = () => {
    const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null); // Reference for the map container

    console.log("serviceProviders", serviceProviders);
    console.log(loading);
    console.log(error);

    const containerStyle = {
        width: "100%",
        height: "500px",
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUserInfo(parsedUser);
            } catch (err) {
                console.error("Failed to parse user info", err);
            }
        }
    }, []);

    useEffect(() => {
        const loadMap = async () => {
            if (mapContainerRef.current) { // Check if the container is available
                try {
                    const olaMaps = new OlaMaps({ apiKey: API_KEY });
                    const map = olaMaps.init({
                        style:
                            "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                        container: mapContainerRef.current, // Use the ref to the map container
                        center: [77.61648476788898, 12.931423492103944],
                        zoom: 15,
                    });
                    console.log(!map);
                    
                } catch (error) {
                    console.error("Error loading map:", error);
                    setError("Failed to load map");
                }
          
            }
        };

        loadMap();
    }, []);

    

    const fetchServiceProviders = async () => {
        if (!userInfo) return;

        try {
            const response = await axios.get(
                "https://api.menrol.com/api/v1/fetchEligibleServiceProviders",
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );

            const providers = (response as ApiResponse).data.results.flatMap(
                (result: Result) =>
                    result.subcategories.flatMap(
                        (subcategory: Subcategory) => subcategory.eligibleProviders
                    )
            );

            const validProviders: ServiceProvider[] = providers
                .filter(
                    (provider: Provider) =>
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
                        type: "Point", // Add the missing 'type' property
                        coordinates: provider.location.coordinates,
                    },
                    rating: provider.rating,
                    phone: provider.phone,
                    profileImage: provider.profileImage,
                }));

            if (validProviders.length > 0) {
                setServiceProviders(validProviders);
            } else {
                setError("No valid service provider locations found");
            }
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to fetch service providers");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userInfo) {
            fetchServiceProviders();
        }
    }, [userInfo]);

    // if (loading) return <div>Loading service providers...</div>;
    // if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div
                ref={mapContainerRef} // Attach the ref here
                style={containerStyle}
                className="h-96 mt-4 rounded-lg shadow-md"
            ></div>
        </div>
    );
};

export default AllotedServiceProviderMap;
