import { useEffect, useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import StarsIcon from '@mui/icons-material/Stars';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HelpIcon from '@mui/icons-material/Help';
import paymentMethods from '../../../assets/images/payment-methods.svg';
import { useLocation } from 'react-router-dom';

const footerLinks = [
  {
    title: "A propos",
    links: [
      {
        name: "Contatez-nous",
        redirect: "#",
      },
      {
        name: "Qui sommes-nous",
        redirect: "#",
      },
    ]
  },
  {
    title: "policy to delete or modify",
    links: [
      {
        name: "Return Policy",
        redirect: "/returnpolicy",
      },
      {
        name: "Terms Of Use",
        redirect: "/terms",
      },
      {
        name: "Security",
        redirect: "/paymentsecurity",
      },
      {
        name: "Privacy",
        redirect: "/privacypolicy",
      },
    ]
  },
  {
    title: "social",
    links: [
      {
        name: "Facebook",
        redirect: "#",
      },
      {
        name: "TikTok",
        redirect: "#",
      },
      {
        name: "YouTube",
        redirect: "#",
      }
    ]
  }
]

const Footer = () => {

  const location = useLocation();
  const [adminRoute, setAdminRoute] = useState(false);

  useEffect(() => {
    setAdminRoute(location.pathname.split("/", 2).includes("admin"))
  }, [location]);

  return (
    <>
      {!adminRoute && (
        <>
          <footer className="mt-20 w-full py-1 sm:py-4 px-4 sm:px-12 bg-primary-darkBlue text-white text-xs border-b border-gray-600 flex flex-col sm:flex-row overflow-hidden">
            <div className="w-full sm:w-7/12 flex flex-col sm:flex-row">

              {footerLinks.map((el, i) => (
                <div className="w-full sm:w-1/5 flex flex-col gap-2 my-3 sm:my-6 ml-5" key={i}>
                  <h2 className="text-primary-grey mb-2 uppercase">{el.title}</h2>
                  {el.links.map((item, i) => (
                    <a href={item.redirect} target="_blank" rel="noreferrer" className="hover:underline" key={i}>{item.name}</a>
                  ))}

                </div>
              ))}

            </div>

            <div className="border-gray-600 h-36 w-1 border-l mr-5 mt-6 hidden sm:block"></div>
            <div className="w-full sm:w-5/12 my-6 mx-5 sm:mx-0 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
              <div className="w-full sm:w-1/2">
                <h2 className="text-primary-grey">Mail Us:</h2>
                <p className="mt-2 leading-5">test@test.fr
                  
                </p>
              </div>

              <div className="w-full sm:w-1/2">
                <h2 className="text-primary-grey">Address:</h2>
                <p className="mt-2 leading-5">tunis
                  Telephone: <a className="text-primary-blue" href="tel:18002029898">xxxxx</a>
                </p>
              </div>
            </div>

          </footer>
          {/* <!-- footer ends --> */}

          
        </>
      )}
    </>
  )
};

export default Footer;
