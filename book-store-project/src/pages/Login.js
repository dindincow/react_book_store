import React from 'react';
import axios from '../commons/axios';
import useForm from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Login(props) {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async data => {

        console.log('data')
    
        try{
            const {email,password} = data;
            const res = await axios.post('/auth/login',{email,password});
            const jwtToken = res.data;
            console.log('jwtToken',jwtToken)

            // 設定 token
            global.auth.setToken(jwtToken);
            toast.success('登入成功!')
            props.history.push('/')

        }catch(error){
            toast.error(error.response.data.message)
            console.log('error==>',error.response)
        }

    
    }

    return (
        <div className="login-wrapper">
            <i className="bookicon fas fa-journal-whills"></i>
            <h3>布克萊後台管理</h3>
            <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            className={`input ${errors.email && 'is-danger'}`}
                            type="text"
                            name="email"
                            ref={register({ 
                                required: 'email不可為空!',
                                pattern: {
                                    value: /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i,
                                    message: 'email 格式不正確!'
                                } 
                            })}
                        />
                        {
                            errors.email && (
                                <p className="helper has-text-danger">{errors.email.message}</p>
                            )
                        }
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input
                            className={`input ${errors.password && 'is-danger'}`}
                            type="text"
                            name="password"
                            ref={register({ required: true })}
                        />
                    </div>
                    {
                        errors.password && (
                            <p className="helper has-text-danger">password 不可為空</p>
                        )
                    }
                </div>

                <div className="control">
                    <button className="button is-fullwidth is-primary">Login</button>
                </div>

            </form>
        </div>
    )
}


