import React, { useContext } from "react";
import { useState } from 'react'

const SwitchBusqueda = ({ onToggle }) => {
    const [switch_estado, setSwitch_Estado] = useState(0);
    const [switch_value, setSwitchValue] = useState('Database Local');
    


    const switchStatus = () => {
        if (switch_estado === 0) {
          setSwitch_Estado(1);
          setSwitchValue('Directo ML');
          onToggle();
        } else {
          setSwitch_Estado(0);
          setSwitchValue('Database Local');
          onToggle();
        }
      }
      /* onToggle(); */
      
  return (
    <div>
      <label className="text__switch">{switch_value}</label>
      <input type="checkbox" id="switch" className="switch" checked={switch_estado === 1} onChange={switchStatus}/><label for="switch" className="switch__text">Cambiar</label>
    </div>
  );
};

export default SwitchBusqueda;
