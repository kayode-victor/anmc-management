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
const SubscribeViewer = () => {
  const [subscribedEmails, setSubscribedEmails] = useState([]);

  useEffect(() => {
    const fetchSubscribedEmails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Subscribe User"));
        const emails = querySnapshot.docs.map((doc) => doc.data().email);
        setSubscribedEmails(emails);
      } catch (error) {
        console.error("Error fetching subscribed emails:", error);
      }
    };

    fetchSubscribedEmails();
  }, []);
  const handleCopy = (email) => {
    toast.success(`Email copied: ${email}`, {
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
      {subscribedEmails.length > 0 ? ( // Conditional rendering
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4">
          {subscribedEmails.map((email, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded-md border shadow-md"
            >
              <span>{email}</span>
              <CopyToClipboard text={email} onCopy={() => handleCopy(email)}>
                <div className="hover:text-blue-500 text-gray-500">
                  <FaCopy />
                </div>
              </CopyToClipboard>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-blue-300 uppercase text-center text-3xl">
          No subscribed user
        </p>
      )}
      {/* Hidden Table for Printing - Added to enable printing functionality */}
      <div
        className="hidden-from-screen flex mx-20 my-10"
        ref={componentToPrintRef}
      >
        <table className="table-auto w-1/2 ">
          <thead>
            <tr className="bg-gray-300">
              <th className="border px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {subscribedEmails.map((email, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{email}</td>
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

export default SubscribeViewer;
