import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import Dropzone from '../components/Dropzone';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Link from 'next/link';
import Alert from '../components/Alert';


const Index = () => {
    //extraemos el usuario
    const AuthContext = useContext(authContext);
    const { authenticatedUser } = AuthContext;

    //Extraemos el mensaje de error de files
    const AppContext = useContext(appContext);
    const  { file_message, url } = AppContext;


    useEffect(() => {
        const token = localStorage.getItem('shareit-token',)
        if(token){
            authenticatedUser();
        }
        // eslint-disable-line
    }, [])

    return ( 
      <Layout>
          <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
           {
               url ? (
                <>
                    <p className=" text-center text-2xl mt-10"> 
                        <span className="font-bold text-red-700 text-3xl"> Your URL = <span className="font-bold text-gray-700 ">{`${process.env.frontendURL}/links/${url}`}</span> </span> 
                    </p>
                    <div className="text-center mt-36">
                        <button 
                            type="submit"
                            className="bg-red-500 hover:bg-red-600 text-white text-center px-4 py-2 rounded-md font-bold uppercase"
                            onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}links/${url}`)}
                        >Copy Link</button>
                    </div>
                    
                </>

               ): (
                <>
                { file_message && <Alert />}
                    <div className=" lg:flex md:shadow-lg p-5 bg-white rounded-lg py-13">
                    <Dropzone />
                        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                            <h2 className="text-4xl font-sans font-bold text-gray-700 my-3">Share your files easily and privately</h2>
                            <p className="text-lg leading-loose">
                                    <span className=" text-justify text-gray-600"> <span className="text-red-500 font-bold">Share it </span>allows you to share encrypted files and once transferred, it removes them to avoid leaving your data online. You see? <span className="text-green-400 font-bold"> Easy come easy go.</span></span>
                            </p>
                            <Link href="/newaccount">
                                <a className="text-red-400 font-bold text-lg hover:text-red-500" >Do you want more? create an account</a>
                            </Link>
                        </div>
                    </div>
                </>
               )
           }

          </div>
      </Layout>
   );
}
 
export default Index;
