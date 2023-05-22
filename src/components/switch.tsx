import "../switch.css";
import { useState, useEffect } from "react";
import { currentState, currentFeel, currentTemp } from "./showdata";
import { getDatabase, ref, child, push, update } from "firebase/database";
// import { getDatabase, ref, onValue, get } from "firebase/database";
// import { db } from "../firebase";

function CreateSwitch() {
  const [switchState, setSwitchState] = useState(0);
  function writeNewPost(state: number) {
    const db = getDatabase();
    const postData = {
      state: state,
    };
    const newPostKey = push(child(ref(db), "state")).key;
    const updates = { state: postData };
    return update(ref(db), updates);
  }
  function RedSwitch() {
    //post to firebase
    return (
      <button
        className="red-switch"
        onClick={() => {
          writeNewPost(1);
          setSwitchState(1);
        }}
      />
    );
  }
  function GreenSwitch() {
    //pose to firebase
    return (
      <button
        className="green-switch"
        onClick={() => {
          writeNewPost(0);
          setSwitchState(0);
        }}
      />
    );
  }
  const date = new Date();
  let hrnow = Number(date.getHours());
  // hrnow = 20;
  return (
    <>
      <div
        className={
          hrnow >= 5 && hrnow < 12
            ? "circlehome1"
            : hrnow >= 12 && hrnow < 19
            ? "circlehome2"
            : "circlehome3"
        }
      />
      {switchState === 0 && RedSwitch()}
      {switchState === 1 && GreenSwitch()}
      <div className="rh-img" />
      <div
        className={
          currentState === "celcius"
            ? currentFeel < 15
              ? "feel-cold"
              : currentFeel < 30
              ? "feel-happy"
              : "feel-hot"
            : currentFeel < 59
            ? "feel-cold"
            : currentFeel < 86
            ? "feel-happy"
            : "feel-hot"
        }
      />
      <div className="pm-img" />
    </>
  );
}
export default CreateSwitch;
