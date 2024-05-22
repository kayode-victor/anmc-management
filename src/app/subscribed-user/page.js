"use clients";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SubscribeViewer from "@/components/SubsribedViewer";
import React from "react";

const page = () => {
  return (
    <main className="w-full flex flex-col gap-0 overflow-hidden">
      <Header />
      <div className="flex flex-col gap-5 my-20 md:my-24">
        <div className="px-10 text-center lg:text-left lg:mx-14">
          <h4 className="text-gray-700 font-medium uppercase text-xl">
            All subscribed Email
          </h4>
        </div>
        {/*Form viewer*/}

        <div>
          <SubscribeViewer />
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default page;
