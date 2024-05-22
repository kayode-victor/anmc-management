// components/RegViewer.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useReactToPrint } from "react-to-print";
const RegViewer = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Registrations"));
        const registrationsData = querySnapshot.docs.map((doc) => doc.data());
        setRegistrations(registrationsData);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    };

    fetchRegistrations();
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
      {registrations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {registrations.map((reg, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md border-2 hover:border-blue-300 shadow-md"
            >
              <div className="flex items-center px-4 mb-2 justify-between">
                <h3 className="font-semibold">{reg.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-gray-600 ">{reg.email}</p>
                  <CopyToClipboard
                    text={reg.email}
                    onCopy={() => handleCopy(reg.email)}
                  >
                    <button className="hover:text-blue-500 text-gray-500">
                      <FaCopy />
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">
                  Country:{" "}
                  <span className="text-green-500 font-semibold">
                    {reg.country}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">
                  Phone:{" "}
                  <span className="text-red-500 font-semibold">
                    {reg.phone}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">
                  Role::{" "}
                  <span className="text-blue-500 font-semibold">
                    {reg.role}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-blue-300 uppercase text-center text-3xl">
          No registrations yet.
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
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Country</th>
              <th className="border px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{reg.name}</td>
                <td className="border px-4 py-2">{reg.email}</td>
                <td className="border px-4 py-2">{reg.phone}</td>
                <td className="border px-4 py-2">{reg.country}</td>
                <td className="border px-4 py-2">{reg.role}</td>
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

export default RegViewer;
