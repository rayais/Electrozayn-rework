import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminProducts, getSimilarProducts } from '../../../actions/productAction';
import { useDispatch } from 'react-redux';

const Searchbar = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            dispatch(getAdminProducts())
            setKeyword('')
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full sm:w-9/12 px-1 sm:px-4 py-1.5 flex justify-between items-center shadow-md bg-white rounded-sm overflow-hidden">
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="text-sm flex-1 outline-none border-none placeholder-gray-500" type="text" placeholder="Recherchez des produits ..." />
            <button type="submit" className="text-primary-blue"><SearchIcon /></button>
        </form>
    );
};

export default Searchbar;
