
const PriceSidebar = ({ cartItems }) => {

    const deliveryFee = cartItems.reduce((fee, item) => {
        const itemPrice = item.cuttedPrice ? item.cuttedPrice : item.price;
        return fee + (itemPrice * item.quantity);
    }, 0) > 100 ? 0 : 7;

    const totalPrice = cartItems.reduce((total, item) => {
        const itemPrice = item.cuttedPrice ? item.cuttedPrice : item.price;
        return total + (itemPrice * item.quantity);
    }, 0);

    const totalWithDelivery = totalPrice + deliveryFee;

    return (
        <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">

            {/* <!-- nav tiles --> */}
            <div className="flex flex-col bg-white rounded-sm shadow">
                <h1 className="px-6 py-3 border-b font-medium text-gray-500">PRIX</h1>

                <div className="flex flex-col gap-4 p-6 pb-3">
                    <p className="flex justify-between">PRIX ({cartItems.length} piéce) <span>TND {totalPrice.toLocaleString()}</span></p>
                    <p className="flex justify-between">Livraison <span className="text-primary-green">{deliveryFee} TND</span></p>

                    <div className="border border-dashed"></div>
                    <p className="flex justify-between text-lg font-medium">Prix totale <span>TND {totalWithDelivery.toLocaleString()}</span></p>
                    <div className="border border-dashed"></div>

                    {/* <p className="font-medium text-primary-green">You will save TND {cartItems.reduce((sum, item) => sum + ((item.cuttedPrice * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()} on this order</p> */}

                </div>

            </div>
            {/* <!-- nav tiles --> */}

        </div>
    );
};

export default PriceSidebar;
