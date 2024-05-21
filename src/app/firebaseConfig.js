import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZZJmv2Pf1KdZguImHxwfTdYsSTtSavoE",
  authDomain: "africa-nft-and-meta-conference.firebaseapp.com",
  projectId: "africa-nft-and-meta-conference",
  storageBucket: "africa-nft-and-meta-conference.appspot.com",
  messagingSenderId: "694395327122",
  appId: "1:694395327122:web:d141707798c7184083cc4b",
  measurementId: "G-K9SC98M3FC",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
