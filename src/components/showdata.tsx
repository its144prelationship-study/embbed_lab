import "../functionbar.css";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { db } from "../firebase";

export var currentState = "celcius";
export var currentTemp = 37.2;
export var currentFeel = 37.5;

interface Data_props {
  datatype: string;
}
interface DataSensorType {
  Dust: number;
  Humidity: number;
  Temperature: number;
}
function ShowData({ datatype }: Data_props) {
  var click = 0;
  const [unitState, setUnitState] = useState("celcius");
  const [dataSensor, setDataSensor] = useState<DataSensorType>({
    Dust: 0,
    Humidity: 0,
    Temperature: 0,
  });
  const [rt_temp, setNewTemp] = useState(37.2);
  const [rt_feel, setNewFeel] = useState(37.2);
  useEffect(() => {
    const dataRef = ref(db, "data");
    onValue(dataRef, (snapShot) => {
      setDataSensor({ ...snapShot.val() });
      setNewTemp(snapShot.val().Temperature);
      setNewFeel(snapShot.val().Temperature);
    });
  }, []);

  useEffect(() => {
    console.log("hello");
    console.log(rt_feel);
    console.log(rt_temp);
  }, [unitState]);
  function initTemp() {
    // let rt_temp = 37;
    return (
      <button className="temp-pie">
        <p className="temp-text">{rt_temp}°</p>
        <div className="convert-box">
          <button
            className={
              unitState === "celcius"
                ? "unit-convert-active"
                : "unit-convert-passive"
            }
            onClick={() => {
              if (unitState === "fahrenheit") {
                setNewTemp(convertFtoC(rt_temp));
                setNewFeel(convertFtoC(rt_feel));
              }
              setUnitState("celcius");
            }}
          >
            C
          </button>
          <p className="unit-convert-active">|</p>
          <button
            className={
              unitState === "fahrenheit"
                ? "unit-convert-active"
                : "unit-convert-passive"
            }
            onClick={() => {
              if (unitState === "celcius") {
                setNewTemp(convertCtoF(rt_temp));
                setNewFeel(convertCtoF(rt_feel));
              }
              setUnitState("fahrenheit");
            }}
          >
            F
          </button>
        </div>
      </button>
    );
  }
  function initHumidity() {
    let rt_hu = 74;
    return (
      <button className="humidity-pie">
        <p className="hu-text">{dataSensor.Humidity}</p>
        <p className="unit-rh">%RH</p>
      </button>
    );
  }
  function initPM() {
    let rt_pm = 121;
    return (
      <button className="pm-pie">
        <p className="pm-text">{(dataSensor.Dust * 1000).toFixed(1)}</p>
        <p className="unit-pm">μg/m³</p>
      </button>
    );
  }
  function initFeelsLike() {
    return (
      <button className="feelslike-pie">
        <p className="feel-text">{rt_feel}°</p>
        <div className="convert-box">
          <button
            className={
              unitState === "celcius"
                ? "unit-convert-active"
                : "unit-convert-passive"
            }
            onClick={() => {
              if (unitState === "fahrenheit") {
                setNewTemp(convertFtoC(rt_temp));
                setNewFeel(convertFtoC(rt_feel));
              }
              setUnitState("celcius");
              initTemp();
            }}
          >
            C
          </button>
          <p className="unit-convert-active">|</p>
          <button
            className={
              unitState === "fahrenheit"
                ? "unit-convert-active"
                : "unit-convert-passive"
            }
            onClick={() => {
              if (unitState === "celcius") {
                setNewTemp(convertCtoF(rt_temp));
                setNewFeel(convertCtoF(rt_feel));
              }
              setUnitState("fahrenheit");
              initTemp();
            }}
          >
            F
          </button>
        </div>
      </button>
    );
  }

  function convertCtoF(celcius: number) {
    return Number((celcius * (9 / 5) + 32).toFixed(1));
  }
  function convertFtoC(f: number) {
    return Number(((f - 32) * (5 / 9)).toFixed(1));
  }
  return (
    <>
      {datatype === "TEMP" && initTemp()}
      {datatype === "FEELSLIKE" && initFeelsLike()}
      {datatype === "PM" && initPM()}
      {datatype === "HUMIDITY" && initHumidity()}
    </>
  );
}

export default ShowData;
