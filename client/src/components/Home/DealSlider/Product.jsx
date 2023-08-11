import { Link } from 'react-router-dom';
import { getDiscount } from '../../../utils/functions';
import { addItemsToCart } from '../../../actions/cartAction';
import { enqueueSnackbar } from 'notistack';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Product = ({id, product_image, product_name, offer, tag, Origin_price, cuttedPrice }) => {

    
    return (
        <>
            <Link to={`/product/${id}`} className="flex flex-col items-center gap-1.5 p-6 cursor-pointer">
            <div className="w-36 h-36 transform hover:scale-110 transition-transform duration-150 ease-out">
                <img draggable="false" className="w-full h-full object-fill" src={product_image} alt={product_name} />
            </div>
            <h2 className="font-medium text-sm mt-2">{product_name}</h2>
            {/* <span className="text-gray-500 line-through text-xs">TND {cuttedPrice.toLocaleString()}</span> */}
            <span className='font-bold text-red-500 '>TND {Origin_price.toLocaleString()}</span>
            </Link>
        </>
    );
};

export default Product;
