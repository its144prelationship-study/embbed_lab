import '../switch.css';
import { useState } from 'react';
import {currentState, currentFeel, currentTemp} from './showdata';

function CreateSwitch() {
    const [switchState,setSwitchState] = useState(0);
    function RedSwitch(){
        //post to firebase
        return (
            <button className='red-switch' onClick={() => {setSwitchState(1)}} />
        )
    }
    function GreenSwitch(){
        //pose to firebase
        return(
            <button className='green-switch' onClick={() => {setSwitchState(0)}} />
        )
    }
    const date = new Date();
    let hrnow = Number(date.getHours());
    // hrnow = 20;
    return(
        <>
            <div className= {hrnow >= 5 && hrnow < 12 ? 'circlehome1' : hrnow >= 12 && hrnow < 19 ? 'circlehome2' : 'circlehome3'} />
            {switchState === 0 && RedSwitch()}
            {switchState === 1 && GreenSwitch()}
            <div className='rh-img'/>
            <div className= {currentState === "celcius" ? (currentFeel<15 ? 'feel-cold' : currentFeel<30 ? 'feel-happy' : 'feel-hot'): (currentFeel<59 ? 'feel-cold' : currentFeel<86 ? 'feel-happy' : 'feel-hot')} />
            <div className='pm-img'/>
        </>
    ) 
}
export default CreateSwitch;