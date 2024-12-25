import Image from "next/image";
import React from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import CoreValues from "../About/CoreValues";

const OurValue = () => {
  const values = [
    {
      title: "Excellence in Every Detail",
      description:
        "We achieve excellence in every detail, paying meticulous attention to create exceptional outcomes every time",
    },
    {
      title: "Personalized Care",
      description:
        "We achieve excellence in every detail, paying meticulous attention to create exceptional outcomes every tim",
    },
    {
      title: "Transparent Communication",
      description:
        "Experience personalized care with services designed to address your specific needs for optimal satisfaction",
    },
    {
      title: "Eco-Friendly Approach",
      description:
        "Our commitment to transparent communication means no surprises—just clear, honest, and consistent updates every time.",
    },
  ];
  const progressBars = [
    { label: "Experienced", percentage: 98 },
    { label: "Reliable", percentage: 86 },
    { label: "Skilled & Capable", percentage: 90 },
    { label: "Flexible", percentage: 80 },
  ];
  return (
    <div className=" ">
      <CoreValues values={values} progressBars={progressBars} />
    </div>
  );
};

export default OurValue;
