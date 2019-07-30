import React, {useState, useEffect} from 'react'
import NavbarInput from '../../components/Navbar_input'
import NavbarUtils from '../../components/Navbar_utils'
import './navbar.css'

const Navbar = (props) => {
    let [connection_status, setConnectionStatus] = useState('');

    useEffect(() =>
        console.log(connection_status)
    ,[connection_status]);

    return (
        <div id={'navbar_wrapper'}>
            <div id={'logo_container'}>
                <img id={'logo'} src={'/assets/ballin_logo_small.png'} alt={'Ballin logo'}/>
            </div>
            <NavbarInput />
            <NavbarUtils />
        </div>
    )
};

export default Navbar;