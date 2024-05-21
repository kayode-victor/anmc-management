// components/SubscribeViewer.js
"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  return (
    <div className="flex flex-col gap-4 px-10 md:px-16 lg:px-24">
      {partners.length > 0 ? (
        <div className="flex flex-col gap-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md border-2 hover:border-blue-300 shadow-md"
            >
              <div className="flex items-center px-4 justify-between">
                <h3 className="font-semibold mb-2">{partner.name}</h3>
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
                <p className="text-blue-500">Company: {partner.company}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-green-500">
                  Offering: ₦{partner.offering || "0"}
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
      <ToastContainer />
    </div>
  );
};

export default PartnerViewer;
