import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios'
/* import { Link } from "react-router-dom"; */

const URI = import.meta.env.VITE_API_ML_COUNTRY;
const URI_TOP10 = import.meta.env.VITE_API_ML_SELLER_TOP10;

const Sellers = () => {

  const [country, setCountry] = useState([]);
  const [top, setTop] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    getCountry()
    getData()
  }, []);

  //Traer Paises
  const getCountry = async () => {
    const res = await axios.get(URI);
    const res2 = await axios.get(URI_TOP10);
    //filtrar de A-Z
    const sortedCountries = res.data.sort((a, b) => a.name.localeCompare(b.name));
    setCountry(sortedCountries);
    setTop(res2.data);
  }

  const getData = async () => {
    const res = await axios.get(URI_TOP10);
    //filtrar de A-Z
    setTop(res.data);
  }

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    console.log(searchTerm);
    // Filtrar los países basados en el término de búsqueda
    const filteredCountries = top.filter(top => top.name.toLowerCase().includes(newSearchTerm.toLowerCase()));

    // Limitar los resultados a 10
    const limitedResults = filteredCountries.slice(0, 10);
    setSearchResults(limitedResults);
  }

  return (
    <div>
      <div className="search__list">
        <div>
          <label>Seleccionar: </label>

          <select name="marketplaces" id="marketplace" defaultValue={"Argentina"}>
            {country.map((country) => (
              <option key={country.default_currency_id} value={country.id}>{country.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Buscar: </label>
          <input type="search" className="search" onChange={handleSearchChange} value={searchTerm} />
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map(result => (
                <li key={result.id}>{result.name}</li>
              ))}
            </ul>
          )}
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
            <tr>
              <td>Producto 1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sellers;
