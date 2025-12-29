import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authAPI } from '../../lib/api';
import useAuthStore from '../../store/authStore';

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await authAPI.login(data);
            const { token, userId, email, name, roles } = response.data;

            setAuth({ userId, email, name, roles }, token);
            toast.success('Login successful!');

            // Redirect based on role
            if (roles.includes('ADMIN')) {
                navigate('/admin');
            } else if (roles.includes('SELLER')) {
                navigate('/seller');
            } else if (roles.includes('DELIVERY_BOY')) {
                navigate('/delivery');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#f2f1eb]">
            {/* Left Side - Image Showcase */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden m-4 rounded-[2.5rem]">
                <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2400&q=100"
                    alt="Fashion Editorial"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
                <div className="absolute bottom-12 left-12 text-white max-w-lg">
                    <h2 className="text-5xl font-bold mb-6 leading-tight">Elevate Your <br /> Everyday Style.</h2>
                    <p className="text-lg opacity-90">Join the community of trendsetters and discover fashion that speaks to you.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
                <div className="max-w-md w-full">
                    <div className="mb-10">
                        <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">WELCOME BACK</span>
                        <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2">Sign in to Orderly.</h1>
                        <p className="text-gray-500">Please enter your details to continue.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                className="w-full px-6 py-4 rounded-xl bg-white border-2 border-transparent focus:border-black focus:ring-0 transition-all font-medium placeholder:text-gray-400"
                                placeholder="hello@example.com"
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">Forgot password?</a>
                            </div>
                            <input
                                type="password"
                                {...register('password', { required: 'Password is required' })}
                                className="w-full px-6 py-4 rounded-xl bg-white border-2 border-transparent focus:border-black focus:ring-0 transition-all font-medium placeholder:text-gray-400"
                                placeholder="••••••••"
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 font-medium">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-black/10 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="text-black font-bold hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
