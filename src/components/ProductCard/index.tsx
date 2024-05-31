"use client";

import { useState } from "react";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { FaCartPlus, FaRegHeart, FaHeart } from "react-icons/fa6";
import Link from "next/link";
import { DocumentData } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cart";
import { toast } from "react-toastify";

type IProps = {
  product: DocumentData;
};

function ProductCard({ product }: IProps) {
  const [liked, setLiked] = useState(false);

  const dispath = useDispatch();

  const handleAdd = () => {
    dispath(addToCart(product));
    toast.success("Add to cart successfully!!!");
  };

  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none w-[calc(20%_-_20px)] relative"
    >
      <span className="absolute left-4 top-4 z-20 px-2 py-1 text-white bg-black/20 text-sm rounded-full flex justify-center items-center">
        {product?.price?.toLocaleString("vi-VN") ??
          product?.Price?.toLocaleString("vi-VN")}{" "}
        VNĐ
      </span>
      <Button
        isIconOnly
        className="absolute top-4 right-4 z-20 text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 text-xl text-danger"
        radius="full"
        variant="light"
        onPress={() => setLiked((v) => !v)}
      >
        {liked ? <FaHeart></FaHeart> : <FaRegHeart></FaRegHeart>}
      </Button>
      <Link href={`/products/${product?.article_id}`}>
        <Image
          alt="Woman listing to music"
          className="object-cover w-full hover:scale-105 max-h-[400px]"
          height={500}
          src={
            product?.url
              ? `https://try-devfes-2023.vercel.app/articles${product?.url}`
              : `https://ik.imagekit.io/tuongho/${product?.image_url}?tr=w-300`
          }
          width={500}
        />
      </Link>
      <CardFooter className="justify-between before:hidden border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-md text-black/80  w-3/5 truncate">
          {product?.prod_name}
        </p>
        <Button
          className="text-white bg-stone-900/80 text-lg"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          onClick={handleAdd}
        >
          <FaCartPlus></FaCartPlus>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
