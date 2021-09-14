import React, { useState, useContext } from 'react';
import appContext from '../context/app/appContext';

const Formular = () => {

    const  [ gotPassword, setGotPassword ] = useState(false);

     //Context de la App
     const AppContext = useContext(appContext);
     const { addPassword, adddownload } = AppContext;


    return (  
        <div className="w-full mt-10">
            <div>
                <div className="flex flex-start">
                    <label className="text-lg text-gray-800">Attempts left: </label>
                </div>
                    <select
                        onChange={ e => adddownload( parseInt(e.target.value))} 
                        className=" appearance-none w-full mt-2 bg-white border border-gray-400 text-gray py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500">
                        <option defaultValue="----- Select-----">----- Select -----</option>
                        <option value="1">1 download</option>
                        <option value="5">5 downloads</option>
                        <option value="10">10 downloads</option>
                        <option value="15">15 downloads</option>
                        <option value="20">20 downloads</option>
                    </select>
            </div>

            <div className="mt-2">
                <div className="flex justify-between items-center">
                    <label className="text-lg text-gray-800 mr-2">Protect with Password:</label>
                    <input 
                        type="checkbox"
                        onChange={() => setGotPassword(!gotPassword) }

                    />
                </div>
                {
                    gotPassword ? (
                        <input 
                            type="password"
                            onChange={e => addPassword(e.target.value)}
                            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-gray py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
                        />
                    ): null
                }
                
            </div>
        </div>
    );
}
 
export default Formular;