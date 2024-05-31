import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

type IProps = {
  setClothesIndex: React.Dispatch<React.SetStateAction<number>>;
  clothesIndex: number;
  setIsShowNextButton: React.Dispatch<React.SetStateAction<boolean>>;
};

function NextButton({
  setClothesIndex,
  clothesIndex,
  setIsShowNextButton,
}: IProps) {
  const [counter, setCounter] = useState<number>(1);
  const [opacity, setOpacity] = useState<number>(0);
  const [fadeInInterval, setFadeInInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    const countdown = setInterval(() => {
      setCounter((time) => time - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      setClothesIndex((prev) => (prev < 4 ? prev + 1 : prev));
      setIsShowNextButton((prev) => false);
    }
  }, [counter]);

  useEffect(() => {
    // Đặt opacity là 0 ban đầu
    setOpacity(0);

    // Sử dụng setTimeout để tăng opacity từ 0 lên 100 trong 1 giây
    const duration = 1000; // Thời gian tổng cộng để tăng opacity
    const step = 10; // Bước tăng opacity mỗi lần

    const fadeIn = () => {
      if (opacity < 100) {
        setOpacity((prevOpacity) => Math.min(prevOpacity + step, 100));
      }
    };

    const fadeInIntervalId = setInterval(fadeIn, duration / (100 / step));
    setFadeInInterval(fadeInIntervalId);

    // Hủy bỏ interval khi component bị unmount
    return () => {
      if (fadeInInterval) {
        clearInterval(fadeInInterval);
      }
    };
  }, []);

  return (
    <Button
      className="absolute z-20 left-[20px] top-[240px] min-w-1 rounded-full w-14 h-14 text-2xl p-4"
      style={{ opacity: `${opacity}%` }}
    >
      <FaAngleLeft></FaAngleLeft>
    </Button>
  );
}

export default NextButton;
