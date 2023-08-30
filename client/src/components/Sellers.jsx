import React, { useContext } from "react";
import { useState, useEffect } from 'react'
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";


const URI = import.meta.env.VITE_API_ML_COUNTRY;
const URI_ML = import.meta.env.VITE_API_ML_VENDEDOR_TOP;
const URI_V_TC = import.meta.env.VITE_API_ML_VENDEDOR_TOTALCOUNT;

const Sellers = () => {
  const { theme } = useContext(ThemeContext);
  const [country, setCountry] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [marketplace, setMarketplace] = useState('MLA');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [vendedoresTotalCount, setVendedoresTotalCount] = useState(0);

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
      const vTotalCount = `${URI_V_TC}?_like1=${encodeURIComponent(
        searchTerm
      )}%&_like=${marketplace}`;

      const res = await axios.get(searchUrl);
      const resTotalCount = await axios.get(vTotalCount);
      
      const vendedores = res.data.vendedores;
      const sortedVendedores = vendedores.sort((a, b) => a.nickname.localeCompare(b.nickname));
      const totalCount = resTotalCount.data.vendedores_aggregate.aggregate.count;
      
      const totalPages = Math.ceil(totalCount / pageSize);

      setVendedoresTotalCount(totalCount);
      setTotalPages(totalPages);

      if (page === 1) {
        setSearchResults(sortedVendedores);
      } else {
        setSearchResults(prevResults => [...prevResults, ...sortedVendedores]);
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };
  const fetchMoreData = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  
  return (
    <div className={`container-box ${theme}`}>
      <div className="search__list">
        <div className="select__container">
          <label>Seleccionar: </label>

          <select name="marketplaces" className={`marketplace ${theme}`} defaultValue={"Argentina"} onChange={(e) => setMarketplace(e.target.value)}>
            {country.map((country_ML) => (
              <option key={country_ML.default_currency_id} value={country_ML.id}>{country_ML.name}</option>
            ))}
          </select>
        </div>
        <div className="searh_container">
          <label>Buscar: </label>
          <input type="search" className={`search ${theme}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div>
        <table className={theme}>
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
          <InfiniteScroll
              dataLength={searchResults.length}
              next={fetchMoreData}
              hasMore={searchResults.length < vendedoresTotalCount}
              loader={<h4>Cargando...</h4>}
            >
              {searchResults.map((result) => (
                <tr key={result.id_vendedor}>
                  <td><Link to={`sellers/${marketplace}/${result.id_vendedor}`}>{result.nickname}</Link></td>
                </tr>
              ))}
            </InfiniteScroll>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sellers;
