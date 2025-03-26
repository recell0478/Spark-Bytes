import React, { useState } from 'react';
import { Layout } from 'antd';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Sign In:', {email, password})
    };

    return (
        <Layout>
            <div className='container'>
                <h2>Welcome to Boston Dynamics SparkBytes!</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column'}}>
                    <label htmlFor="email" style= {{ textAlign: 'left'}}>BU Email</label>
                    <input 
                        id="email"
                        type="email"
                        placeholder="Enter your BU email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required style={{ marginBottom: '1rem', padding: '0.5rem'}}
                    />

                    <label htmlFor="password" style={{ textAlign: 'left'}}>Password</label>
                    <input 
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required style={{ marginBottom: '1rem', padding: '0.5rem'}}
                    />

                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#c00',
                            color: '#fff',
                            padding: '0.75rem',
                            border: 'none',
                            cursor: 'pointer',
                            marginBottom: '1rem',
                        }}
                    >
                        Login
                    </button>
                </form>

                <a href="#" style={{ display: 'block', margin: '1rem 0'}}>Forgot Password</a>

                <a href="/signup">
                    <button
                        style={{
                            backgroundColor: '#c00',
                            color: '#fff',
                            padding: '0.75rem',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        >
                        Sign Up
                    </button>
                </a>
            </div>
        </Layout>
    );
};

export default SignIn;
