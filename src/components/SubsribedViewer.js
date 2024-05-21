// components/SubscribeViewer.js
"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4 px-10">
      {subscribedEmails.length > 0 ? ( // Conditional rendering
        subscribedEmails.map((email, index) => (
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
        ))
      ) : (
        <p className="text-blue-300 uppercase text-center text-3xl">
          No subscribed user
        </p>
      )}
      <ToastContainer />
    </div>
  );
};

export default SubscribeViewer;
