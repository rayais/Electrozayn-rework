import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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
  const { productId } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [images, setImages] = useState([]);
  const [principalImage, setPrincipalImage] = useState(product?.product_image);
  const [thumbnailImages, setThumbnailImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const user_id = localStorage.getItem('id');
    dispatch(loadUser(user_id));
    
  }, [dispatch]);

  const fetchImages = () => {
    axios
      .get(`https://www.electrozayn.com/api/get_all_images/${productId}`)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          setThumbnailImages(response.data);
          if (
            !principalImage ||
            !response.data.some(
              (image) => image.product_image === principalImage
            )
          ) {
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  };
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

  const handleThumbnailClick = (image, index) => {
    setPrincipalImage(image);
    setImageIndex(index);
  };

  const handleArrowClick = (direction) => {
    if (thumbnailImages.length <= 1) {
      // No need to change the image if there's only one thumbnail.
      return;
    }
  
    const newIndex = (imageIndex + direction + thumbnailImages.length) % thumbnailImages.length;
    const newImage = thumbnailImages[newIndex].product_image;
    setPrincipalImage(newImage);
    setImageIndex(newIndex);
  };
  

  const handleDeleteImage = (id) => {
    axios
      .delete(`https://www.electrozayn.com/api/delete_images/${id}`)
      .then((response) => {
        fetchImages();
      })
      .catch((error) => {
        console.error('Error deleting image:', error);
      });
  };

  useEffect(() => {
    if (error) {
      console.error('Product Details Error:', error);
      // Handle the error, e.g., show an error message
    }
    if (reviewError) {
      console.error('Review Error:', reviewError);
      // Handle the review error, e.g., show an error message
    }
    if (success) {
      console.log('Review Submitted Successfully');
      // Handle the successful review submission, e.g., show a success message
    }
    dispatch(getProductDetails(productId));
    setPrincipalImage(product?.product_image);

    fetchImages();
  }, [dispatch, productId, error, reviewError, success]);

  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId));
    // Handle cart addition success, e.g., show a success message
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const buyNow = () => {
    addToCartHandler();
    navigate('/shipping');
  };

  const itemInCart = cartItems.some((item) => item.product === productId);
  const itemInWishlist = wishlistItems.some((i) => i.product === productId);

  return (
    <>
      {loading ? (
        // Show a loader or loading spinner
        <div>Loading...</div>
      ) : (
        <>
          <MetaData title={product?.product_name} />
          <Categories />
          <main className="mt-12 sm:mt-0">
            <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">
              <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                <div className="flex flex-col gap-3 m-3">
                  <div className="w-full h-80 pb-6 border relative">
                    <img
                      draggable="false"
                      className="w-full h-80 object-contain transform hover:scale-110 transition-transform duration-150 ease-out"
                      src={product?.product_image ||principalImage}
                      alt={product?.product_name}
                    />
                    <div
                      className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => handleArrowClick(-1)}
                    >
                      <KeyboardArrowLeftIcon fontSize="large" />
                    </div>
                    <div
                      className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer"
                      onClick={() => handleArrowClick(1)}
                    >
                      <KeyboardArrowRightIcon fontSize="large" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {thumbnailImages.map((thumbnail, index) => (
                      <div key={index} className="w-1/6 h-20 relative">
                        <img
                          src={thumbnail.product_image}
                          alt={`Thumbnail ${thumbnail.product_image}`}
                          onClick={() =>
                            handleThumbnailClick(
                              thumbnail.product_image,
                              index
                            )
                          }
                          className="w-full h-full cursor-pointer"
                        />
                        {user?.role === 'admin' ? (
                          <button
                            onClick={() => handleDeleteImage(thumbnail.id)}
                            className="text-red-500"
                          >
                            Delete
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex gap-3">
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
                      disabled={product?.stockquantity < 1}
                      className={`p-4 w-1/2 flex items-center justify-center gap-2 text-white rounded-sm shadow hover:shadow-lg ${
                        product?.stockquantity < 1
                          ? 'bg-red-600 cursor-not-allowed'
                          : 'bg-primary-orange'
                      }`}
                    >
                      <FlashOnIcon />
                      {product?.stockquantity < 1
                        ? 'RUPTURE DE STOCK'
                        : 'ACHETER MAINTENANT'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 py-2 px-3">
                <div className="flex flex-col gap-2 mb-4">
                  <h2 className="text-xl">{product?.product_name}</h2>
                  <hr />
                  <div className="flex items-baseline gap-2 text-xl font-medium">
                    <span className="text-gray-800">
                      {product?.Promo_price !== '0' &&
                      product?.Promo_price !== ''
                        ? product?.Promo_price
                        : product?.Origin_price}{' '}
                      TND{' '}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                    <p className="text-gray-500 font-medium">Référence</p>
                    <span>{product?.reference}</span>
                  </div>
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
                  <div className="w-full mt-6 rounded-sm border flex flex-col">
                    <h1 className="px-6 py-4 border-b text-2xl font-medium">
                      Description du produit
                    </h1>
                    <div className="p-6">
                      <p className="text-sm">{product?.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {user?.role === 'admin' && (
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
              </>
            )}
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetails;
