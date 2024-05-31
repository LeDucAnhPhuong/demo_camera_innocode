"use client";

import CamraImage from "@/assets/images/clothes/camera.png";
import { Button, Image as NextUIImage } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Camera from "../Camera";

const recommend = [
  {
    image: "/test_product/1.png",
  },
  {
    image: "/test_product/2.png",
  },
  {
    image: "/test_product/3.png",
  },
  {
    image: "/test_product/4.png",
  },
  {
    image: "/test_product/5.png",
  },
];

function Detect() {
  const [clothesIndex, setClothesIndex] = useState(3);

  return (
    <div className="max-w-[1366px] px-6 mx-auto mt-6 flex flex-row pb-20">
      <div className="w-full flex flex-col items-center ">
        <div className="w-full">
          {/* <Image
            alt="Woman listing to music"
            className="object-cover w-full round-sm"
            height={1400}
            src={CamraImage}
            width={1400}
          /> */}
          <Camera
            clothesIndex={clothesIndex}
            setClothesIndex={setClothesIndex}
          ></Camera>
        </div>
        <div className="w-full flex flex-row items-center justify-center">
          <Button
            isIconOnly
            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 text-2xl mr-3"
            radius="full"
            variant="light"
            onClick={() =>
              clothesIndex > 0 && setClothesIndex((prev) => prev - 1)
            }
          >
            <FaAngleLeft></FaAngleLeft>
          </Button>
          <div className="flex flex-row gap-1 mt-2 mx-4">
            {recommend.map((image, index) => (
              <div className="w-[100px]" key={index}>
                <NextUIImage
                  className={`border-2 w-full h-[160px] object-cover ${
                    index === clothesIndex ? "border-stone-900" : ""
                  }`}
                  onClick={() => setClothesIndex(index)}
                  radius="sm"
                  width={400}
                  height={600}
                  alt="NextUI hero Image"
                  src={image.image}
                />
              </div>
            ))}
          </div>
          <Button
            isIconOnly
            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 text-2xl"
            radius="full"
            variant="light"
            onClick={() =>
              clothesIndex < 4 && setClothesIndex((prev) => prev + 1)
            }
          >
            <FaAngleRight></FaAngleRight>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Detect;
