import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CContainer, CButton, CCol, CRow, CImg, CTooltip, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTextarea, CForm, CBadge } from "@coreui/react";
import Navbar from "../dashboard/navbarDashboard";
import "../style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown, faChevronUp, faEye, faEyeSlash, faArrowLeft, faStar as faStarFull, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import CIcon from '@coreui/icons-react'
import { api } from '../../plugins/api';
import moment from "moment"
import "moment/locale/id";
import swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import { categoryImage } from "../../plugins/data";
import { authToken } from "../../plugins/api";
import CountUp from "react-countup";
import Progress from "../component/Progress";
import Rating from "react-rating";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import Loader from "../component/Loader";

function DetailCourse() {
    const [course, setCourse] = useState({
        nama: "",
        kategori: "",
        subkategori: "",
        kesulitan: "",
        deskripsi: "",
        tgl_dibuat: "",
        status: true
    })
    const [modul, setModul] = useState({
        nama_course: "",
        modul: [{
            id_modul: 0,
            nama_modul: "",
            materi: [{
                id_materi: 0,
                nama_materi: ""
            }]
        }]
    })

    const [recommendData, setRecommendData] = useState([])

    const [rating, setRating] = useState()
    const [penilaian, setPenilaian] = useState({
        rating: 0,
        komentar: ""
    })
    const [courseRate, setCourseRate] = useState([{}])
    const [courseComment, setCourseComment] = useState([{}])

    const [selected, setSelected] = useState(-1);
    const { id } = useParams();

    const [large, setLarge] = useState(false)

    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem("token");
    const history = useHistory();

    const toggle = (i) => {
        if (selected === i) {
            return setSelected(-1);
        }

        setSelected(i)
    }

    const AddLearn = () => {
        const modulTemp = modul.modul[0]
        if (modulTemp && modulTemp.materi[0]) {
            if (!penilaian) {
                api.post(`add-learn`, {
                    id_user: authToken().uid,
                    id_course: id,
                    token: token
                }).then((res) => {
                    swal.fire("Sukses!", res.data.message, "success")

                    history.push({
                        pathname: `../../course/${id}/materi/${modulTemp.materi[0].id_materi}`
                    })
                })
            } else {
                api.post(`next-progress-learn`, {
                    id_user: authToken().uid,
                    id_course: id,
                    token: token
                }).then((res) => {
                    history.push({
                        pathname: `../../course/${id}/materi/${(res.data.result[0] && res.data.result[0].id_materi) || modulTemp.materi[0].id_materi}`
                    })
                })
            }
        } else {
            swal.fire("Maaf!", "Course ini masih belum memiliki materi", "error")
        }
    }

    // pada backend belum ditambahkan jika pengguna mempelajari course ini
    const DeleteAPI = () => {
        api.delete(`delete-course`, {
            data: {
                id_course: id,
                status: course.status,
                token: token
            }
        }).then((res) => {
            if (res.data.success) {
                swal.fire("Sukses!", res.data.message, "success")
                if (!(course.status)) {
                    history.push({ pathname: `../profile-admin` })
                } else {
                    /* eslint-disable no-useless-computed-key */
                    setCourse({ ...course, ["status"]: 0 })
                }
            } else {
                swal.fire("Gagal!", res.data.message, "error")
            }
        })
    }

    const ConfirmDeleteCourseAPI = () => {
        swal.fire({
            icon: "warning",
            title: `Peringatan!`,
            html: `
                Apakah anda ingin 
                <strong style="color: ${course.status ? '#fecb59' : 'red'};">${course.status ? "Menonaktifkan" : "Menghapus"}</strong>
                course 
                <strong>"${course.nama}"</strong>?`,
            confirmButtonText: "Ya",
            confirmButtonColor: "#d9534f",
            showCancelButton: true,
            cancelButtonText: "Tidak",
            cancelButtonColor: "#337ab7"
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteAPI()
            }
        })
    }

    const UpdateRating = (e) => {
        e.preventDefault();
        api.post(`update-rating`, {
            token: token,
            rating: penilaian.rating,
            komentar: penilaian.komentar,
            id_user: authToken().uid,
            id_course: id
        }).then((res) => {
            swal.fire("Sukses", res.data.message, "success")
        })
    }

    useEffect(() => {
        setLoading(true)

        api.post(`detail-course/${id}`, {
            token: token,
        }).then((res) => {
            const data = res.data.result
            if (data.length) {
                setCourse(data[0])
                if (data[0].status === 0 && authToken().isa === 0) {
                    history.push({ pathname: `../course-dashboard` })
                }
                setLoading(false)
            } else {
                history.push({ pathname: `../course-dashboard` })
            }
        })

        api.post(`get-modul-materi-course/${id}`, {
            token: token,
        }).then((res) => {
            setModul(res.data.formattedResult)
            setLoading(false)
        })

        api.post(`get-rating`, {
            token: token,
            id_user: authToken().uid,
            id_course: id
        }).then((res) => {
            setPenilaian(res.data.result[0])
            setLoading(false)
        })

        api.post(`get-course-rating`, {
            token: token,
            id_course: id
        }).then((res) => {
            setCourseRate(res.data.result)
            setLoading(false)
        })

        api.post(`get-course-comment`, {
            token: token,
            id_course: id
        }).then((res) => {
            setCourseComment(res.data.result)
            setLoading(false)
        })

        api.post(`recommend-course`, {
            id_course: id,
            token: token
        }).then((res) => {
            setRecommendData(res.data.result)
            setLoading(false)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="bg">
            {
                loading ?
                    <Loader loading={loading} />
                    :
                    <>
                        <Navbar />
                        <CContainer>
                            <CCard style={{ marginTop: "75px", borderRadius: "10px" }}>
                                <CCardBody>
                                    <CRow>
                                        <CCol xxs="12" xs="12" sm="12" md="4">
                                            <div style={{ position: "sticky", top: "100px" }}>
                                                <CImg
                                                    src={categoryImage(course.subkategori)}
                                                    className="img-fluid mb-2"
                                                    style={{ boxShadow: "0px 1px 4px rgba(0,0,0,0.3)", borderRadius: "10px" }}
                                                />
                                                <div>
                                                    <CButton
                                                        active
                                                        block
                                                        color="success"
                                                        style={{ fontWeight: "bold" }}
                                                        aria-pressed="true"
                                                        onClick={() =>
                                                            AddLearn()
                                                        }
                                                    >
                                                        {penilaian ? "Lanjutkan" : "Mulai Sekarang"}
                                                    </CButton>

                                                    {
                                                        penilaian &&
                                                        <CButton
                                                            active
                                                            block
                                                            color="primary"
                                                            style={{ fontWeight: "bold" }}
                                                            aria-pressed="true"
                                                            onClick={() => setLarge(!large)}
                                                        >
                                                            {penilaian ? (penilaian.rating ? "Ubah Penilaian" : "Beri Penilaian") : "Beri Penilaian"}
                                                        </CButton>
                                                    }

                                                    {
                                                        authToken().isa === 1 &&
                                                        <>
                                                            <CButton active block color="info" style={{ fontWeight: "bold" }} aria-pressed="true" onClick={() => history.push({ pathname: `../edit-course/${id}` })}>Ubah</CButton>
                                                            <CButton active block color="danger" style={{ fontWeight: "bold" }} aria-pressed="true" onClick={() => ConfirmDeleteCourseAPI()}>{course.status ? "Nonaktifkan" : "Hapus"}</CButton>
                                                        </>
                                                    }
                                                </div>
                                                {
                                                    authToken().isa === 1 &&
                                                    <>
                                                        <hr style={{ height: "1px", borderWidth: "0", color: "black", backgroundColor: "black", borderRadius: "60px" }} />
                                                        <div className="text-center">
                                                            <FontAwesomeIcon className="fa-1x" icon={course.status ? faEye : faEyeSlash} />

                                                            <span className="ml-2">
                                                                Visibility - {course.status ?
                                                                    <span style={{ color: "#06D13F" }}>ON</span>
                                                                    :
                                                                    <span style={{ color: "#FF0000" }}>OFF</span>}
                                                            </span>
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </CCol>
                                        <CCol >
                                            <CRow>
                                                <CCol>
                                                    <div className="title">
                                                        {course.nama}
                                                    </div>
                                                </CCol>
                                                <CCol className="col-auto">
                                                    <CTooltip
                                                        content="Kembali"
                                                        placement="top"
                                                    >
                                                        <CButton
                                                            active
                                                            color="secondary"
                                                            style={{ fontWeight: "bold" }}
                                                            aria-pressed="true"
                                                            onClick={() => {
                                                                history.push({ pathname: `../../category-course/${course.kategori}` })
                                                                // history.push({ pathname: `../../course-dashboard` })
                                                                // history.go(-1)
                                                            }}
                                                        >
                                                            <FontAwesomeIcon icon={faArrowLeft} />
                                                        </CButton>
                                                    </CTooltip>
                                                </CCol>
                                            </CRow>

                                            <div>
                                                Kategori:{" "}
                                                <span
                                                    className="custom-badge"
                                                    style={{ textDecoration: "underline", cursor: "pointer" }}
                                                    onClick={() =>
                                                        history.push({ pathname: `../category-course/${course.kategori}` })
                                                    }
                                                >
                                                    {course.kategori}
                                                </span>
                                                {" "}
                                                <span
                                                    className="custom-badge"
                                                    style={{ textDecoration: "underline", cursor: "pointer" }}
                                                    onClick={() =>
                                                        history.push({ pathname: `../category-course/${course.kategori}`, selectedCategory: course.subkategori })
                                                    }
                                                >
                                                    {course.subkategori}
                                                </span>
                                                {" "}
                                                <span
                                                    className="custom-badge"
                                                >
                                                    {course.kesulitan}
                                                </span>
                                            </div>

                                            <CRow className="mt-3">
                                                <CCol>
                                                    <div className="p-2 border border-dashed rounded">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar-sm me-2 avatar-title rounded ">
                                                                <FontAwesomeIcon className="fa-3x" icon={faUser} />
                                                            </div>
                                                            <div className="flex-grow-1 ml-3">
                                                                <p className="mb-1 text-muted" style={{ fontWeight: "bold" }}>
                                                                    Diikuti:
                                                                </p>
                                                                <div className="mb-0">
                                                                    <CountUp
                                                                        start={0}
                                                                        prefix={""}
                                                                        suffix={" Pelajar"}
                                                                        separator={""}
                                                                        end={course.followed}
                                                                        duration={3}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CCol>
                                                <CCol>
                                                    <div className="p-2 border border-dashed rounded">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar-sm me-2 avatar-title rounded ">
                                                                <CIcon name="cil-layers" alt="Module" height="30" />
                                                            </div>
                                                            <div className="flex-grow-1 ml-3">
                                                                <p className="mb-1 text-muted" style={{ fontWeight: "bold" }}>
                                                                    Mempelajari:
                                                                </p>
                                                                <div className="mb-0">
                                                                    <CountUp
                                                                        start={0}
                                                                        prefix={""}
                                                                        suffix={" Modul"}
                                                                        separator={""}
                                                                        end={modul.modul.length}
                                                                        duration={3}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CCol>
                                                <CCol>
                                                    <div className="p-2 border border-dashed rounded">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar-sm me-2 avatar-title rounded ">
                                                                <CIcon name="cil-calendar" alt="Module" height="30" />
                                                            </div>
                                                            <div className="flex-grow-1 ml-3">
                                                                <p className="mb-1 text-muted" style={{ fontWeight: "bold" }}>
                                                                    Diunggah:
                                                                </p>
                                                                <div className="mb-0">
                                                                    {moment(course.tgl_dibuat).format("DD MMM YYYY")}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CCol>
                                            </CRow>

                                            <div className="mt-3">
                                                <div>
                                                    <h5 className="title">Deskripsi :</h5>
                                                </div>
                                                <div className="description">
                                                    {course.deskripsi}
                                                </div>
                                            </div>

                                            <div className="mt-3">
                                                <div>
                                                    <h5 className="title">Modul :</h5>
                                                </div>
                                                {
                                                    modul.modul.length === 0 ?
                                                        "Belum terdapat modul pada Course ini"
                                                        :
                                                        <div className="accordion" >
                                                            {modul.modul.map((item, i) => (
                                                                <div className="item" key={i}>
                                                                    <div className="modul" onClick={() => toggle(i)}>
                                                                        <span>{selected === i ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</span>
                                                                        <span className="accordion-modul" style={{ fontSize: "16px" }}>{item.nama_modul} ({item.materi.length})</span>

                                                                    </div>
                                                                    <div className={selected === i ? "content show" : "content"}>
                                                                        {
                                                                            item.materi.map((item, i) => (
                                                                                <div className="accordion-materi" style={{ fontSize: "11px" }} key={i}>
                                                                                    - {item.nama_materi}
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                    <hr style={{ borderRadius: "60px", marginTop: "5px" }} />
                                                                </div>
                                                            ))}
                                                        </div>
                                                }
                                            </div>

                                            <div className="mt-3">
                                                <div>
                                                    <h5 className="title">Ratings & Reviews</h5>
                                                </div>
                                                <CRow>
                                                    <CCol lg={4}>
                                                        <div>
                                                            <div className="pb-3">
                                                                <div className="px-3 py-2 rounded-2 mb-2" style={{ backgroundColor: "#f3f6f9", borderRadius: "5px" }}>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="flex-grow-1">
                                                                            <Rating
                                                                                initialRating={course.rating}
                                                                                readonly
                                                                                emptySymbol={<FontAwesomeIcon icon={faStarEmpty} color="#f59e0b" />}
                                                                                fullSymbol={<FontAwesomeIcon icon={faStarFull} color="#f59e0b" />}
                                                                            />
                                                                        </div>
                                                                        <div className="flex-shrink-0">
                                                                            <h6 className="mb-0">{course.rating ? course.rating : 0} out of 5</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <div className="text-muted">
                                                                        Total{" "}
                                                                        <span className="fw-medium">{course.rated}</span>{" "}
                                                                        reviews
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3">
                                                            <RatingSection rating={courseRate} rated={course.rated} />
                                                        </div>
                                                    </CCol>
                                                    <CCol lg={8} >
                                                        <div className="ps-lg-4">
                                                            <div className="d-flex flex-wrap align-items-start gap-3">
                                                                <h5 className="fs-15">Reviews: </h5>
                                                            </div>
                                                            <div className="komentar">
                                                                {
                                                                    courseComment.length > 0 ?
                                                                        courseComment.map((d, i) => (
                                                                            <div className="border border-dashed rounded p-3" style={{ margin: "0px 0 15px 0" }} key={i}>
                                                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                                                    <div>
                                                                                        <strong>{d.nama}</strong>
                                                                                        {" - "}
                                                                                        <CBadge color="success" shape="pill">
                                                                                            {d.rating} <FontAwesomeIcon icon={faStarFull} style={{ color: "#f59e0b" }} />
                                                                                        </CBadge>
                                                                                    </div>
                                                                                    <div>
                                                                                        {moment(d.tgl_mulai).format("DD MMM YYYY")}
                                                                                    </div>
                                                                                </div>
                                                                                <hr style={{ borderRadius: "30px", marginTop: "4px" }} />
                                                                                <div>
                                                                                    {d.komentar}
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                        :
                                                                        <div>
                                                                            Belum terdapat komentar pada course ini
                                                                        </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </CCol>
                                                </CRow>
                                            </div>
                                        </CCol>
                                    </CRow>
                                </CCardBody>
                            </CCard>

                            <CModal
                                show={large}
                                onClose={() => setLarge(!large)}
                                color="success"
                            >
                                <CForm method="POST" onSubmit={(e) => { UpdateRating(e) }}>
                                    <CModalHeader closeButton>
                                        <CModalTitle>Penilaian Course</CModalTitle>
                                    </CModalHeader>
                                    <CModalBody>
                                        <div className="text-center">
                                            <Rating
                                                initialRating={penilaian && penilaian.rating}
                                                fractions={1}
                                                emptySymbol={<FontAwesomeIcon icon={faStarEmpty} color="#f59e0b" />}
                                                fullSymbol={<FontAwesomeIcon icon={faStarFull} color="#f59e0b" />}
                                                onClick={(e) => setPenilaian({ ...penilaian, ["rating"]: e })}
                                                onHover={(e) => setRating(e)}
                                                className="rating"
                                            />
                                            {
                                                rating &&
                                                <div>
                                                    ({rating})
                                                </div>
                                            }
                                            <div>
                                                Rating Anda: {penilaian && penilaian.rating}
                                            </div>
                                        </div>

                                        <div>
                                            Komentar:
                                            <CTextarea
                                                id="description"
                                                placeholder="Silahkan isi deskripsi course"
                                                rows="4"
                                                style={{ resize: "none" }}
                                                value={(penilaian && penilaian.komentar) || ""}
                                                onChange={(e) => setPenilaian({ ...penilaian, ["komentar"]: e.target.value })}
                                            />
                                        </div>
                                    </CModalBody>
                                    <CModalFooter>
                                        <CButton type="submit" onClick={() => setLarge(!large)} color="success">Kirim</CButton>{' '}
                                        <CButton color="secondary" onClick={() => setLarge(!large)}>Cancel</CButton>
                                    </CModalFooter>
                                </CForm>
                            </CModal>

                            <div>
                                <h3>
                                    Konten Serupa
                                </h3>

                                <Swiper
                                    slidesPerView={4}
                                    spaceBetween={30}
                                    navigation={true}
                                    pagination={{
                                        clickable: true,
                                        dynamicBullets: true,
                                    }}
                                    modules={[Navigation, Pagination]}
                                    className="mySwiper"
                                    style={{ padding: "10px 50px 25px 50px" }}
                                >
                                    {
                                        recommendData && recommendData.length === 0 ?
                                            (
                                                <div className="mt-3">
                                                    Saat ini belum ada course yang serupa
                                                </div>
                                            )
                                            :
                                            (
                                                recommendData && recommendData.map((d, i) => (
                                                    <SwiperSlide key={i}>
                                                        <div className="overlay" onClick={() => { history.push({ pathname: `../detail-course/${d.id_course}` }) }}>
                                                            <CImg
                                                                src={categoryImage(d.kategori)}
                                                                className="img-fluid click-image"
                                                                alt="logo PHP"
                                                            />
                                                            <div className="overlay-text">
                                                                <span className="text">
                                                                    {d.nama_course}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <CRow className="mt-2">
                                                            <CCol className="col-auto">
                                                                {d.jumlah_modul} Modul
                                                            </CCol>
                                                            <CCol className="text-right">
                                                                <span>
                                                                    {(d.followed.toLocaleString("id-ID")) || (0).toLocaleString("id-ID")}<FontAwesomeIcon icon={faUserGroup} />{"  "}
                                                                </span>
                                                                <span>
                                                                    {d.rating || "-"}<FontAwesomeIcon icon={faStarFull} color="#f59e0b" />
                                                                </span>
                                                            </CCol>
                                                        </CRow>
                                                    </SwiperSlide>
                                                ))
                                            )
                                    }
                                </Swiper>
                            </div>
                        </CContainer >
                    </>
            }
        </div >
    )
}

function RatingSection(props) {
    return (
        <>
            {
                props.rating.map((d, i) => (
                    <CRow className="align-items-center g-2" key={i}>
                        <div className="col-auto">
                            <div className="p-2">
                                <h6 className="mb-0" style={{ width: "36px" }}>{d.rating} star</h6>
                            </div>
                        </div>
                        <div className="col p-0">
                            <div className="p-0">
                                <Progress
                                    percent={d.jumlah_rating / props.rated * 100}
                                    height="8"
                                    ShowPercent={false}
                                    backgroundColor="#ebedef"
                                    boxShadow="none"
                                    color={d.rating === 1 ? "#f17171" : (d.rating === 2 ? "#fecb59" : "#2eb85c")}
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="p-2">
                                <h6 className="mb-0 text-muted">{d.jumlah_rating}</h6>
                            </div>
                        </div>
                    </CRow>
                ))
            }
        </>
    )
}
export default DetailCourse;

