import React from "react";
import { CCol, CRow, CImg } from "@coreui/react";
import "../style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { categoryImage } from "../../plugins/data";
import { useHistory } from "react-router-dom";
// import InfiniteScroll from "react-infinite-scroll-component";

function CourseItem(props) {
    const history = useHistory();

    // const [dataSource, setDataSource] = useState(Array.from({ length: 20 }))
    // const [hasMore, setHasMore] = useState(true)

    // const fetchMoreData = () => {
    //     if (dataSource.length < 200) {
    //         setTimeout(() => {
    //             setDataSource(dataSource.concat(Array.from({ length: 20 })))
    //         }, 300)
    //     } else {
    //         setHasMore(false);
    //     }
    // }

    return (
        <CRow>
            {/* <InfiniteScroll
                dataLength={dataSource.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4 className="text-center">Loading...</h4>}
                endMessage={<h4 className="text-center">You Have Reached The End...</h4>}
            >
                {
                    dataSource.map((d, i) => (
                        <div>
                            this is a div #{i + 1}
                        </div>
                    ))
                }
            </InfiniteScroll> */}
            {props.data.length > 0 ?
                props.data.map((d, i) => (
                    <CCol md="3" style={{ marginBottom: "20px" }} key={i}>
                        <div className="overlay" onClick={() => {
                            history.push({
                                pathname: `../detail-course/${d.id_course}`
                            })
                        }}>
                            <CImg
                                src={categoryImage(d.kategori)}
                                className="img-fluid click-image"
                                alt={`logo ${d.kategori}`}
                            />
                            <div className="overlay-text">
                                <span className="text">
                                    {d.nama_course}
                                </span>
                            </div>
                        </div>

                        <CRow className="mt-2">
                            <CCol>
                                {d.total_modul} Modul
                            </CCol>
                            <CCol className="text-right">
                                <span className="mr-2">
                                    {(d.followed.toLocaleString("id-ID")) || (0).toLocaleString("id-ID")}<FontAwesomeIcon icon={faUserGroup} />
                                </span>
                                <span>
                                    {d.rating || "-"}<FontAwesomeIcon icon={faStar} color="#f59e0b" />
                                </span>
                            </CCol>
                        </CRow>
                    </CCol>
                ))
                :
                <CCol>
                    <div className="text-center" style={{ marginTop: '100px' }}>
                        Course Tidak Ditemukan!
                    </div>
                </CCol>
            }
        </CRow >
    )
}

export default CourseItem;