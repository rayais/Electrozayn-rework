import { useEffect } from 'react';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import ProductSlider from './ProductSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';


const Home = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading, products} = useSelector((state) => state.products);

  const promoProd = products.filter((prod) => prod.category === "PROMOTION");
  const ledProducts = products.filter((prod) => prod.category === "TV" );

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  
  

  return (
    <>
      <MetaData title="Electrozayn - Le monde des composants électronique et de l'électronique Tunisie"/>
      <Categories />
      <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
        <Banner />
        <DealSlider title={"PROMOTION"}  products={promoProd}/>
        {/* {!loading && <ProductSlider title={"PROMOTION"} products={promoProd} tagline={"PRODUITS TENDANCE"} />} */}
        <DealSlider title={"NOS LED"} products={ledProducts}/>
        <DealSlider title={"NOS PRODUITS"} products={products} />
      </main>
    </>
  );
};

export default Home;
