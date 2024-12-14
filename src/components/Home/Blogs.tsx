import Image from "next/image";
import React from "react";

const blogsData = [
  {
    id: 1,
    title: "HOME CLEANING",
    description: "Trusted home cleaning professionals creating clean, fresh, and beautiful homes",
    image: "/Images/Notifications-1.png",
  },
  {
    id: 2,
    title: "office Cleaning",
    description: "Efficient office cleaning services for a healthier, cleaner, and more focused workspace.",
    image: "/Images/Notifications-1.png",
  },
  {
    id: 3,
    title: "Kitchen Cleaning",
    description: "Custom kitchen cleaning services delivering deep cleanliness and hygiene in every corner.",
    image: "/Images/Notifications-1.png",
  },
  {
    id: 4,
    title: "Card Heading 4",
    description: "Some text content for card 4. This is a description.",
    image: "/Images/Notifications-1.png",
  },

];

const Blogs = () => {
  return (
    <div className="px-[10%] h-screen">
      {/* Header Section */}
      <div className="flex flex-col items-center">
        <h1 className="text-[#51DC98] uppercase font-bold pl-4 tracking-[0.3em] py-10">
          {"/ BLOGS".split(" ").join("  ")}
        </h1>
        <h1 className="text-[#24232A] text-[56px] text-center pb-10">
          Comfortable cleanliness,Supaklin's standard
        </h1>
      </div>

      {/* Blog Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {blogsData.map((blog) => (
          <div
            key={blog.id}
            className="shadow-sm rounded-lg bg-[#0054A5] overflow-hidden"
          >
            <Image
              src={blog.image}
              alt={blog.title}
              className="w-full h-[55%] object-cover"
              height={300}
              width={300}
            />
            <div className="flex flex-col px-5 gap-y-3 items-center justify-center py-4">
              <h3 className="text-lg font-semibold text-white">{blog.title}</h3>
              <p className="text-sm text-white text-center">
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
