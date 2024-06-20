import React, { useRef, useEffect, useState } from "react";
import {
  DrawingUtils,
  FilesetResolver,
  GestureRecognizer,
  GestureRecognizerResult,
} from "@mediapipe/tasks-vision";
import { Button, Image, Spinner, Tooltip } from "@nextui-org/react";
import { FaAngleLeft, FaAngleRight, FaImage } from "react-icons/fa6";
import CountDown from "../Countdown";
import NextButton from "../NextButton";
import PrevButton from "../PrevButton";
import axios from "axios";
import { toast } from "react-toastify";

type GestureRecognizerType = GestureRecognizer | undefined;

type IProps = {
  setClothesIndex: React.Dispatch<React.SetStateAction<number>>;
  clothesIndex: number;
};

function Camera({ setClothesIndex, clothesIndex }: IProps) {
  const demosSection = useRef<HTMLElement | null>(null);
  const [gestureRecognizer, setGestureRecognizer] =
    useState<GestureRecognizerType>();
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [webcamButtonText, setWebcamButtonText] = useState("ENABLE WEBCAM");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const gestureOutputRef = useRef<HTMLParagraphElement | null>(null);
  const [lastVideoTime, setLastVideoTime] = useState(-1);
  const [results, setResults] = useState<GestureRecognizerResult | undefined>(
    undefined
  );

  const [isHoverPrevButton, setIsHoverPrevButton] = useState(false);
  const [isShowPrevButton, setIsShowPrevButton] = useState(false);
  const [isHoverNextButton, setIsHoverNextButton] = useState(false);
  const [isShowNextButton, setIsShowNextButton] = useState(false);
  const [numberIndex, setNumberIndex] = useState(3);

  const [isShowCountdown, setIsShowCountdown] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [handPose, setHandPose] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isShowResult, setIsShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createGestureRecognizer = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );
    const gest = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 2,
    });
    setGestureRecognizer(gest);
    demosSection.current?.classList.remove("invisible");
  };

  useEffect(() => {
    createGestureRecognizer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasGetUserMedia = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };

  const handleWebcam = () => {
    if (hasGetUserMedia()) {
      enableCam();
    } else {
      console.warn("getUserMedia() is not supported by your browser");
    }
  };

  const enableCam = async () => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    if (webcamRunning === true) {
      setWebcamRunning(false);
      setWebcamButtonText("ENABLE PREDICTIONS");
    } else {
      setWebcamRunning(true);
      setWebcamButtonText("DISABLE PREDICTIONS");
    }

    const constraints = {
      video: true,
    };

    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current?.addEventListener("loadeddata", predictWebcam);
      }
    });
  };

  const predictWebcam = async () => {
    if (!videoRef.current) return;
    if (!gestureRecognizer) return;
    if (!canvasElementRef.current) return;

    let newResults = results;
    const webcamElement = document.getElementById("webcam");
    let nowInMs = Date.now();
    if (videoRef.current.currentTime !== lastVideoTime) {
      setLastVideoTime(videoRef.current.currentTime);
      newResults = gestureRecognizer.recognizeForVideo(
        videoRef.current,
        nowInMs
      );
    }

    if (newResults && newResults.gestures?.[0]?.[0]?.categoryName) {
      console.log(newResults.gestures[0][0].categoryName);
      // console.log(newResults.landmarks);

      if (newResults.gestures[0][0].categoryName === "Thumb_Up") {
        if (isShowResult === true) {
          console.log("Đã thêm vào giỏ hàng");
          toast.success("Đã thêm vào giỏ hàng");
        }
        setIsShowResult(false);
      }
      if (newResults.gestures[0][0].categoryName === "Thumb_Down") {
        if (isShowResult === true) {
          toast.success("Đã bỏ qua");
        }
        setIsShowResult(false);
      }
    }

    const canvasCtx = canvasElementRef.current?.getContext("2d");
    if (!canvasCtx) return;
    canvasCtx.save();
    canvasCtx.clearRect(
      0,
      0,
      canvasElementRef.current.width,
      canvasElementRef.current.height
    );
    const drawingUtils = new DrawingUtils(canvasCtx);
    if (!webcamElement) return;
    canvasElementRef.current.style.height = "540px";
    webcamElement.style.height = "540px";
    canvasElementRef.current.style.width = "720px";
    webcamElement.style.width = "720px";

    if (newResults && newResults.landmarks) {
      for (const landmarks of newResults.landmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          GestureRecognizer.HAND_CONNECTIONS,
          {
            color: "#00FF00",
            lineWidth: 5,
          }
        );
        drawingUtils.drawLandmarks(landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
      }
    }
    canvasCtx.restore();

    if (webcamRunning === true) {
      window.requestAnimationFrame(predictWebcam);
    }

    if (newResults && newResults.landmarks) {
      //
      const landmark0_3 = newResults.landmarks[0]?.[3];
      const landmark0_6 = newResults.landmarks[0]?.[6];
      const landmark0_7 = newResults.landmarks[0]?.[7];

      //
      const landmark0_4 = newResults.landmarks[0]?.[4];
      const landmark1_8 = newResults.landmarks[1]?.[8];
      const landmark1_4 = newResults.landmarks[1]?.[4];
      const landmark0_8 = newResults.landmarks[0]?.[8];

      if (landmark0_8) {
        const nextButton = {
          x: 0.09411006420850754,
          y: 0.5331868529319763,
        };
        const prevButton = {
          x: 0.9059846997261047,
          y: 0.5252099633216858,
        };
        //right hand
        if (
          Math.abs(landmark0_8.x - nextButton.x) <= 0.06 &&
          Math.abs(landmark0_8.y - nextButton.y) <= 0.06
        ) {
          setIsShowNextButton(true);
        } else {
          setIsShowNextButton(false);
        }
        if (
          Math.abs(landmark0_8.x - prevButton.x) <= 0.06 &&
          Math.abs(landmark0_8.y - prevButton.y) <= 0.06
        ) {
          setIsShowPrevButton(true);
        } else {
          setIsShowPrevButton(false);
        }
      }

      if (landmark1_8) {
        const nextButton = {
          x: 0.09411006420850754,
          y: 0.5331868529319763,
        };
        const prevButton = {
          x: 0.9059846997261047,
          y: 0.5252099633216858,
        };

        //left hand
        if (
          Math.abs(landmark1_8.x - nextButton.x) <= 0.06 &&
          Math.abs(landmark1_8.y - nextButton.y) <= 0.06
        ) {
          setIsShowNextButton(true);
        } else {
          setIsShowNextButton(false);
        }
        if (
          Math.abs(landmark1_8.x - prevButton.x) <= 0.06 &&
          Math.abs(landmark1_8.y - prevButton.y) <= 0.06
        ) {
          setIsShowPrevButton(true);
        } else {
          setIsShowPrevButton(false);
        }
      }
      if (
        landmark0_3 &&
        landmark0_6 &&
        landmark0_7 &&
        landmark0_8 &&
        landmark0_4
      ) {
        if (
          Math.abs(landmark0_3?.x - (landmark0_6?.x + landmark0_7?.x) / 2) <=
            0.03 &&
          Math.abs(landmark0_3?.y - (landmark0_6?.y + landmark0_7?.y) / 2) <=
            0.03 &&
          Math.abs(landmark0_4?.x - landmark0_8?.x) >= 0.07
        ) {
          console.log("tim");
        }
      }

      if (landmark0_4 && landmark1_8 && landmark1_4 && landmark0_8) {
        const x0_4 = landmark0_4.x;
        const y0_4 = landmark0_4.y;
        const x1_8 = landmark1_8.x;
        const y1_8 = landmark1_8.y;
        const x1_4 = landmark1_4.x;
        const y1_4 = landmark1_4.y;
        const x0_8 = landmark0_8.x;
        const y0_8 = landmark0_8.y;

        if (
          Math.abs(landmark0_4?.x - landmark1_4?.x) <= 0.03 &&
          Math.abs(landmark0_4?.y - landmark1_4?.y) <= 0.03 &&
          Math.abs(landmark0_8?.x - landmark1_8?.x) <= 0.03 &&
          Math.abs(landmark0_8?.y - landmark1_8?.y) <= 0.03 &&
          Math.abs(landmark0_8?.y - landmark0_4?.y) >= 0.1
        ) {
          console.log("tim");
        }

        if (
          Math.abs(x0_4 - x1_8) < 0.03 &&
          Math.abs(x1_4 - x0_8) < 0.03 &&
          Math.abs(y0_4 - y1_8) < 0.03 &&
          Math.abs(y1_4 - y0_8) < 0.03
        ) {
          setIsShowCountdown(true);
        }
      }
    }

    setResults(newResults);
  };

  const captureImage = async () => {
    try {
      if (videoRef.current && canvasElementRef.current) {
        const canvas = canvasElementRef.current;
        const context = canvas.getContext("2d");
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        if (context)
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL("image/jpg");
        sendImageToServer(imageDataUrl);
        // const formData = new FormData();
        // const
        // formData.append("username", "Groucho");

        // const downloadLink = document.createElement("a");
        // downloadLink.href = imageDataUrl;
        // downloadLink.download = "captured_image.jpg";
        // document.body.appendChild(downloadLink);
        // downloadLink.click();
        // document.body.removeChild(downloadLink);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const sendImageToServer = async (base64: string) => {
    try {
      setIsLoading(true);

      const imageFile = await fetch(base64);
      const blob = await imageFile.blob();
      const formData = new FormData();
      formData.append("image", blob, "captured_image.jpg");

      const response = await axios.post(
        `https://try.serveo.net/try/${clothesIndex + 1}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const blob2 = new Blob([response.data]);
      // console.log(URL.createObjectURL(blob2));
      // setImageUrl(URL.createObjectURL(blob2));

      setImageUrl(response.data);

      console.log("response");
      console.log(response.data);
      console.log("done!!!");
      setIsShowResult(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending image:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isCaptured) {
      captureImage();
      setIsCaptured(false);
    }
  }, [isCaptured]);

  useEffect(() => {
    if (isHoverNextButton) {
      setIsShowNextButton(true);
    }
  }, [isHoverNextButton]);

  useEffect(() => {
    if (isHoverPrevButton) {
      setIsShowPrevButton(true);
    }
  }, [isHoverPrevButton]);
  return (
    <>
      <section id="demos" className="invisible" ref={demosSection}>
        <div id="liveView" className="videoView">
          <p ref={gestureOutputRef} id="gesture_output" className="output"></p>
          <div
            style={{
              width: 720,
              height: 540,
              margin: "0 auto",
              position: "relative",
              transform: "scaleX(-1)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="absolute top-0 left-0"
              style={{
                zIndex: isShowResult ? 10 : -1,
              }}
            >
              {imageUrl && (
                <Image
                  alt=""
                  src={`data:image/jpeg;base64,${imageUrl}`}
                  // src={`https://res.cloudinary.com/de41uvd76/image/upload/v1700944854/captured_image_19_r01gun.png`}
                  height={540}
                  width={720}
                  // className="absolute z-50 top-0 left-0"
                  // style={{
                  //   position: "absolute",
                  //   zIndex: 50,
                  //   top: "0",
                  //   left: "0",
                  // }}
                ></Image>
              )}
            </div>
            <Tooltip closeDelay={0} content="Upload your image">
              <Button
                className="absolute z-20 text-xl top-1 right-[664px] min-w-10 rounded-md"
                startContent={<FaImage />}
              ></Button>
            </Tooltip>
            {webcamRunning ? (
              <>
                <Button className="absolute z-20 left-[20px] top-[240px] min-w-1 rounded-full w-14 h-14 text-2xl p-4 opacity-20">
                  <FaAngleLeft></FaAngleLeft>
                </Button>
                {isShowNextButton && (
                  <NextButton
                    clothesIndex={clothesIndex}
                    setClothesIndex={setClothesIndex}
                    setIsShowNextButton={setIsShowNextButton}
                  ></NextButton>
                )}
                <Button className="absolute z-20 right-[20px] top-[240px] min-w-1 rounded-full w-14 h-14 text-2xl p-4 opacity-20">
                  <FaAngleRight></FaAngleRight>
                </Button>
                {isShowPrevButton && (
                  <PrevButton
                    clothesIndex={clothesIndex}
                    setClothesIndex={setClothesIndex}
                    setIsShowPrevButton={setIsShowPrevButton}
                  ></PrevButton>
                )}
                {isShowCountdown && (
                  <CountDown
                    setIsCaptured={setIsCaptured}
                    setIsShowCountdown={setIsShowCountdown}
                  ></CountDown>
                )}
                <video
                  id="webcam"
                  autoPlay
                  playsInline
                  ref={videoRef}
                  onLoadedData={predictWebcam}
                ></video>
                <canvas
                  ref={canvasElementRef}
                  className="output_canvas"
                  id="output_canvas"
                  width="1280"
                  height="720"
                  style={{
                    position: "absolute",
                  }}
                ></canvas>
                
                {isLoading && (
                  <div className="w-[720px] h-[540px] bg-black/50 absolute z-[100] flex justify-center items-center">
                    <Spinner size="lg" className="z-50" />
                  </div>
                )}
              </>
            ) : (
              <>
                <Button
                  id="webcamButton"
                  style={{
                    transform: "scaleX(-1)",
                  }}
                  className="mdc-button mdc-button--raised z-20 absolute top-[48%]"
                  onClick={handleWebcam}
                >
                  <span className="mdc-button__ripple"></span>
                  <span className="mdc-button__label">{webcamButtonText}</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Camera;
