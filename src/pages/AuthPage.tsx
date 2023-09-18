import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import AuthInput from "../components/auth/AuthInput";
import {ErrorFetch} from "../components/ErrorFetch";
import {apiAuth} from "../store/slices/apiAuth";
import Loading from '../components/Loading';

export type TInputs = {
    email: string,
    password: string,
    rememberMe: boolean
};

const AuthPage = () => {
    const { register, handleSubmit, formState: { errors,  } } = useForm<TInputs>();
    const [login, {isLoading, error}] = apiAuth.useLoginMutation()
    const onSubmit: SubmitHandler<TInputs> = data => {
        login(data)
    };
    if (error) return <ErrorFetch error={'Ошибка при логинизации'} />
    return (
        <>
            {isLoading && <Loading />}
            <div className={'container py-6'}>
                <div className={'mb-10'}>
                    <h2 className={'text-[1.3em]'}>You can sign in with test email</h2>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </div>
                <form className={'flex flex-col gap-[.8em] items-start'} onSubmit={handleSubmit(onSubmit)}>
                    <AuthInput label={'Email:'} value={'email'} errors={errors} register={register} type={'text'} required={true} />
                    <AuthInput label={'Password:'} value={'password'} errors={errors} register={register} type={'password'} required={true} />
                    <AuthInput label={'Remember me'} value={'rememberMe'} errors={errors} register={register} type={'checkbox'} required={false} />
                    {/*{message && <div className={'text-[red] mt-0.5'}>{message}</div>}*/}
                    <input className={'border-2 p-1.5 rounded cursor-pointer hover:text-secondary hover:transition-all'} type="submit" />
                </form>
            </div>
        </>
    );
};

export default AuthPage;