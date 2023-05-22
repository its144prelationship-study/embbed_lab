import CreateSwitch from "./components/switch";
import ShowData from "./components/showdata";
import "./functionbar.css";

function App() {
  return (
    <>
      <div className="center">
        <div className="function-box">
          <ShowData datatype="HUMIDITY" />
          <ShowData datatype="TEMP" />
          <ShowData datatype="FEELSLIKE" />
          <ShowData datatype="PM" />
        </div>
        <CreateSwitch />
      </div>
    </>
  );
}

export default App;
