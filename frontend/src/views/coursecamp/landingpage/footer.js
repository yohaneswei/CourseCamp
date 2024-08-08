import React from "react";
import "../style.css";
import Logo from "../../gambar/Logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faTwitterSquare, faFacebookSquare, faYoutubeSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { CContainer, CRow, CCol, CImg } from "@coreui/react";

function Footer() {

    return (
        <div style={{ backgroundColor: "#2A282D" }}>
            <CContainer>
                <CRow style={{ padding: "40px 0px 60px 0px" }}>
                    <CCol>
                        <CImg
                            src={Logo}
                            className="img-fluid"
                            style={{ width: "250px" }}
                        />

                        <div style={{ color: "white" }}>
                            Ikuti kami hanya di
                        </div>
                        <div>
                            <FontAwesomeIcon
                                icon={faTwitterSquare}
                                className="fa-2x brand mr-2"
                                color="#00acee"
                                style={{ cursor: "pointer" }}
                                onClick={() => window.location.href = "https://twitter.com/uajy"}
                            />
                            <FontAwesomeIcon
                                icon={faFacebookSquare}
                                className="fa-2x brand mr-2"
                                color="#3b5998"
                                style={{ cursor: "pointer" }}
                                onClick={() => window.location.href = "https://www.facebook.com/universitas.atma.jaya.yogyakarta"}
                            />
                            <FontAwesomeIcon
                                icon={faYoutubeSquare}
                                className="fa-2x brand mr-2"
                                color="#c4302b"
                                style={{ cursor: "pointer" }}
                                onClick={() => window.location.href = "https://www.youtube.com/@atmajayayogya"}
                            />
                            <FontAwesomeIcon
                                icon={faLinkedin}
                                className="fa-2x brand"
                                color="#0072b1"
                                style={{ cursor: "pointer" }}
                                onClick={() => window.location.href = "https://id.linkedin.com/school/universitas-atma-jaya-yogyakarta/"}
                            />
                        </div>
                    </CCol>
                    <CCol>
                        <div>
                            <small className="footer-link">
                                Tentang Kami
                            </small>
                        </div>
                        <div className="mt-3 mb-3">
                            <small className="footer-link">
                                Bantuan
                            </small>
                        </div>
                        <div className="mb-3">
                            <small className="footer-link">
                                Kebijakan dan Privasi
                            </small>
                        </div>
                        <div>
                            <small className="footer-link">
                                Syarat dan Ketentuan
                            </small>
                        </div>
                    </CCol>
                    <CCol>
                        <CRow className="d-flex align-items-center justify-content-center">
                            <CCol style={{ textAlign: "center" }} md="2">
                                <FontAwesomeIcon icon={faLocationDot} className="fa-2x" color="white" />
                            </CCol>
                            <CCol style={{ color: "white" }}>
                                Jl. Babarsari No.44, Janti, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
                            </CCol>
                        </CRow>

                        <CRow className="d-flex align-items-center justify-content-center mt-3 mb-3">
                            <CCol style={{ textAlign: "center" }} md="2">
                                <FontAwesomeIcon icon={faEnvelope} className="fa-2x" color="white" />
                            </CCol>
                            <CCol style={{ color: "white" }}>
                                fti@uajy.ac.id
                            </CCol>
                        </CRow>

                        <CRow className="d-flex align-items-center justify-content-center">
                            <CCol style={{ textAlign: "center" }} md="2">
                                <FontAwesomeIcon icon={faPhone} className="fa-2x" color="white" />
                            </CCol>
                            <CCol style={{ color: "white" }} md="10">
                                (0274) 487711
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>
            </CContainer >
        </div >
    )
}

export default Footer;