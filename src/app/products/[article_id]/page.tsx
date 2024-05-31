"use client";

import { firebaseDB } from "@/app/firebaseConfig";
import SearchPromp from "@/components/SearchPromp";
import { Button, Image } from "@nextui-org/react";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaAngleRight,
  FaCartPlus,
  FaHeart,
  FaRegHeart,
  FaShirt,
} from "react-icons/fa6";

export type ProductType = {
  article_id: string;
  colour_group_name: string;
  detail_desc: string;
  garment_group_name: string;
  index_group_name: string;
  price: number;
  prod_name: string;
  product_code: string;
  product_group_name: string;
  product_type_name: string;
  section_name: string;
  url: string;
};

function ProductDetail() {
  const [liked, setLiked] = useState(false);
  const [size, setSize] = useState("L");
  const [colorIndex, setColorIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [articles, setArticles] = useState<ProductType[]>([]);

  const params = useParams();

  const fetchList = async () => {
    try {
      setLoading(false);
      const q = query(collection(firebaseDB, "article"));
      const querySnapshot = await getDocs(q);
      let data: ProductType[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as ProductType);
      });
      setProducts(data);

      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(false);
      const q = query(
        collection(firebaseDB, "article"),
        where("article_id", "==", params.article_id)
      );
      const querySnapshot = await getDocs(q);
      let data: ProductType[] = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as ProductType);
      });
      setProduct(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setArticles(
      products.filter((p) => p?.product_code === product?.product_code)
    );
  }, [product, products]);

  return (
    <div className="pb-20">
      <div className="flex flex-row justify-center items-center gap-2 mt-4">
        <Link href={"/"}>Home</Link>
        <FaAngleRight></FaAngleRight>
        <Link href={"/products"}>Products</Link>
        <FaAngleRight></FaAngleRight>
        <span className="text-primary">{product?.prod_name}</span>
      </div>
      <div className="max-w-[1024px] px-20 mx-auto mt-10 flex flex-row">
        <Image
          width={400}
          alt="NextUI hero Image"
          src={`https://try-devfes-2023.vercel.app/articles${articles[colorIndex]?.url}`}
        />
        <div className="flex flex-col flex-1 pl-10">
          <div className="flex flex-row justify-between mt-4 mb-6">
            <div className="flex flex-col">
              <p className="text-lg font-medium">{product?.prod_name}</p>
              <span className="text-xl font-medium mt-1">
                {`${product?.price.toLocaleString("vi-VN")} VNĐ`}
              </span>
            </div>
            <div className="flex flex-col">
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 text-2xl text-danger"
                radius="full"
                variant="light"
                onPress={() => setLiked((v: any) => !v)}
              >
                {liked ? <FaHeart></FaHeart> : <FaRegHeart></FaRegHeart>}
              </Button>
            </div>
          </div>
          <div className="flex flex-row gap-1">
            {articles.map((image, index) => (
              <div className="w-20" key={index}>
                <Image
                  className={`border-2 h-[140px] object-cover ${
                    index === colorIndex ? "border-stone-900" : ""
                  }`}
                  onClick={() => setColorIndex(index)}
                  radius="sm"
                  width={400}
                  alt="NextUI hero Image"
                  src={`https://try-devfes-2023.vercel.app/articles${image?.url}`}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row flex-wrap gap-1 mt-10 ">
            <Button
              className={`${
                size === "XXS" ? "bg-stone-900 text-slate-100" : ""
              } w-1/6 rounded-xl`}
              variant="bordered"
              onClick={() => setSize("XXS")}
            >
              XXS
            </Button>
            <Button
              className={`${
                size === "XS" ? "bg-stone-900 text-slate-100" : ""
              } w-1/6 rounded-xl`}
              variant="bordered"
              onClick={() => setSize("XS")}
            >
              XS
            </Button>
            <Button
              className={`${
                size === "S" ? "bg-stone-900 text-slate-100" : ""
              } w-1/6 rounded-xl`}
              variant="bordered"
              onClick={() => setSize("S")}
            >
              S
            </Button>
            <Button
              className={`${
                size === "M" ? "bg-stone-900 text-slate-100" : ""
              } w-1/6 rounded-xl`}
              variant="bordered"
              onClick={() => setSize("M")}
            >
              M
            </Button>
            <Button
              className={`${
                size === "L" ? "bg-stone-900 text-slate-100" : ""
              } w-1/6 rounded-xl`}
              variant="bordered"
              onClick={() => setSize("L")}
            >
              L
            </Button>
            <Button
              className={`${
                size === "XL" ? "bg-stone-900 text-slate-100" : ""
              } w-1/6 rounded-xl`}
              variant="bordered"
              onClick={() => setSize("XL")}
            >
              XL
            </Button>
            <Button
              className={`${
                size === "XXL" ? "bg-stone-900 text-slate-100" : ""
              } w-1/6 rounded-xl`}
              variant="bordered"
              onClick={() => setSize("XXL")}
            >
              XXL
            </Button>
            <Button
              className={`${
                size === "3XL" ? "bg-stone-900 text-slate-100" : ""
              } w-1/6 rounded-xl`}
              variant="bordered"
              onClick={() => setSize("3XL")}
            >
              3XL
            </Button>
            <Button
              className={`${
                size === "4XL" ? "bg-stone-900 text-slate-100" : ""
              } w-1/6 rounded-xl`}
              variant="bordered"
              onClick={() => setSize("4XL")}
            >
              4XL
            </Button>
          </div>
          <Button
            startContent={<FaCartPlus></FaCartPlus>}
            className="mt-10 bg-stone-900 text-slate-100 text-slate-100"
          >
            Add to cart
          </Button>
          <Button
            startContent={<FaShirt></FaShirt>}
            className="mt-2 border-stone-900"
            variant="bordered"
          >
            Try it out!
          </Button>
        </div>
      </div>
      <SearchPromp></SearchPromp>
    </div>
  );
}

export default ProductDetail;
