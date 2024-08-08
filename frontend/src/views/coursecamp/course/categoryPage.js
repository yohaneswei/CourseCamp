import React, { useState, useEffect } from "react";
import "../style.css";
import { CButton, CContainer, CTooltip } from "@coreui/react";
import Navbar from "../dashboard/navbarDashboard";
import { useHistory, useParams } from "react-router-dom";
import CourseItem from "../component/CourseItem";
import { api } from "../../plugins/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function CategoryPage(props) {
    const [categories, setCategories] = useState([{}])
    const [selectedCategory, setSelectedCategory] = useState(props.location.selectedCategory)
    const [dataCategory, setDataCategory] = useState([])

    const token = localStorage.getItem("token");
    const history = useHistory();
    const main_category = useParams().main_category;

    useEffect(() => {

        api.post("get-categories-by-main-option", {
            nama: main_category,
            token: token
        }).then((res) => {
            setCategories(res.data.result)
        })

        if (selectedCategory) {
            api.post("course-by-category", {
                kategori: selectedCategory,
                token: token
            }).then((res) => {
                setDataCategory(res.data.result)
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [main_category, selectedCategory]);

    return (
        <div className="bg">
            <Navbar />
            <CContainer style={{ marginBottom: "55px" }}>
                <h2 style={{ marginTop: "80px" }} className="text-center">
                    <CTooltip
                        content="Kembali"
                        placement="top"
                    >
                        <CButton
                            active
                            color="secondary"
                            style={{ float: 'left', color: 'black', cursor: "pointer" }}
                            aria-pressed="true"
                            onClick={() =>
                                history.push({ pathname: `../../course-dashboard` })
                            }
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </CButton>
                    </CTooltip>

                    Kategori : {" "}
                    <span style={{ textDecoration: "underline" }}>
                        {main_category}
                    </span>
                    <hr />
                </h2>

                <div>
                    <ul className="list-inline scrollmenu" id="filter">
                        {
                            categories.length > 0 ?
                                categories.map((d, i) => (
                                    <li className={`list-inline-item ${selectedCategory && selectedCategory === d.label && "category-active"}`} key={i} onClick={() => setSelectedCategory(d.label)}>
                                        {d.label}
                                    </li>
                                ))
                                :
                                <div>
                                    Belum Terdapat Bahasa Pemrograman yang ditambahkan pada kategori {main_category}
                                </div>
                        }
                    </ul>
                </div>
                <br />

                {
                    selectedCategory ?
                        <>
                            {
                                dataCategory.length > 0 ?
                                    <>
                                        {/* <h3>
                                                        Course Populer
                                                    </h3>
                                                    <CourseItem data={dataCategory} /> */}

                                        <h3
                                        // style={{ marginTop: "50px" }}
                                        >
                                            Baru saja ditambahkan
                                        </h3>
                                        <CourseItem data={dataCategory} />
                                    </>
                                    :
                                    <div className="text-center" style={{ marginTop: '100px' }}>
                                        Belum terdapat konten pembelajaran yang tersedia untuk bahasa pemrograman {selectedCategory}
                                    </div>
                            }
                        </>
                        :
                        <div className="text-center" style={{ marginTop: '100px' }}>
                            Silahkan memilih bahasa pemrograman yang tersedia untuk menampilkan konten pembelajaran
                        </div>
                }
            </CContainer>
        </div >
    )
}

export default CategoryPage;