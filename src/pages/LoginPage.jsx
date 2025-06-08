import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import AuthImagePatterrn from '../components/AuthImagePattern.jsx';

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({
    email: "",
    password: ""
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  }

  return (
<div className='min-g-screen grid lg:grid-cols-2 pt-20'>
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-x; bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
                            <p className='text-base-content\60'>Sign in to your account</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                        <button type='submit' className='btn btn-primary w-full' disabled={isLoggingIn}>
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className='size-5 animate-spin' />
                                    Loading...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Don't have an account yet? {" "}
                            <Link to='/signup' className='link link-primary'>Sign Up</Link>
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

export default LoginPage