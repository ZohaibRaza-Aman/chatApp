import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDZ3YLAe4SL4AKe5L3MOAL7bv7X9xISly0",
  authDomain: "chatapp-with-realtime.firebaseapp.com",
  projectId: "chatapp-with-realtime",
  storageBucket: "chatapp-with-realtime.appspot.com",
  messagingSenderId: "920921850204",
  appId: "1:920921850204:web:814d227d3e0e9832454199",
  measurementId: "G-7P9F5SE7QX"
};


export const app = initializeApp(firebaseConfig);