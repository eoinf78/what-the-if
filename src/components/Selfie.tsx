import { useCallback, useEffect, useRef, useState, type FC } from "react";
import camera from "../utils/camera";
import Webcam from "react-webcam";
import '../styles/user.scss';

interface SelfieProps {
  onCaptureImage: (imageSrc: string) => void;
}

export const Selfie: FC<SelfieProps> = ({ onCaptureImage }) => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string>();
  const [cameraStart, setCameraStart] = useState<boolean>(false);
  const [comicVersion, setComicVersion] = useState<string>();

  const capture = useCallback(() => {
    if (!webcamRef.current) {
      return;
    }
    const imageSrc = webcamRef.current.getScreenshot() ?? '';

    // ollama.generate({
    //   model: 'llama3.2',
    //   prompt: 'create a comic book version of this image',
    // }).then(output => 
    //   console.log(output.response)
    // );

    imageSrc && setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  useEffect(() => {
    if (imgSrc) {
      onCaptureImage(imgSrc);

    }
  }, [imgSrc, onCaptureImage]);

  return (
    <>
      {!cameraStart && (
        <div className="selfieWrapper">
          <button onClick={() => {
            setCameraStart(true);
          }
          }>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path d="M224 40v36a8 8 0 0 1-16 0V48h-28a8 8 0 0 1 0-16h36a8 8 0 0 1 8 8Zm-8 132a8 8 0 0 0-8 8v28h-28a8 8 0 0 0 0 16h36a8 8 0 0 0 8-8v-36a8 8 0 0 0-8-8ZM76 208H48v-28a8 8 0 0 0-16 0v36a8 8 0 0 0 8 8h36a8 8 0 0 0 0-16ZM40 84a8 8 0 0 0 8-8V48h28a8 8 0 0 0 0-16H40a8 8 0 0 0-8 8v36a8 8 0 0 0 8 8Zm136 92a8 8 0 0 1-6.41-3.19 52 52 0 0 0-83.2 0 8 8 0 1 1-12.8-9.62A67.94 67.94 0 0 1 101 141.51a40 40 0 1 1 53.94 0 67.94 67.94 0 0 1 27.43 21.68A8 8 0 0 1 176 176Zm-48-40a24 24 0 1 0-24-24 24 24 0 0 0 24 24Z"/></svg>
            <p>Take Selfie</p>
          </button>
        </div>
      )}
      {cameraStart && (
        <div>
          {imgSrc ? (
            <div className="selfieWrapper">
              <img src={imgSrc} alt="selfie" />
            </div>
          ) : (
            <div className="selfieWrapper">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                height={200}
              />
            </div>
          )}
          {imgSrc ? (
              <button onClick={() => setImgSrc(undefined)} className="selfieButtons">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path d="M208 56h-27.72l-13.63-20.44A8 8 0 0 0 160 32H96a8 8 0 0 0-6.65 3.56L75.71 56H48a24 24 0 0 0-24 24v112a24 24 0 0 0 24 24h160a24 24 0 0 0 24-24V80a24 24 0 0 0-24-24Zm8 136a8 8 0 0 1-8 8H48a8 8 0 0 1-8-8V80a8 8 0 0 1 8-8h32a8 8 0 0 0 6.66-3.56L100.28 48h55.43l13.63 20.44A8 8 0 0 0 176 72h32a8 8 0 0 1 8 8Zm-40-96v24a8 8 0 0 1-8 8h-24a8 8 0 0 1 0-16h5.15a32.12 32.12 0 0 0-40.34-1.61 8 8 0 0 1-9.62-12.79 48.21 48.21 0 0 1 60.81 2.63V96a8 8 0 0 1 16 0Zm-17.61 59.2a8 8 0 0 1-1.58 11.2A48.21 48.21 0 0 1 96 163.77V168a8 8 0 0 1-16 0v-24a8 8 0 0 1 8-8h24a8 8 0 0 1 0 16h-5.15a32.12 32.12 0 0 0 40.34 1.61 8 8 0 0 1 11.2 1.59Z"/></svg>
                Retake Selfie
              </button>
          ) : (
            <button onClick={capture} className="selfieButtons">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path fill="none" d="M0 0h256v256H0z"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" d="M208 208H48a16 16 0 0 1-16-16V80a16 16 0 0 1 16-16h32l16-24h64l16 24h32a16 16 0 0 1 16 16v112a16 16 0 0 1-16 16Z"/><circle cx="128" cy="132" r="36" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
              Capture photo
            </button>
          )}
          </div>
      )}
    </>
  );
}