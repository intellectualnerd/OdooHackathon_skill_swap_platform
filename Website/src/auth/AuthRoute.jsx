import React from 'react'
import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


export const AuthRoute = ({ children }) => {
    const {session,isRendered}= useSelector(state => state.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (isRendered && !session) {
            navigate("/login");
        }
    }, [isRendered,session, navigate]);

    return session ? children : null;
}
