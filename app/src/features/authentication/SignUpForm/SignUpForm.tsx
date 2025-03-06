
// import { useRef, useState } from "react";
// import { User } from '../../../models/User';

// interface SignUpFormProps {
//     signUpNewUser(user: User): void;
//     switchToLogin: () => void; // New prop to switch back to login
// }

// export const SignUpForm: React.FC<SignUpFormProps> = ({ signUpNewUser, switchToLogin }) => {
//     const [error, setError] = useState<boolean>(false);
//     const emailRef = useRef<HTMLInputElement>(null);
//     const passwordRef = useRef<HTMLInputElement>(null);
//     const firstNameRef = useRef<HTMLInputElement>(null);
//     const lastNameRef = useRef<HTMLInputElement>(null);

//     const handleRegisterUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         if (firstNameRef.current && lastNameRef.current && emailRef.current && passwordRef.current) {
//             const userData = {
//                 type: "USER",
//                 firstName: firstNameRef.current.value,
//                 lastName: lastNameRef.current.value,
//                 email: emailRef.current.value,
//                 password: passwordRef.current.value,
//             };

//             try {
//                 const response = await fetch('http://localhost:8000/auth/register', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify(userData),
//                 });

//                 if (!response.ok) {
//                     throw new Error('Registration failed');
//                 }

//                 const data = await response.json();
//                 setError(false);
//                 signUpNewUser(data.user);
//                 alert("You've been registered! Please log in.");
//                 switchToLogin(); // Redirect to login
//             } catch (error) {
//                 setError(true);
//             }
//         }
//     };

//     return (
//         <div className="flex flex-col items-center ">
//             <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
//             {error && <p className="text-sm text-red-500 font-medium">Error</p>}
//             <form className="flex flex-col w-full gap-3">
//                 <input type="text" name="firstName" placeholder="First Name" required ref={firstNameRef} className="border p-2 rounded w-full" />
//                 <input type="text" name="lastName" placeholder="Last Name" required ref={lastNameRef} className="border p-2 rounded w-full" />
//                 <input type="email" name="email" placeholder="Email" required ref={emailRef} className="border p-2 rounded w-full" />
//                 <input type="password" name="password" placeholder="Password" required ref={passwordRef} className="border p-2 rounded w-full" />
//                 <button type="submit" onClick={handleRegisterUser} className="bg-blue-500 text-white p-2 rounded mt-3 hover:bg-blue-600">
//                     Sign Up
//                 </button>
//             </form>
//             <p className="mt-4 text-sm">
//                 Already have an account? <button onClick={switchToLogin} className="text-blue-500">Log in here</button>
//             </p>
//         </div>
//     );
// };

import { useRef, useState } from "react";

interface SignUpFormProps {
    switchToLogin: () => void; // Switch back to login screen
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ switchToLogin }) => {
    const [error, setError] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    const handleRegisterUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (firstNameRef.current && lastNameRef.current && emailRef.current && passwordRef.current) {
            const userData = {
                type: "USER",
                firstName: firstNameRef.current.value,
                lastName: lastNameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            };

            try {
                const response = await fetch('http://localhost:8000/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });

                if (!response.ok) {
                    throw new Error('Registration failed');
                }

                setError(false);
                alert("You've been registered! Please log in.");
                switchToLogin(); // Redirect to login
            } catch (error) {
                setError(true);
            }
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
            {error && <p className="text-sm text-red-500 font-medium">Error</p>}
            <input type="text" placeholder="First Name" required ref={firstNameRef} className="border p-2 rounded w-full mb-2" />
            <input type="text" placeholder="Last Name" required ref={lastNameRef} className="border p-2 rounded w-full mb-2" />
            <input type="email" placeholder="Email" required ref={emailRef} className="border p-2 rounded w-full mb-2" />
            <input type="password" placeholder="Password" required ref={passwordRef} className="border p-2 rounded w-full mb-2" />
            <button type="submit" onClick={handleRegisterUser} className="bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-600 w-full">
                Sign Up
            </button>
            <p className="mt-4 text-sm">
                Already have an account? <button onClick={switchToLogin} className="text-blue-500">Log in here</button>
            </p>
        </div>
    );
};
