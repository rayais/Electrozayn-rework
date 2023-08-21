import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminProducts, getSimilarProducts } from '../../../actions/productAction';
import { useDispatch, useSelector } from 'react-redux';
import ClearIcon from '@mui/icons-material/Clear';

const Searchbar = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [keyword, setKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [productNotFound, setProductNotFound] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (keyword.trim()) {
            const results = products.filter(product =>
                product.product_name.toLowerCase().includes(keyword?.toLowerCase())
            );

            if (results.length > 0) {
                setSearchResults(results);
                setProductNotFound(false);
                setDropdownVisible(true); 
            } else {
                setSearchResults([]);
                setProductNotFound(true);
                setDropdownVisible(false);
                
            }
        }   else {
            setDropdownVisible(false); 
        }
    }, [keyword, products]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (keyword.trim()) {
            dispatch(getAdminProducts());
            setKeyword('');
            navigate(`/products/${products.id}`);
        } 
    };

    const clearSearch = () => {
        setKeyword('');
    };

    return (
        <form onSubmit={handleSubmit} className="w-9/12 sm:w-8/12 px-1 sm:px-4 py-1.5 flex justify-between items-center shadow-md bg-white rounded-sm overflow-hidden">
            <input
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value);}}
                className="text-sm flex-1 outline-none border-none placeholder-gray-500"
                type="text"
                placeholder="Recherchez.."
            />
           {keyword.trim() ? (
                <button type="button" className="text-primary-blue" onClick={clearSearch}>
                    X
                </button>
            ) : (
                <button type="submit" className="text-primary-blue">
                    <SearchIcon />  
                </button>
            )}
            {productNotFound && keyword.trim() && (
                <p className="absolute bg-white border border-gray-300 mt-20 sm:w-full rounded-md shadow-md px-4 py-2">
                    Produit non trouvé.
                </p>
            )}
            {searchResults.length > 0 && keyword.trim() && (
                <div className="absolute bg-white border overflow-y-auto border-gray-300 top-10 mt-15 max-h-40 rounded-md shadow-md">
                    <ul className="py-1">
                        {searchResults.map((result) => (
                             <li
                                key={result.id}
                                className="relative px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                <Link to={`/product/${result.id}`} onClick={() => setKeyword('')} className="flex items-center">
                                    <img src={result.product_image} alt={result.product_name} className="w-10 h-8 mr-2" />
                                    {result.product_name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </form>
    );
};

export default Searchbar;

