
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Height } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { addItemsToCart } from '../../actions/cartAction';

const Product = ({ id, product_name, product_image,  Origin_price, Promo_price }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlistItems } = useSelector((state) => state.wishlist);

    const itemInWishlist = wishlistItems.some((i) => i.product === id);

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id));
        enqueueSnackbar("Produit ajouté au panier avec succès", { variant: "success" });
    }
    

    return (
        <div className="flex flex-col items-start items-center gap-2 px-4 py-6 relative  hover:shadow-lg rounded-sm">
            {/* <!-- image & product title --> */}
            <Link to={`/product/${id}`} className="flex flex-col items-center text-center group ">
                <div className="w-40 h-80">
                    <img draggable="false" className="w-full h-full object-contain " src={product_image && product_image} alt="" />
                     <hr className='border-primary-grey border-1'/>
                </div>
                <h2 className="text-sm mt-4 group-hover:text-primary-blue text-center">{product_name}</h2>
            </Link>
                
            {/* <!-- image & product title --> */}
            {/* <!-- product description --> */}
            <div className="flex flex-col gap-2 items-start">
                {/* <!-- price container --> */}
                <div className="flex items-center gap-5 text-md font-medium">
                    <span>TND {Promo_price && Promo_price > 0 ? Promo_price : Origin_price}</span>
                    {Promo_price && Promo_price < Origin_price ? <span className="text-gray-500 line-through text-xs">TND {Origin_price}</span> : ""}
                    <ShoppingCartIcon onClick={addToCartHandler} className='cursor-pointer text-primary-blue'/>
                    {/* <span className="text-xs text-primary-green">{getDiscount(Origin_price, Promo_price)}%&nbsp;off</span> */}
                </div>
                {/* <!-- price container --> */}
            </div>
        </div>
    );
};

export default Product;
