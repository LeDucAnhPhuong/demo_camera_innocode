"use client";

import { RootState } from "@/redux/store";
import {
  Badge,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";

function Cart() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const data = useSelector((state: RootState) => state.cart.data);

  return (
    <>
      <Button
        size="md"
        color="primary"
        className="fixed z-20 right-0 top-[40%] rounded-se-none rounded-ee-none min-w-0 text-xl h-20"
        onClick={onOpen}
      >
        <Badge
          content={data.length}
          color="warning"
          variant="solid"
          className="bottom-20"
          size="sm"
        >
          <div className="mt-0">
            <FaCartShopping></FaCartShopping>
          </div>
        </Badge>
      </Button>
      {isOpen && (
        <Modal
          backdrop="opaque"
          isOpen={true}
          onOpenChange={onOpenChange}
          size="4xl"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Your cart
                </ModalHeader>
                <ModalBody>
                  <Table
                    selectionMode="multiple"
                    aria-label="Example static collection table"
                    shadow="none"
                    className="p-0"
                  >
                    <TableHeader>
                      <TableColumn>IMAGE</TableColumn>
                      <TableColumn>PRODUCT NAME</TableColumn>
                      <TableColumn>QUANTITY</TableColumn>
                      <TableColumn>PRICE</TableColumn>
                      <TableColumn>TOTAL</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {data.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Image
                              alt="Woman listing to music"
                              className="object-cover w-[100px] hover:scale-105 max-h-[400px]"
                              height={500}
                              src={`https://try-devfes-2023.vercel.app/articles${product?.url}`}
                              width={500}
                            />
                          </TableCell>
                          <TableCell>{product?.prod_name}</TableCell>
                          <TableCell className="text-center">1</TableCell>
                          <TableCell>{`${product?.price.toLocaleString(
                            "vi-VN"
                          )} VNĐ`}</TableCell>
                          <TableCell>{`${product?.price.toLocaleString(
                            "vi-VN"
                          )} VNĐ`}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Checkout
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default Cart;
