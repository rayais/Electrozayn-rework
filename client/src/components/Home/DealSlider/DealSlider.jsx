import Product from './Product';
import Slider from 'react-slick';
import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { Link } from 'react-router-dom';
import { offerProducts } from '../../../utils/constants';
import { getRandomProducts } from '../../../utils/functions';
import { useSelector } from 'react-redux';


export const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 3,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const DealSlider = ({ title, products }) => {
     // Check if products is defined before sorting
  const sortedProducts = products?.sort((a, b) => a.price - b.price) ?? [];

  // Get a random subset of products
  const randomProducts = getRandomProducts(sortedProducts, 12);
    
    return (
        <section className="bg-white w-full shadow overflow-hidden">
            {/* <!-- header --> */}
            <div className="flex px-6 py-3 justify-between items-center">
                <h1 className="text-xl font-medium">{title}</h1>
                <Link to="/products" className="bg-primary-blue text-xs font-medium text-white px-5 py-2.5 rounded-sm shadow-lg">VOIR PLUS</Link>
            </div>
            <hr />
            {/* <!-- header --> */}

                <Slider {...settings}>
                    {getRandomProducts(randomProducts, 12).map((item, i) => (
                        <Product {...item} key={i} />
                    ))}
                </Slider>

        </section>
    );
};

export default DealSlider;
