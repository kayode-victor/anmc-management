// components/SubscribeViewer.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useReactToPrint } from "react-to-print";

const PartnerViewer = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Partner"));
        const partnerData = querySnapshot.docs.map((doc) => doc.data());
        setPartners(partnerData);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchPartners();
  }, []);
  const handleCopy = (text) => {
    toast.success(`Email copied: ${text}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  // Ref for the hidden table we want to print
  const componentToPrintRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentToPrintRef.current,
  });
  return (
    <div className="flex flex-col gap-4 px-10 md:px-16 lg:px-24">
      {partners.length > 0 ? (
        <div className="flex flex-col gap-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md border-2 hover:border-blue-300 shadow-md"
            >
              <div className="flex items-center px-4 mb-2 justify-between">
                <h3 className="font-semibold ">{partner.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-gray-600 ">{partner.email}</p>
                  <CopyToClipboard
                    text={partner.email}
                    onCopy={() => handleCopy(partner.email)}
                  >
                    <button className="hover:text-blue-500 text-gray-500">
                      <FaCopy />
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">
                  Company:{" "}
                  <span className="text-blue-500 font-semibold">
                    {partner.company || "none"}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">
                  Offering:{" "}
                  <span className="text-green-500 font-semibold">
                    ₦ {partner.offering || "0"}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-800">
                  Message: {partner.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-blue-300 uppercase text-center text-3xl">
          No partner offers yet.
        </p>
      )}
      {/* Hidden Table for Printing - Added to enable printing functionality */}
      <div
        className="hidden-from-screen flex mx-20 my-10"
        ref={componentToPrintRef}
      >
        <table className="table-auto w-full ">
          <thead>
            <tr className="bg-gray-300">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">offering</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{partner.name}</td>
                <td className="border px-4 py-2">{partner.email}</td>
                <td className="border px-4 py-2">{partner.company}</td>
                <td className="border px-4 py-2">₦{partner.offering || "0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 self-end"
        onClick={handlePrint}
      >
        Print All
      </button>
    </div>
  );
};

export default PartnerViewer;
