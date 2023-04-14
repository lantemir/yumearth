//rfce

import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';



import * as bases from '../components/bases';





import "../css/pages_style/RegisterStyle.css";

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorShow, setErrorShow] = useState('')



    const submit = (e) => {
        e.preventDefault();

        axios.post("/api/registration/", { "username": name, "password": password }).then(
            response => {
                console.log(response)
                setErrorShow("Пользователь уcпешно добавлен")
                navigate("/login");

            }).catch(er => {
                console.log(er.response.data.errormessage)
                // console.log ("ошибка")
                setErrorShow("ошибка: " + er.response.data.errormessage)
            })

        // const content = await response.json();
        // console.log(content);

    }


    return (
        <bases.Base1>
            <div className='registr-container'>
                <h2>Регистрация</h2>

                <form>
                    <label htmlFor="login">Логин:</label>
                    <input onChange={(e) => setName(e.target.value)} value={name} type="text" id="login" name="login" placeholder="логин..." required />

                    <label htmlFor="password">Пароль:</label>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" name="password" placeholder="пароль..." required />


                    <button onClick={submit} type="submit">регистрация</button>

                </form>

                <div className='errorshow'>
                    {errorShow && <h3>{errorShow}</h3>}
                </div>

                <Link to={`/login/`}> уже есть логин</Link>
            </div>
        </bases.Base1>
    )
}

export default Register