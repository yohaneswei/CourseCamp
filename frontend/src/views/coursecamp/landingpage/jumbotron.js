import React from "react";
import landingImage from '../../gambar/LandingImage.png';
import { CContainer, CRow, CCol, CImg, CButton } from "@coreui/react";
import { useHistory } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../style.css";

AOS.init({
    easing: 'ease-out',
    duration: 2000,
    anchorPlacement: 'top-bottom',
});

function Jumbotron() {
    const history = useHistory();

    return (
        <CContainer>
            <CRow className="d-flex align-items-center justify-content-center" style={{ paddingTop: "110px", paddingBottom: "110px" }}>
                <CCol className="text-center" data-aos="fade-right">
                    <h2>
                        Tertarik mempelajari sesuatu namun bingung memilih?
                    </h2>
                    <br />
                    <p>
                        Jangan khawatir! CourseCamp hadir untuk memberikanmu rekomendasi pembelajaran yang seru dan menarik! Bergabunglah sekarang dan temukan dunia yang luas dari pemrograman yang akan memikat minatmu.
                    </p>

                    <CButton
                        className="btn-young-blue"
                        onClick={() => {
                            history.push({ pathname: `/login` })
                        }}
                    >
                        Mulai Sekarang
                    </CButton>
                </CCol>

                <CCol xxs="12" xs="12" sm="12" md="7" lg="7" xl="7" className="text-right" data-aos="fade-left">
                    <CImg
                        src={landingImage}
                        className="img-fluid"
                    />
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default Jumbotron;