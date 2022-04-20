import React, {useContext} from 'react'
import {Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/auth/authContext";

export const AppHeader = () => {
    const navigation = useNavigate();
    const { authContext } = useContext(AuthContext);

    const logout = () =>{
        authContext.signOut();
        navigation("/", { replace: true });
    }

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
            </ul>
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Button className="btn" onClick={logout} style={{ background: "#042B61", borderColor: "#042B61" }}>
                        Cerrar sesión
                    </Button>
                </li>
            </ul>
        </nav>
    )
}