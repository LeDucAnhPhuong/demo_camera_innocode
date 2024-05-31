import Detect from "@/components/2DDetect";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Image } from "@nextui-org/react";
import React, { useRef, useState } from "react";

function VirtualFittingRoom() {
  return (
    <>
      <div className="max-w-[1024px] px-6 mx-auto mt-6">
        <Image
          alt="Woman listing to music"
          className="object-cover w-full round-sm"
          height={1400}
          src={
            "https://image.hm.com/content/dam/global_campaigns/season_08/home/7078-holiday/7078e/department-teasers/7078E-decorations-table-3x2-1.jpg?imwidth=1260"
          }
          width={1400}
        />
        <h3 className="text-4xl font-bold text-center mt-20">Try it out!</h3>
        <p className="text-md text-center text-slate-600 max-w-xl mx-auto mt-2">
          Searchfor the latest fashion articles and find amazing products to buy
          from our huge collection
        </p>
      </div>
      <Detect></Detect>
    </>
  );
}

export default VirtualFittingRoom;
