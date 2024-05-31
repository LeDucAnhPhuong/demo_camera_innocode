"use client";

import Filter from "@/components/Filter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import SearchPromp from "@/components/SearchPromp";
import { Badge, Button, Image, Input, Spinner } from "@nextui-org/react";
import { FaCartShopping, FaImage, FaSearchengin } from "react-icons/fa6";
import { firebaseDB } from "../firebaseConfig";
import {
  addDoc,
  getDoc,
  collection,
  doc,
  query,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import axios from "axios";
import { DATA } from "./data";
import { useEffect, useRef, useState } from "react";
import { ProductType } from "./[article_id]/page";

const q = query(collection(firebaseDB, "article"));

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<DocumentData[]>([]);
  const [promt, setPromt] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(q);
      let data: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      const filteredArray: DocumentData[] = [];
      const uniqueProductCodes: Record<string, boolean> = {};
      data.forEach((obj) => {
        const productCode = obj.product_code;
        if (!uniqueProductCodes[productCode]) {
          uniqueProductCodes[productCode] = true;
          filteredArray.push(obj);
        }
      });
      console.log('filteredArray');
      console.log(filteredArray);
      
      setProducts(filteredArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://try.serveo.net/search/query/${promt}`
      );
      console.log(res.data.points);
      const data = res.data.points;
      const newData = data.map((p: any) => {
        return {
          article_id: p.id,
          ...p.payload,
        };
      });
      console.log("newData");
      console.log(newData);
      setProducts(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // const handleClick = async () => {
  //   try {
  //     console.log("!!!");
      
  //     DATA.forEach(async (p, index) => {
  //       await addDoc(collection(firebaseDB, "article"), p);
  //       console.log("done" + index);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     // setLoading(false);
  //   }
  // };

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);

      // Create a FormData object and append the file to it
      const formData = new FormData();
      formData.append("image", file);

      // Send the FormData to the API using Axios
      const response = await axios.post(
        "https://try.serveo.net/search/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important to set the content type
          },
        }
      );

      // Handle the response data as needed
      console.log(response.data);

      const data = response.data.points;
      const newData = data.map((p: any) => {
        return {
          article_id: p.id,
          ...p.payload,
        };
      });
      console.log("newData");
      console.log(newData);
      setProducts(newData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-[1024px] px-6 mx-auto mt-6 mb-20">
        <Image
          alt="Woman listing to music"
          className="object-cover w-full round-sm"
          height={1400}
          src={
            "https://image.hm.com/content/dam/global_campaigns/season_08/ladies/6038/6038-Holiday-3x2-8-SLUSSEN-GEN.jpg?imwidth=1260"
          }
          width={1400}
        />
      </div>
      <section className="max-w-[1366px] px-6 mx-auto">
        <h3 className="text-4xl font-bold text-center">Exclusive Products</h3>
        <p className="text-md text-center text-slate-600">
          Searchfor the latest fashion articles and find amazing products to buy
          from our huge collection
        </p>
        <div className="relative mt-4 mx-auto max-w-full w-2/3 sm:max-w-[40rem] flex flex-row gap-2">
          <div className="flex gap-4 items-center">
            <input
              ref={fileInputRef}
              onChange={handleFileUpload}
              type="file"
              style={{ display: "none" }}
            />
            <Button
              className="h-full"
              startContent={<FaImage />}
              onClick={() => fileInputRef && fileInputRef.current?.click()}
            >
              Upload image
            </Button>
          </div>
          <Input
            classNames={{
              base: "flex-1",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Search product..."
            size="lg"
            startContent={<FaSearchengin />}
            type="search"
            onChange={(e) => setPromt(e.target.value)}
          />
          <Button
            size="md"
            color="primary"
            className="absolute bottom-[4px] right-[4px]"
            onClick={handleClick}
          >
            Search
          </Button>
        </div>
        <Filter></Filter>
        <div className="flex flex-row gap-5 flex-wrap">
          {loading ? (
            <div className="flex gap-4 w-full justify-center mt-4">
              <Spinner size="lg" />
            </div>
          ) : (
            products.map((product, index) => (
              <ProductCard key={index} product={product}></ProductCard>
            ))
          )}
          {/* {products.map((product, index) => (
            <ProductCard key={index} product={product}></ProductCard>
          ))} */}
        </div>
      </section>

      {/* <SearchPromp></SearchPromp> */}
      <div className="min-h-[20vh]"></div>
    </>
  );
}
