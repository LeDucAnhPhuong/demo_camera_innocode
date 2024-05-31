import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-20 mb-[20vh] flex w-full  flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <p color="blue-gray" className="font-normal ">
        &copy; DevFes 2023
      </p>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        <li>
          <Link
            href="/"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/virtual-fitting-room"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Virtual Fitting Room
          </Link>
        </li>
        <li>
          <Link
            href="/virtual-store"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            Virtual Store
          </Link>
        </li>
      </ul>
    </footer>
  );
}
