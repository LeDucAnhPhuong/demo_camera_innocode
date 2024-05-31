"use client";

import { useEffect, useState } from "react";

type IProps = {
  setIsShowCountdown: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCaptured: React.Dispatch<React.SetStateAction<boolean>>;
};

function CountDown({ setIsShowCountdown, setIsCaptured }: IProps) {
  const [counter, setCounter] = useState<number>(3);

  useEffect(() => {
    const countdown = setInterval(() => {
      setCounter((time) => time - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (counter === 0) {
        setIsCaptured(true);
        setIsShowCountdown(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);
  return (
    <div
      style={{
        transform: "scaleX(-1)",
      }}
      className="absolute z-20 w-[480px] h-[360px] text-white flex justify-center items-center"
    >
      <span className=" w-20 h-20 bg-white/40 flex justify-center items-center text-4xl text-black rounded-full">
        {counter}
      </span>
    </div>
  );
}

export default CountDown;
