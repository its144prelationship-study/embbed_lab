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
      setUnitState("celcius");
      setNewTemp(snapShot.val().Temperature);
      setNewFeel(
        Number(
          HeatIndex(
            convertCtoF(snapShot.val().Temperature),
            snapShot.val().Humidity
          )
        )
      );
      console.log(rt_feel);
    });
  }, []);

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
                const newTemp = convertFtoC(rt_temp);
                const newFeel = convertFtoC(rt_feel);
                setNewTemp(newTemp);
                setNewFeel(newFeel);
              }
              setUnitState("celcius");
              initFeelsLike();
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
                const newTemp = convertCtoF(rt_temp);
                const newFeel = convertCtoF(rt_feel);
                setNewTemp(newTemp);
                setNewFeel(newFeel);
              }
              setUnitState("fahrenheit");
              initFeelsLike();
            }}
          >
            F
          </button>
        </div>
      </button>
    );
  }
  function initHumidity() {
    return (
      <button className="humidity-pie">
        <p className="hu-text">{dataSensor.Humidity}</p>
        <p className="unit-rh">%RH</p>
      </button>
    );
  }
  function initPM() {
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
                const newTemp = convertFtoC(rt_temp);
                const newFeel = convertFtoC(rt_feel);
                setNewTemp(newTemp);
                setNewFeel(newFeel);
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
                const newTemp = convertCtoF(rt_temp);
                const newFeel = convertCtoF(rt_feel);
                setNewTemp(newTemp);
                setNewFeel(newFeel);
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
      {datatype === "TEMP" && initTemp()}
      {datatype === "FEELSLIKE" && initFeelsLike()}
      {datatype === "PM" && initPM()}
      {datatype === "HUMIDITY" && initHumidity()}
    </>
  );
}

export default ShowData;
