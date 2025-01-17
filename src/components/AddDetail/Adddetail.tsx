"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";

interface Item {
    title: string;
    description: string;
    // Add other properties here based on the structure of your data
    image: string;
    dailyWageWorker: number;
    hourlyWorker: number;
    contractWorker: number;
}
interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string;
}

interface PricingData {
    pricingtype: string;
    from: number;
    to: number;
    _id: string;
}

interface SubcategoryData {
    success: boolean;
    data: {
        description: string;
        dailyWageWorker: number;
        contractWorker: number;
        title: string;
        image: string;
        _id: string;
        hourlyWorker: number;
        pricing: PricingData[];
    }
}

interface ServiceRequest {
    instImages: File | null;
    service: string;
    subcategory: {
        subcategoryId: string;
        title: string;
        requestType: string;
        workersRequirment: number;
        selectedAmount: number;
        instructions: string;
        scheduledTiming: {
            startTime: string;
            endTime: string;
        };
    };
}

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);
};

const Adddetail = () => {

    const searchParams = useSearchParams();
    const serviceId = searchParams.get("service");
    const subcategoryId = searchParams.get("subcategory");
    const [parsedItem, setParsedItem] = useState<Item | null>(null);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [pricingType, setPricingType] = useState<string>("daily");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [workers, setWorkers] = useState<number>(1);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState<boolean>(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [subcategoryData, setSubcategoryData] = useState<SubcategoryData | null>(null);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState<string[]>([]);

    const router = useRouter();
    useEffect(() => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserInfo(parsedUser);
        }
    }, []);

    useEffect(() => {
        const fetchSubcategoryData = async () => {
            try {

                const itemParam = searchParams.get('service');
                const response = await fetch(
                    `https://api.menrol.com/api/v1/getSubcategory?categoryId=${serviceId}&subcategoryId=${subcategoryId}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch subcategory data');
                }


                const data = await response.json();
                setSubcategoryData(data);
            } catch (err) {
                console.error('Error:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchSubcategoryData();
    }, [serviceId, subcategoryId]);


    useEffect(() => {
        if (userInfo) {
            fetchCart();
        }
    }, [userInfo]);

    const fetchCart = async () => {
        let ItemIds = [];
        try {
            const response = await fetch(
                "https://api.menrol.com/api/v1/getUserServiceRequests",
                {
                    headers: {
                        Authorization: `Bearer ${userInfo?.token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch service requests");
            }
            const data = await response.json();


            if (data.success && data.serviceRequests?.requestedServices) {
                console.log("tati");

                const existingSubcategories = data.serviceRequests.requestedServices.flatMap(
                    (service: any) => service.subcategory
                );
                ItemIds = existingSubcategories.map((sub: any) =>
                    sub.subcategoryId._id);
            }
        } catch (err) {
            console.error("Error fetching cart:", err);
        } finally {
            setCartItems(ItemIds);
        }
    }


    if (loading) {
        return <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
        <div className="animate-spin w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full"></div>
      </div>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!subcategoryData?.data) {
        return <p>No data found</p>;
    }

    const { title, description, image } = subcategoryData.data;
    const selectedItem = subcategoryData.data;

    const priceRange =
        selectedItem?.pricing.find((p) => p.pricingtype === pricingType) || null;

    // useEffect(() => {
    //     if (priceRange) {
    //         setSelectedPrice(priceRange.from); // Default to minimum price
    //     }
    // }, [pricingType, selectedItem]);

    // const totalPrice = calculateTotalDays();


    const calculateTotalDays = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);

        let totalTime = 0;
        if (pricingType == "daily") {

            const diffInMs = end.getTime() - start.getTime();
            totalTime = Math.max(Math.ceil(diffInMs / (1000 * 60 * 60 * 24)), 1); // At least 1 day

        } else if (pricingType == "hourly") {
            const diffInMs = end.getTime() - start.getTime();
            totalTime = Math.max(Math.ceil(diffInMs / (1000 * 60 * 60)), 1); // At least 1 hour
        }

        return selectedPrice * workers * totalTime;

    };

    const totalPrice = calculateTotalDays();

    console.log(serviceId);

    const handleSubmit = async () => {
        if (!userInfo?.token) {
            setShowLoginPrompt(true);
            setError("Please log in to continue.");
            return;
        }

        try {
            if (!startDate || !endDate || startDate > endDate) {
                toast.warning("Plss select the dates accurately");
                return;
            }

            else {
                setIsSubmitting(true);
                toast.success("Service request added successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }

            setError(null);
            console.log(serviceId);

            const serviceRequest: ServiceRequest = {
                instImages: null,
                service: serviceId ?? "",
                subcategory: {
                    subcategoryId: selectedItem?._id || " ",
                    title: selectedItem?.title || "",
                    requestType: pricingType,
                    workersRequirment: workers,
                    selectedAmount: totalPrice,
                    instructions,
                    scheduledTiming: {
                        startTime: new Date(startDate).toISOString(),
                        endTime: new Date(endDate).toISOString(),
                    },
                },
            };

            const payload = {
                service: serviceRequest.service,
                subcategory: JSON.stringify(serviceRequest.subcategory),
            };

            const jsonData = JSON.stringify(payload);

            const response = await fetch(
                "https://api.menrol.com/api/v1/addServiceRequest",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo?.token}`,
                    },
                    body: jsonData,
                }
            );

            if (!response.ok) {
                console.error("API Response Error:", await response.text());
                throw new Error(
                    `Failed to fetch service details. Status: ${response.status}`
                );
            }

            const data = await response.json();
            if (data.success) {

                router.push("/checkout");

            } else {
                throw new Error(data.message || "Failed to add service request");
            }
        } catch (err) {
            console.error("Error submitting service request:", err);
            console.log("tatti");
            setError(
                err instanceof Error ? err.message : "Failed to submit service request"
            );
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <>

            <ToastContainer />

            <div className='px-[7%] py-[4%]'>

                <div className=' flex justify-center gap-7 xsm:flex-col   '>
                    <div className=' border  rounded-xl px-6 py-4 ' >
                        <Image
                            src={image}
                            alt={'efegefv'}
                            height={500}
                            width={500}
                            className=' w-full h-[400px] object-cover rounded-xl'
                        />
                        <div className=' flex flex-col gap-4 mt-4'><h1 className='text-3xl font-bold font-lexend' >
                            {title}
                        </h1>
                            <p className=' text-base '>
                                {description}
                            </p></div>
                        <div className='mt-7'>
                            <ul className='flex flex-col gap-2'>
                                <li>Trusted home services at your fingertips.</li>
                                <li>Tellus aliquam faucibus imperdiet eget interdum.</li>
                                <li>Tellus aliquam faucibus imperdiet eget interdum.</li>
                                <li>Tellus aliquam faucibus imperdiet eget interdum.</li>
                            </ul>
                        </div>

                    </div>

                    <div className='border  justify-between rounded-xl w-full  p-5'>
                        <h1 className='text-3xl font-lexend font-bold'>Book your service</h1>
                        <div className='flex flex-col  items-center justify-between gap-10 p-4 w-full'>

                            <div className='flex xsm:flex-col gap-16 w-full'>
                                <div className='w-full'>
                                    <label htmlFor="" className='text-gray-400 font-lexend font-bold text-sm'>Start Date:</label>
                                    <input type="datetime-local"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)} placeholder='Start date'
                                        className=' border px-5 py-4 border-gray-400 active:border-blue-600 rounded-2xl w-full' />
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="" className='text-gray-400 font-lexend font-bold text-sm'>End Date:</label>
                                    <input type="datetime-local" name="last date" id=""
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className=' border px-5 py-4 border-gray-400 active:border-blue-600 rounded-2xl w-full' />
                                </div>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="" className='text-gray-400 font-lexend font-bold text-sm'>Instructions:</label>
                                <textarea
                                    placeholder="Add any specific instructions..."
                                    value={instructions}
                                    onChange={(e) => setInstructions(e.target.value)}
                                    className='w-full border border-gray-400 rounded-2xl p-3 '
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor="" className='text-gray-400 font-lexend font-bold text-sm'>Pricing Type:</label>
                                <select
                                    value={pricingType}
                                    onChange={(e) => setPricingType(e.target.value)}
                                    className="w-full border border-gray-400 rounded-2xl p-4"
                                >
                                    {selectedItem.pricing.map((price) => (
                                        <option key={price._id} value={price.pricingtype}>
                                            {price.pricingtype.charAt(0).toUpperCase() +
                                                price.pricingtype.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {priceRange && (
                                <div className='w-full'>
                                    <label htmlFor="" className='text-gray-400 font-lexend font-bold text-sm'> Select Price ({formatPrice(priceRange.from)} -{" "}
                                        {formatPrice(priceRange.to)})</label>
                                    <input type="range"
                                        min={priceRange.from}
                                        max={priceRange.to}
                                        value={selectedPrice}
                                        onChange={(e) =>
                                            setSelectedPrice(parseInt(e.target.value))
                                        }
                                        className='w-full'
                                        step={(priceRange.to - priceRange.from) / 100}
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Selected Price: {formatPrice(selectedPrice)}
                                    </p>
                                </div>

                            )}


                            <div className='w-full'>
                                <label htmlFor="" className='text-gray-400 font-lexend font-bold text-sm'>Workers Required:</label>
                                <input type="number"
                                    value={workers}
                                    onChange={(e) => setWorkers(parseInt(e.target.value))}
                                    className='w-full border border-gray-400 rounded-2xl p-4' />

                            </div>
                            <div className='flex justify-start w-full'>
                                <h1 className='text-2xl font-lexend font-bold '>Total Price: </h1>
                                <span className='text-2xl font-bold font-lexend'>{formatPrice(totalPrice)}</span>
                                <span></span>
                            </div>
                            <div className='flex w-full gap-5'>
                                <button className='w-full p-4 rounded-xl bg-[#D9D9D994] text-black font-lexend font-bold'>Cancel</button>
                                {/* <button className='w-full p-4 rounded-xl bg-[#0054A5] text-white font-lexend font-bold' onClick={handleSubmit}>Add to Cart</button> */}
                                {cartItems.includes(selectedItem?._id) ?
                                    <button
                                        onClick={() => router.push('/checkout')}
                                        className="w-full p-4 rounded-xl bg-[#0054A5] text-white font-lexend font-bold"
                                    >
                                        Go to Cart
                                    </button>
                                    :
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full p-4 rounded-xl bg-[#0054A5] text-white font-lexend font-bold"
                                    >
                                        Add to Cart
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Adddetail