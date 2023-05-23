import "../switch.css";
import { useState, useEffect } from "react";
import { getDatabase, ref, child, push, update, onValue} from "firebase/database";
// import { getDatabase, ref, onValue, get } from "firebase/database";
import { db } from "../firebase";
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
  const [currentTemp, setNewTemp] = useState(37.2);
  const [currentFeel, setNewFeel] = useState(37.2);
  useEffect(() => {
    const dataRef = ref(db, "data");
    onValue(dataRef, (snapShot) => {
      setNewTemp(snapShot.val().Temperature);
      setNewFeel(
        Number(
          HeatIndex(
            convertCtoF(snapShot.val().Temperature),
            snapShot.val().Humidity
          )
        )
      );
    });
  }, []);
  
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

  const [hr, setHr] = useState(new Date().getHours());
  
      function refreshClock() {
            setHr(new Date().getHours());
      }
      useEffect(() => {
            const timerId = setInterval(refreshClock, 1000);
            return function cleanup() {
                  clearInterval(timerId);
            };
      }, []);

      function convertCtoF(celcius: number) {
        return Number((celcius * (9 / 5) + 32).toFixed(1));
      }
      function convertFtoC(f: number) {
        return Number(((f - 32) * (5 / 9)).toFixed(1));
      }
      function HeatIndex(T: number, rh: number) {
        let C1 = [
          -42.379, 2.04901523, 10.14333127, -0.22475541, -6.83783e-3, -5.481717e-2,
          1.22874e-3, 8.5282e-4, -1.99e-6,
        ];
        let H2 = rh * rh;
        let T2 = T * T;
        let heatindex1 =
          C1[0] +
          C1[1] * T +
          C1[2] * rh +
          C1[3] * T * rh +
          C1[4] * T2 +
          C1[5] * H2 +
          C1[6] * T2 * rh +
          C1[7] * T * H2 +
          C1[8] * T2 * H2;
        return convertFtoC(heatindex1).toFixed(1);
      }

  return (
    <>
      <div
        className={
          hr >= 5 && hr < 12
            ? "circlehome1"
            : hr >= 12 && hr < 19
            ? "circlehome2"
            : "circlehome3"
        }
      />
      {switchState === 0 && RedSwitch()}
      {switchState === 1 && GreenSwitch()}
      <div className="rh-img" />
      <div
        className={
          hr < 19 ? 
            currentTemp < 15
            ? "sun3"
            : currentTemp < 30
            ? "sun2"
            : "sun1"
          : "night"
        }
      />
      <div
        className={
          currentFeel < 15
              ? "feel-cold"
              : currentFeel < 30
              ? "feel-happy"
              : "feel-hot"
        }
      />
      <div className="pm-img" />
    </>
  );
}
export default CreateSwitch;
