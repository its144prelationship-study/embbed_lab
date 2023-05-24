import "../functionbar.css";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import { db } from "../firebase";

interface Data_props {
  datatype: string;
}
interface DataSensorType {
  Dust: number;
  Humidity: number;
  Temperature: number;
}
function ShowData({ datatype }: Data_props) {
  const [show, setShow] = useState("none");
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
    });
  }, []);
  useEffect(() => {
    // console.log(unitState);
    setNewFeel(rt_feel);
    setNewTemp(rt_temp);
  }, [unitState]);

  function initTemp() {
    // let rt_temp = 37;
    return (
      <button className="temp-pie" onClick={() => setShow("Temp")}>
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
      <button className="humidity-pie" onClick={() => setShow("Humidity")}>
        <p className="hu-text">{dataSensor.Humidity}</p>
        <p className="unit-rh">%RH</p>
      </button>
    );
  }
  function initPM() {
    return (
      <button className="pm-pie" onClick={() => setShow("pm")}>
        <p className="pm-text">{(dataSensor.Dust * 1000).toFixed(1)}</p>
        <p className="unit-pm">μg/m³</p>
      </button>
    );
  }
  function initFeelsLike() {
    return (
      <button className="feelslike-pie" onClick={() => setShow("Feelslike")}>
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

  useEffect(() => {
    const closeData = (e : Event) => {
      var target = e.target as HTMLElement;
      // console.log(show, target.className);
      if (target.tagName !== 'BUTTON' && target.className !== 'humidity-pie' && target.className !== 'feelslike-pie' && target.className !== 'temp-pie' && target.className !== 'pm-pie'){
        setShow("none")
      } 
      // else {
      //   if (target.className === 'humidity-pie') setShow("Humidity");
      //   else if (target.className === 'feelslike-pie') setShow("Feelslike");
      //   else if (target.className === 'temp-pie') setShow("Temp");
      //   else if (target.className === 'pm-pie') setShow("pm");
      //   else setShow("none");
      // }
    }
    document.body.addEventListener('click', closeData);
    return () => document.body.removeEventListener('click', closeData);
}, []);

  function dataTemp() {
    return (
      <div className="dataTemp">
        <button className="backButton" onClick={() => setShow("none")} />
        <p className="datatopic-text">Temperature</p>
        <div className={hr < 19 ? 
          unitState === "celcius"
            ? rt_temp < 15
              ? "sun3-d"
              : rt_temp < 30
              ? "sun2-d"
              : "sun1-d"
            : rt_temp < 59
            ? "sun3-d"
            : rt_temp < 86
            ? "sun2-d"
            : "sun1-d"
          : "night-d"}/>
        <p className="datadetail-text">{unitState === "celcius" ? rt_temp : convertFtoC(rt_temp)}°C | {unitState === "fahrenheit" ? rt_temp : convertCtoF(rt_temp)}°F</p>
      </div>
    );
  }

  function datapm(){
    return (
      <div className="datapm">
        <button className="backButton" onClick={() => setShow("none")} />
        <p className="datatopic-text">Air Quality</p>
        <div className="pm-d"/>
        <p className="datadetail-text">{(dataSensor.Dust * 1000).toFixed(1)} μg/m³</p>
      </div>
    );
  }

  function dataHumidity() {
    return (
      <div className="dataHumidity">
        <button className="backButton" onClick={() => setShow("none")} />
        <p className="datatopic-text">Humidity</p>
        <div className="humidity-d"/>
        <p className="datadetail-text">{dataSensor.Humidity} %RH</p>
      </div>
    );
  }

  function dataFeelslike() {
    return (
      <div className="dataFeelslike">
        <button className="backButton" onClick={() => setShow("none")} />
        <p className="datatopic-text">Feels Like</p>
        <div className={
          unitState === "celcius"
            ? rt_feel < 15
              ? "feel-cold-d"
              : rt_feel < 30
              ? "feel-happy-d"
              : "feel-hot-d"
            : rt_feel < 59
            ? "feel-cold-d"
            : rt_feel < 86
            ? "feel-happy-d"
            : "feel-hot-d" }/>
        <p className="datadetail-text">{unitState === "celcius" ? rt_feel : convertFtoC(rt_feel)}°C | {unitState === "fahrenheit" ? rt_feel : convertCtoF(rt_feel)}°F</p>
      </div>
    );
  }

  function showAllDetail(){
    return (
      <>
        {show === "Temp" && dataTemp()} 
        {show === "Humidity" && dataHumidity()}
        {show === "pm" && datapm()}
        {show === "Feelslike" && dataFeelslike()}
      </>
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
      {showAllDetail()}
    </>
  );
}

export default ShowData;
