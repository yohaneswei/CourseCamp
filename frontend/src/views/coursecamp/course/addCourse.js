import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CContainer, CButton, CCol, CRow, CImg, CInput, CTextarea, CForm, CTooltip } from "@coreui/react";
import Navbar from "../dashboard/navbarDashboard";
import "../style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import { api, authToken } from '../../plugins/api';
import swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { categoryImage } from "../../plugins/data";
import Loader from "../component/Loader";

function AddCourse() {
    const [course, setCourse] = useState({
        nama: "",
        deskripsi: "",
        sumber: ""
    })

    const [selectedMainCategory, setSelectedMainCategory] = useState(null);
    const [mainCategoryOptions, setMainCategoryOptions] = useState([])

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([])

    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const difficultyOptions = [
        { value: 'Mudah', label: 'Mudah' },
        { value: 'Menengah', label: 'Menengah' },
        { value: 'Sulit', label: 'Sulit' }
    ]

    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const token = localStorage.getItem("token")

    const validasi = (e) => {
        e.preventDefault()

        if (course.nama.length === 0) {
            swal.fire('Peringatan!', 'Judul tidak boleh kosong!', 'warning');
        }
        else if (!selectedCategory) {
            swal.fire('Peringatan!', 'Kategori tidak boleh kosong!', 'warning');
        }
        else if (!selectedDifficulty) {
            swal.fire('Peringatan!', 'Tingkat Kesulitan tidak boleh kosong!', 'warning');
        }
        else if (course.deskripsi.length === 0) {
            swal.fire('Peringatan!', 'Deskripsi tidak boleh kosong!', 'warning');
        }
        else if (course.deskripsi[0] === " " || course.nama[0] === " ") {
            swal.fire('Peringatan', "Jangan menggunakan spasi pada awal kata, jika mengalami masalah silahkan muat ulang!", 'warning');
        }
        else if (course.nama.length > 100) {
            swal.fire('Peringatan!', 'Judul tidak boleh melebihi 100 kata', 'warning');
        }
        else if (course.deskripsi.length > 600) {
            swal.fire('Peringatan', "Maksimal Karakter untuk Deskripsi adalah 600", 'warning');
        }
        else if (course.sumber.length === 0) {
            swal.fire('Peringatan!', 'Sumber tidak boleh kosong!', 'warning');
        }
        else {
            insertCourse()
        }
    }

    const handleChangeCourse = (name, value) => {
        setCourse({ ...course, [name]: value });
    };

    const handleMainCategoryChange = (selectedOption) => {
        setSelectedMainCategory(selectedOption);
        if (selectedCategory) {
            setSelectedCategory(null);
        }
    };

    const insertCourse = () => {
        api.post(`insert-course`, {
            id_category: selectedCategory.value,
            nama: course.nama,
            kesulitan: selectedDifficulty.value,
            deskripsi: course.deskripsi,
            sumber: course.sumber,
            token: token
        }).then((res) => {
            swal.fire('Sukses', res.data.message, 'success');
            history.push({ pathname: `../profile-admin` })
        })
    }

    const getMainCategoriesOptions = () => {
        api.post(`get-maincategories-option`, {
            token: token
        }).then((res) => {
            setMainCategoryOptions(res.data.result);
            setLoading(false)
        })
    }

    const getCategoriesOptions = () => {
        api.post(`get-subcategories-option`, {
            token: token
        }).then((res) => {
            setCategoryOptions(res.data.result);
            setLoading(false)
        })
    }

    useEffect(() => {
        setLoading(true)

        if (authToken().isa === 0) {
            history.push({ pathname: `../course-dashboard` })
        }

        getMainCategoriesOptions()
        getCategoriesOptions();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="bg">
            {
                loading ?
                    <Loader loading={loading} />
                    :
                    <>
                        <Navbar />
                        <CContainer>
                            <CCard style={{ marginTop: "75px", borderRadius: "10px" }}  >
                                <CCardBody>
                                    <CForm method="POST" onSubmit={(e) => validasi(e)}>

                                        <CRow>
                                            <CCol xxs="12" xs="12" sm="12" md="4" >
                                                <div style={{ position: "sticky", top: "100px" }}>
                                                    <CImg
                                                        src={categoryImage(selectedCategory && (selectedCategory.label || ""))}
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
                                                            type="submit"
                                                        >
                                                            Tambah
                                                        </CButton>
                                                    </div>
                                                </div>
                                            </CCol>
                                            <CCol md="8">
                                                <CRow>
                                                    <CCol>
                                                        <CInput
                                                            id="name"
                                                            placeholder="Silahkan isi judul course"
                                                            maxLength={100}
                                                            value={course.nama}
                                                            onChange={(e) => handleChangeCourse("nama", e.target.value)}
                                                        />
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
                                                                onClick={() => window.history.go(-1)}
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={faArrowLeft} />
                                                            </CButton>
                                                        </CTooltip>
                                                    </CCol>
                                                </CRow>
                                                <div className="mt-2">
                                                    <div className="title">
                                                        Kategori:
                                                    </div>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <Select
                                                                value={selectedMainCategory}
                                                                onChange={handleMainCategoryChange}
                                                                options={mainCategoryOptions}
                                                                placeholder="Pilih Jenis Pemrograman"
                                                            />
                                                        </CCol>

                                                        <CCol md="4">
                                                            <Select
                                                                value={selectedCategory}
                                                                onChange={setSelectedCategory}
                                                                options={(selectedMainCategory && (categoryOptions.filter((data) => data.id_main === selectedMainCategory.value) || categoryOptions))}
                                                                placeholder="Pilih Bahasa Pemrograman"
                                                                isDisabled={!selectedMainCategory}
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                </div>
                                                <div className="mt-2">
                                                    <div className="title">
                                                        Tingkat Kesulitan:
                                                    </div>
                                                    <CRow>
                                                        <CCol md="4">
                                                            <Select
                                                                defaultValue={selectedDifficulty}
                                                                onChange={setSelectedDifficulty}
                                                                options={difficultyOptions}
                                                                placeholder="Pilih Tingkat Kesulitan"
                                                            />
                                                        </CCol>
                                                    </CRow>
                                                </div>

                                                <div className="mt-2">
                                                    <div className="title">
                                                        Deskripsi :
                                                    </div>
                                                    <div className="description" >
                                                        <CTextarea
                                                            id="description"
                                                            placeholder="Silahkan isi deskripsi course"
                                                            rows="4"
                                                            style={{ resize: "none" }}
                                                            maxLength={600}
                                                            value={course.deskripsi}
                                                            onChange={(e) => handleChangeCourse("deskripsi", e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <div className="title">
                                                        Modul :
                                                    </div>
                                                    <div>
                                                        Modul baru dapat ditambahkan melalui menu edit ketika course berhasil ditambahkan
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <div className="title">
                                                        Sumber :
                                                    </div>
                                                    <CInput
                                                        id="sumber"
                                                        placeholder="Silahkan isi sumber course"
                                                        maxLength={100}
                                                        value={course.sumber}
                                                        onChange={(e) => handleChangeCourse("sumber", e.target.value)}
                                                    />
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CContainer >
                    </>
            }
        </div >
    )
}


export default AddCourse;