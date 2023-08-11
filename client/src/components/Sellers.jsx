import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../../node_modules/bulma/css/bulma.min.css';
/* import { Link } from "react-router-dom"; */

const URI = import.meta.env.VITE_API_ML_COUNTRY;
const URI_ML = import.meta.env.VITE_API_ML_SELLER_TOP50;

const Sellers = () => {

  const [country, setCountry] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [marketplace, setMarketplace] = useState('MLA');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getCountry();
    loadPageData();
  }, [searchTerm, marketplace, page]);

  const getCountry = async () => {
    const res = await axios.get(URI);
    const sortedCountries = res.data.sort((a, b) => a.name.localeCompare(b.name));
    setCountry(sortedCountries);
  };

  const loadPageData = async () => {
    try {
      const pageSize = 50;
      const offset = (page - 1) * pageSize;
      const searchUrl = `${URI_ML}?offset=${offset}&limit=${pageSize}&_like=${encodeURIComponent(
        searchTerm
      )}%&_like1=${marketplace}`;
      console.log(searchUrl);
      const res = await axios.get(searchUrl);
      const vendedores = res.data.vendedores;

      console.log(res.data.total_count);

      const filteredResults = vendedores.sort((a, b) => a.nickname.localeCompare(b.nickname));
      setSearchResults(filteredResults);
      setTotalPages(Math.ceil(res.data.total_count / pageSize));
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
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
      <div className="pagination is-centered">
          <ul className="pagination-list">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <a
                  className={`pagination-link ${page === index + 1 ? 'is-current' : ''}`}
                  aria-label={`Ir a la página ${index + 1}`}
                  onClick={() => handlePagination(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
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
