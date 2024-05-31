"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "../ThemeSwitcher";
import LoginModal from "../LoginModal";

export default function Header() {
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <LoginModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      ></LoginModal>

      <Navbar shouldHideOnScroll>
        <Link href="/" className="flex-grow">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">TRY!</p>
          </NavbarBrand>
        </Link>
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          <NavbarItem isActive={pathname === "/"}>
            <Link href="/" color="primary">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === "/products"}>
            <Link href="/products" color="primary">
              Products
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === "/virtual-fitting-room"}>
            <Link
              href="/virtual-fitting-room"
              color="foreground"
              aria-current="page"
            >
              Virtual Fitting Room
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === "/virtual-store"}>
            <Link href="/virtual-store" color="foreground">
              Virtual Store
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button onClick={onOpen} variant="light">
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button color="primary" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
}

export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
