import { useEffect, useState } from 'react';
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
  

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  
  const ledProd = products && products.filter((prod) => prod.catigory.includes('led'));
  const TrotinetteProds = products && products.filter((prod) => prod.catigory === "Accessoires trottinette et vélo électrique" );
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 10);
  
  // Filter products created within the last 10 days
  const newProducts = products.filter((prod) => {
    const productDate = new Date(prod.created_at);
    return productDate >= currentDate;
  });
  return (
    <>
     <MetaData title="Electrozayn - Le monde des composants électronique et de l'électronique Tunisie" />
      <Categories />
      <main className="flex flex-col gap-3 px-2 mt-5 sm:mt-2">
        <Banner />
        <DealSlider title={"nouveaux produits".toUpperCase()} products={newProducts}/>
        <DealSlider title={"TROTTINETTE ET VELO ELECTRIQUE"}  products={TrotinetteProds}/>
        <DealSlider title={"PROMOTION"}  products={ledProd}/>
        {/* <DealSlider title={"NOS LED"} products={ledProducts}/> */}
        <DealSlider title={"NOS PRODUITS"} products={products} />
       
      </main>
    </>
  );
};

export default Home;
