import { useContext, useState } from 'react';
import { GeneralContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { loginStructure, loginSchema } from "../utils";
import { handleChange } from "../validation/formValidation";
import { jwtDecode } from 'jwt-decode';


export default function Login() {
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { user, setUser } = useContext(GeneralContext);

    const handleLoginChange = (ev) => {
        handleChange(ev, formData, setFormData, errors, setErrors, loginSchema, setIsFormValid)
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        //setLoader(true)
        try {
            const res = await fetch(`http://localhost:5000/login`, {
                credentials: "include",
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error(errorText);
                throw new Error(errorText);
            }

            const data = await res.json();
            const token = data.token;
            localStorage.token = token;
            // const decodedToken = jwtDecode(token);
            //tokenUserId *****
            // const roleTypeToken = decodedToken.roleType;
            setUser(data);
            console.log(data)
            navigate('/');

        } catch (error) {
            console.error("Username or password is incorrect", error);
        }
        //setLoader(false)
    };

    return (
        <div className="w-full mx-auto text-center text mt-0 flex flex-col justify-center items-center text-6xl py-10">
            <h1>Login</h1>
            <form className="w-[90vw] mx-auto text-center flex flex-col justify-center items-center gap-12 text-2xl py-10"
                onSubmit={handleSubmit}>
                {
                    loginStructure.map((field) => (
                        <label key={field.name} className="block text-left w-full max-w-md">
                            {field.label}
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type={field.type}
                                name={field.name}
                                placeholder={field.required ? `Please Enter ${field.label}` : 'Optional'}
                                required={field.required}
                                onChange={handleLoginChange}
                                value={formData[field.name]}
                            />
                            {errors[field.name] && (
                                <span className="text-red-500">{errors[field.name]}</span>
                            )}
                        </label>
                    ))
                }
                <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isFormValid}
                >
                    Login
                </button>
            </form>

            <button className="text-lg text-black hover:text-blue-500 hover:text-xl cursor-pointer transition-all duration-300" onClick={() => navigate('/signup')}>
                Not Signed up yet? Signup
            </button>
        </div>
    );
}
