import CreateSwitch from "./components/switch";
import ShowData from "./components/showdata";
import "./functionbar.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 180);
  }, []);
  return (
    <>
      {loading ? (
        <div id="preloader"></div>
      ) : (
        <div className="center">
          <div className="function-box">
            <ShowData datatype="HUMIDITY" />
            <ShowData datatype="TEMP" />
            <ShowData datatype="FEELSLIKE" />
            <ShowData datatype="PM" />
          </div>
          <CreateSwitch />
        </div>
      )}
    </>
  );
}

export default App;
