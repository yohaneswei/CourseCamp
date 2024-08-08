import React, { useEffect, useState } from "react";
import {
    CCollapse,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CNavbar,
    CNavbarNav,
    CToggler,
    CDropdown,
    CImg,
} from '@coreui/react'
import { useLocation, useHistory, useParams } from "react-router-dom";
import Logo from "../../gambar/Logo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faUser, faLock, faArrowRightFromBracket, faGauge, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import ProfileImg from "../../gambar/ProfileImg.jpg"
import { authToken } from "../../plugins/api";
// import RecommendedMinat from "../component/RecommendModal"

function Navbar(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [navClass, setNavClass] = useState("");
    const [examModal, setExamModal] = useState(false)
    const [search, setSearch] = useState(useParams().keyword || "");

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    }, []);

    const scrollNavigation = () => {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setNavClass("navbar-scrolled");
        } else {
            setNavClass("");
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            history.push({ pathname: `../search-course/${search}` })
        }
    };

    return (
        <CNavbar expandable="sm" light className={"fixed-top " + navClass}>
            <CToggler inNavbar onClick={() => setIsOpen(!isOpen)} />

            <CNavbar onClick={() => history.push({ pathname: `/course-dashboard` })} style={{ padding: "0px" }}>
                <CImg src={Logo} style={{ width: "auto", height: "30px", cursor: "pointer" }} />
            </CNavbar>

            <CCollapse show={isOpen} navbar >
                <CNavbarNav className="ml-auto">
                    <div className="form-group m-0">
                        <div style={{ marginLeft: "-50px" }}>
                            <div className="input-wrapper" >
                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "royalblue", cursor: "pointer" }} onClick={() => { setExamModal(!examModal) }} />
                                <input type="search"
                                    className="searchbox"
                                    placeholder="Apa yang ingin anda pelajari?"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                    onKeyDown={(e) => { handleKeyDown(e) }}
                                />
                            </div>
                        </div>
                    </div>
                </CNavbarNav>

                <CNavbarNav className="ml-auto">
                    <CDropdown
                        inNav
                        className="c-header-nav-items mx-2"
                        direction="down"
                    >
                        <CDropdownToggle className="c-header-nav-link" caret={false}>
                            <div className="c-avatar">
                                <CImg
                                    src={ProfileImg}
                                    className="c-avatar-img"
                                    alt="admin@bootstrapmaster.com"
                                    style={{ width: "50px", marginBottom: "-10px" }}
                                />
                            </div>
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                            <CDropdownItem
                                header
                                tag="div"
                                color="light"
                                className="text-center"
                            >
                                <strong>Halo, <b><u>{authToken() && (authToken().urn || "User")}</u></b></strong>
                            </CDropdownItem>

                            <CDropdownItem className="profile-menu" style={{ color: "#556378" }} onClick={() => history.push({ pathname: `/course-dashboard` })}>
                                <FontAwesomeIcon icon={faGauge} className="mfe-2" />Dashboard
                            </CDropdownItem>

                            {(location.pathname === "/course-dashboard" && (authToken() && authToken().isa === 0)) && (
                                <CDropdownItem className="profile-menu" style={{ color: "#556378" }} onClick={() => { props.setExamModal(!props.examModal) }}>
                                    <FontAwesomeIcon icon={faBookOpen} className="mfe-2" />Saran Pembelajaran
                                </CDropdownItem>
                            )}

                            {/* <RecommendedMinat examModal={examModal} setExamModal={setExamModal} /> */}

                            <CDropdownItem
                                header
                                tag="div"
                                color="light"
                                className="text-center"
                            >
                                <strong>Manajemen Akun</strong>
                            </CDropdownItem>

                            <CDropdownItem className="profile-menu" style={{ color: "#556378" }} onClick={() => history.push({ pathname: `/profile` })}>
                                <FontAwesomeIcon icon={faUser} className="mfe-2" />Profile
                            </CDropdownItem>
                            {
                                authToken() && authToken().isa === 1 &&
                                <CDropdownItem className="profile-menu" style={{ color: "#556378" }} onClick={() => history.push({ pathname: `/profile-admin` })}>
                                    <FontAwesomeIcon icon={faUser} className="mfe-2" />Profile(Admin)
                                </CDropdownItem>
                            }

                            <CDropdownItem className="profile-menu" style={{ color: "#556378" }} onClick={() => history.push({ pathname: `/change-password` })}>
                                <FontAwesomeIcon icon={faLock} className="mfe-2" />Ubah Password
                            </CDropdownItem>

                            <CDropdownItem divider />

                            <CDropdownItem
                                className="profile-menu"
                                style={{
                                    color: "red"
                                }}
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    window.location.reload()
                                }}>
                                <FontAwesomeIcon icon={faArrowRightFromBracket} className="mfe-2" />Keluar
                            </CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </CNavbarNav>
            </CCollapse>
        </CNavbar>
    )
}

export default Navbar;