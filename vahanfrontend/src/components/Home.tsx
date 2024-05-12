import { verify } from "../lib/auth";
import { getCookie, deleteCookie } from "../lib/cookie";
import Footer from "./ui/Footer";
import Header from "./ui/Header";
import Main from "./ui/Main";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // verify token
    async function verifyToken() {
      const response = await verify(getCookie("jwt"));
      if (response.message.includes("verified")) {
        window.location.href = "/dashboard";
      } else {
        deleteCookie("jwt");
      }
    }
    verifyToken();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-between">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
