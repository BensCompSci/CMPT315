import { useRef, useState } from "react";
import { User } from '../../../models/User';


interface SignUpFormProps {
    signUpNewUser(user:User): void
}

export const SignUpForm:React.FC<SignUpFormProps> = ({signUpNewUser}) => {
    
    const [error, setError] = useState<boolean>(false);
    
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    
    // const [formData, setFormData] = useState({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     password: "",
    //     // dob: "",
    //     // reason: "student"
    // });

    const handleRegisterUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
                if (
                    firstNameRef && firstNameRef.current &&
                    lastNameRef && lastNameRef.current &&
                    emailRef && emailRef.current &&
                    passwordRef && passwordRef.current
                ) { 
                    const userData = {
                        type: "USER",  // Default user type
                        firstName: firstNameRef.current.value,
                        lastName: lastNameRef.current.value,
                        email: emailRef.current.value,
                        password: passwordRef.current.value,
                };

                console.log("User Data:", userData);

                    try {
                        const response = await fetch('http://localhost:8000/auth/register', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(userData),
                        });
            
                        if (!response.ok) {
                            throw new Error('Registration failed');
                        }
            
                        const data = await response.json();
                        setError(false);
                        // Optionally, log the user in immediately after registering
                        signUpNewUser(data.user);
                    } catch (error) {
                        console.error("Error:", error);
                        setError(true);
                    }
                }
            };
    
                  




    // const handleChange = (e: { target: { name: any; value: any; }; }) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = (e: { preventDefault: () => void; }) => {
    //     e.preventDefault();
    //     console.log("Form submitted:", formData);
    // };

    return (
        <div className="mt-10 flex flex-col items-center p-6 max-w-md mx-auto bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
            {error && (
                <p className="text-sm text-red-500 font-medium">
                    Error
                </p>
            )}
            <form className="flex flex-col w-full gap-3">
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    // value={formData.firstName} 
                    // onChange={handleChange} 
                    required 
                    ref={firstNameRef}
                    className="border p-2 rounded"
                />
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    // value={formData.lastName} 
                    // onChange={handleChange} 
                    required 
                    ref={lastNameRef}
                    className="border p-2 rounded"
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    // value={formData.email} 
                    // onChange={handleChange} 
                    required 
                    ref={emailRef}
                    className="border p-2 rounded"
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    // value={formData.password} 
                    // onChange={handleChange} 
                    required 
                    ref={passwordRef}
                    className="border p-2 rounded"
                />
                {/* <label className="text-sm font-semibold">Date of Birth:</label>
                <input 
                    type="date" 
                    name="dob" 
                    value={formData.dob} 
                    onChange={handleChange} 
                    required 
                    className="border p-2 rounded"
                />
                <label className="text-sm font-semibold">Reason for Creating a Profile:</label>
                <select 
                    name="reason" 
                    value={formData.reason} 
                    onChange={handleChange} 
                    required 
                    className="border p-2 rounded"
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="personal_development">Personal Development</option>
                </select> */}
                <button type="submit" 
                        onClick={handleRegisterUser}
                        className="bg-blue-500 text-white p-2 rounded mt-3 hover:bg-blue-600">
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-sm">Already have an account? <a href="login.html" className="text-blue-500">Login</a></p>
        </div>
    );
}
