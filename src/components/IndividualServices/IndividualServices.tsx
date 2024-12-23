"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Service {
  _id: string;
  category: string;
  description: string;
  categoryImage: string;
}

const IndividualServices: React.FC = () => {
  const searchParams = useSearchParams();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const parsedService = JSON.parse(data);
        setService(parsedService);
      } catch (error) {
        console.error("Error parsing service data:", error);
      }
    }
    console.log(" first check data is comming or not ", data);
  }, [searchParams]);

  return (
    <div>
      {service ? (
        <>
          <h1>{service.category}</h1>
          <p>{service.description}</p>
          <img src={service.categoryImage} alt={service.category} />
        </>
      ) : (
        <p>Loading service details...</p>
      )}
    </div>
  );
};

export default IndividualServices;
