// components/WorkViewer.js
"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/app/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCopy } from "react-icons/fa6";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Image from "next/image";
import Link from "next/link";

const WorkViewer = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "WorkSubmissions"));
        const worksData = querySnapshot.docs.map((doc) => doc.data());
        setWorks(worksData);
      } catch (error) {
        console.error("Error fetching work submissions:", error);
      }
    };

    fetchWorks();
  }, []);

  const handleCopy = (text) => {
    toast.success(`Website Link copied: ${text}`, {
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
      <ToastContainer />
      {works.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {works.map((work, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md border-2 hover:border-blue-300 shadow-md"
            >
              <div className="flex items-center mb-2 px-4 justify-between">
                <h3 className="font-semibold">{work.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-gray-600 ">{work.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">Company: {work.company}</p>
              </div>
              {work.imageLink && (
                <Link href={work.imageLink} className="mt-4">
                  <Image
                    src={work.imageLink}
                    alt="Submission Image"
                    width={400} // Adjust as needed
                    height={150} // Adjust as needed
                    className="object-cover object-top w-full h-[280px]"
                  />
                </Link>
              )}
              <div className="flex items-center  my-2">
                <p className="text-gray-800">Website:</p>
                <Link
                  href={work.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 font-bold mx-2 hover:underline"
                >
                  {work.websiteLink}
                </Link>
                <CopyToClipboard
                  text={work.websiteLink}
                  onCopy={() => handleCopy(work.websiteLink)}
                >
                  <button className="hover:text-blue-500 text-gray-500">
                    <FaCopy />
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-blue-300 uppercase text-center text-3xl">
          No work submissions yet.
        </p>
      )}
    </div>
  );
};

export default WorkViewer;
