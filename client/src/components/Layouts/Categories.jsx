import mobiles from '../../assets/images/Categories/phone.png';
import fashion from '../../assets/images/Categories/fashion.png';
import electronics from '../../assets/images/Categories/electronics.png';
import home from '../../assets/images/Categories/home.png';
import travel from '../../assets/images/Categories/travel.png';
import appliances from '../../assets/images/Categories/appliances.png';
import furniture from '../../assets/images/Categories/furniture.png';
import beauty from '../../assets/images/Categories/beauty.png';
import grocery from '../../assets/images/Categories/grocery.png';
import { Link } from 'react-router-dom';

const catNav = [
    {
        name: "Led TV",
        icon: mobiles,
    },
    {
        name: "Adaptateur et alimentation",
        icon: fashion,
    },
    {
        name: "Chargeurs",
        icon: electronics,
    },
    {
        name: "Pile et batteries",
        icon: home,
    },
    {
        name: "Télécommande climatiseur",
        icon: travel,
    },
    {
        name: "Télécommande TV",
        icon: appliances,
    },
    {
        name: "Accessoires trottinette et vélo électrique",
        icon: furniture,
    },
]

const Categories = () => {
    return (
        <section className=" sm:block bg-white mt-10 min-w-full px-12 py-1 shadow overflow-hidden ">

            <div className="flex items-center text-center justify-center mt-4 font-bold text-green-600 text-sm uppercase">

                <h1>Les achats +100 TND bénéficient de la livraison gratuite.</h1>

            </div>
        </section>
    );
};

export default Categories;
