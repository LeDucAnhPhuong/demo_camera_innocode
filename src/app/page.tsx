import Filter from "@/components/Filter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import SearchPromp from "@/components/SearchPromp";
import { Avatar, Button, Image, Input } from "@nextui-org/react";
import { FaSearchengin } from "react-icons/fa6";

export default function Home() {
  return (
    <>
      <div className="min-h-[100vh] max-w-[1024px] mx-auto mt-20 pb-20">
        <section className="flex flex-col w-full bg-white drop-shadow-md rounded-xl">
          <Image
            alt="Woman listing to music"
            className="object-cover w-full rounded-b-l-none rounded-b-r-none"
            src={
              "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-6/396989046_658065069848059_3009982351378198122_n.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=w7wxqf7a3tUAX_6yaZy&_nc_ht=scontent.fdad3-4.fna&oh=00_AfBH3mc9t55bVkhw8X-yodEVJwSxvPZr1BG1tr5dYEqblg&oe=65665F7D"
            }
            width={1400}
          />
          <div className="flex flex-row justify-between p-10">
            <p className="w-2/5 text-6xl">From ideas to solutions</p>
            <div className="flex flex-col w-2/4">
              <p className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Obcaecati amet omnis adipisci nam autem aperiam debitis
                voluptatem dignissimos et laudantium.
              </p>
            </div>
          </div>
        </section>
        <section className="mt-20 w-full">
          <h3 className="text-4xl font-bold text-center">Features</h3>
          <p className="text-md text-center text-slate-600 max-w-xl mx-auto mt-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut nemo
            tempora, voluptas deleniti.
          </p>
          <div className="w-full flex flex-row mt-10 gap-5">
            <div className="w-1/2 flex flex-wrap">
              <div className="flex flex-col w-1/2">
                <span className="text-2xl font-bold text-danger">1.</span>
                <p className="font-semibold mt-2 mb-1">
                  Product recommendation
                </p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis ex doloribus at amet iusto omnis
                </p>
              </div>
              <div className="flex flex-col w-1/2">
                <span className="text-2xl font-bold text-danger">2.</span>
                <p className="font-semibold mt-2 mb-1">Search engine</p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis ex doloribus at amet iusto omnis
                </p>
              </div>
              <div className="flex flex-col w-1/2">
                <span className="text-2xl font-bold text-danger">3.</span>
                <p className="font-semibold mt-2 mb-1">Virtual store</p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis ex doloribus at amet iusto omnis
                </p>
              </div>
              <div className="flex flex-col w-1/2">
                <span className="text-2xl font-bold text-danger">4.</span>
                <p className="font-semibold mt-2 mb-1">Virtual Try on</p>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis ex doloribus at amet iusto omnis
                </p>
              </div>
            </div>
            <div className="w-1/2">
              <Image
                alt="Woman listing to music"
                className="object-cover w-full rounded-b-l-none rounded-b-r-none"
                src={
                  "https://image.hm.com/content/dam/global_campaigns/season_08/home/7078-holiday/7078e/department-teasers/7078E-decorations-table-3x2-1.jpg?imwidth=1260"
                }
                width={1400}
              />
            </div>
          </div>
        </section>
        <section className="mt-20 w-full">
          <h3 className="text-4xl font-bold text-center">Our Team</h3>
          <p className="text-md text-center text-slate-600 max-w-xl mx-auto mt-1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut nemo
            tempora, voluptas deleniti.
          </p>
          <div className="w-full flex flex-col mt-10 gap-5">
            <div className="w-full flex flex-row">
              <div className="w-1/4 flex flex-col items-center">
                <Avatar
                  src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                  size="lg"
                />
                <p className="font-medium text-xl mt-2 ">Tran Van Bao Thang</p>
                <p className="text-md">Web developer</p>
                <p className="text-md text-center mt-3">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptatibus aspernatur
                </p>
              </div>
              <div className="w-1/4 flex flex-col items-center">
                <Avatar
                  src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                  size="lg"
                />
                <p className="font-medium text-xl mt-2 ">Ho Huu Tuong</p>
                <p className="text-md">AI engineer</p>
                <p className="text-md text-center mt-3">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptatibus aspernatur
                </p>
              </div>
              <div className="w-1/4 flex flex-col items-center">
                <Avatar
                  src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                  size="lg"
                />
                <p className="font-medium text-xl mt-2 ">Luu Thanh Dat</p>
                <p className="text-md">Unity developer</p>
                <p className="text-md text-center mt-3">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptatibus aspernatur
                </p>
              </div>
              <div className="w-1/4 flex flex-col items-center">
                <Avatar
                  src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                  size="lg"
                />
                <p className="font-medium text-xl mt-2 ">Tran Quoc Khanh</p>
                <p className="text-md">Data engineer</p>
                <p className="text-md text-center mt-3">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptatibus aspernatur
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* <SearchPromp></SearchPromp> */}
    </>
  );
}
