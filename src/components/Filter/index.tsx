"use client";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";

function Filter() {
  const [filter, setFilter] = useState("All");

  const handleFilter = (option: string) => {
    setFilter(option);
  };

  return (
    <div className="flex flex-row justify-center gap-5 mx-auto my-4">
      <Button
        onClick={() => handleFilter("All")}
        className={`${
          filter === "All" ? "bg-primary text-white" : "bg-transparent hover:bg-blue-100"
        } `}
      >
        All
      </Button>
      <Button
        onClick={() => handleFilter("Garment Upper body")}
        className={`${
          filter === "Garment Upper body"
            ? "bg-primary text-white"
            : "bg-transparent hover:bg-blue-100"
        } `}
      >
        Garment Upper body
      </Button>
      <Button
        onClick={() => handleFilter("Garment Lower body")}
        className={`${
          filter === "Garment Lower body"
            ? "bg-primary text-white"
            : "bg-transparent hover:bg-blue-100"
        } `}
      >
        Garment Lower body
      </Button>
      <Button
        onClick={() => handleFilter("Socks & Tights")}
        className={`${
          filter === "Socks & Tights"
            ? "bg-primary text-white"
            : "bg-transparent hover:bg-blue-100"
        } `}
      >
        Socks & Tights
      </Button>
      <Button
        onClick={() => handleFilter("Nightwear")}
        className={`${
          filter === "Nightwear" ? "bg-primary text-white" : "bg-transparent hover:bg-blue-100"
        } `}
      >
        Nightwear
      </Button>
      <Button
        onClick={() => handleFilter("Accessories")}
        className={`${
          filter === "Accessories" ? "bg-primary text-white" : "bg-transparent hover:bg-blue-100"
        } `}
      >
        Accessories
      </Button>
      <Button
        onClick={() => handleFilter("Shoes")}
        className={`${
          filter === "Shoes" ? "bg-primary text-white" : "bg-transparent hover:bg-blue-100"
        } `}
      >
        Shoes
      </Button>
    </div>
  );
}

export default Filter;
