import React from 'react'

import Logo from '../../assets/images/logo.png'

function ToPrint({rowData}) {
    
  return  (
    <div  className="m-1">
        <div className="flex justify-center">
            <div className="w-10/12">
                <div className="bg-white border rounded-lg p-4">
                <div className="p-2">
                        <div className="grid grid-cols-2 gap-8 items-center">
                            <div className="font-semibold">
                                <div className="mt-2">
                                    <img src={Logo} />
                                </div>
                            </div>
                            <div className="font-semibold">
                                <h1 className='font-bold'>ELECTROZAYN</h1>
                                <div className="mt-2">
                                    Rue d'Athènes, 1 Rue de Piree, Tunis 1001<br />
                                    +216 51 511 966<br />
                                    Electrozayne@gmail.com
                                    www.electrozayn.com<br />
                                    <br />
                                    <h1>BON DE COMMANDE</h1><br />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-2" />
                    <div className="p-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="font-semibold">
                                <span>N° FACTURE</span>
                                <div className="mt-2">
                                    {rowData.id}
                                </div>
                            </div>
                            <div className="font-semibold">
                                <span>DATE</span>
                                <div className="mt-2">
                                    {rowData.date}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-2" />
                    <div className="p-2">
                        <table className="table-auto w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">PRODUITS</th>
                                    <th className="px-4 py-2">QUANTITE</th>
                                    <th className="px-4 py-2">PRIX</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowData?.products?.map((prod, i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-2">{prod.productName}</td>
                                        <td className="px-4 py-2">{prod.productQuantity}</td>
                                        <td className="px-4 py-2">{prod.product_price}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="px-4 py-2 font-semibold text-right" colSpan={2}>Total:</td>
                                    <td className="px-4 py-2">{rowData?.total_price} TND</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr className="my-2" />
                    
                    <hr className="my-2" />
                    <div className="p-2">
                        <div className="font-semibold">
                            <div className="mt-2">
                                ELECTROZAYN<br />
                                Addresse : Rue d'Athènes, 1 Rue de, Rue Piree, Tunis 1001<br />
                                TLE: +216 51 511 966<br />
                                www.electrozayn.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default ToPrint