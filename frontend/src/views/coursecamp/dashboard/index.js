import React, { useEffect, useState } from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CImg,
    CModal,
    CModalBody,
    CLink,
    CModalHeader,
} from "@coreui/react";
import Navbar from "./navbarDashboard";
import Progress from "../component/Progress";
import { api, authToken } from "../../plugins/api";
import { mainCategoryImage, categoryImage, carauselImage } from "../../plugins/data";
import "../style.css";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid, Pagination, Navigation } from "swiper";
import { useHistory } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Conffeti from "src/views/gambar/Icon/Welcome.json"
import Lottie from "lottie-react"
import Loader from "../component/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

AOS.init({
    easing: 'ease-out',
    duration: 1000,
    anchorPlacement: 'top-bottom',
});

function Index() {
    const [mainCategories, setMainCategories] = useState([{}])
    const [progressLearn, setProgressLearn] = useState([{}])
    const [recommendedMinat, setRecommendedMinat] = useState([{}])
    const [rekomendasiKategori, setRekomendasiKategori] = useState([{}])
    const [loading, setLoading] = useState(false)
    const [welcomeModal, setWelcomeModal] = useState(false)
    const [examModal, setExamModal] = useState(false)
    const token = localStorage.getItem("token");
    const history = useHistory();

    useEffect(() => {
        setLoading(true);

        api.post(`get-maincategories-option`, {
            token: token
        }).then((res) => {
            setMainCategories(res.data.result)
            setLoading(false);
        })

        api.post(`get-all-unfinished-learn`, {
            id_user: authToken().uid,
            token: token
        }).then((res) => {
            setProgressLearn(res.data.result)
            console.log(res)
            setLoading(false);
        })

        api.post(`minat-recommend`, {
            id_user: authToken().uid,
            token: token
        }).then((res) => {
            setRecommendedMinat(res.data.result)
            setLoading(false);
        })

        api.post(`minat-kategori`, {
            id_user: authToken().uid,
            token: token
        }).then((res) => {
            setRekomendasiKategori(res.data.result)
            setLoading(false);
        })

        api.post(`is-new-user`, {
            id_user: authToken().uid,
            token: token
        }).then((res) => {
            setWelcomeModal(res.data.result)
            setLoading(false);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg">
            {
                loading ?
                    <Loader loading={loading} />
                    :
                    <>
                        <Swiper
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            navigation={true}
                            modules={[Autoplay, Navigation]}
                            className="mySwiper text-center"
                            style={{ backgroundColor: "#D9D9D9" }}
                            data-aos="fade-down"
                        >
                            {carauselImage.map((d, i) => (
                                <SwiperSlide key={i}>
                                    <a href={d.href} target="_blank" rel="noopener noreferrer">
                                        <CImg
                                            src={d.image}
                                            className="img-fluid"
                                            style={{ width: "auto", height: "600px" }}
                                            alt="gambar iklan"
                                        />
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <Navbar examModal={examModal} setExamModal={setExamModal} />

                        <CContainer>
                            <CRow style={{ marginTop: "50px" }}>
                                {
                                    mainCategories.map((d, i) => (
                                        <CCol key={i}>
                                            <CCard
                                                style={{ border: "none" }}
                                                onClick={() => {
                                                    history.push({
                                                        pathname: `category-course/${d.label}`
                                                    })
                                                }}
                                            >
                                                <div className="overlay">
                                                    <CImg
                                                        src={mainCategoryImage(d.label)}
                                                        className="img-fluid click-image"
                                                        alt={d.label}
                                                    />
                                                    <div className="overlay-text">
                                                        <span className="text">{d.label}</span>
                                                    </div>
                                                </div>
                                            </CCard>
                                        </CCol>
                                    ))
                                }
                            </CRow>

                            <CRow style={{ marginTop: "20px" }}>
                                <CCol md="12" xl="6" className="mb-2">
                                    <CCard style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", height: "96%", borderRadius: "10px" }}>
                                        <CCardHeader style={{ borderRadius: "10px 10px 0px 0px" }}>
                                            <div className="header">Rekomendasi</div>
                                        </CCardHeader>
                                        <CCardBody>
                                            <Swiper
                                                slidesPerView={2}
                                                grid={{
                                                    rows: 2,
                                                    fill: "row"
                                                }}
                                                spaceBetween={30}
                                                pagination={{
                                                    clickable: true,
                                                    dynamicBullets: true,
                                                }}
                                                modules={[Grid, Pagination]}
                                                className="mySwiper"
                                            >
                                                {rekomendasiKategori && rekomendasiKategori.map((d, i) => (
                                                    <SwiperSlide style={{ padding: "10px" }} key={i}>
                                                        <CImg
                                                            src={categoryImage(d.nama_kategori)}
                                                            className="img-fluid click-image"
                                                            alt={`Logo ${d.nama_kategori}`}
                                                            onClick={() => {
                                                                history.push({ pathname: `../category-course/${d.main_kategori}`, selectedCategory: `${d.nama_kategori}` })
                                                            }}
                                                        />
                                                        <b style={{ fontSize: "18px" }}>
                                                            {d.nama_kategori}
                                                        </b>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </CCardBody>
                                    </CCard>
                                </CCol>

                                <CCol className="mb-2">
                                    <CCard style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", height: "96%", borderRadius: "10px" }}>
                                        <CCardHeader style={{ borderRadius: "10px 10px 0px 0px" }}>
                                            <div className="header">Progress</div>
                                        </CCardHeader>
                                        <CCardBody>
                                            {progressLearn.length > 0 ? (
                                                progressLearn.map((d, i) => (
                                                    <CCard style={{ backgroundColor: "#F3F3F9", borderRadius: "5px" }} key={i}>
                                                        <CCardBody style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", borderRadius: "5px" }}>
                                                            <CRow className="d-flex align-items-center justify-content-center">
                                                                <CCol>
                                                                    <div style={{ fontWeight: "bold" }}>
                                                                        {d.nama}
                                                                    </div>
                                                                    <div className="mt-1">
                                                                        <Progress percent={d.progress} />
                                                                    </div>
                                                                </CCol>
                                                                <CCol className="col-auto">
                                                                    <div className="hyperlink" onClick={() => history.push({ pathname: `/course/${d.id_course}/materi/${d.next_materi_id}` })}>
                                                                        Lanjutkan
                                                                    </div>
                                                                </CCol>
                                                            </CRow>
                                                        </CCardBody>
                                                    </CCard>
                                                ))
                                            ) : (
                                                <div className="text-center">
                                                    Saat ini belum ada course yang sedang dipelajari
                                                </div>
                                            )}
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>

                            <NewUserModal welcomeModal={welcomeModal} setWelcomeModal={setWelcomeModal} examModal={examModal} setExamModal={setExamModal} />
                            <RecommendedMinat examModal={examModal} setExamModal={setExamModal} data={recommendedMinat} />

                        </CContainer>
                    </>
            }
        </div >
    )
}

function RecommendedMinat(props) {
    const history = useHistory();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <CModal
                show={props.examModal}
                onClose={props.setExamModal}
                size="lg"
                closeOnBackdrop={false}
                centered
                scrollable
            >
                <CModalHeader style={{ justifyContent: "center", backgroundColor: "#3399FF" }} closeButton>
                    <h3>Saran Pembelajaran</h3>
                </CModalHeader>
                <CModalBody>
                    {
                        props.data && props.data.map((d, i) => (
                            <div key={i}>
                                <h5>
                                    {d.nama_skill}
                                </h5>
                                {
                                    d.kategori && d.kategori.map((d, i) => (
                                        <CCard
                                            className="card-custom"
                                            onClick={() => {
                                                history.push({ pathname: `../category-course/${d.main_kategori}`, selectedCategory: `${d.nama_kategori}` })
                                            }}
                                            key={i}
                                        >
                                            <CCardBody >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>{d.nama_kategori} <small>( Tingkat Kesulitan Bahasa: <span style={{
                                                        color: d.tingkat_kesulitan === 'Mudah' ? 'green' : d.tingkat_kesulitan === 'Menengah' ? 'orange' : 'red',
                                                        fontWeight: "bold"
                                                    }}>{d.tingkat_kesulitan}</span> )</small></div>
                                                    <FontAwesomeIcon icon={faArrowRight} />
                                                </div>
                                            </CCardBody>
                                        </CCard>
                                    ))
                                }
                            </div>
                        ))
                    }

                </CModalBody>
            </CModal>
        </>
    )
}

function NewUserModal(props) {
    const token = localStorage.getItem("token");

    const UpdateStatusUser = () => {
        api.post(`update-new-user`, {
            id_user: authToken().uid,
            token: token
        })
    }

    useEffect(() => {
        if (props.welcomeModal) {
            document.body.style.overflow = "hidden";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <CModal
                show={props.welcomeModal}
                size="lg"
                closeOnBackdrop={false}
                centered
            >
                <CModalBody style={{ paddingRight: "25%", paddingLeft: "25%" }}>
                    <div className="text-center">
                        <h3 className="mb-3">Halo <u>{authToken().urn}</u>, <br />Selamat Datang di <u>CourseCamp</u>!</h3>

                        <center>
                            <Lottie
                                animationData={Conffeti}
                                style={{
                                    width: "160px",
                                    height: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            />
                        </center>
                        <div className="mt-2">
                            <p className="text-muted mb-4">
                                Berdasarkan dari minat yang anda pilih, kami menyarankan anda
                                untuk mempelajari bahasa pemrograman berikut ini!
                            </p>
                            <div className="hstack gap-2 justify-content-center" >
                                <CLink
                                    to="#"
                                    className="btn btn-success"
                                    onClick={() => {
                                        props.setWelcomeModal(!props.welcomeModal);
                                        props.setExamModal(!props.examModal);
                                        UpdateStatusUser();
                                    }}
                                >
                                    Selanjutnya
                                </CLink>
                            </div>
                        </div>
                    </div>
                </CModalBody>
            </CModal>
        </>
    )
}
export default Index;