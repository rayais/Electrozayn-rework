import { Link } from 'react-router-dom';
import { getDiscount } from '../../../utils/functions';

const Product = ({_id, images, name, offer, tag, price, cuttedPrice }) => {
    return (
        <Link to={`/product/${_id}`} className="flex flex-col items-center gap-1.5 p-6 cursor-pointer">
            <div className="w-36 h-36 transform hover:scale-110 transition-transform duration-150 ease-out">
                <img draggable="false" className="w-full h-full object-fill" src={images[0].url} alt={name} />
            </div>
            <h2 className="font-medium text-sm mt-2">{name}</h2>
            <span className="text-gray-500 line-through text-xs">TND {cuttedPrice.toLocaleString()}</span>
            <span className='font-bold text-red-500 '>TND {price.toLocaleString()}</span>
            <span className="text-primary-green text-sm">{offer}</span>
            <span className="text-gray-500 text-sm">{tag}</span>
        </Link>
    );
};

export default Product;
