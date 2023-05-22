import redswitch from '../assets/red-switch.png'
import greenswitch from '../assets/green-switch.png'
import logoswitch from '../assets/logo-switch.png'
import '../switch.css';
import { useState } from 'react';

function CreateSwitch() {
    const [switchState,setSwitchState] = useState(0);
    function RedSwitch(){
        //post to firebase
        return (
            <button className='red-switch' onClick={() => {setSwitchState(1)}}>
                <img src={logoswitch} />
            </button>
        )
    }
    function GreenSwitch(){
        //pose to firebase
        return(
            <button className='green-switch' onClick={() => {setSwitchState(0)}}>
                <img src={logoswitch} />
            </button>
        )
    }
    return(
        <>
            {switchState === 0 && RedSwitch()}
            {switchState === 1 && GreenSwitch()}
        </>
    ) 
}
export default CreateSwitch;