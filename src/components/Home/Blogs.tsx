import Image from "next/image";
import React from "react";

const blogsData = [
  {
    id: 1,
    title: "Menrol: Your Trusted Partner for All Home Services",
    description:
      "Managing home maintenance has never been easier! Menrol is a one-stop solution for all your household needs, offering services like cleaning, plumbing, carpentry, electrical repairs, and more.",
    image: "/Images/AllImages/Blog1.jpg",
    link: "https://pizzazzpainting.com/blog/diy-guide-condo-painting/",
  },
  {
    id: 2,
    title: "Simplify Your Life with Menrol",
    description:
      "Life is busy, but your household chores don’t have to be. Menrol brings skilled professionals to your fingertips, offering on-demand services for every need.",
    image: "/Images/AllImages/Blog2.jpg",
    link: "https://pizzazzpainting.com/blog/popular-paint-colors-and-how-they-affect-your-mood/",
  },
  {
    id: 3,
    title: "Transform Your Home with Menrol’s Expert Services",
    description:
      "Your home deserves the best care, and that’s exactly what Menrol provides. Our app connects you with experienced professionals who specialize in cleaning, repairs, and installations.",
    image: "/Images/AllImages/Blog3.png",
    link: "https://pulseelectrix.co.uk/stay-connected-and-safe-a-guide-to-using-extension-leads/",
  },
  {
    id: 4,
    title: "Connecting You with Verified Experts for Quality Home Services",
    description:
      "Finding reliable home service providers can be challenging. That’s where Menrol steps in. Our app connects you with trusted, verified professionals who deliver top-quality work for tasks big and small.",
    image: "/Images/AllImages/Blog4.png",
    link: "https://pulseelectrix.co.uk/everything-you-need-to-know-about-portable-appliance-testing/",
  },
];

const Blogs = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-[10%] md:px-[10%] py-10">
  {/* Header Section */}
  <div className="flex flex-col items-center text-center">
    <h1 className="text-[#51DC98] uppercase font-bold tracking-[0.3em] py-4">
      / BLOGS
    </h1>
    <h1 className="text-[#24232A] text-[24px] sm:text-[36px] font-bold xsm:text-[18px] pb-6 font-dm-sans tracking-wide leading-snug">
      Comfortable Cleanliness, Supaklin&apos;s Standard
    </h1>
  </div>

  {/* Blog Cards Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xsm:flex xsm:flex-nowrap xsm:overflow-x-auto xsm:gap-4 xsm:w-full">
    {blogsData.map((blog) => (
      <div
        key={blog.id}
        className="shadow-lg rounded-xl bg-[#0054A5] overflow-hidden flex flex-col min-w-[80%] xsm:min-w-[75%] sm:min-w-0"
      >
        <Image
          src={blog.image}
          alt={blog.title}
          className="w-full h-[25vh] sm:h-[30vh] hover:scale-105 transition-transform duration-300 cursor-pointer object-cover"
          height={200}
          width={300}
        />
        <div className="flex flex-col gap-y-3 flex-grow p-4">
          <h3 className="text-md sm:text-xl font-bold text-white font-dm-sans tracking-wide leading-relaxed">
            {blog.title}
          </h3>
          <p className="text-sm sm:text-md text-white flex-grow font-dm-sans tracking-wide leading-relaxed">
            {blog.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Blogs;
