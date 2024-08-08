import React from "react";
import Navbar from "./navbar";
import Jumbotron from "./jumbotron";
import Review from "./review";
import Brand from "./brand";
import Footer from "./footer";
import "../style.css";

function Index() {

    return (
        <div className="bg">
            <Navbar />
            <Jumbotron />
            <Review />
            <Brand />
            <Footer />
        </div >
    )
}

export default Index;