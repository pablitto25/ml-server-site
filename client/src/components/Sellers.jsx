import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios'
/* import { Link } from "react-router-dom"; */

const URI = import.meta.env.VITE_API_ML_COUNTRY;
const URI_ML = import.meta.env.VITE_API_ML_SELLER_TOP10;

const Sellers = () => {

  const [country, setCountry] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [marketplace, setMarketplace] = useState('');

  useEffect(() => {
  getCountry();
  
  if (searchTerm !== '') {
    updateSearchResults();
  } else {
    setSearchResults([]);
  }
}, [searchTerm, marketplace]);

  const getCountry = async () => {
    const res = await axios.get(URI);
    const sortedCountries = res.data.sort((a, b) => a.name.localeCompare(b.name));
    setCountry(sortedCountries);
  }

  const updateSearchResults = async () => {
    try {
      const searchUrl = `${URI_ML}/${encodeURIComponent(searchTerm)}%/${marketplace}`;
      console.log(searchUrl);
      const res = await axios.get(searchUrl);
      const vendedores = res.data.vendedores;
      const filteredResults = vendedores.sort((a, b) => a.nickname.localeCompare(b.nickname));
      
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };


  return (
    <div>
      <div className="search__list">
        <div>
          <label>Seleccionar: </label>

          <select name="marketplaces" id="marketplace" defaultValue={"Argentina"} onChange={(e) => setMarketplace(e.target.value)}>
            {country.map((country_ML) => (
              <option key={country_ML.default_currency_id} value={country_ML.id}>{country_ML.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Buscar: </label>
          <input type="search" className="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div>
        <table>
          <caption>
            {" "}
            <h3>Sellers</h3>
          </caption>
          <thead>
            <tr>
              <th>Clientes</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result) => (
              <tr key={result.id_vendedor}>
                <td>{result.nickname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sellers;
