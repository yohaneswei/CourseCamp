import React from "react";
import Work from '../../gambar/Work.jpg';
import { CContainer, CRow, CCol, CImg } from "@coreui/react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../style.css";

AOS.init({
    easing: 'ease-out',
    duration: 2000,
    anchorPlacement: 'top-bottom',
});

function Review() {

    return (
        <div style={{ backgroundColor: "#FFFFFE" }} data-aos="fade-up">
            <CContainer>
                <CRow >
                    <CCol xxs="12" xs="12" sm="12" md="12" lg="7" xl="7">
                        <CImg
                            src={Work}
                            className="img-fluid"
                        />
                    </CCol>
                    <CCol>
                        <h2 className="mt-3 text-center">
                            Mengapa CourseCamp?
                        </h2>
                        <div className="text-justify">
                            CourseCamp merupakan sebuah website yang dirancang dengan tujuan untuk memberikan bantuan kepada mahasiswa-mahasiswa yang sedang menghadapi
                            tantangan dalam mempelajari berbagai aspek yang kompleks dan seringkali membingungkan dalam dunia pemrograman. Aplikasi ini berfungsi sebagai
                            sumber daya terpercaya yang dapat membantu mahasiswa yang tengah mengalami kesulitan dalam memahami konsep-konsep yang rumit, menerapkan
                            prinsip-prinsip dasar, serta menguasai bahasa-bahasa pemrograman yang beragam. Tidak hanya itu, CourseCamp juga memberikan rekomendasi kepada
                            mahasiswa-mahasiswa yang mengalami kebingungan dalam memilih jenis pemrograman yang paling tepat untuk mereka kuasai.
                        </div>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Review;