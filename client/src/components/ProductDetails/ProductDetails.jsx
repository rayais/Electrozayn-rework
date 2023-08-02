import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
import ProductSlider from '../Home/ProductSlider/ProductSlider';
import Loader from '../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addItemsToCart } from '../../actions/cartAction';
import { getDeliveryDate, getDiscount } from '../../utils/functions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';
import Categories from '../Layouts/Categories';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    // reviews toggle
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const productId = params.id;
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar("Remove From Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(productId));
            enqueueSnackbar("Added To Wishlist", { variant: "success" });
        }
    }

    const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
            enqueueSnackbar("Empty Review", { variant: "error" });
            return;
        }
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);
        dispatch(newReview(formData));
        setOpen(false);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    const handleDialogClose = () => {
        setOpen(!open);
    }

    const itemInCart = cartItems.some((i) => i.product === productId);

    const goToCart = () => {
        navigate('/cart');
    }

    const buyNow = () => {
        addToCartHandler();
        navigate('/shipping');
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(productId));
        // eslint-disable-next-line
    }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getSimilarProducts(product?.category));
    }, [dispatch, product, product.category]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={product.name} />
                    <Categories />
                    <main className="mt-12 sm:mt-0">

                        {/* <!-- product image & description container --> */}
                        <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">

                            {/* <!-- image wrapper --> */}
                            <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                                {/* <!-- imgbox --> */}
                                <div className="flex flex-col gap-3 m-3">
                                    <div className="w-full h-full pb-6 border relative">
                                        <Slider {...settings}>
                                            {product.images && product.images.map((item, i) => (
                                                <>
                                                <img draggable="false" className="w-full h-80 object-contain" src={item.url} alt={product.name} key={i} />
                                                <div className='flex pt-5 cursor-pointer '>
                                                    <img draggable="false" className="w-full h-20 object-contain" src={item.url} alt={product.name} key={i} />
                                                    <img draggable="false" className="w-full h-20 object-contain" src={item.url} alt={product.name} key={i} />
                                                </div>
                                                </>
                                            ))}
                                        </Slider>
                                        <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                                            <span onClick={addToWishlistHandler} className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} cursor-pointer`}><FavoriteIcon sx={{ fontSize: "18px" }} /></span>
                                        </div>
                                    </div>

                                    <div className="w-full flex gap-3">
                                        {/* <!-- add to cart btn --> */}
                                        {product.stock > 0 && (
                                            <button onClick={itemInCart ? goToCart : addToCartHandler} className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-yellow rounded-sm shadow hover:shadow-lg">
                                                <ShoppingCartIcon />
                                                {itemInCart ? "PANIER" : "AJOUTER AU PANIER"}
                                            </button>
                                        )}
                                        <button onClick={buyNow} disabled={product.stock < 1 ? true : false} className={product.stock < 1 ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg" : "p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg"}>
                                            <FlashOnIcon />
                                            {product.stock < 1 ? "OUT OF STOCK" : "COMMANDER"}
                                        </button>
                                        {/* <!-- add to cart btn --> */}
                                    </div>

                                </div>
                                {/* <!-- imgbox --> */}
                            </div>
                            {/* <!-- image wrapper --> */}

                            {/* <!-- product desc wrapper --> */}
                            <div className="flex-1 py-2 px-3">

                                {/* <!-- whole product description --> */}
                                <div className="flex flex-col gap-2 mb-4">

                                    <h2 className="text-xl">{product.name}</h2>

                                    {/* <!-- price desc --> */}
                                    <div className="flex items-baseline gap-2 text-3xl font-medium">
                                        <span className="text-gray-800">TND{product.price?.toLocaleString()}</span>
                                        <span className="text-base text-gray-500 line-through">TND{product.cuttedPrice?.toLocaleString()}</span>
                                        {/* <span className="text-base text-primary-green">{getDiscount(product.price, product.cuttedPrice)}%&nbsp;off</span> */}
                                    </div>
                                    {product.stock <= 10 && product.stock > 0 && (
                                        <span className="text-red-500 text-sm font-medium">Quantité : {product.stock} </span>
                                    )}
                                    {/* <!-- price desc --> */}

                                    {/* <!-- warranty & brand --> */}
                                    <div className="flex gap-8 mt-2 items-center text-sm">
                                        <img draggable="false" className="w-20 h-8 p-0.5 border object-contain" src={product.brand?.logo.url} alt={product.brand && product.brand.name} />
                                        <span>{product.warranty} Année(s) guarantie </span>
                                    </div>
                                    {/* <!-- warranty & brand --> */}

                                    {/* <!-- highlights & services details --> */}
                                    <div className="flex flex-col sm:flex-row justify-between">
                                        {/* <!-- highlights details --> */}
                                        <div className="flex gap-16 mt-4 items-stretch text-sm">
                                            <p className="text-gray-500 font-medium">Highlights</p>

                                            <ul className="list-disc flex flex-col gap-2 w-64">
                                                {product.highlights?.map((highlight, i) => (
                                                    <li key={i}>
                                                        <p>{highlight}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* <!-- highlights details --> */}

                                        
                                    </div>
                                    {/* <!-- highlights & services details --> */}

                                    {/* <!-- description details --> */}
                                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                                        <p className="text-gray-500 font-medium">Description</p>
                                        <span>{product.description}</span>
                                    </div>
                                    {/* <!-- description details --> */}
                                    
                                    {/* <!-- Service details --> */}
                                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                                         <p className="text-gray-500 font-medium">Services</p>
                                            <ul className="flex flex-col gap-2">
                                                <li>
                                                    <p className="flex items-center gap-3"><span className="text-primary-blue"><VerifiedUserIcon sx={{ fontSize: "18px" }} /></span> {product.warranty} Année(s)</p>
                                                </li>
                                            </ul>
                                    </div>
                                    {/* <!-- Service details --> */}

                                    {/* <!-- border box --> */}
                                    <div className="w-full mt-6 rounded-sm border flex flex-col">
                                        <h1 className="px-6 py-4 border-b text-2xl font-medium">Description du produit</h1>
                                        <div className="p-6">
                                            <p className="text-sm">{product.description}</p>
                                        </div>
                                    </div>
                                    {/* <!-- border box --> */}

                                    {/* <!-- specifications border box --> */}
                                    <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                                        <h1 className="px-6 py-4 border-b text-2xl font-medium">Specifications</h1>
                                        <h1 className="px-6 py-3 text-lg">Génerale</h1>

                                        {/* <!-- specs list --> */}
                                        {product.specifications?.map((spec, i) => (
                                            <div className="px-6 py-2 flex items-center text-sm" key={i}>
                                                <p className="text-gray-500 w-3/12">{spec.title}</p>
                                                <p className="flex-1">{spec.description}</p>
                                            </div>
                                        ))}
                                        {/* <!-- specs list --> */}

                                    </div>
                                    {/* <!-- specifications border box --> */}

                                </div>

                            </div>
                            {/* <!-- product desc wrapper --> */}

                        </div>
                        {/* <!-- product image & description container --> */}

                        {/* Sliders */}
                        {/* <div className="flex flex-col gap-3 mt-6">
                            <ProductSlider title={"Similar Products"} tagline={"Based on the category"} />
                        </div> */}

                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;
