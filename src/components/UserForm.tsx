import { useState } from "react";
import type { FormEvent } from "react";
import '../styles/user.scss';
import GenerateImage from "./GenerateImage";

export type UserData = {
  name: string;
  age: number;
  friendName: string;
  selfieImage?: string;
};

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");
  const [selfieSrc, setSelfieSrc] = useState<string | undefined>(undefined);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userName = formData.get("name")?.toString();
    const friendName = formData.get("friendName")?.toString();
    const userAge = Number(formData.get("age") ?? "");;

    if (userName && userAge && friendName) {
      setUserData({ 
        name: userName,
        age: Number(userAge),
        friendName: friendName,
        selfieImage: selfieSrc
      })
    } else {
      setResponseMessage("Please fill out all fields");
    }
  }

  return (
    <div className="userContainer">
      <div>
        {!userData ? (
          <form onSubmit={submit} className="userForm">
            <label htmlFor="name" className="formInput">
              Whats Your Name
              <input type="text" id="name" name="name" required />
            </label>
            <label htmlFor="age" className="formInput">
              How old are you?
              <input type="number" id="age" name="age" required />
            </label>
            <label htmlFor="friendName" className="formInput">
              Whats your friends name?
              <input type="text" id="friendName" name="friendName" required />
            </label>
            <button className="selfieButtons">Find my IF!</button>
            {responseMessage && <p>{responseMessage}</p>}
          </form>
        ) : (
          <GenerateImage userData={userData} />
        )}
      {/* <Selfie onCaptureImage={(imageSrc: string) => setSelfieSrc(imageSrc)} /> */}
      </div>
    </div>
  );
}