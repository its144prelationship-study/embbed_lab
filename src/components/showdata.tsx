import temp from "../assets/temp_pie.png";
import humidity from "../assets/humidity_pie.png";
import feelslike from "../assets/feelslike_pie.png";
import pm from "../assets/pm_pie.png";
import "../functionbar.css";
import { useState } from "react";

interface Data_props {
  datatype: string;
}

function ShowData({ datatype }: Data_props) {
  const [unitState, setUniteState] = useState("celcius");
  const [rt_temp, setNewTemp] = useState(37.2);
  const [rt_feel, setNewFeel] = useState(37.5);
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
              if(unitState === "fahrenheit"){
                // console.log(rt_temp, rt_feel,unitState);
                setNewTemp(convertFtoC(rt_temp));
                setNewFeel(convertFtoC(rt_feel));
                // console.log(rt_temp, rt_feel,unitState);
              }
              setUniteState("celcius");
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
              if(unitState === "celcius"){
                setNewTemp(convertCtoF(rt_temp));
                setNewFeel(convertCtoF(rt_feel));
              }
              setUniteState("fahrenheit");
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
    let rt_hu = 74;
    return (
      <button
        className="humidity-pie"
      >
        <p className="hu-text">{rt_hu}</p>
        <p className="unit-rh">%RH</p>
      </button>
    );
  }
  function initPM() {
    let rt_pm = 121;
    return (
      <button className="pm-pie">
        <p className="pm-text">{rt_pm}</p>
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
              if(unitState === "fahrenheit"){
                setNewTemp(convertFtoC(rt_temp));
                setNewFeel(convertFtoC(rt_feel));
              }
              setUniteState("celcius");
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
              if(unitState === "celcius"){
                setNewTemp(convertCtoF(rt_temp));
                setNewFeel(convertCtoF(rt_feel));
              }
              setUniteState("fahrenheit");
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
  function convertFtoC(f:number){
    return Number(((f-32)*(5/9)).toFixed(1));
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
