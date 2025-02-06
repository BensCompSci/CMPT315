import { useState } from "react";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dob: "",
        reason: "student"
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <div className="flex flex-col items-center p-6 max-w-md mx-auto bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Create an Account</h2>
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-3">
                <input 
                    type="text" 
                    name="firstName" 
                    placeholder="First Name" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    required 
                    className="border p-2 rounded"
                />
                <input 
                    type="text" 
                    name="lastName" 
                    placeholder="Last Name" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    required 
                    className="border p-2 rounded"
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="border p-2 rounded"
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                    className="border p-2 rounded"
                />
                <label className="text-sm font-semibold">Date of Birth:</label>
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
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-3 hover:bg-blue-600">
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-sm">Already have an account? <a href="login.html" className="text-blue-500">Login</a></p>
        </div>
    );
};

export default SignupForm;
