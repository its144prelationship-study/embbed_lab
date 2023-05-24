import { useState, useEffect } from 'react';

const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const HeaddingStyle = {
      justifyContent: 'center'
};
var DateStyle = {
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'Nunito',
      fontStyle: 'italic',
      fontWeight: 600,
      fontSize: 52,
      color: '#58B4AE',
};
const TimeStyle = {
      fontFamily: 'Nunito',
      fontWeight: 400,
      fontSize: 40,
      letterSpacing: '0.15em',
      display: 'flex',
      justifyContent: 'center',
      // marginBottom: '1%'
};

const TimeNumb = {
      color: '#FFFFFF',
      textShadow: '2px 2px 4px #000000',
      width: '40px',
      height: '55px',
      margin: '5px',
      paddingLeft: '15px',
      background: '#F86262',
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset'
};
const TimeColon = {
      color: '#F86262',
      textShadow: '1px 1px 2px #606060',
      paddingLeft: '6px',
      paddingButtom: '20px'
};

function MainComp() {
      const [date, setDate] = useState(new Date());
  
      function refreshClock() {
            setDate(new Date());
      }
      useEffect(() => {
            const timerId = setInterval(refreshClock, 1000);
            return function cleanup() {
                  clearInterval(timerId);
            };
      }, []);
      return (
            <div style={HeaddingStyle}>
                  <div className="DateStyle" style={DateStyle}>
                        {weekday[Number(date.getDay())]} {date.getDate()} {month[Number(date.getMonth())]} {date.getFullYear()}
                  </div>
                  <div style={TimeStyle}>
                        <span style={TimeNumb}> {date.getHours()>9 ? String(Number(date.getHours())/10)[0] : 0} </span>
                        <span style={TimeNumb}> {Number(date.getHours())%10} </span>
                        <span style={TimeColon}> : </span>
                        <span style={TimeNumb}> {date.getMinutes()>9 ? String(Number(date.getMinutes())/10)[0] : 0} </span>
                        <span style={TimeNumb}> {Number(date.getMinutes())%10} </span>
                  </div>
            </div>
      );
}

export default MainComp;