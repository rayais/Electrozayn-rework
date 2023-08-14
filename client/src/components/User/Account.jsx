import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';
import Categories from '../Layouts/Categories';

const Account = () => {

    const navigate = useNavigate();

    const { loading, isAuthenticated, user } = useSelector(state => state.user)

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login")
        }
        
    }, [isAuthenticated, navigate]);


    return (
        <>
            <MetaData title="Electrozayn - Le monde des composants électronique et de l'électronique Tunisie" />

            {loading ? <Loader /> :
                <>
                    <Categories />
                    <main className="w-full mt-12 sm:mt-0">

                        {/* <!-- row --> */}
                        <div className="flex gap-3.5 sm:w-11/12 sm:mt-4 m-auto mb-7">

                            <Sidebar activeTab={"profile"} />

                            {/* <!-- details column --> */}
                            <div className="flex-1 overflow-hidden shadow bg-white">
                                {/* <!-- edit info container --> */}
                                <div className="flex flex-col gap-12 m-4 sm:mx-8 sm:my-6">
                                    {/* <!-- personal info --> */}
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-lg">Information </span>

                                        <div className="flex flex-col sm:flex-row items-center gap-3" id="personalInputs">
                                            <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                                                <label className="text-xs text-gray-500">Nom</label>
                                                <label className="text-sm outline-none border-none cursor-not-allowed text-gray-500" aria-disabled>{user?.session[0].FirstName}</label>
                                            </div>
                                            {/* <div className="flex flex-col gap-0.5 w-64 px-3 py-1.5 rounded-sm border inputs cursor-not-allowed bg-gray-100 focus-within:border-primary-blue">
                                                <label className="text-xs text-gray-500">Prénom</label>
                                                <input type="text" value={getLastName()} className="text-sm outline-none border-none cursor-not-allowed text-gray-500" disabled />
                                            </div> */}
                                        </div>

                                    </div>
                                    {/* <!-- personal info --> */}

                                    {/* <!-- email address info --> */}
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-lg">Adresse Email
                                        </span>

                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                                                <label className="text-xs text-gray-500">Addresse Email</label>
                                                <label type="email"  className="text-sm outline-none border-none cursor-not-allowed text-gray-500" >{user?.session[0].Email}</label>
                                            </div>
                                        </div>

                                    </div>
                                    {/* <!-- email address info --> */}

                                    {/* <!-- mobile number info --> */}
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-lg">Numéro de téléphone
                                        </span>

                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                                                <label className="text-xs text-gray-500">Numéro de téléphone</label>
                                                <label type='number'  className="text-sm outline-none border-none cursor-not-allowed text-gray-500" >{user?.session[0].PhoneNumber}</label>
                                            </div>
                                        </div>


                                    </div>
                                    {/* <!-- mobile number info --> */}
                                    {/* <!-- mobile number info --> */}
                                    <div className="flex flex-col gap-5 items-start">
                                        <span className="font-medium text-lg">Addresse
                                        </span>

                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col gap-0.5 sm:w-64 px-3 py-1.5 rounded-sm border bg-gray-100 cursor-not-allowed focus-within:border-primary-blue">
                                                <label className="text-xs text-gray-500">Adresse</label>
                                                <label type='number'  className="text-sm outline-none border-none cursor-not-allowed text-gray-500" >{user?.session[0].Address}</label>
                                            </div>
                                        </div>


                                    </div>
                                    {/* <!-- mobile number info --> */}

                                </div>
                                {/* <!-- edit info container --> */}

                                
                            </div>
                            {/* <!-- details column --> */}
                        </div>
                    </main>
                </>
            }
        </>
    );
};

export default Account;
