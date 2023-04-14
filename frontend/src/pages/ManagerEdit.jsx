import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getManagerOrderDetail } from '../redux/manager-reducer';

import "../css/pages_style/ManagerEditStyle.css";
import { Footer1 } from '../components/footers';
import ManagerHeader from '../components/managerHeader';

function ManagerEdit() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, message });
    };

    return (
        <div>
            <ManagerHeader/>
            <form className="my-form" onSubmit={handleSubmit}>
                <h2>Редактирование заказа:</h2>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                </div>
                <button type="submit">Send Message</button>
            </form>
            <Footer1 />
        </div>
    )
}

export default ManagerEdit