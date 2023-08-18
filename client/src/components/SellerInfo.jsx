import React from "react";
import { Link } from "react-router-dom";
import { FcBullish, FcClock, FcVoicePresentation } from "react-icons/fc";
const SellerInfo = ({ seller }) => {
  const {
    id,
    nickname,
    car_dealer,
    real_estate_agency,
    registration_date,
    tags,
    permalink,
    eshop,
  } = seller;

  const { level_id, power_seller_status, transactions, metrics } =
    seller.seller_reputation;

  const convertDate = (date) => {
    const dateObj = new Date(date);

    const dia = String(dateObj.getDate()).padStart(2, "0");
    const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
    const año = dateObj.getFullYear();

    return `${dia}/${mes}/${año}`;
  };

  return (
    <div className="seller__info">
      <div className="seller__logo">
        <img src={eshop.eshop_logo_url} alt={`logo ${nickname}`} />
      </div>
      <h1>{nickname}</h1>
      <div>
        {/* <p>Nivel: {level_id}</p>
        <p>Estado Power Seller: {power_seller_status}</p> */}
        <h4>Transacciones totales</h4>
        <div className="transactions__section">
          <div className="total__transactions">{transactions.total}</div>

          <div className="candles">
            <div className="candle">
              <div
                className="candle__bar completed"
                style={{ width: `${transactions.completed * 0.0036}px` }}
              ></div>
              Completadas {`(${transactions.completed})`}
            </div>

            <div className="candle">
              <div
                className="candle__bar canceled"
                style={{ width: `${transactions.canceled * 0.0036}px` }}
              ></div>
              Canceladas {`(${transactions.canceled})`}
            </div>
          </div>
        </div>

        <h4>Transacciones últimos 60 días</h4>
        <div className="transactions__section">
          <div className="last__transactions">
            {metrics.sales.completed +
              metrics.claims.value +
              metrics.delayed_handling_time.value +
              metrics.cancellations.value}
          </div>

          <div className="candles">
            <div className="candle">
              <div
                className="candle__bar completed"
                style={{ width: `${metrics.sales.completed * 0.03}px` }}
              ></div>
              Completadas {`(${metrics.sales.completed})`}
            </div>
            <div className="candle">
              <div
                className="candle__bar claim"
                style={{ width: `${metrics.claims.value * 0.03}px` }}
              ></div>
              Reclamos {`(${metrics.claims.value})`}
            </div>
            <div className="candle">
              <div
                className="candle__bar time"
                style={{
                  width: `${metrics.delayed_handling_time.value * 0.03}px`,
                }}
              ></div>
              Tiempo de manejo retrasado{" "}
              {`(${metrics.delayed_handling_time.value})`}
            </div>

            <div className="candle">
              <div
                className="candle__bar canceled"
                style={{ width: `${metrics.cancellations.value * 0.03}px` }}
              ></div>
              Canceladas {`(${metrics.cancellations.value})`}
            </div>
          </div>
        </div>
      </div>
      <h5>
        {" "}
        <FcBullish />
        Total de ventas: {transactions.total}
      </h5>
      <h5>
        {" "}
        <FcClock />
        Fecha de registro: {convertDate(registration_date)}
      </h5>
      <Link to={permalink} target="_blank">
        <FcVoicePresentation />
        Mercadolibre
      </Link>
    </div>
  );
};

export default SellerInfo;
