import React, { useState, useEffect } from "react";
import { CContainer } from "@coreui/react";
import "../style.css";
import Navbar from "../dashboard/navbarDashboard";
import { useParams } from "react-router-dom";
import CourseItem from "../component/CourseItem";
import { api } from "../../plugins/api";
import Loader from "../component/Loader";

function SearchPage() {
    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem("token");
    const keyword = useParams().keyword;

    useEffect(() => {
        setLoading(true)

        api.post("course-by-name", {
            nama_course: keyword,
            token: token
        }).then((res) => {
            setData(res.data.result)
            setLoading(false)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword]);

    return (
        <div className="bg">
            {
                loading ?
                    <Loader loading={loading} />
                    :
                    <>
                        <Navbar />
                        <CContainer>
                            <h2 style={{ marginTop: "80px", fontWeight: "normal" }} className="text-center">
                                Hasil Pencarian Untuk: <b>"{keyword}"</b>
                                <hr />
                            </h2>
                            <br />

                            <CourseItem data={data} />
                        </CContainer>
                    </>
            }
        </div>
    )
}

export default SearchPage;