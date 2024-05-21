// components/MessagebeViewer.js
"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";
const MessageViewer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Contact"));
        const messagesData = querySnapshot.docs.map((doc) => doc.data());
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
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
    <div className="flex flex-col gap-4 md:gap-8 px-10 md:px-16 lg:px-24">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-md border-2 hover:border-blue-300 shadow-md"
          >
            <div className="flex items-center px-4 justify-between">
              <h3 className="font-semibold mb-2">{message.name}</h3>
              <div className="flex items-center justify-center gap-2">
                <p className="text-gray-600 ">{message.email}</p>
                <CopyToClipboard
                  text={message.email}
                  onCopy={() => handleCopy(message.email)}
                >
                  <div className="hover:text-blue-500 text-gray-500">
                    <FaCopy />
                  </div>
                </CopyToClipboard>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-800 text-sm">{message.message}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-blue-300 uppercase text-center text-3xl">
          No messages
        </p>
      )}
      <ToastContainer />
    </div>
  );
};

export default MessageViewer;
