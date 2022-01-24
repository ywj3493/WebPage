import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import MobileHome from "../components/Home/MobileHome";
import PCHome from "../components/Home/PCHome";
export default function MainPage() {
  const isMobile = useMediaQuery({
    maxWidth: 768,
  });

  return (
    // <div className="flex-col">
    //   <div className="p-5 text-center text-white bg-gray-500 rounded-xl ">This is MainPage!</div>
    //   <div className="flex mt-10 space-x-5">
    //     <Link href="/public" passHref>
    //       <button className="underline">Go to Public Page</button>
    //     </Link>
    //     <Link href="/private" passHref>
    //       <button className="underline">Go to Private Page</button>
    //     </Link>
    //   </div>
    // </div>
    <>
      <Head>
        <title>AirBnb Project</title>
      </Head>
      {isMobile ? <MobileHome /> : <PCHome />}
    </>
  );
}
