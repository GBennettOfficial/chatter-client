import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePatterrn from '../components/AuthImagePattern';
import { toast } from 'react-hot-toast';

const SignupPage = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [formData, setFormData] = React.useState({
        fullName: "",
        email: "",
        password: ""
    });

    const { signup, isSigningup } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full Name is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/\S+@\S+\.+/.test(formData.email)) return toast.error("Please enter a valid email address");
        if (!formData.password.trim()) return toast.error("Password is required");
        if (formData.password.length < 6) return toast.error("Password must be at least 6 characters long");
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isSuccess = validateForm();
        if (isSuccess) signup(formData);
    }

    return (
        <div className='min-g-screen grid lg:grid-cols-2 mt-12'>
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-x; bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                            <p className='text-base-content\60'>Get started with your free account</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <div className='flex flex-row items-center  pb-1'>
                                <User className='size-8 mr-2 text-base-content/40' />
                                <label className="label">
                                    <span className="label-text font-medium">Full Name</span>
                                </label>
                            </div>
                            <div className="relative">
                                <div className='flex flex-row items-center'>
                                    <input
                                        type="text"
                                        className={`input w-full`}
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-control">
                            <div className='flex flex-row items-center pb-1'>
                                <Mail className='size-8 mr-2 text-base-content/40' />
                                <label className="label">
                                    <span className="label-text font-medium">Email</span>
                                </label>
                            </div>
                            <div className="relative">

                                <input
                                    type="email"
                                    className={`input input-bordered w-full`}
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-control">
                            <div className='flex flex-row items-center  pb-1'>
                                <Lock className='size-8 mr-2 text-base-content/40' />
                                <label className="label">
                                    <span className="label-text font-medium">Password</span>
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary w-full' disabled={isSigningup}>
                            {isSigningup ? (
                                <>
                                    <Loader2 className='size-5 animate-spin' />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Already have an account? {" "}
                            <Link to='/login' className='link link-primary'>Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
            <AuthImagePatterrn
                title='Join our community'
                subtitle='Connect with friends, share moments, and stay in touch wuth the people you care about.'
            />
        </div>
    )
}

export default SignupPage