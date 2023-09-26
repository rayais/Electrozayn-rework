import React, { useState, useEffect } from 'react';
import Logo from '../../assets/images/logo.png';
import './BillStyle.css'; // Import a CSS file for styling

function ToPrint({ rowData, onImageLoad }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = Logo;
    image.onload = () => {
      setIsImageLoaded(true);
      onImageLoad();
    };
  }, [onImageLoad]);

  return (
    <div className="bill-container">
      {console.log(rowData)}
      <div className="bill-header">
      <div className='row'>
          <div className='col-3'>
          {isImageLoaded ? (
          <img src={Logo} className="bill-logo" alt="Logo" style={{ width: "180px", height: "180px" }} />
        ) : (
          <div className="placeholder-image" />
        )}
          </div>
          <div className='col-8' style={{display:"flex",padding:'10px',border:"solid 2px",flexWrap:"wrap"}}>
           <div className='col-4'>
           Bon de livraison N° : {rowData.id}
          </div>
          <div className='col-6'>
           Date : {rowData.date}
          </div>
          <div className='col-12'>
          <h5>Client : {rowData.userName} </h5>
           <h5>Tél : {rowData.phone}</h5>
           <h5>Adresse : {rowData.address} </h5>
           <h5>Email : {rowData.email} </h5>
          </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-3'>
          Addresse : Rue d'Athènes, 1 Rue de, Rue Piree, Tunis 1001<br />
          TLE: +216 51 511 966<br />
          <a href="https://www.electrozayn.com" className="bill-website">
            www.electrozayn.com
          </a>
          </div>
          
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
  <thead>
    <tr style={{ backgroundColor: '#333', color: '#fff' }}>
      <th style={{ padding: '10px', textAlign: 'left' }}>PRODUITS</th>
      <th style={{ padding: '10px', textAlign: 'left' }}>QUANTITE</th>
      <th style={{ padding: '10px', textAlign: 'left' }}>PRIX</th>
    </tr>
  </thead>
  <tbody>
    {rowData?.products?.map((prod, i) => (
      <tr key={i}>
        <td style={{ padding: '8px 10px', border: '1px solid #ccc' }}>{prod.productName}</td>
        <td style={{ padding: '8px 10px', border: '1px solid #ccc' }}>{prod.productQuantity}</td>
        <td style={{ padding: '8px 10px', border: '1px solid #ccc' }}>{prod.product_price}</td>
      </tr>
    ))}
    <tr>
      <td style={{ padding: '8px 10px', border: '1px solid #ccc' }} colSpan={2}>
        Total:
      </td>
      <td style={{ padding: '8px 10px', border: '1px solid #ccc' }}>{rowData?.total_price} TND</td>
    </tr>
  </tbody>
</table>

      </div>
      <hr className="bill-divider" />
      <div className="bill-footer">
     <div className='row' style={{display:"flex",justifyContent:"flex-end"}}> 
      <div className='col-4'>
      <h4>Cachet et Signature</h4>
      </div>
     </div>
      </div>
    </div>
  );
}

export default ToPrint;
