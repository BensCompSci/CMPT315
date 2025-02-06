import React, { useRef, useState } from 'react';
import { User } from '../../../models/User';
import { Link } from 'react-router-dom';


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

        <div className="login-container flex flex-col items-center p-6 max-w-md mx-auto bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">
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
                    className="border p-2 rounded"
                    
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
                    className="border p-2 rounded"
                    
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
                {/* <Link to="/SignUpForm">
                    Create one!
                </Link> */}
                <a href="/SignUpForm" >Create one!</a>
                
            </p>
        </div>

        

    )
}

// import React, { useRef, useState } from 'react';
// import { User } from '../../../models/User';
// import { Link } from 'react-router-dom';

// interface LoginFormProps {
//     updateLoggedInUser(user: User): void;
// }

// export const LoginForm: React.FC<LoginFormProps> = ({ updateLoggedInUser }) => {
//     const [error, setError] = useState<boolean>(false);
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);

//     const handleLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         if (emailRef.current && passwordRef.current) {
//             try {
//                 const response = await fetch('http://localhost:8000/auth/login', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({
//                         email: emailRef.current.value,
//                         password: passwordRef.current.value,
//                     }),
//                 });

//                 if (!response.ok) throw new Error('Login failed');

//                 const data = await response.json();
//                 setError(false);
//                 updateLoggedInUser(data.user);
//             } catch (error) {
//                 setError(true);
//             }
//         }
//     };

//     return (
//         <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-white shadow-lg rounded-2xl">
//             <h2 className="text-2xl font-bold mb-4">Please Login</h2>
//             {error && (
//                 <p className="text-sm text-red-500 font-medium">
//                     Username or password incorrect
//                 </p>
//             )}
//             <div className="w-full mb-3">
//                 <input
//                     id="email"
//                     type="email"
//                     placeholder="Email"
//                     required
//                     ref={emailRef}
//                     className="border p-2 w-full rounded"
//                 />
//             </div>
//             <div className="w-full mb-3">
//                 <input
//                     id="password"
//                     type="password"
//                     placeholder="Password"
//                     required
//                     ref={passwordRef}
//                     className="border p-2 w-full rounded"
//                 />
//             </div>
//             <button
//                 type="submit"
//                 onClick={handleLoginUser}
//                 className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
//             >
//                 Login
//             </button>
//             <p className="mt-4 text-sm">
//                 Don’t have an account? <Link to="/SignUpForm" className="text-blue-500">Create one!</Link>
//             </p>
//         </div>
//     );
// };
