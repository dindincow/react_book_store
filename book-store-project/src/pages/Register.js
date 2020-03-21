import React from 'react';
import axios from '../commons/axios';
import useForm from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Register(props) {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async data => {

        console.log('data', data)

        try {
            const { email, password, type, nickname } = data;
            await axios.post('/auth/register', { email, password, type, nickname });
            toast.success('註冊成功!')
            props.history.push('/login')

        } catch (error) {
            toast.error(error.response.data.message)
            console.log('error==>', error.response.data)
        }


    }

    return (
        <div className="login-wrapper">
            <i className="bookicon fas fa-journal-whills"></i>
            <h3>布克萊後台管理-註冊</h3>
            <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label">暱稱</label>
                    <div className="control">
                        <input
                            className={`input ${errors.nickname && 'is-danger'}`}
                            type="text"
                            name="nickname"
                            ref={register({
                                required: '暱稱不可為空'
                            })}
                        />
                        {errors.nickname && (
                            <p className="helper has-text-danger">
                                {errors.nickname.message}
                            </p>
                        )}
                    </div>
                </div>
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

                <div className="field">
                    <label className="label">類型</label>
                    <div className="select">
                        <select name="type" ref={register({ required: true })}>

                            <option value="0">ㄧ般會員</option>
                            <option value="1">管理員</option>
                        </select>
                    </div>
                </div>

                <div className="control">
                    <button className="button is-fullwidth is-primary">註冊</button>
                </div>

            </form>
        </div>
    )
}


