import React, { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Button } from '@mui/material';

const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className='flex justify-center h-[90vh] items-center'>
            <div className='w-[450px] h-[95vh] rounded-md shadow-lg bg-white'>
                <img className='w-full rounded-t-md' src="https://learn.begalileo.com/assets/login_page/defaultLogin.png" />

                <div className='pt-10 px-10 pb-6'>
                    {isLogin ? <LoginForm /> : <RegisterForm />}
                    <div className="flex items-center gap-1 justify-center mt-5">
                        <p>{isLogin && "Don't "}have Account</p>
                        <Button size='small' onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? "Create Account" : "Login"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth