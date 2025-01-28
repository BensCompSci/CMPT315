import React, { useRef, useState } from 'react';
import { User } from '../../../models/User';


interface LoginFormProps {
    updateLoggedInUser(user:User): void
}

export const LoginForm:React.FC<LoginFormProps> = ({updateLoggedInUser}) => {

    const [error, setError] = useState<boolean>(false);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    //USING FETCH (MORE)//Buggy still
    const handleLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (emailRef && emailRef.current && passwordRef && passwordRef.current) {
            try {
                const response = await fetch('http://localhost:8000/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Login failed');
                }

                const data = await response.json();
                setError(false);
                //confirm this works as expected
                updateLoggedInUser(data.user);
            } catch (error) {
                setError(true);
            }
        }
    };

    // SAME THING BUT WITH AXIOS
    // import axios from'axios';
    //  const handleLoginUser = async (e:React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault();
    //     if(emailRef && emailRef.current && passwordRef && passwordRef.current){
    //         try{
    //             const req = await axios.post('http://localhost:8000/auth/login', {
    //                 email: emailRef.current.value,
    //                 password: passwordRef.current.value
    //             });
    //             setError(false);
    //             console.log(req.data.user);

    //         }catch(e){
    //             setError(true);
    //         }
    //     }
    //  }


    return (

        <form className="space-y-4 md:space-y-6 w-full max-w-sm bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                Please Login
            </h2>
            {error && (
                <p className="text-sm text-red-500 font-medium">
                    Username or password incorrect
                </p>
            )}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="email"
                    required
                    ref={emailRef}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    required
                    ref={passwordRef}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleLoginUser}
            >
                Login
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account?{" "}
                <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Create one!
                </span>
            </p>
        </form>

    )
}