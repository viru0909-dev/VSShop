import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authAPI } from '../../lib/api';
import useAuthStore from '../../store/authStore';

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            roles: ['CONSUMER'],
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            // Hardcode generic role if simple registration
            if (!data.roles) data.roles = ['CONSUMER'];

            const response = await authAPI.register(data);
            const { token, userId, email, name, roles } = response.data;

            setAuth({ userId, email, name, roles }, token);
            toast.success('Registration successful!');

            // Redirect based on selected role
            if (roles.includes('SELLER')) {
                navigate('/seller');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#f2f1eb]">
            {/* Left Side - Image Showcase */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden m-4 rounded-[2.5rem]">
                <img
                    src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=2400&q=100"
                    alt="Fashion Editorial"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
                <div className="absolute bottom-12 left-12 text-white max-w-lg">
                    <h2 className="text-5xl font-bold mb-6 leading-tight">Join the <br /> Revolution.</h2>
                    <p className="text-lg opacity-90">Experience personalized fashion shopping like never before.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 overflow-y-auto">
                <div className="max-w-md w-full">
                    <div className="mb-10">
                        <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">GET STARTED</span>
                        <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2">Create Account.</h1>
                        <p className="text-gray-500">Join Orderly and start your journey.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                className="w-full px-6 py-4 rounded-xl bg-white border-2 border-transparent focus:border-black focus:ring-0 transition-all font-medium placeholder:text-gray-400"
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                className="w-full px-6 py-4 rounded-xl bg-white border-2 border-transparent focus:border-black focus:ring-0 transition-all font-medium placeholder:text-gray-400"
                                placeholder="hello@example.com"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                })}
                                className="w-full px-6 py-4 rounded-xl bg-white border-2 border-transparent focus:border-black focus:ring-0 transition-all font-medium placeholder:text-gray-400"
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">I want to join as</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="cursor-pointer">
                                    <input type="radio" value="CONSUMER" {...register('roles.0')} className="peer sr-only" />
                                    <div className="p-4 rounded-xl bg-white border-2 border-transparent peer-checked:border-black peer-checked:bg-gray-50 transition-all text-center font-bold text-gray-600 peer-checked:text-black">
                                        Customer
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input type="radio" value="SELLER" {...register('roles.0')} className="peer sr-only" />
                                    <div className="p-4 rounded-xl bg-white border-2 border-transparent peer-checked:border-black peer-checked:bg-gray-50 transition-all text-center font-bold text-gray-600 peer-checked:text-black">
                                        Seller
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-black/10 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center mt-4"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-8 text-center pb-8">
                        <p className="text-gray-500">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-black font-bold hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
