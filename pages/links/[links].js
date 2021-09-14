import React, { useState, useContext } from 'react';
import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';
import appContext from '../../context/app/appContext';
import Alert from '../../components/Alert';

export async function  getServerSideProps({params}) {
    const { links } = params;

    console.log(links);
    const result = await  axiosClient.get(`/api/links/${links}`);
    //console.log(result);

    return {
        props: {
            links: result.data
        }
    }
}

//Permite generar diferentes url de manera dinamica
export async function  getServerSidePaths() {
    const links = await  axiosClient.get('/api/links');
    console.log(links.data)

    return {
        paths: links.data.allLinks.map(link => ({
            params: {links: link.url}
        })),
        fallback: false
    }

}

const Links = ({links}) => {

    //Context de la App
    const AppContext = useContext(appContext);
    const { showAlert, file_message } = AppContext;

    const [gotPassword, setGotPassword] = useState(links.password);

    const [password, setPassword] = useState('');
    //console.log(gotPassword);
    //console.log(links)

    const confirmPassword = async e => {
        e.preventDefault();

        const data = {
            password
        }
        try {
            const result =  await axiosClient.post(`/api/links/${links.link}`, data);
            console.log('verificando password');
            setGotPassword(result.data.password);
        } catch (error) {
            showAlert(error.response.data.msg);
        }
        
    }
    return (
        <Layout>
        {
            gotPassword ? (
                <>
                    <p className="text-center ">This link is protected with a password!!</p>
                    { file_message && <Alert />}
                    <div className="container mx-auto">
                        <div className=" flex justify-center mt-5">
                        <div className="w-full max-w-lg">
                            <form
                                onSubmit={ e => confirmPassword(e)}
                                className="bg-white rounded shadow-md px-8 pt-6 pb-8  mt-14 mb-4"
                            >
                                <div className="mb-4 mt-5">
                                    <label 
                                        className="block text-black text-sm font-bold mb-2"
                                        htmlFor="password"
                                    >Password:</label>
                                    <input
                                        type="password"
                                        className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 
                                            leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        placeholder="type the correct password...."
                                        value={password}
                                        onChange={ e => setPassword(e.target.value)}
                                    />
                                </div>
                                <input 
                                    type="submit"
                                    className="bg-red-500 hover:bg-red-600  px-4 py-2  rounded-md text-white font-bold uppercase ml-40 mt-4"
                                    value="Confirm"
                                />
                            </form>
                        </div>
                        </div>
                    </div>

                </>
            ): (
                <>
                <h1 className="text-4xl text-center text-gray-700">Download your file:</h1>
                    <div className="flex items-center justify-center mt-14">
                        <div className=" pt-24 mt-24">
                            <a 
                                href={`${process.env.backendURL}/api/files/${links.file}`}
                                className="bg-red-500 text-center text-white cursor-pointer pl-3 pr-3 px4 py-2 mt-5 rounded uppercase font-bold"
                                download
                            >Here</a>
                        </div>
                        
                    </div>
                </>
            )
        }
            
        </Layout>
    )
}
export default Links;