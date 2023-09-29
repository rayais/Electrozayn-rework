import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../../actions/cartAction';
import { getProductDetails } from '../../../actions/productAction';

const Product = ({id, product_image, product_name, offer, tag, Origin_price, Promo_price }) => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const addToCartHandler = () => {
        dispatch(addItemsToCart(id));
        enqueueSnackbar("Produit ajouté au panier avec succès", { variant: "success" });
    }
    const handelnavigate=(id)=>{
      navigate(`/product/${id}`)
    }

    return (
        <>  
            <div onClick={()=>handelnavigate(id)} className="flex flex-col items-center gap-1.5 p-3 cursor-pointer ">
            <div className="w-36 h-36 transform hover:scale-110 transition-transform duration-150 ease-out ">
                <img draggable="false" className="w-full h-full object-fill" src={product_image} alt={product_name} />
                <hr />
            </div>
            <h2 className="font-medium text-sm mt-2">{product_name}</h2>
            {/* <span className="text-gray-500 line-through text-xs">TND {Origin_price? Origin_price.toLocaleString() : Promo_price.toLocaleString()}</span> */}
            </div>
            <div className="flex flex-col items-center cursor-pointer ">
                <label htmlFor="">Price: </label>
            <span className=' font-bold text-red-500 '>TND {Promo_price? Promo_price.toLocaleString() : Origin_price.toLocaleString()}</span>
            <ShoppingCartIcon className='hover:text-primary-blue' onClick={addToCartHandler}/>
            </div>
        </>
    );
};

export default Product;
