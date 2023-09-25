import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { useSnackbar } from 'notistack';
import { clearErrors, getAdminProducts, getProducts } from '../../actions/productAction';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import Product from './Product';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import { getRandomProducts } from '../../utils/functions';
import Categories from '../Layouts/Categories';

const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { products, loading, error } = useSelector((state) => state.products);
    const params = useParams();

    const [category, setCategory] = useState("");
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const resultPerPage = 12;
    const startIndex = (currentPage - 1) * resultPerPage;
    const endIndex = startIndex + resultPerPage;

    const keyword = params.keyword;

    const clearFilters = () => {
        setCategory("");
        setCurrentPage(1); 
    }

    const { title } = useParams();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 10);
    
    // Filter products based on category and title
    const filteredProducts = products.filter(product => {
        if (category) {
            return product.catigory && product.catigory.toLowerCase() === category.toLowerCase();
        } else {
            if (title === "nouveaux produits".toUpperCase()) {
                const productDate = new Date(product.created_at);
                return productDate >= currentDate;
            } else if (title === "TROTTINETTE ET VELO ELECTRIQUE") {
                return product.catigory === "Accessoires trottinette et vélo électrique";
            } else {
                return true; // Show all products when no specific filtering criteria apply
            }
        }
    });

    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        
        dispatch(getAdminProducts(keyword));
    }, [dispatch, keyword, category, currentPage, error, enqueueSnackbar, categoryToggle]);
   
    return (
        <>
            <MetaData title="Electrozayn - Le monde des composants électroniques et de l'électronique en Tunisie" />
            <Categories />
            <main className="w-full mt-0 sm:mt-0">
                <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto mb-7">
                    <div className="w-2/5 sm:w-1/5 px-1 bg-white sticky top-20 overflow-y-auto max-h-screen">
                        <div className="flex flex-col bg-white rounded-sm shadow">
                            <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
                                <p className="text-lg font-medium">Filtres</p>
                                <span className="uppercase text-primary-blue text-xs cursor-pointer font-medium" onClick={() => clearFilters()}>Effacer tout</span>
                            </div>
                            <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">
                                <div className="flex flex-col border-b px-4">
                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => {setCategoryToggle(!categoryToggle)}}>
                                        <p className="font-medium text-xs uppercase">Catégorie</p>
                                        {categoryToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>
                                    {categoryToggle && (
                                        <div className="flex flex-col pb-1" id="category-filter">
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="category-radio-buttons-group"
                                                    onChange={(e) => {
                                                        setCategory(e.target.value)
                                                        navigate('/products')
                                                    }}
                                                    name="category-radio-buttons"
                                                    value={category}
                                                >
                                                    {categories.map((el, i) => (
                                                        <FormControlLabel value={el} control={<Radio size="small" />} label={<span className="text-sm" key={i}>{el}</span>} />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">
                        {!loading && products?.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
                                <img draggable="false" className="w-1/2 h-44 object-contain" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="Aucun résultat trouvé" />
                                <h1 className="text-2xl font-medium text-gray-900">Désolé, aucun résultat trouvé</h1>
                            </div>
                        )}
                        {loading ? <Loader /> : (
                            <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">
                                <div className="grid grid-cols-1 sm:grid-cols-4 place-content-start overflow-hidden pb-4 border-b">
                                    {productsToDisplay?.map((product, i) => (
                                        <Product {...product} key={i} />
                                    ))}
                                </div>
                                {resultPerPage && (
                                    <Pagination
                                        count={Math.ceil(filteredProducts?.length / resultPerPage)}
                                        page={currentPage}
                                        onChange={(e, val) => setCurrentPage(val)}
                                        color="primary"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
};

export default Products;
