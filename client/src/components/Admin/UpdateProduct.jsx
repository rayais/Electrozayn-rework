import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { REMOVE_PRODUCT_DETAILS, UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { clearErrors, getProductDetails, updateProduct } from '../../actions/productAction';
import ImageIcon from '@mui/icons-material/Image';
import BackdropLoader from '../Layouts/BackdropLoader';
import { categories } from '../../utils/constants';
import MetaData from '../Layouts/MetaData';
import axios from 'axios';

const UpdateProduct = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const params = useParams();

    const {  product, error } = useSelector((state) => state.productDetails);
    const { loading: updateLoading, isUpdated, error: updateError } = useSelector((state) => state.product);


    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stockquantity, setStockquantity] = useState(0);
    const [oldPrice, setOldPrice] = useState(0);
    const [reference, setReference] = useState('');
    const [availability, setAvailability] = useState('');
    const [catigory, setCatigory] = useState('');
    const [productImage, setProductImage] = useState([]);

    console.log(productImage)

    useEffect(() => {
        if (product) {
            setProductName(product.product_name);
            setDescription(product.description);
            setPrice(product.Origin_price);
            setStockquantity(product.stockquantity);
            setOldPrice(product.Promo_price);
            setReference(product.reference);
            setAvailability(product.availibility);
            setCatigory(product.catigory);
            setProductImage(product.product_image)
        }
    }, [product]);
    // Use useEffect to update productData whenever the product state changes
   


    const newProductSubmitHandler = async (e) => {
        const formData = new FormData();
    formData.append("file", productImage);
    formData.append("upload_preset", "ml_default");
    if (productImage.name) {
      await axios
        .post("https://api.cloudinary.com/v1_1/dycjej355/upload", formData).then((res)=>{
           dispatch(updateProduct(params.id,{
            product_name: productName,
            description: description,
            Origin_price: price,
            stockquantity: stockquantity,
            Promo_price: oldPrice,
            reference: reference,
            product_image: res.data.url,
            availibility: availability,
            catigory: catigory,
           }))
           navigate('/admin/products')
        })
    } else if (!productImage.name) {
      dispatch(updateProduct(params.id,{
        product_name: productName,
        description: description,
        Origin_price: price,
        stockquantity: stockquantity,
        Promo_price: oldPrice,
        reference: reference,
        product_image: product.product_image,
        availibility: availability,
        catigory: catigory,
       }))
       navigate('/admin/products')
    }
    }

    const productId = params.id;

    useEffect(() => {

        if (productId) {
            dispatch(getProductDetails(productId));
            
        } 
        
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("Product Updated Successfully", { variant: "success" });
            dispatch({ type: UPDATE_PRODUCT_RESET });
            dispatch({ type: REMOVE_PRODUCT_DETAILS });
            navigate('/admin/products');
        }
    }, [dispatch, error, updateError, isUpdated, productId, navigate, enqueueSnackbar]);

    

    return (
        <>
            <MetaData title="Electrozayn - Le monde des composants électronique et de l'électronique Tunisie" />

            {/* {loading && <BackdropLoader />} */}
            {updateLoading && <BackdropLoader />}
            <form onSubmit={newProductSubmitHandler} encType="multipart/form-data" className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4" id="mainform">

                <div className="flex flex-col gap-3 m-2 sm:w-1/2">
                <TextField
                type='text'
    label="Nom"
    variant="outlined"
    size="small"
    name="productName"
    value={productName}
    onChange={(e) => setProductName(e.target.value)}
/>

<TextField
type='text'
    label="Description"
    multiline
    rows={3}
    name="description"
    variant="outlined"
    size="small"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
/>

<div className="flex justify-between">
    <TextField
        
        label="Prix"
        type="number"
        variant="outlined"
        size="small"
        InputProps={{
            inputProps: {
                min: 0
            }
        }}
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
    />
    <TextField
        label="Prix Promo"
        type="number"
        variant="outlined"
        size="small"
        InputProps={{
            inputProps: {
                min: 0
            }
        }}
        name="oldPrice"
        value={oldPrice}
        onChange={(e) => setOldPrice(e.target.value)}
    />
</div>

<div className="flex justify-between gap-4">
    <TextField
        type='text'
        label="Category"
        select
        fullWidth
        variant="outlined"
        size="small"
        name="category"
        value={catigory}
        onChange={(e) => setCatigory(e.target.value)}
    >
        {categories.map((el, i) => (
            <MenuItem value={el} key={i}>
                {el}
            </MenuItem>
        ))}
    </TextField>
    <TextField
        label="Stock"
        type="number"
        variant="outlined"
        size="small"
        InputProps={{
            inputProps: {
                min: 0
            }
        }}
        name="stockquantity"
        value={stockquantity}
        onChange={(e) => setstockquantity(e.target.value)}
    />
</div>


                </div>

                <div className="flex flex-col gap-2 m-2 sm:w-1/2">
                    

                    <h2 className="font-medium">Product Images</h2>
                    <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                            <img draggable="false" src={product.product_image} alt="Product" className="w-full h-full object-contain" />
                        
                        {/* {imagesPreview.map((image, i) => (
                            <img draggable="false" src={image} alt="Product" key={i} className="w-full h-full object-contain" />
                        ))} */}
                    </div>
                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
                    <TextField
                        type="file"
                        // label="Product Image"
                        // value={productImage}
                        onChange={(e) => setProductImage(e.target.files[0])}
                        />
                        {console.log(productImage)}
                        Choose Files
                    </label>

                    <div className="flex justify-end">
                        <input form="mainform" type="submit" className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer" value="Update" />
                    </div>

                </div>

            </form>
        </>
    );
};

export default UpdateProduct;

