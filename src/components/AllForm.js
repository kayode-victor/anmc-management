import Link from "next/link";
import React from "react";

const forms = [
  {
    title: "Registered User",
    link: "/registered-user",
  },
  {
    title: "Partners Offers",
    link: "/partner",
  },
  {
    title: "submited Works",
    link: "/submited-work",
  },
  {
    title: "Subscribed Users",
    link: "/subscribed-user",
  },
];
const AllForm = () => {
  return (
    <div className="flex flex-col w-full overflow-hidden py-10 px-20 lg:py-24 lg:mb-24">
      <h2 className="text-2xl md:text-4xl py-5 font-bold mb-6 uppercase text-center">
        ANMC all forms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {forms.map((form, index) => (
          <Link href={form.link} key={index} className="group">
            <div className="bg-blue-600 text-white h-[200px] p-6 rounded-lg shadow-md flex flex-col items-center justify-center group-hover:bg-green-600 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-medium text-center group-hover:underline uppercase">
                {form.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllForm;
