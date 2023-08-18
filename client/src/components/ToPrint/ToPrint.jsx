import React from 'react';
import Logo from '../../assets/images/logo.png';

function ToPrint({ rowData }) {
  console.log(rowData)
  return (
    <div style={{ margin: '1px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '83.3333%' }}>
          <div style={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.375rem', padding: '1rem' }}>
            <div style={{ padding: '0.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
                <div style={{ fontWeight: '600' }}>
                  <div style={{ marginTop: '0.5rem' }}>
                    <img src={Logo} style={{width: '17rem', height: 'auto'}} alt="Logo" />
                  </div>
                </div>
                <div style={{ fontWeight: '600' }}>
                  <h1 style={{ fontWeight: 'bold' }}>ELECTROZAYN</h1>
                  <div style={{ marginTop: '0.5rem' }}>
                    Rue d'Athènes, 1 Rue de Piree, Tunis 1001<br />
                    +216 51 511 966<br />
                    Electrozayne@gmail.com
                    www.electrozayn.com
                    <br />
                    <br />
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>BON DE COMMANDE</h1>
                    <h1 style={{ fontSize: '1rem', fontWeight: 'bold' }}>ADRESSE CLIENT:</h1>
                    <h1 style={{ fontSize: '1rem', fontWeight: 'bold' }}>{rowData.address}</h1>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem', border: 'none', borderTop: '1px solid #e2e8f0' }} />
            <div style={{ padding: '0.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', gap: '1rem' }}>
                <div style={{ fontWeight: '600' }}>
                  <span>N° FACTURE</span>
                  <div style={{ marginTop: '0.5rem' }}>{rowData.id}</div>
                </div>
                <div style={{ fontWeight: '600' }}>
                  <span>DATE</span>
                  <div style={{ marginTop: '0.5rem' }}>{rowData.date}</div>
                </div>
              </div>
            </div>
            <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem', border: 'none', borderTop: '1px solid #e2e8f0' }} />
            <div style={{ padding: '0.5rem' }}>
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '0.25rem 0.5rem' }}>PRODUITS</th>
                    <th style={{ padding: '0.25rem 0.5rem' }}>QUANTITE</th>
                    <th style={{ padding: '0.25rem 0.5rem' }}>PRIX</th>
                  </tr>
                </thead>
                <tbody>
                  {rowData?.products?.map((prod, i) => (
                    <tr key={i}>
                      <td style={{ padding: '0.25rem 0.5rem' }}>{prod.productName}</td>
                      <td style={{ padding: '0.25rem 0.5rem' }}>{prod.productQuantity}</td>
                      <td style={{ padding: '0.25rem 0.5rem' }}>{prod.product_price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td style={{ padding: '0.25rem 0.5rem', fontWeight: '600', textAlign: 'right' }} colSpan={2}>
                      Total:
                    </td>
                    <td style={{ padding: '0.25rem 0.5rem' }}>{rowData?.total_price} TND</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem', border: 'none', borderTop: '1px solid #e2e8f0' }} />

            <hr style={{ marginTop: '0.5rem', marginBottom: '0.5rem', border: 'none', borderTop: '1px solid #e2e8f0' }} />
            <div style={{ padding: '0.5rem', fontWeight: '600' }}>
              <div style={{ marginTop: '0.5rem' }}>
                ELECTROZAYN<br />
                Addresse : Rue d'Athènes, 1 Rue de, Rue Piree, Tunis 1001<br />
                TLE: +216 51 511 966<br />
                <a href="https://www.electrozayn.com" style={{ color: '#3182ce' }}>
                  www.electrozayn.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToPrint;