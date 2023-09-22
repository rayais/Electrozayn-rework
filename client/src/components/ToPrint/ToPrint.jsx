import React from 'react';
import Logo from '../../assets/images/logo.png';
import './BillStyle.css'; // Import a CSS file for styling

function ToPrint({ rowData }) {
  return (
    <div className="bill-container">
      <div className="bill-header">
        <img src={Logo} className="bill-logo" alt="Logo" />
        <div className="bill-header-info">
          <h1 className="bill-title">ELECTROZAYN</h1>
          <p className="bill-address">
            Rue d'Athènes, 1 Rue de Piree, Tunis 1001<br />
            +216 51 511 966<br />
            Electrozayne@gmail.com
            <a href="https://www.electrozayn.com" className="bill-website">
              www.electrozayn.com
            </a>
          </p>
          <h2 className="bill-heading">BON DE LIVRAISON</h2>
          <h1 className="bill-subheading">ADRESSE CLIENT:</h1>
          <h1 className="bill-address-details">{rowData.address}</h1>
        </div>
      </div>
      <hr className="bill-divider" />
      <div className="bill-details">
        <div className="bill-details-row">
          <div className="bill-detail">
            <span className="bill-detail-label">N° FACTURE</span>
            <div className="bill-detail-value">{rowData.id}</div>
          </div>
          <div className="bill-detail">
            <span className="bill-detail-label">DATE</span>
            <div className="bill-detail-value">{rowData.date}</div>
          </div>
        </div>
        <hr className="bill-divider" />
        <table className="bill-table">
          <thead>
            <tr>
              <th className="bill-table-header">PRODUITS</th>
              <th className="bill-table-header">QUANTITE</th>
              <th className="bill-table-header">PRIX</th>
            </tr>
          </thead>
          <tbody>
            {rowData?.products?.map((prod, i) => (
              <tr key={i}>
                <td className="bill-table-cell">{prod.productName}</td>
                <td className="bill-table-cell">{prod.productQuantity}</td>
                <td className="bill-table-cell">{prod.product_price}</td>
              </tr>
            ))}
            <tr>
              <td className="bill-table-cell" colSpan={2}>
                Total:
              </td>
              <td className="bill-table-cell">{rowData?.total_price} TND</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr className="bill-divider" />
      <div className="bill-footer">
        <div className="bill-footer-info">
          ELECTROZAYN<br />
          Addresse : Rue d'Athènes, 1 Rue de, Rue Piree, Tunis 1001<br />
          TLE: +216 51 511 966<br />
          <a href="https://www.electrozayn.com" className="bill-website">
            www.electrozayn.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default ToPrint;
