import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import NavbarInput from '../../components/Navbar_input'
import NavbarUtils from '../../components/Navbar_utils'
import './navbar.css'

const Navbar = (props) => {
    let [connection_status, setConnectionStatus] = useState(localStorage.getItem('T'));
    let [redirect, setRedirect] = useState(false);


    useEffect(() => {
        if (!connection_status) {
            setRedirect(true);
        }
    },[connection_status]);

    return (
        <div id={'navbar_wrapper'}>
            {redirect && <Redirect to={'/'}/>}
            <div id={'logo_container'}>
                <img id={'logo'} src={'/assets/ballin_logo_small.png'} alt={'Ballin logo'}/>
            </div>
            <NavbarInput/>
            <NavbarUtils/>
        </div>
    )
};

export default Navbar;