import React, { useEffect, useState } from "react";
import {
    CNavbar,
    CNavbarNav,
    CButton,
    CImg
} from '@coreui/react'
import Logo from "../../gambar/Logo.png"
import { FEUrl } from "../../plugins/data";
import { useHistory } from "react-router-dom";

function Navbar() {
    const [navClass, setNavClass] = useState("");
    const [btnActive, setBtnActive] = useState("");

    const history = useHistory();

    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
        const page = window.location.href.split(FEUrl)[1]
        if (page) {
            if (page === "login") {
                setBtnActive("login");
            } else if (page === "register") {
                setBtnActive("register");
            }
        };
    }, []);

    const scrollNavigation = () => {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setNavClass("navbar-scrolled");
        } else {
            setNavClass("");
        }
    }

    return (
        <CNavbar expandable="sm" light className={"fixed-top " + navClass}>
            <CNavbar onClick={() => history.push({ pathname: `/coursecamp` })} style={{ padding: "13px 0px" }}>
                <CImg src={Logo} style={{ width: "auto", height: "30px", cursor: "pointer" }} />
            </CNavbar>

            <CNavbarNav className="ml-auto">
                <CButton className={"px-4 btn-transparent " + (btnActive === "login" && "btnActive")} onClick={() => history.push({ pathname: `/login` })}>
                    <b>Masuk</b>
                </CButton>

                <CButton className={"px-4 btn-transparent " + (btnActive === "register" && "btnActive")} onClick={() => history.push({ pathname: `/register` })}>
                    <b>Daftar</b>
                </CButton>
            </CNavbarNav>
        </CNavbar >
    )
}

export default Navbar;