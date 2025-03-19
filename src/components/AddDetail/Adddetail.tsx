"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from "react-toastify";
import LoginModal from '../Home/LoginModal';
import { HiMiniCheck } from "react-icons/hi2";


// All the interfaces remain the same
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

interface Subcategory {
    scheduledTiming: {
        startTime: string;
    };
    subcategoryId: {
        _id: string;
    };
    title: string;
    requestType: string;
    selectedAmount: number;
    workersRequirment: number;
    status: string;
    instructions: string | null;
    instructionsImages: string[];
    instructionAudio?: string;
    _id: string;
}

interface ServiceRequest {
    service: string;
    subcategory: {
        subcategoryId: string;
        title: string;
        requestType: string;
        workersRequirment: number;
        selectedAmount: number;
        instructions: string;
        instructionsImages: string[];
        instructionAudio?: string;
        scheduledTiming: {
            startTime: string;
        };
    };
}

interface FileResponse {
    path: string;
    // You can add any other properties that are returned by the API
}

// Loading component for suspense fallback
function LoadingSpinner() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
            <div className="animate-spin w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full"></div>
        </div>
    );
}

// Main content component that uses useSearchParams
function AddDetailContent() {
    const searchParams = useSearchParams();
    const serviceId = searchParams.get("service");

    // Handle multiple subcategories
    const subcategoriesParam = searchParams.get("subcategories");
    const [subcategoryIds, setSubcategoryIds] = useState<string[]>([]);
    const [currentSubcategoryIndex, setCurrentSubcategoryIndex] = useState<number>(0);

    const [startDate, setStartDate] = useState<string>("");
    const [instructions, setInstructions] = useState<string>("");
    const [selectedPrice, setSelectedPrice] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [showLoginPrompt, setShowLoginPrompt] = useState<boolean>(false);
    const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
    const [subcategoryData, setSubcategoryData] = useState<SubcategoryData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<string[]>([]);
    const [instructionImages, setInstructionImages] = useState<string[]>([]);
    const [instructionAudio, setInstructionAudio] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState<boolean>(false);
    const [uploadingAudio, setUploadingAudio] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [progress, setProgress] = useState<number>(0);

    const router = useRouter();
    const pricingType = "daily";

    console.log(cartItems);
    console.log(audioChunks);

    // Parse subcategory IDs from URL
    useEffect(() => {
        if (subcategoriesParam) {
            const ids = subcategoriesParam.split(',');
            setSubcategoryIds(ids);
            setProgress(0);
        } else {
            // Fall back to single subcategory mode
            const singleSubcategoryId = searchParams.get("subcategory");
            if (singleSubcategoryId) {
                setSubcategoryIds([singleSubcategoryId]);
            } else {
                setError("No subcategory IDs found");
            }
        }
    }, [subcategoriesParam, searchParams]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user-info");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserInfo(parsedUser);
        }
    }, []);

    useEffect(() => {
        // Reset form when moving to next subcategory
        if (subcategoryIds.length > 0) {
            setStartDate("");
            setInstructions("");
            setSelectedPrice(0);
            setInstructionImages([]);
            setInstructionAudio(null);
            setError(null);
            setLoading(true);
            fetchSubcategoryData();
        }
    }, [currentSubcategoryIndex, subcategoryIds]);

    const fetchSubcategoryData = async () => {
        if (!serviceId || subcategoryIds.length === 0) return;

        try {
            const currentSubcategoryId = subcategoryIds[currentSubcategoryIndex];

            const response = await fetch(
                `https://api.menrol.com/api/v1/getSubcategory?categoryId=${serviceId}&subcategoryId=${currentSubcategoryId}`
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

    useEffect(() => {
        if (userInfo) {
            fetchCart();
        }
    }, [userInfo]);

    // Set initial price setting
    useEffect(() => {
        if (subcategoryData?.data) {
            const currentPriceRange = subcategoryData.data.pricing.find(
                (p) => p.pricingtype === pricingType
            );
            if (currentPriceRange && selectedPrice === 0) {
                setSelectedPrice(currentPriceRange.from);
            }
        }
    }, [subcategoryData, pricingType, selectedPrice]);

    const fetchCart = async () => {
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
                const subcategoryIds: string[] = data.serviceRequests.requestedServices.flatMap((serviceRequest: ServiceRequest) =>
                    Array.isArray(serviceRequest.subcategory)
                        ? serviceRequest.subcategory.map((subcategory: Subcategory) => subcategory.subcategoryId._id)
                        : []
                );
                setCartItems(subcategoryIds);
            }
        } catch (err) {
            console.error("Error fetching cart:", err);
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

    const getCurrentDateTime = () => {
        const now = new Date();
        return now.toISOString().slice(0, 16);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = e.target.value;
        const currentDateTime = new Date();
        const selectedDateTime = new Date(newStartDate);

        if (selectedDateTime < currentDateTime) {
            toast.error("Start time cannot be before current time");
            return;
        }

        setStartDate(newStartDate);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !userInfo?.token) {
            return;
        }

        const files = Array.from(e.target.files);

        // ✅ Check for max image limit
        if (instructionImages.length + files.length > 10) {
            toast.error("Maximum 10 images allowed");
            return;
        }
        try {
            setUploadingImage(true);
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('instImages', file);
            });

            const response = await fetch(
                "https://api.menrol.com/api/v1/uploadServiceInstructionImage",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${userInfo?.token}`,
                    },
                    body: formData,
                }
            );
            if (!response.ok) {
                throw new Error("Failed to upload images");
            }

            const data = await response.json();
            if (data.success && Array.isArray(data.file)) {
                // Define the type of file in the response
                const uploadedUrls = (data.file as FileResponse[]).map((file) => file.path);

                setInstructionImages(prev => [...prev, ...uploadedUrls]);

                toast.success("Images uploaded successfully");
            } else {
                throw new Error(data.message || "Failed to upload images");
            }

        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to upload images");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks: Blob[] = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            recorder.onstop = () => {
                const audioBlob = new Blob(chunks, { type: 'audio/mpeg' });
                setUploadingAudio(true);
                uploadAudioToServer(audioBlob); // Upload audio to API
            };

            recorder.start();
            setAudioChunks(chunks);
            setMediaRecorder(recorder);
            setIsRecording(true);

            toast.info("Recording started. Speak now...");
        } catch (error) {
            console.error(error);
            toast.error("Failed to start recording. Mic permission denied?");
        }
    };

    const handleStopRecording = () => {
        if (!mediaRecorder) {
            toast.error("No recording in progress");
            return;
        }

        mediaRecorder.stop();
        setIsRecording(false);
        toast.info("Recording stopped. Uploading...");
    };

    const uploadAudioToServer = async (audioBlob: Blob) => {
        try {
            const formData = new FormData();
            // Correct key based on API requirements
            formData.append('instAudio', audioBlob, `audio_${Date.now()}.mp3`);

            const response = await fetch('https://api.menrol.com/api/v1/uploadServiceInstructionAudio', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userInfo?.token}`,
                    // Do NOT manually set Content-Type for FormData
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed. Server error!");
            }

            const result = await response.json();

            if (result.success) {
                toast.success("Audio uploaded successfully!");

                // If API returns a filePath, set it here
                setInstructionAudio(result.file[0].path || null);
            } else {
                toast.error(result.message || "Upload failed!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Audio upload failed.");
        } finally {
            setUploadingAudio(false);
        }
    };

    const removeImage = (indexToRemove: number) => {
        setInstructionImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const removeAudio = () => {
        setInstructionAudio(null);
    };

    const handleSubmit = async () => {
        if (!userInfo?.token) {
            setShowLoginPrompt(true);
            return;
        }

        try {
            const currentDateTime = new Date();
            const startDateTime = new Date(startDate);

            if (!startDate) {
                toast.warning("Please select a start date");
                return;
            }

            if (startDateTime < currentDateTime) {
                toast.error("Start time cannot be before current time");
                return;
            }

            setIsSubmitting(true);
            setError(null);

            // Build the service request object
            const serviceRequest = {
                service: serviceId ?? "",
                subcategory: {
                    subcategoryId: selectedItem?._id || "",
                    title: selectedItem?.title || "",
                    requestType: pricingType,
                    instructions,
                    instructionsImages: instructionImages,
                    instructionAudio: instructionAudio,
                    scheduledTiming: {
                        startTime: startDateTime.toISOString(),
                    },
                },
            };

            // Since backend now expects JSON format (no stringify)
            const payload = {
                service: serviceRequest.service,
                subcategory: serviceRequest.subcategory, // no need for JSON.stringify
            };

            const response = await fetch(
                "https://api.menrol.com/api/v1/addServiceRequest",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo?.token}`,
                    },
                    body: JSON.stringify(payload), // convert the full object to JSON string, not nested stringify
                }
            );
            if (!response.ok) {
                const errorResponse = await response.json();
                alert(errorResponse.message);
                router.push('/orderdetails');
            }
            const data = await response.json();
            if (data.success) {
                toast.success(`Service request added successfully!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                // Check if this is the last subcategory
                if (currentSubcategoryIndex < subcategoryIds.length - 1) {
                    // Move to the next subcategory
                    setCurrentSubcategoryIndex(currentSubcategoryIndex + 1);
                    setProgress((currentSubcategoryIndex + 1) / subcategoryIds.length * 100);
                } else {
                    // All subcategories processed, go to checkout
                    router.push("/checkout");
                }
            } else {
                throw new Error(data.message || "Failed to add service request");
            }

        } catch (err) {
            console.error("Error submitting service request:", err);
            toast.error(err instanceof Error ? err.message : "Failed to submit service request");
            setError(err instanceof Error ? err.message : "Failed to submit service request");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSkip = () => {
        if (currentSubcategoryIndex < subcategoryIds.length - 1) {
            toast.info(`Skipping ${title}...`);
            setCurrentSubcategoryIndex(currentSubcategoryIndex + 1);
            setProgress((currentSubcategoryIndex + 1) / subcategoryIds.length * 100);
        } else {
            // All subcategories processed, go to checkout
            router.push("/checkout");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='px-[7%] py-[4%]'>
                {/* Progress bar */}
                <div className="w-full bg-gray-200 h-3 rounded-full mb-6">
                    <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Subcategory counter */}
                <div className="text-center mb-4">
                    <p className="text-gray-600">
                        Service {currentSubcategoryIndex + 1} of {subcategoryIds.length}
                    </p>
                </div>

                {showLoginPrompt ? (
                    <div className="flex flex-col items-center justify-center p-8">
                        <div className="text-xl font-semibold mb-4">Please Log In</div>
                        <p className="text-gray-600 mb-6 text-center">
                            You need to be logged in to add items to your cart.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => {
                                    setShowLoginPrompt(false);
                                    setError(null);
                                }}
                                className="bg-gray-100 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <LoginModal
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen}
                                isLoginMode={isLoginMode}
                                setIsLoginMode={setIsLoginMode}
                            />
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center gap-7 xsm:flex-col'>
                        <div className='border w-full rounded-xl px-6 py-4'>
                            <Image
                                src={image}
                                alt={title}
                                height={500}
                                width={500}
                                className='w-full lg:h-[400px] md:h-[200px] object-cover rounded-xl'
                            />
                            <div className='flex flex-col gap-4 mt-4'>
                                <h1 className='text-3xl font-bold font-lexend'>
                                    {title}
                                </h1>
                                <p className='text-base'>
                                    {description}
                                </p>
                            </div>
                            <div className='mt-7'>
                                <ul className='flex flex-col gap-2'>
                                    <li className='flex items-center gap-2 text-xl font-lexend font-semibold'><HiMiniCheck className='text-2xl text-[#0054A5]' />Trusted home services at your fingertips.</li>
                                    <li className='flex items-center gap-2 text-xl font-lexend font-semibold'><HiMiniCheck className='text-2xl text-[#0054A5]' />Book reliable professionals in just a few clicks.</li>
                                    <li className='flex items-center gap-2 text-xl font-lexend font-semibold'><HiMiniCheck className='text-2xl text-[#0054A5]' />Seamless solutions for your household needs.</li>
                                    <li className='flex items-center gap-2 text-xl font-lexend font-semibold'><HiMiniCheck className='text-2xl text-[#0054A5]' />Experience stress-free home maintenance services.</li>
                                </ul>
                            </div>
                        </div>

                        <div className='border justify-between rounded-xl w-full p-5'>
                            <h1 className='text-3xl font-lexend font-bold'>Book your service</h1>
                            <div className='flex flex-col items-center justify-between gap-10 p-4 w-full'>
                                <div className='w-full hidden'>
                                    <label htmlFor="" className='text-gray-400 font-lexend font-bold text-sm'>Pricing Type:</label>
                                    <select
                                        value={pricingType}
                                        disabled={true}
                                        className="w-full border border-gray-400 rounded-2xl p-4"
                                    >
                                        <option value="daily">Daily</option>
                                    </select>
                                </div>
                                <div className='w-full'>
                                    <label htmlFor="" className='text-gray-400 font-lexend font-bold text-sm'>Start Date:</label>
                                    <input
                                        type="datetime-local"
                                        value={startDate}
                                        min={getCurrentDateTime()}
                                        onChange={handleStartDateChange}
                                        className='border px-5 py-4 border-gray-400 active:border-blue-600 rounded-2xl w-full'
                                    />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="" className='text-gray-400 font-lexend font-bold text-sm'>Instructions:</label>
                                    <textarea
                                        placeholder="Add any specific instructions..."
                                        value={instructions}
                                        onChange={(e) => setInstructions(e.target.value)}
                                        className='w-full border border-gray-400 rounded-2xl p-3'
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="" className='text-gray-400 font-lexend font-bold text-sm'>Instruction Images (Maximum 10):</label>
                                    <div className='flex flex-col gap-3'>
                                        <input
                                            type="file"
                                            onChange={handleImageUpload}
                                            accept="image/*"
                                            multiple
                                            className='border px-5 py-4 border-gray-400 rounded-2xl w-full'
                                            disabled={uploadingImage || instructionImages.length >= 10}
                                        />
                                        {uploadingImage && <p className="text-blue-500">Uploading images...</p>}

                                        <div className="text-sm text-gray-500">
                                            {instructionImages.length}/10 images uploaded
                                        </div>

                                        {instructionImages.length > 0 && (
                                            <div className="flex flex-wrap gap-3 mt-3">
                                                {instructionImages.map((imgUrl, index) => (
                                                    <div key={index} className="relative">
                                                        <img src={imgUrl} alt={`Instruction ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
                                                        <button
                                                            onClick={() => removeImage(index)}
                                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Audio Recording Section */}
                                <div className='flex flex-col w-full'>
                                    <label className='text-gray-400 font-lexend font-bold text-sm'>Instruction Audio:</label>
                                    <div className='flex flex-col gap-3'>
                                        <div className="flex gap-3">
                                            {!isRecording ? (
                                                <button
                                                    onClick={handleStartRecording}
                                                    disabled={instructionAudio !== null || uploadingAudio}
                                                    className={`px-5 py-3 rounded-2xl ${instructionAudio === null && !uploadingAudio ? 'bg-[#0054A5] text-white' : 'bg-gray-300 text-gray-600'} font-semibold`}
                                                >
                                                    Start Recording
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleStopRecording}
                                                    className="px-5 py-3 rounded-2xl bg-red-500 text-white font-semibold flex items-center gap-2"
                                                >
                                                    <span className="animate-pulse w-3 h-3 bg-white rounded-full"></span>
                                                    Stop Recording
                                                </button>
                                            )}
                                        </div>

                                        {uploadingAudio && <p className="text-blue-500">Processing audio...</p>}

                                        {instructionAudio && (
                                            <div className="flex items-center gap-3 mt-3">
                                                <audio controls src={instructionAudio} className="w-full" />
                                                <button
                                                    onClick={removeAudio}
                                                    className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='flex w-full gap-5'>
                                    <button
                                        onClick={handleSkip}
                                        className='w-full p-4 md:p-2 rounded-xl bg-[#D9D9D994] text-black font-lexend font-bold'
                                    >
                                        Skip this service
                                    </button>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full lg:p-4 md:p-2 rounded-xl bg-[#0054A5] text-white font-lexend font-bold"
                                    >
                                        {isSubmitting ? "Adding..." : currentSubcategoryIndex === subcategoryIds.length - 1 ? "Add & Checkout" : "Add & Continue"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// Wrapper component that implements Suspense boundary
const Adddetail = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <AddDetailContent />
        </Suspense>
    );
}

export default Adddetail;