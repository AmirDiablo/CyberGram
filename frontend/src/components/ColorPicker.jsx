import React, {useState} from 'react';

const ColorPicker = () => {

    const [color, setColor] = useState('#fa536f');

    const setCookie = (name, value, days)=> {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        let expires = "expires="+ date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/"
    }

    const getCookie = (cname)=> {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i=0; i < ca.length; i++){
            let c = ca[i]
            while(c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if(c.indexOf(name) == 0){
                return c.substring(name.length, c.length)
            }
        }
        return "";
    }

    const change = ()=> {
        setCookie("theme", color, 10)
    }


    const handleColor = (e)=> {
        setColor(e.target.value)
    }

    return ( 
        <div className="color-chooser">
            <h1>color chooser</h1>
            <div className="color-display" style={{backgroundColor: color}}>
                <p>selected color: {color}</p>
            </div>
            <label>select a color: </label>
            <input type='color' value={color} onChange={handleColor} onInput={change}></input>
        </div>
     );
}
 
export default ColorPicker;

