import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import {
  clearErrors,
  getProductDetails,
  getSimilarProducts,
  newReview,
} from '../../actions/productAction';
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
import {
  addToWishlist,
  removeFromWishlist,
} from '../../actions/wishlistAction';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';
import Categories from '../Layouts/Categories';
import axios from 'axios';
import { loadUser } from '../../actions/userAction';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [principalImage, setPrincipalImage] = useState();
  const { productId } = useParams();

  // reviews toggle
  const [open, setOpen] = useState(false);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
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

  const itemInWishlist = wishlistItems.some((i) => i.product === productId);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId));
    enqueueSnackbar('Produit ajouté au panier avec succès', {
      variant: 'success',
    });
  };

  const handleDialogClose = () => {
    setOpen(!open);
  };

  const itemInCart = cartItems.some((item) => item.product === productId);

  const goToCart = () => {
    navigate('/cart');
  };

  const buyNow = () => {
    addToCartHandler();
    navigate('/shipping');
  };
  const fetchImages = () => {
    axios
      .get(`https://www.electrozayn.com/api/get_all_images/${productId}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setThumbnailImages(response.data);
          // Check if the principal image is empty or not set
          if (!principalImage || !response.data.some(image => image.product_image === principalImage)) {
            // If empty or not found, set the principal image to the product.product_image
            setPrincipalImage(product?.product_image);
          }
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching images:', error);
      });
  };
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (reviewError) {
      enqueueSnackbar(reviewError, { variant: 'error' });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar('Review Submitted Successfully', { variant: 'success' });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(productId));

    fetchImages()
  }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

  const addImages = async () => {
    const formData = new FormData();
    formData.append('file', images);
    formData.append('upload_preset', 'ml_default');
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dycjej355/upload',
        formData
      );

      await axios.post(
        `https://www.electrozayn.com/api/add_thumbnailes/images/${productId}`,
        {
          product_image: response.data.secure_url,
        }
      ).then((res)=>{
        fetchImages()
      })

      // After successfully adding the image, you can update the thumbnailImages state
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleThumbnailClick = (image) => {
    setPrincipalImage(image);
  };

  const handleDeleteImage = (id) => {
    axios
      .delete(`https://www.electrozayn.com/api/delete_images/${id}`)
      .then((response) => {
        // Handle success (e.g., update thumbnailImages state)
       
        fetchImages();

        // If the deleted image was the principal image, set a new principal image if available
       
      })
      .catch((error) => {
        // Handle error
        console.error('Error deleting image:', error);
      });
  };
  const { user } = useSelector(state => state.user)

  useEffect(() => {
    const user_id=localStorage.getItem('id')
     dispatch(loadUser(user_id))
      
  }, [dispatch]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product?.product_name} />
          <Categories />
          <main className="mt-12 sm:mt-0">
            {/* <!-- product image & description container --> */}
            <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">
              {/* <!-- image wrapper --> */}
              <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                {/* <!-- imgbox --> */}
                <div className="flex flex-col gap-3 m-3">
                  <div className="w-full h-full pb-6 border relative">
                    <img
                      draggable="false"
                      className="w-full h-80 object-contain transform hover:scale-110 transition-transform duration-150 ease-out"
                      src={principalImage || product?.product_image}
                      alt={product?.product_name}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {thumbnailImages.map((thumbnail, index) => (
                        <>
                      <div key={index} className="w-1/6 h-20 relative">
                        <img
                          src={thumbnail.product_image}
                          alt={`Thumbnail ${thumbnail.product_image}`}
                          onClick={() => handleThumbnailClick(thumbnail?.product_image)}
                          className="w-full h-full cursor-pointer"
                        />
                        
                      </div>
                     {user?.role==="admin"? <button
                          onClick={() => handleDeleteImage(thumbnail.id)} // Implement this function
                          className="text-red-500"
                        >
                          Delete
                        </button>:null}
                      </>
                    ))}
                  </div>
                  <div className="w-full flex gap-3">
                    {/* <!-- add to cart btn --> */}
                    {product?.stockquantity > 0 && (
                      <button
                        onClick={itemInCart ? goToCart : addToCartHandler}
                        className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-yellow rounded-sm shadow hover:shadow-lg"
                      >
                        <ShoppingCartIcon />
                        {itemInCart ? 'PANIER' : 'AJOUTER AU PANIER'}
                      </button>
                    )}
                    <button
                      onClick={buyNow}
                      disabled={product?.stockquantity < 1 ? true : false}
                      className={
                        product?.stockquantity < 1
                          ? 'p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg'
                          : 'p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg'
                      }
                    >
                      <FlashOnIcon />
                      {product?.stockquantity < 1
                        ? 'OUT OF STOCK'
                        : 'COMMANDER'}
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
                  <h2 className="text-xl">{product?.product_name}</h2>
                  <hr />
                  {/* <!-- price desc --> */}
                  <div className="flex items-baseline gap-2 text-xl font-medium">
                    <span className="text-gray-800">
                      {product?.Promo_price !== '0' &&
                      product?.Promo_price !== ''
                        ? product?.Promo_price
                        : product?.Origin_price}{' '}
                      TND{' '}
                    </span>
                  </div>
                  {/* <!-- price desc --> */}

                  {/* <!-- description details --> */}
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                    <p className="text-gray-500 font-medium">Réference</p>
                    <span>{product?.reference}</span>
                  </div>
                  {/* <!-- description details --> */}

                  {/* <!-- Service details --> */}
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                    <p className="text-gray-500 font-medium">Catégorie</p>
                    <ul className="flex flex-col gap-2">
                      <li>
                        <p className="flex items-center gap-3">
                          <span className="text-primary-blue">
                            <VerifiedUserIcon sx={{ fontSize: '18px' }} />
                          </span>{' '}
                          {product?.catigory}
                        </p>
                      </li>
                    </ul>
                  </div>
                  {/* <!-- Service details --> */}

                  {/* <!-- border box --> */}
                  <div className="w-full mt-6 rounded-sm border flex flex-col">
                    <h1 className="px-6 py-4 border-b text-2xl font-medium">
                      Description du produit
                    </h1>
                    <div className="p-6">
                      <p className="text-sm">{product?.description}</p>
                    </div>
                  </div>
                  {/* <!-- border box --> */}
                </div>
              </div>
              {/* <!-- product desc wrapper --> */}
            </div>
            {/* <!-- product image & description container --> */}

            {/* Sliders */}
            {/* <div className="flex flex-col gap-3 mt-6">
                            <ProductSlider prod ={similarProds} title={"Similar Products"} tagline={"Based on the category"} />
                        </div> */}
            {user?.role==="admin"?
            <>
                <button
              onClick={addImages}
              className="bg-primary-green px-6 py-2 text-white font-medium rounded-sm shadow hover:shadow-lg uppercase"
            >
              Ajouter image
            </button>

            <input
              type="file"
              onChange={(e) => setImages(e.target.files[0])}
            />
            </>:null
            }
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetails;
