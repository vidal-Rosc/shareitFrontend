import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import Alert from '../components/Alert';



const NewAccount = () => {
    //state
    const AuthContext = useContext(authContext);
    const {  message, registration } = AuthContext;


    //Validacion con formik
    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
        },

        validationSchema: Yup.object({
            name : Yup.string().required('The name is required'),
            email : Yup.string().email('invalid email address').required('The email is required'),
            password : Yup.string().min(6, 'Password must have at least 6 characters')
                            .required('The password is required')
        }),

        onSubmit: values => {
            registration(values);
        }
  });



  return ( 
      <Layout>
          <div className="md:w-4/5 xl:w-3/5 mx-auto  mb-32">
            <h2 className="text-3xl font-sans font-bold text-gray-600 text-center my-4">Let`&#39;`s share it buddy</h2>
            {message && <Alert />}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white rounded shadow-md px-8 pt-6 pb-8  mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-black text-sm font-bold mb-2"
                                   htmlFor="name"
                            >Name:</label>
                            <input
                                type="text"
                                className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 
                                            leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                placeholder="whats your name?"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"></p>
                                    <p>{formik.errors.name}</p>
                                </div>
                            ) : null }
                        </div>

                        <div className="mb-4">
                            <label className="block text-black text-sm font-bold mb-2"
                                   htmlFor="email"
                            >Email:</label>
                            <input
                                type="email"
                                className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 
                                            leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                placeholder="Email..."
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"></p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null }
                        </div>

                        <div className="mb-4">
                            <label className="block text-black text-sm font-bold mb-2"
                                   htmlFor="password"
                            >Password:</label>
                            <input
                                type="password"
                                className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 
                                            leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                placeholder="Password..."
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                             {formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"></p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null }
                        </div>
                        <input 
                            type="submit"
                            className="bg-red-400 hover:bg-red-500  px-4 py-2  rounded-md text-white font-bold uppercase ml-36"
                            value="Create Account"
                        />
                    </form>
                </div>
            </div>
          </div>
      </Layout>
   );
}
 
export default NewAccount;