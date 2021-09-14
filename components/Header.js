import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header = () => {

    //Routing
    const router = useRouter();

    //Extraemos el usuario del Storage
    const AuthContext = useContext(authContext);
    const {authenticatedUser, authenticated, user, logout } = AuthContext;
      
    //Context de la app
    const AppContext = useContext(appContext);
    const { cleanState } = AppContext;

    useEffect(() => {
        authenticatedUser();
        // eslint-disable-line
    }, [])

    const redirect = () => {
        router.push('/');
        cleanState();
    }

    return ( 
        <header className="py-2  px-1 bg-gray-700 flex flex-col md:flex-row items-center justify-between">
                <Image
                    onClick={() => redirect()}
                    className="w-24 mb-8 md:mb-0 rounded-full cursor-pointer" 
                    src="/logo2.png"
                    alt="logo"
                    height={100}
                    width={100}
                />
            
            <div>
                {
                    user ? (
                        <div className=" flex ">
                        <p className="mr-2 text-white py-3"> Hello, {user.name} !!</p>
                        <button 
                        type="button" 
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-bold uppercase"
                        onClick={() => logout()}
                        >log out</button>
                        </div>
                    ) : (
                        <>
                        <Link href="/login">
                            <a className="bg-red-500 hover:bg-red-600  px-4 py-2 rounded-md text-white font-bold uppercase mr-2"> Log in</a>
                        </Link>
                        <Link href="/newaccount">
                            <a className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white font-bold uppercase"> Sing in</a>
                        </Link>
                        </>
                    )
                }
                
            </div>
        </header>
     );
}
 
export default Header;