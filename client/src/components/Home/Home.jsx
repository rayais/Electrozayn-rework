import { useEffect, useState } from 'react';
import Categories from '../Layouts/Categories';
import Banner from './Banner/Banner';
import DealSlider from './DealSlider/DealSlider';
import ProductSlider from './ProductSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import axios from 'axios'


const Home = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading, products} = useSelector((state) => state.products);

  

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  
  // const promoProd = products.filter((prod) => prod.Promo_price < prod.Origin_price);
  const TrotinetteProds = products && products.filter((prod) => prod.catigory === "accessoires trottinette et velo électrique" );

  return (
    <>
      <MetaData title="Electrozayn - Le monde des composants électronique et de l'électronique Tunisie"/>
      <Categories />
      <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
        <Banner />
        <DealSlider title={"TROTTINETTE ET VELO ELECTRIQUE"}  products={TrotinetteProds}/>
        {/* <DealSlider title={"PROMOTION"}  products={promoProd}/> */}
        {/* {!loading && <ProductSlider title={"PROMOTION"} products={products} tagline={"PRODUITS TENDANCE"} />} */}
        {/* <DealSlider title={"NOS LED"} products={ledProducts}/> */}
        <DealSlider title={"NOS PRODUITS"} products={products} />
        
      </main>
    </>
  );
};

export default Home;
