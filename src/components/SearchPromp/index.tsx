import { Card, CardBody, Textarea, Button } from "@nextui-org/react";
import { FaImage, FaSearchengin } from "react-icons/fa6";

function SearchPromp() {
  return (
    <Card className="fixed z-40 bottom-8 left-40 right-40">
      <CardBody className="flex flex-row gap-3">
        <div className="flex gap-4 items-center">
          <Button className="h-full" startContent={<FaImage />}>
            Upload image
          </Button>
        </div>
        <div className="relative flex-1">
          <Textarea
            label="Description"
            placeholder="Enter your description"
            minRows={1}
            maxRows={3}
          />
          <Button color="primary" className="absolute right-2 bottom-[10px] text-2xl">
            <FaSearchengin></FaSearchengin>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default SearchPromp;
