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

        <div className="login-container" >
            <h2 >
                Please Login
            </h2>
            {error && (
                <p className="text-sm text-red-500 font-medium">
                    Username or password incorrect
                </p>
            )}
            <div >
                {/* <label htmlFor="email" >
                    Email
                </label> */}
                <input
                    id="email"
                    type="email"
                    placeholder="email"
                    required
                    ref={emailRef}
                    
                />
            </div>
            <div >
                {/* <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Password
                </label> */}
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    required
                    ref={passwordRef}
                    
                />
            </div>
            <button
                type="submit"
               
                onClick={handleLoginUser}
            >
                Login
            </button>
            <p >
                Don’t have an account?{" "}
                <span>
                    Create one!
                </span>
            </p>
        </div>

    )
}

