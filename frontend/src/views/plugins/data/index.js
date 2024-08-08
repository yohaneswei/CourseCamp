
import Web from '../../gambar/main_category/Pemrograman_Web/Pemrograman_Web.jpg'
import React from '../../gambar/main_category/Pemrograman_Web/category/ReactJs.png'
import Java from '../../gambar/main_category/Pemrograman_Web/category/Java.png'
import JavaScript from '../../gambar/main_category/Pemrograman_Web/category/JavaScript.png'
import HTML from '../../gambar/main_category/Pemrograman_Web/category/HTML.png'
import CSS from '../../gambar/main_category/Pemrograman_Web/category/CSS.png'
import PHP from '../../gambar/main_category/Pemrograman_Web/category/PHP.png'

import Mobile from '../../gambar/main_category/Pemrograman_Mobile/Pemrograman_Mobile.jpg'
import Kotlin from '../../gambar/main_category/Pemrograman_Mobile/category/Kotlin.png'

import ML from '../../gambar/main_category/Machine_Learning/Machine_Learning.jpg'
import Python from '../../gambar/main_category/Machine_Learning/category/Python.png'

import NotFound from '../../gambar/main_category/Not_Found.jpg'

export const mainCategoryImage = (value) => {
    if (value === "Pemrograman Web") {
        return Web
    }
    else if (value === "Pemrograman Mobile") {
        return Mobile;
    }
    else if (value === "Machine Learning") {
        return ML;
    }

    return NotFound;
}

export const categoryImage = (value) => {
    if (value === "React.js") {
        return React
    }
    else if (value === "Java") {
        return Java;
    }
    else if (value === "JavaScript") {
        return JavaScript;
    }
    else if (value === "HTML") {
        return HTML;
    }
    else if (value === "CSS") {
        return CSS;
    }
    else if (value === "PHP") {
        return PHP;
    }

    else if (value === "Kotlin") {
        return Kotlin
    }
    else if (value === "React Native") {
        return React
    }

    else if (value === "Python") {
        return Python
    }

    return NotFound;
}

export const carauselImage = [
    {
        image: "https://www.gamelab.id/uploads/news/berita-2640-15-bahasa-pemrograman-populer--pemula-wajib-tahu-20230720-110811.jpg",
        href: "https://www.gamelab.id/news/2640-15-bahasa-pemrograman-populer--pemula-wajib-tahu"
    },
    {
        image: "https://global-uploads.webflow.com/6100d0111a4ed76bc1b9fd54/616fca94015e077927e08499_1*HLGtY6O2vUHqIyEbWdmBgA.jpeg",
        href: "https://www.binaracademy.com/blog/cara-belajar-pemrograman-untuk-pemula"
    },
    {
        image: "https://www.gamelab.id/uploads/news/berita-1830-5-bahasa-pemrograman-populer-untuk-membuat-mobile-app-20220920-111416.png",
        href: "https://www.gamelab.id/news/1830-5-bahasa-pemrograman-populer-untuk-membuat-mobile-app"
    },
]

export const FEUrl = `http://localhost:3000/#/`
export const BEUrl = `http://localhost:8082`
export const BEPythonUrl = `http://localhost:8083`