import React, { useContext } from "react";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ThemeContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";

const URI = import.meta.env.VITE_API_ML_COUNTRY;
const URI_ML_SITE_NICKNAME = import.meta.env.VITE_API_ML_SITE_NICKNAME;

const SellersBusquedaEspecifica = () => {
  const { theme } = useContext(ThemeContext);
  const [country, setCountry] = useState([]);
  const [mlNicknameInput, setMlNicknameInput] = useState('');
  const [nickname, setNickname] = useState('');
  const [idSeller, setIdSeller] = useState('');
  const [marketplace, setMarketplace] = useState('MLA');

  useEffect(() => {
    getCountry();
    loadPageData();
  }, [mlNicknameInput, marketplace]);

  const getCountry = async () => {
    const res = await axios.get(URI);
    const sortedCountries = res.data.sort((a, b) => a.name.localeCompare(b.name));
    setCountry(sortedCountries);
  };

    const loadPageData = async () => {
    try {
      const findByNickname = `${URI_ML_SITE_NICKNAME}/${marketplace}/search?nickname=${mlNicknameInput}`;
      const res = await axios.get(findByNickname);
      /* setNickname(res.data.seller.nickname);
      setIdSeller(res.data.seller.id); */
      
      if (res.data && res.data.seller) {
        setNickname(res.data.seller.nickname);
        setIdSeller(res.data.seller.id);
      } else {
        // Maneja el caso en el que no se encontró un vendedor válido
        setNickname('Busca un vendedor desde el Buscador');
        setIdSeller('');
      }
      
     
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  
  return (
    <div className={`container-box ${theme}`}>
      <div className="search__list">
        <div className="select__container">
          <label>Seleccionar: </label>

          <select name="marketplaces" className={`marketplace ${theme}`} defaultValue={"Argentina"} onChange={(e) => setMarketplace(e.target.value)}>
            {country.map((country_ML_SBE) => (
              <option key={country_ML_SBE.default_currency_id} value={country_ML_SBE.id}>{country_ML_SBE.name}</option>
            ))}
          </select>
        </div>
        <div className="searh_container">
          <label>Buscar: </label>
          <input type="search" className={`search ${theme}`} value={mlNicknameInput} onChange={(e) => setMlNicknameInput(e.target.value)} />
        </div>
      </div>
      <div>
        <table className={theme}>
          <caption>
            {" "}
            <h3></h3>
          </caption>
          <thead>
            <tr>
              <th>Sellers: </th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td><Link to={`${import.meta.env.VITE_API_DOMAIN}sellers/${marketplace}/${idSeller}`}>{nickname}</Link></td>
                </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellersBusquedaEspecifica;
