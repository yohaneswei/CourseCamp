-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2024 at 02:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `coursecamp2`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `ID_CATEGORY` int(11) NOT NULL,
  `ID_MAIN` int(11) NOT NULL,
  `NAMA` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID_CATEGORY`, `ID_MAIN`, `NAMA`) VALUES
(1, 1, 'React.js'),
(2, 1, 'Java'),
(3, 1, 'JavaScript'),
(4, 1, 'HTML'),
(5, 1, 'CSS'),
(6, 1, 'PHP'),
(7, 2, 'Kotlin'),
(8, 2, 'Java'),
(9, 2, 'React Native'),
(10, 3, 'Python');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `ID_COURSE` int(11) NOT NULL,
  `ID_CATEGORY` int(11) NOT NULL,
  `NAMA` varchar(30) NOT NULL,
  `KESULITAN` varchar(10) NOT NULL,
  `DESKRIPSI` varchar(500) NOT NULL,
  `TGL_DIBUAT` date NOT NULL DEFAULT current_timestamp(),
  `SUMBER` varchar(50) NOT NULL,
  `STATUS` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`ID_COURSE`, `ID_CATEGORY`, `NAMA`, `KESULITAN`, `DESKRIPSI`, `TGL_DIBUAT`, `SUMBER`, `STATUS`) VALUES
(21, 4, 'HTML: Fundamentals', 'Mudah', 'Siap untuk memulai perjalanan Anda dalam bahasa pemrograman HTML? Ikuti Belajar HTML: Dasar. Semua situs web menggunakan HTML—itu adalah bagian mendasar dari setiap toolkit pengembang web. HTML digunakan untuk menyediakan konten yang membentuk struktur halaman web', '2024-01-08', 'www.codecademy.com', 1),
(22, 1, 'Pengenalan React.js', 'Mudah', 'Siap untuk memulai perjalanan Anda ke dalam React? Ikuti kursus \"Learn React: Introduction\" — React menawarkan solusi yang elegan untuk beberapa masalah yang persisten dalam pemrograman front-end, memungkinkan Anda membangun aplikasi web yang dinamis dan interaktif dengan mudah. React cepat, dapat d', '2024-01-08', 'www.codecademy.com', 1),
(23, 1, 'React: Redux', 'Menengah', 'Jika Anda sedang membangun aplikasi React, kemungkinan Anda sedang berbagi beberapa jenis data antar komponen React. Ketika aplikasi berkembang dan berbagi data tersebut menjadi lebih kompleks, saatnya menggunakan perpustakaan manajemen state.', '2024-01-10', 'www.codecademy.com', 1),
(24, 6, 'Pengenalan PHP', 'Mudah', 'Siap untuk memulai perjalanan Anda ke dalam bahasa pemrograman PHP? Pelajari bagaimana PHP digunakan dalam pengembangan web modern untuk membuat aplikasi web dinamis. Anda akan membangun dasar yang kuat dalam PHP, di atasnya Anda dapat memahami konsep pemrograman yang lebih kompleks.', '2024-01-10', 'www.codecademy.com', 1),
(25, 5, 'Learn CSS', 'Mudah', 'Anda akan menemukan bahwa belajar CSS sangat penting dalam menata gaya situs web. Pengembang web menggunakannya untuk membangun dasar HTML dasar dan menambahkan kepribadian pada halaman teks biasa. Kursus ini membantu Anda memperluas dasar pemrograman Anda dan memberikan latihan interaktif CSS sehingga Anda dapat mulai menambahkan warna dan gambar latar belakang atau mengedit tata letak untuk membuat halaman web bergaya unik Anda sendiri.', '2024-01-10', 'www.codecademy.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `konten`
--

CREATE TABLE `konten` (
  `ID_KONTEN` int(11) NOT NULL,
  `ID_MATERI` int(11) NOT NULL,
  `TEXT` varchar(1000) DEFAULT NULL,
  `URL_GAMBAR` varchar(200) DEFAULT NULL,
  `URL_VIDEO` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `konten`
--

INSERT INTO `konten` (`ID_KONTEN`, `ID_MATERI`, `TEXT`, `URL_GAMBAR`, `URL_VIDEO`) VALUES
(14, 73, '<p>Jadi, apa sebenarnya HTML itu? HTML memberikan struktur pada konten yang muncul di sebuah situs web, seperti gambar, teks, atau video. Klik kanan pada halaman apa pun di internet, pilih \"Inspect,\" dan Anda akan melihat HTML dalam sebuah panel di layar Anda.</p>', '', ''),
(15, 73, '<p>HTML adalah singkatan dari HyperText Markup Language:</p><ul><li>Sebuah bahasa markup adalah bahasa komputer yang menentukan struktur dan tata letak dari teks mentah.</li><li>Dalam HTML, komputer dapat menginterpretasikan teks mentah yang dibungkus dalam elemen HTML.</li><li>HyperText adalah teks yang ditampilkan pada komputer atau perangkat yang menyediakan akses ke teks lain melalui tautan, juga dikenal sebagai hyperlink.</li></ul>', '', ''),
(16, 73, '<p>Belajar HTML merupakan langkah pertama dalam membuat situs web, tetapi bahkan sedikit pengetahuan dapat membantu Anda menyisipkan potongan kode ke dalam template newsletter, blog, atau situs web. Saat Anda terus belajar, Anda dapat menggabungkan HTML dengan CSS dan JavaScript untuk membuat situs web yang visual menarik dan dinamis. Namun, untuk saat ini, kita akan fokus pada cara menambahkan dan mengubah konten dasar di sebuah halaman, seperti teks, gambar, dan video. Jangan khawatir jika situs web terlihat jelek — kita baru saja memulai</p>', '', ''),
(17, 74, '<p>HTML terdiri dari elemen-elemen. Elemen-elemen ini membentuk struktur halaman web dan mendefinisikan kontennya. Mari kita lihat bagaimana elemen-elemen ditulis.</p><p>Diagram di sebelah kanan menampilkan elemen paragraf HTML. Seperti yang terlihat, elemen paragraf terdiri dari:</p><ul><li>Tag pembuka (&lt;p&gt;)</li><li>Konten (\"Hello World!\" teks)</li><li>Tag penutup (&lt;/p&gt;)</li></ul>', '', ''),
(18, 74, '<p>Sebuah tag dan kontennya disebut elemen HTML. Ada banyak tag yang dapat kita gunakan untuk mengorganisir dan menampilkan teks serta berbagai jenis konten, seperti gambar.</p><p>Mari kita tinjau dengan cepat setiap bagian dari elemen yang terlihat:</p><ul><li><strong>Elemen HTML (atau hanya, elemen)</strong>: Satuan konten dalam dokumen HTML yang terbentuk dari tag HTML dan teks atau media yang berisikan.</li><li><strong>Tag HTML:<span class=\"ql-cursor\">﻿</span></strong> Nama elemen, dikelilingi oleh tanda kurung sudut pembuka (&lt;) dan penutup (&gt;) yang menandai awal dan akhir elemen.</li><li><strong>Tag Pembuka:</strong> Tag HTML pertama yang digunakan untuk memulai elemen HTML. Jenis tag dikelilingi oleh tanda kurung sudut pembuka dan penutup.</li><li><strong>Konten:</strong> Informasi (teks atau elemen lain) yang terdapat di antara tag pembuka dan penutup suatu elemen HTML.</li><li><strong>Tag Penutup:</strong> Tag HTML kedua yang digunakan untuk mengakhiri elemen HTML. Tag pe', '', ''),
(19, 74, '<p>Dengan pemahaman ini, Anda dapat mulai membuat dan memahami elemen-elemen dasar HTML untuk membangun struktur halaman web.</p>', '', ''),
(20, 74, '', 'https://miro.medium.com/v2/resize:fit:714/1*kMVRmph65ha5LWzcutz9ZA.png', ''),
(21, 75, '<p>Salah satu elemen HTML kunci yang digunakan untuk membangun halaman web adalah elemen body. Hanya konten di antara tag pembuka dan penutup body yang dapat ditampilkan di layar. Berikut adalah contoh tag pembuka dan penutup body:</p>', '', ''),
(22, 75, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1193638841966395442/image.png?ex=65ad71cc&is=659afccc&hm=ce4661bccafb135562592f112a44274349bf0d4872c5a2087495f2bc0aa66d30&', ''),
(23, 75, '<p>Setelah file memiliki elemen body, berbagai jenis konten, termasuk teks, gambar, dan tombol, dapat ditambahkan ke dalam body. </p><p>Contoh penggunaan elemen body untuk menambahkan sebuah paragraf:</p>', '', ''),
(24, 75, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1193639280531226674/image.png?ex=65ad7235&is=659afd35&hm=7246338ac55cf8ca03ad218cf91e08b09f54f63fbfdb31a8b7bed4033ea3e9dc&', ''),
(25, 75, '<p>Dengan menempatkan konten di dalam elemen body, Anda dapat mulai membangun struktur halaman web dan menampilkan informasi kepada pengguna. Semua elemen dan konten di dalam elemen body akan muncul di halaman web saat diakses melalui browser.</p>', '', ''),
(26, 77, '<p>HTML diorganisir sebagai kumpulan hubungan pohon keluarga. Seperti yang Anda lihat pada latihan terakhir, kita menempatkan tag &lt;p&gt; di dalam tag &lt;body&gt;. Ketika sebuah elemen berada di dalam elemen lain, itu dianggap sebagai anak dari elemen tersebut. Elemen anak tersebut dikatakan bersarang di dalam elemen induk.</p>', '', ''),
(27, 77, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1193639950281887875/image.png?ex=65ad72d4&is=659afdd4&hm=49c8088feab585725d83c32c924d6a1b91afb85ac82eae0f3be005c9f1b40a3c&', ''),
(28, 77, '<p>Pada contoh di atas, elemen &lt;p&gt; bersarang di dalam elemen &lt;body&gt;. Elemen &lt;p&gt; dianggap sebagai anak dari elemen &lt;body&gt;, dan elemen &lt;body&gt; dianggap sebagai elemen induk. Anda juga dapat melihat bahwa kami menambahkan dua spasi indentasi (menggunakan spasi) untuk meningkatkan keterbacaan.</p><p>Karena bisa ada beberapa tingkatan penanaman, analogi ini dapat diperluas hingga kepada cucu, cicit, dan seterusnya. Hubungan antara elemen dan elemen leluhur serta elemen keturunan mereka dikenal sebagai hirarki.</p><p>Mari kita pertimbangkan contoh yang lebih rumit yang menggunakan beberapa tag baru:</p>', '', ''),
(29, 77, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1193640306197942352/image.png?ex=65ad7329&is=659afe29&hm=0aac49d84cbd8815c1f6ad71bf416af1ce370c42ff0928c8aca7d34cbb44c180&', ''),
(30, 77, '<p>Pada contoh ini, elemen &lt;body&gt; adalah induk dari elemen &lt;div&gt;. Keduanya elemen &lt;h1&gt; dan &lt;p&gt; adalah anak dari elemen &lt;div&gt;. Karena elemen &lt;h1&gt; dan &lt;p&gt; berada pada tingkat yang sama, mereka dianggap sebagai saudara dan keduanya adalah cucu dari elemen &lt;body&gt;.</p><p>Memahami hirarki HTML penting karena elemen anak dapat mewarisi perilaku dan gaya dari elemen induk mereka. Anda akan mempelajari lebih lanjut tentang hirarki halaman web ketika Anda mulai menggali ke dalam CSS.</p>', '', ''),
(31, 78, '<p>Terdapat banyak situs web di Internet yang menampilkan informasi seperti harga saham, skor olahraga, data faktur, dan lain-lain. Data ini bersifat tabular, artinya tabel seringkali menjadi cara terbaik untuk menyajikan data tersebut.</p>', '', ''),
(32, 78, '<p>Pada bagian ini dari kursus, kita akan belajar cara menggunakan elemen HTML &lt;table&gt; untuk menyajikan informasi dalam bentuk tabel dua dimensi kepada pengguna.</p>', '', ''),
(33, 79, '<p>Sebelum menampilkan data, kita harus membuat tabel yang akan mengandung data tersebut dengan menggunakan elemen &lt;table&gt;.</p>', '', ''),
(34, 79, '', 'https://media.discordapp.net/attachments/619815534724382720/1193650473941610577/image.png?ex=65ad7ca1&is=659b07a1&hm=63ef152fc221eb6a59d5160b3a69a76ceb1ac13e20e16f80c617984f7e0a9e1d&=&format=webp&qual', ''),
(35, 79, '<p>Elemen &lt;table&gt; ini akan mengandung semua data tabular yang ingin kita tampilkan.</p>', '', ''),
(36, 80, '<p>Dalam banyak program yang menggunakan tabel, tabel sudah terdefinisi sebelumnya, artinya tabel tersebut sudah berisi baris, kolom, dan sel-sel yang akan menampung data. Dalam HTML, semua komponen ini harus dibuat.</p><p>Langkah pertama dalam memasukkan data ke dalam tabel adalah dengan menambahkan baris menggunakan elemen baris tabel: <code style=\"color: var(--tw-prose-code);\">&lt;tr&gt;</code>.</p>', '', ''),
(37, 80, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1193651269575913565/image.png?ex=65ad7d5f&is=659b085f&hm=7132fe6055bab387b8d34024fec3c842f86fe949d0d09e161397a462eca7e40d&', ''),
(38, 81, '<p>Baris saja tidak cukup untuk menambahkan data ke dalam tabel. Setiap elemen sel juga harus didefinisikan. Dalam HTML, Anda dapat menambahkan data menggunakan elemen data tabel: &lt;td&gt;.</p>', '', ''),
(39, 81, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1193651757184720946/image.png?ex=65ad7dd3&is=659b08d3&hm=bcc07bbcc68747158e998490b85b5ad78278942960cdd7f16f720ef8688f224a&', ''),
(40, 81, '<p>Pada contoh di atas, dua data (73 dan 81) dimasukkan dalam satu baris yang ada. Dengan menambahkan dua data, kita membuat dua sel data.</p><p>Jika tabel tersebut ditampilkan di browser, akan menampilkan sebuah tabel dengan satu baris dan dua kolom.</p>', '', ''),
(41, 82, '<p>Data tabel tidak akan memiliki makna tanpa adanya judul yang menjelaskan apa yang diwakili oleh data tersebut.</p><p>Untuk menambahkan judul ke baris dan kolom, Anda dapat menggunakan elemen judul tabel: <code style=\"color: var(--tw-prose-code);\">&lt;th&gt;</code>.</p><p>Elemen judul tabel digunakan sama seperti elemen data tabel, kecuali dengan judul yang relevan. Seperti data tabel, judul tabel harus ditempatkan dalam sebuah baris tabel.</p>', '', ''),
(42, 82, '', 'https://media.discordapp.net/attachments/619815534724382720/1193652850677518486/image.png?ex=65ad7ed8&is=659b09d8&hm=c1f5319105262707a9e31f21c7532271c9532d0d8b36083f9ad17670634f330d&=&format=webp&qual', ''),
(43, 82, '<p>Apa yang terjadi dalam kode di atas?</p><p>Pertama, sebuah baris baru ditambahkan untuk menampung tiga judul: judul kosong, judul Sabtu, dan judul Minggu. Judul kosong menciptakan sel tambahan yang diperlukan untuk menyelaraskan judul tabel dengan benar di atas data yang sesuai.</p><p>Pada baris kedua, satu judul tabel ditambahkan sebagai judul baris: Suhu.</p><p>Ketika dirender, kode ini akan tampak mirip dengan gambar berikut:</p>', '', ''),
(44, 82, '', 'https://media.discordapp.net/attachments/619815534724382720/1193653099479453846/image.png?ex=65ad7f13&is=659b0a13&hm=06d64c64252544e8fc4819c9f74f45f95e6aef5c619b6d56f63557e4a7329837&=&format=webp&qual', ''),
(45, 82, '<p>Perhatikan juga penggunaan atribut scope, yang dapat memiliki salah satu dari dua nilai:</p><ul><li>row - nilai ini membuat jelas bahwa judul tersebut adalah untuk sebuah baris.</li><li>col - nilai ini membuat jelas bahwa judul tersebut adalah untuk sebuah kolom.</li></ul><p>Kode HTML untuk tabel mungkin terlihat sedikit aneh pada awalnya, tetapi menganalisanya satu per satu membantu membuat kode tersebut lebih dapat dimengerti.</p>', '', ''),
(46, 83, '<p>Sejauh ini, tabel yang telah Anda buat agak sulit dibaca karena tidak memiliki batas.</p><p>Pada versi HTML yang lebih lama, sebuah batas dapat ditambahkan ke dalam tabel menggunakan atribut border dan mengaturnya sama dengan sebuah angka. Angka ini akan mewakili ketebalan batas.</p>', '', ''),
(47, 83, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1193654061073965217/image.png?ex=65ad7ff9&is=659b0af9&hm=9936aab6a95ff76ed7e5b9d0b10ffc616a8dc2e74b9454e25bb17cabbe8f7aa9&', ''),
(48, 83, '<p>Kode dalam contoh di atas sudah tidak disarankan untuk digunakan (deprecated), jadi tolong jangan gunakan. Ini dimaksudkan untuk mengilustrasikan konvensi lama yang mungkin Anda temui ketika membaca kode pengembang lain.</p><p>Meskipun browser mungkin masih akan menginterpretasikan kode Anda dengan benar jika Anda menggunakan atribut border, itu tidak berarti atribut tersebut seharusnya digunakan.</p><p>Kami menggunakan CSS untuk menambahkan gaya ke dokumen HTML, karena itu membantu kita memisahkan struktur sebuah halaman dari tampilannya. Anda dapat mempelajari lebih lanjut tentang CSS di kursus CSS kami.</p><p>Anda dapat mencapai efek batas tabel yang sama menggunakan CSS.</p>', '', ''),
(49, 83, '', 'https://media.discordapp.net/attachments/619815534724382720/1193654294252105899/image.png?ex=65ad8030&is=659b0b30&hm=a43f2ae84efe2cace40ccce6daf7cebb67602dac8a02264803ad1a46a1276167&=&format=webp&qual', ''),
(50, 83, '<p>Kode dalam contoh di atas menggunakan CSS daripada HTML untuk menunjukkan batas tabel.</p>', '', ''),
(51, 84, '<p>Formulir merupakan bagian dari kehidupan sehari-hari. Ketika kita menggunakan formulir fisik dalam kehidupan nyata, kita menulis informasi dan memberikannya kepada seseorang untuk diproses. Pikirkan tentang saat-saat Anda harus mengisi informasi untuk berbagai aplikasi seperti pekerjaan, atau akun bank, atau memberikan kartu saran yang sudah diisi — setiap instansi tersebut adalah sebuah formulir!</p>', '', ''),
(52, 84, '<p>Sama seperti formulir fisik, elemen HTML &lt;form&gt; bertanggung jawab untuk mengumpulkan informasi untuk dikirimkan ke tempat lain. Setiap kali kita menjelajahi internet, kita berhubungan dengan banyak formulir dan mungkin kita bahkan tidak menyadarinya. Ada kemungkinan besar bahwa jika Anda mengetikkan ke dalam suatu bidang teks atau memberikan input, bidang yang Anda ketikkan adalah bagian dari suatu &lt;form&gt;!</p><p>Dalam pelajaran ini, kita akan membahas struktur dan sintaksis dari elemen &lt;form&gt; dan elemen-elemen lain yang mengisi formulir tersebut.</p>', '', ''),
(53, 85, '<p>Kita dapat menganggap internet sebagai jaringan komputer yang saling mengirim dan menerima informasi. Komputer membutuhkan permintaan HTTP untuk mengetahui cara berkomunikasi. Permintaan HTTP memberi petunjuk kepada komputer penerima tentang cara menangani informasi yang masuk. Informasi lebih lanjut dapat ditemukan dalam artikel kami tentang permintaan HTTP.</p><p>Elemen &lt;form&gt; adalah alat yang bagus untuk mengumpulkan informasi, tetapi kemudian kita perlu mengirimkan informasi tersebut ke tempat lain untuk diproses. Kita perlu menyediakan elemen &lt;form&gt; dengan lokasi di mana informasi &lt;form&gt; tersebut akan dikirim dan permintaan HTTP apa yang harus dilakukan. Perhatikan contoh &lt;form&gt; di bawah ini:</p>', '', ''),
(54, 85, '<p>Pada contoh di atas, kita telah membuat kerangka untuk sebuah <code style=\"color: var(--tw-prose-code);\">&lt;form&gt;</code> yang akan mengirimkan informasi ke example.html sebagai permintaan POST:</p><ul><li>Atribut action menentukan tempat informasi dikirimkan.</li><li>Atribut method diberikan kata kerja HTTP yang disertakan dalam permintaan HTTP.</li></ul><p>Catatan: Kata kerja HTTP seperti POST tidak perlu diubah menjadi huruf besar agar permintaan berfungsi, tetapi itu dilakukan berdasarkan konvensi. Pada contoh di atas, kita bisa menulis method=\"post\" dan itu masih akan berfungsi.</p><p>Elemen <code style=\"color: var(--tw-prose-code);\">&lt;form&gt;</code> juga dapat berisi elemen-elemen anak. Misalnya, akan berguna untuk menyediakan header agar pengguna tahu apa yang dimaksudkan dengan <code style=\"color: var(--tw-prose-code);\">&lt;form&gt;</code> ini. Kita juga dapat menambahkan sebuah paragraf untuk memberikan lebih banyak detail. Mari lihat contoh ini dalam kode:</p>', '', ''),
(55, 85, '', 'https://media.discordapp.net/attachments/619815534724382720/1193659659706441798/image.png?ex=65ad852f&is=659b102f&hm=13432f94661f1f8b4043a27a86fbff537f1814f3499d8b031b9d9de47e584249&=&format=webp&qual', ''),
(56, 85, '<p>Contoh di atas tidak mengumpulkan input pengguna apa pun, tetapi kita akan melakukannya pada latihan berikutnya. Untuk saat ini, mari latihan membuat dasar dari elemen HTML &lt;form&gt;!</p>', '', ''),
(57, 86, '<p>Jika kita ingin membuat kolom input dalam &lt;form&gt; kita, kita akan membutuhkan bantuan elemen &lt;input&gt;.</p><p>Elemen &lt;input&gt; memiliki atribut type yang menentukan cara rendering di halaman web dan jenis data apa yang dapat diterimanya.</p><p>Nilai pertama untuk atribut type yang akan kita jelajahi adalah \"text\". Ketika kita membuat elemen &lt;input&gt; dengan type=\"text\", itu akan merender kolom teks yang dapat diisi oleh pengguna. Perlu diingat bahwa nilai default untuk type adalah \"text\". Penting juga untuk menyertakan atribut name pada &lt;input&gt; — tanpa atribut name, informasi dalam &lt;input&gt; tidak akan dikirimkan saat &lt;form&gt; disubmit. Kami akan menjelaskan lebih lanjut tentang pengiriman dan tombol submit pada latihan selanjutnya. Untuk saat ini, mari perhatikan kode berikut yang menghasilkan kolom input teks:</p>', '', ''),
(58, 86, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1193660681346633849/image.png?ex=65ad8623&is=659b1123&hm=dd33d5e3cdc2cbc7b848f9cd07f9f0c3daf66351a0ebf90b01b554298aa2dce0&', ''),
(59, 86, '<p>Berikut adalah tangkapan layar tampilan formulir yang dirender di halaman web untuk browser Chrome (setiap browser memiliki tampilan default yang berbeda). Saat pertama kali dimuat, ini akan menjadi sebuah kotak kosong:</p>', '', ''),
(60, 86, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1193661079713222756/image.png?ex=65ad8682&is=659b1182&hm=7a037b280507ef85ff100544590a7549a1635a0080937ff5e49a92e4d23f8658&', ''),
(61, 86, '<p>Setelah pengguna mengetik ke dalam elemen &lt;input&gt;, nilai atribut value menjadi apa yang diketikkan ke dalam kolom teks. Nilai atribut value dipasangkan dengan nilai atribut name dan dikirim sebagai teks saat formulir disubmit. Misalnya, jika seorang pengguna mengetikkan \"informasi penting\" dalam kolom teks yang dibuat oleh elemen &lt;input&gt; kita:</p>', '', ''),
(62, 86, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1193661130959229028/image.png?ex=65ad868e&is=659b118e&hm=af59bdcb29acfe49ddc15baee0bfbeed9d24ede2dd75714bb5f4a8fb2c75f308&', ''),
(63, 86, '<p>Ketika formulir dikirimkan, teks \"first-text-field=informasi penting\" dikirimkan ke /example.html karena nilai atribut name adalah \"first-text-field\" dan nilai atribut value adalah \"informasi penting\".</p><p>Kita juga dapat menetapkan nilai default untuk atribut value sehingga pengguna memiliki kolom input teks yang sudah diisi ketika mereka pertama kali melihat formulir yang dirender, seperti ini:</p>', '', ''),
(64, 86, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1193661525844570252/image.png?ex=65ad86ec&is=659b11ec&hm=96c6e1024631226a0090e8ab8996651812d47dd67070424016a8a4c39bf31f25&', ''),
(65, 86, '<p>Yang akan merender:</p>', '', ''),
(66, 86, '', 'https://media.discordapp.net/attachments/619815534724382720/1193661651468169387/image.png?ex=65ad870a&is=659b120a&hm=6c983e6fccd6eb52319020638db40acfb85a940c1c677025eb9d1a39de7043da&=&format=webp&qual', ''),
(67, 89, '<p>Pada latihan sebelumnya, kita membuat elemen &lt;input&gt; tetapi kita tidak menyertakan apa pun untuk menjelaskan apa yang digunakan oleh elemen &lt;input&gt;. Agar pengguna dapat mengidentifikasi elemen &lt;input&gt; dengan benar, kita menggunakan elemen &lt;label&gt; yang sesuai namanya.</p><p>Elemen &lt;label&gt; memiliki tag pembuka dan penutup serta menampilkan teks yang ditulis di antara tag pembuka dan penutup. Untuk mengaitkan sebuah &lt;label&gt; dan sebuah &lt;input&gt;, &lt;input&gt; memerlukan atribut id. Kemudian kita memasangkan atribut for dari elemen &lt;label&gt; dengan nilai atribut id dari &lt;input&gt;, seperti ini:</p>', '', ''),
(68, 89, '', 'https://media.discordapp.net/attachments/619815534724382720/1193662429993893908/image.png?ex=65ad87c4&is=659b12c4&hm=8bace8aedcc44ad7ff3906dfeb113d664e35b7759da9173207e6597b8e2c7c8b&=&format=webp&qual', ''),
(69, 89, '<p>Kode di atas akan merender:</p>', '', ''),
(70, 89, '', 'https://media.discordapp.net/attachments/619815534724382720/1193662655177707713/image.png?ex=65ad87fa&is=659b12fa&hm=adf42c4e6ecc067fb3687684fbdb3b7a7e51e9d744e8de1047847eb0e2478d94&=&format=webp&qual', ''),
(71, 89, '<p>Lihat, sekarang pengguna tahu untuk apa elemen &lt;input&gt; tersebut digunakan! Manfaat lain menggunakan elemen &lt;label&gt; adalah ketika elemen ini diklik, elemen &lt;input&gt; yang sesuai akan dihighlight/dipilih.</p>', '', ''),
(72, 92, '<p>JSX adalah ekstensi sintaks untuk JavaScript. Ini dirancang untuk digunakan dengan React. Kode JSX mirip dengan HTML.</p><p>Apa arti dari \"ekstensi sintaks\"?</p><p>Dalam hal ini, ini berarti bahwa JSX bukan JavaScript yang valid. Browser web tidak dapat membacanya!</p><p>Jika sebuah file JavaScript berisi kode JSX, maka file tersebut harus dikompilasi. Ini berarti bahwa sebelum file mencapai browser web, compiler JSX akan menerjemahkan setiap JSX menjadi JavaScript biasa.</p>', '', ''),
(73, 93, '<p>Unit dasar dari JSX disebut elemen JSX.</p><p>Berikut adalah contoh dari sebuah elemen JSX:</p>', '', ''),
(74, 93, '', 'https://media.discordapp.net/attachments/619815534724382720/1194038401062682664/image.png?ex=65aee5ea&is=659c70ea&hm=d76793a8f97c3ef5eb36c12ff00828fe7705e2fce9aef7552af9918b8ea676e7&=&format=webp&qual', ''),
(75, 93, '<p>Elemen JSX ini tampak persis seperti HTML! Satu-satunya perbedaan yang mencolok adalah bahwa Anda akan menemukannya di dalam file JavaScript, bukan di dalam file HTML.</p>', '', ''),
(76, 93, '<p>Elemen JSX diperlakukan sebagai ekspresi JavaScript. Mereka dapat ditempatkan di mana saja ekspresi JavaScript dapat ditempatkan. Ini berarti bahwa sebuah elemen JSX dapat disimpan dalam sebuah variabel, dilewatkan ke dalam sebuah fungsi, disimpan dalam sebuah objek atau array... sesuai kebutuhan.</p><p>Berikut adalah contoh dari sebuah elemen JSX yang disimpan dalam sebuah variabel:</p>', '', ''),
(77, 93, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194038832065159269/image.png?ex=65aee651&is=659c7151&hm=bb2d1037ccf5f371a2d148313b69241b450c268559f7fcdbf31cf65b3fce467f&', ''),
(78, 93, '<p>Berikut adalah contoh beberapa elemen JSX yang disimpan dalam sebuah objek:</p>', '', ''),
(79, 93, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194038875585257522/image.png?ex=65aee65c&is=659c715c&hm=93cb35a16ac8f51cccc50f1f99307ff8ac8201e4554ac009e68e1a95c7e75e57&', ''),
(80, 96, '<p>Ada suatu aturan yang belum kita sebutkan: suatu ekspresi JSX harus memiliki tepat satu elemen terluar.</p><p>Dengan kata lain, kode ini akan berfungsi:</p>', '', ''),
(81, 96, '', 'https://media.discordapp.net/attachments/619815534724382720/1194043027510022255/image.png?ex=65aeea3a&is=659c753a&hm=35a87c33e4bd250a875c553448073cc31c1502268d66fd4f6df6ac36797aa628&=&format=webp&qual', ''),
(82, 96, '<p>Tetapi kode ini tidak akan berfungsi:</p>', '', ''),
(83, 96, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194043186335719484/image.png?ex=65aeea5f&is=659c755f&hm=4251aef904aaf079fe56936d6d84be5e10dfb1d85742bedfb5e45c4685cab8b0&', ''),
(84, 96, '<p>Tag pembuka pertama dan tag penutup terakhir dari suatu ekspresi JSX harus berasal dari elemen JSX yang sama!</p><p>Mudah untuk melupakan aturan ini dan berakhir dengan kesalahan yang sulit didiagnosis.</p><p>Jika Anda melihat bahwa suatu ekspresi JSX memiliki beberapa elemen luar, solusinya biasanya sederhana: bungkus ekspresi JSX dalam elemen &lt;div&gt;.</p>', '', ''),
(85, 97, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194044426301997106/image.png?ex=65aeeb87&is=659c7687&hm=1e6dc3e72a9ca269fb928b13e270793dc4f875c326f15fbfeab99fa37f7e1b48&', ''),
(86, 97, '<p>Sebelum kita mulai, sangat penting untuk memahami bahwa React mengandalkan dua hal untuk merender: konten apa yang akan dirender dan di mana meletakkan kontennya.</p><p>Dengan itu diingat, mari kita lihat baris pertama</p>', '', ''),
(87, 97, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194044601162530856/image.png?ex=65aeebb1&is=659c76b1&hm=e6a480d77fc664cfc18d9839df966d37187f38ff34be314b75195ade8eb6ac33&', ''),
(88, 97, '<p>Pada baris ini:</p><ul><li>Menggunakan objek document yang mewakili halaman web kita.</li><li>Menggunakan metode getElementById() dari document untuk mendapatkan objek Element yang mewakili elemen HTML dengan id yang dilewatkan (app).</li><li>Menyimpan elemen tersebut dalam variabel container.</li></ul><p>Pada baris selanjutnya:</p>', '', ''),
(89, 97, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194044656875487362/image.png?ex=65aeebbe&is=659c76be&hm=d2ed883e1b655281f7fed93e7489a0f029cbd8dbb510cd94c89f690d4d651089&', ''),
(90, 97, '<p>Terakhir, baris terakhir:</p>', '', ''),
(91, 97, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194050099450490900/image.png?ex=65aef0d0&is=659c7bd0&hm=a2e0ced691e1e243b41b31eb72654106f2342f78354df745e99107a1221891d8&', ''),
(92, 97, '<p>menggunakan metode render() dari root untuk merender konten yang dilewatkan sebagai argumen. Di sini kita melewati elemen &lt;h1&gt;, yang menampilkan Hello world. Ini adalah bagian \"konten apa yang akan dirender\" dari merender dalam React.</p>', '', ''),
(93, 98, '<p>Aplikasi React terdiri dari komponen-komponen.</p><p>Apa itu komponen?</p><p>Sebuah komponen adalah potongan kode kecil yang dapat digunakan kembali yang bertanggung jawab atas satu tugas. Tugas tersebut seringkali adalah untuk merender beberapa HTML dan merender ulangnya ketika beberapa data berubah.</p><p>Perhatikan kode di bawah ini. Kode ini akan membuat dan merender sebuah komponen React baru:</p>', '', ''),
(94, 98, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194051157249757244/image.png?ex=65aef1cc&is=659c7ccc&hm=a48e461fe749a49407f674373a9e51d85ef676f2061f7e04b23e8f7884c16119&', ''),
(95, 98, '<p>Banyak dari ini terlihat tidak asing, tetapi jangan khawatir. Kita akan membongkar kode tersebut, satu per satu. Pada akhir pelajaran ini, Anda akan memahami cara membangun sebuah komponen React!</p>', '', ''),
(96, 99, '<p>Anda telah mempelajari bahwa komponen React adalah potongan kode kecil yang dapat digunakan kembali yang bertanggung jawab atas satu tugas, yang seringkali melibatkan merender HTML dan merender ulangnya ketika beberapa data berubah.</p><p>Berguna untuk memikirkan komponen sebagai bagian-bagian kecil antarmuka kita. Dengan digabungkan, mereka adalah balok bangunan yang membentuk aplikasi React. Di sebuah situs web, kita dapat membuat komponen untuk bilah pencarian, komponen lain untuk bilah navigasi, dan komponen lain untuk konten dasbor itu sendiri.</p><p>Berikut adalah fakta lain tentang komponen: kita dapat menggunakan fungsi JavaScript untuk mendefinisikan komponen React baru. Ini disebut sebagai komponen fungsi.</p><p>Di masa lalu, komponen React didefinisikan menggunakan kelas JavaScript. Tetapi sejak diperkenalkannya Hooks (sesuatu yang akan kita bahas nanti), komponen fungsi telah menjadi standar dalam aplikasi React modern.</p><p>Setelah kita mendefinisikan komponen fungsion', '', ''),
(97, 99, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194056858718183544/image.png?ex=65aef71b&is=659c821b&hm=c50e692cbf2a3bd0d40f6ccc803f9b4b57db6dcf0b2365e545fb71fa2c6b3865&', ''),
(98, 99, '<p>Pada baris ketiga, sebuah fungsi didefinisikan dengan nama MyComponent. Di dalamnya, fungsi tersebut mengembalikan elemen React dalam sintaks JSX:</p>', '', ''),
(99, 99, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194063262094987375/image.png?ex=65aefd12&is=659c8812&hm=80302e321521de08092e0322c9daadf8ff1269b7dbfef934726fb6f6c525fa03&', ''),
(100, 99, '<p>Digabungkan, ini membuat sebuah komponen fungsional React dasar.</p><p>Pada baris terakhir dari blok kode di atas, MyComponent diekspor sehingga dapat digunakan nanti.</p><p>Banyak dari ini masih tidak familiar, tetapi Anda sekarang dapat memahami lebih banyak daripada sebelumnya! Mari terus maju!</p>', '', ''),
(101, 100, '<p>Sebelum kita dapat menggunakan komponen yang telah didefinisikan dan merendernya ke DOM, ada sedikit pekerjaan yang harus kita lakukan.</p><p>Sebelumnya, kita menyebutkan bahwa aplikasi React umumnya memiliki dua file inti: App.js dan index.js. File App.js adalah tingkat atas aplikasi Anda, dan index.js adalah titik masuk.</p><p>Sejauh ini, kita telah mendefinisikan komponen di dalam App.js, tetapi karena index.js adalah titik masuk, kita harus mengekspornya ke index.js untuk dirender.</p><p>Komponen dalam React sangat bagus karena dapat digunakan kembali. Kita dapat menyimpan potongan komponen kita terpisah, terorganisir, dan dapat digunakan kembali dengan meletakkannya di file terpisah dan mengekspornya ke tempat yang kita butuhkan.</p><p>Untuk mengekspornya, kita dapat memberikannya awalan deklarasi ekspor dan menentukan apakah itu ekspor default atau bernama. Dalam hal ini, kita akan menggunakan ekspor default. Jika Anda perlu pembaruan tentang ekspor, lihat dokumen web MDN.</p>', '', ''),
(102, 100, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194108408559845466/image.png?ex=65af271e&is=659cb21e&hm=f5ce5a51c173565fbdbc5cbe03151e120b71ba9446d474856731a4d04c1206b6&', ''),
(103, 100, '<p>Kita bisa masuk ke file index.js untuk mengimpor komponen kita dari \'./App\':</p>', '', ''),
(104, 100, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194108539480846337/image.png?ex=65af273d&is=659cb23d&hm=5f20ca767530887dda12d9311ce212e17a4457ce81863242fd430c596c03c1e7&', ''),
(105, 100, '<p>Ini akan memungkinkan kita menggunakan MyComponent di index.js</p>', '', ''),
(106, 101, '<p>Sekarang kita memiliki komponen fungsional yang telah didefinisikan, kita bisa mulai menggunakannya.</p><p>Kita bisa menggunakannya dengan sintaks mirip HTML yang menyerupai tag self-closing:</p>', '', ''),
(107, 101, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194362305954193448/image.png?ex=65b01393&is=659d9e93&hm=40e953cec255c98711b7b419b63bf3bc27e4136c01036e36c0fc07ee031bd3d1&', ''),
(108, 101, '<p>Jika Anda perlu menyusun komponen lain di antaranya, Anda juga dapat menggunakan struktur tag pembuka dan penutup yang sesuai:</p>', '', ''),
(109, 101, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194362490654572594/image.png?ex=65b013bf&is=659d9ebf&hm=e61787863d9b948d4238da6d04ee15f521a9e3d3a638fdd2691c880693434d02&', ''),
(110, 101, '<p>Namun, untuk merender komponen kita ke browser, kita harus mengandalkan metode .createRoot() dan .render() dari pustaka react-dom. Ini harus dilakukan di titik masuk kita, index.js.</p><p>Pertama, kita panggil metode createRoot untuk membuat wadah root React untuk menampilkan konten. Aplikasi React biasanya memiliki satu node DOM root, dan semua yang berada di dalamnya dikelola oleh React DOM.</p><p>Dengan kata lain, kita memberikan createRoot sebuah elemen DOM untuk merender, dan React akan mengambil alih pengelolaan DOM di dalamnya.</p><p>Berikut adalah contoh:</p>', '', ''),
(111, 101, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194362716006138046/image.png?ex=65b013f5&is=659d9ef5&hm=0cbc6a04d60016de03ba8419178c09b94e7c65eaa1dd48d0c62d48c8ec82b3d9&', ''),
(112, 101, '<p>Bagus! Mari kita bahas lebih lanjut:</p><ul><li>document.getElementById(\'app\') mengembalikan elemen DOM dari index.html.</li><li>.createRoot() menerima elemen DOM sebagai argumen pertama dan membuat root untuknya.</li><li>.createRoot(<strong>)</strong> mengembalikan referensi ke wadah root di mana Anda dapat memanggil metode seperti .render()</li></ul><p>Setelah root dibuat, yang perlu dilakukan hanyalah memanggil metode .render()<strong> </strong>pada root yang dikembalikan dan menampilkan komponen React seperti ini:</p>', '', ''),
(113, 101, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194363391091933184/image.png?ex=65b01496&is=659d9f96&hm=1f7d2f47f141785e6a05606bcf5f2677ba39a15b52237e6d5e3710088ef41eed&', ''),
(114, 101, '<p>Dari sini, React akan menampilkan &lt;MyComponent /&gt; di root dan membuatnya muncul di layar.</p><p>Dalam aplikasi yang sepenuhnya dibangun dengan React, Anda hanya perlu melakukan ini sekali. Setelah ini diatur, React akan mengelola DOM aplikasi Anda, dan semua pembaruan UI diurus dengan efisien. Penambahan lebih banyak komponen seharusnya dilakukan di file App.js tingkat atas Anda.</p>', '', ''),
(115, 102, '<p><u>Props</u> memungkinkan kita menyesuaikan komponen dengan melewatkan informasi ke dalamnya.</p><p>Kita telah belajar bagaimana cara melewatkan informasi ke dalam objek props komponen. Seringkali, Anda ingin komponen menampilkan informasi yang Anda lewatkan.</p><p>Untuk memastikan bahwa komponen fungsi dapat menggunakan objek props, tentukan komponen fungsi Anda dengan props sebagai parameter:</p>', '', ''),
(116, 102, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194367655373709353/image.png?ex=65b0188f&is=659da38f&hm=bb229287a505ecd2b003cf56a167b47ce317b62e50b11829f633a4566f55d2ed&', ''),
(117, 102, '<p>Pada contoh di atas, props diterima sebagai parameter, dan nilai-nilai objek diakses dengan pola akses notasi titik (object.propertyName).</p><p>Sebagai alternatif, karena props adalah objek, Anda juga dapat menggunakan sintaks pemusnahan seperti berikut:</p>', '', ''),
(118, 103, '<p>Setiap komponen memiliki sesuatu yang disebut props.</p><p>Props dari suatu komponen adalah objek. Ini menyimpan informasi tentang komponen tersebut.</p><p>Anda mungkin sudah melihat ini sebelumnya, tetapi mungkin tidak menyadarinya! Mari kita lihat tag tombol HTML. Ada beberapa informasi yang dapat kita berikan kepada tag tombol, seperti jenis tombol.</p>', '', ''),
(119, 103, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194368438357995661/image.png?ex=65b01949&is=659da449&hm=bda897fd07ec768b1aff45e8e6729c2c613ecf634e343b90dcb57fe1b906ffea&', ''),
(120, 103, '<p>Pada contoh ini, kita telah memberikan dua informasi ke tag tombol, yaitu jenis (type) dan nilai (value). Bergantung pada atribut jenis apa yang kita berikan pada elemen &lt;button&gt;, itu akan memperlakukan formulir secara berbeda. Dengan cara yang sama, kita dapat memberikan informasi kepada komponen kita sendiri untuk menentukan perilaku mereka!</p><p>Props memiliki tujuan yang sama untuk komponen seperti argumen untuk fungsi.</p><p>Untuk mengakses objek props dari suatu komponen, Anda dapat merujuk ke objek props dan menggunakan notasi titik untuk propertinya. Berikut adalah contohnya:</p>', '', ''),
(121, 103, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194368704612417566/image.png?ex=65b01989&is=659da489&hm=efcf66e287b33112a8423dfc90470e7af45f058c6b509b76b84acab64f72a464&', ''),
(122, 103, '<p>Ini akan mengambil properti name dari objek props.</p>', '', ''),
(123, 104, '<p>Untuk memanfaatkan props, kita perlu melewatkan informasi ke komponen React. Pada latihan sebelumnya, kita merender objek props yang kosong karena kita tidak melewatkan props apa pun ke komponen PropsDisplayer kita.</p><p>Bagaimana cara kita melewatkan props? Dengan memberikan atribut ke komponen:</p>', '', ''),
(124, 104, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194377445630017727/image.png?ex=65b021ad&is=659dacad&hm=2aff306fb1aa1a48eadb30ade04441c3fc5f22af6aaa672fca46c09b34f061ba&', ''),
(125, 104, '<p>Misalkan Anda ingin melewatkan pesan \"We\'re great!\" ke suatu komponen. Inilah cara melakukannya:</p>', '', ''),
(126, 104, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194377594053873704/image.png?ex=65b021d0&is=659dacd0&hm=bb1baf90ae896f111a654d91deaa5b7fa8233c75491ec1afe07b2cccf6cb603e&', ''),
(127, 104, '<p>Seperti yang Anda lihat, untuk melewatkan informasi ke komponen, Anda memerlukan nama untuk informasi yang ingin Anda lewatkan.</p><p>Pada contoh di atas, kami menggunakan nama message. Anda dapat menggunakan nama apa pun yang Anda inginkan.</p><p>Jika Anda ingin melewatkan informasi yang bukan string, maka bungkus informasi tersebut dalam kurung kurawal. Inilah cara Anda akan melewatkan sebuah array:</p>', '', ''),
(128, 104, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194377833041117398/image.png?ex=65b02209&is=659dad09&hm=5664e52ccde29cd04925aea873e1085d69569eb92889172517f2f949458210fb&', ''),
(129, 104, '<p>Pada contoh berikut, kita melewatkan beberapa informasi ke &lt;Greeting /&gt;. Nilai-nilai yang bukan string dibungkus dalam kurung kurawal:</p>', '', ''),
(130, 104, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194377998833553558/image.png?ex=65b02231&is=659dad31&hm=852e8b5e31083959e2921ea3a0934f3648308f42d86062ccfcde5c7ea1de76bc&', ''),
(131, 105, '<p>Props memungkinkan kita untuk menyesuaikan komponen dengan melewatkan informasi kepadanya.</p><p>Kita telah belajar cara melewatkan informasi ke objek props suatu komponen. Anda seringkali ingin agar komponen menampilkan informasi yang Anda lewatkan.</p><p>Untuk memastikan bahwa komponen fungsi dapat menggunakan objek props, tentukan fungsi komponennya dengan props sebagai parameter:</p>', '', ''),
(132, 105, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194379697744773223/image.png?ex=65b023c6&is=659daec6&hm=75d8f58ccf3731391a5a8f9ca2bc2b15e55c5041ccccb00454ff4630992e5053&', ''),
(133, 105, '<p>Pada contoh di atas, props diterima sebagai parameter, dan nilai-nilai objek diakses dengan pola akses notasi titik (object.propertyName).</p><p>Sebagai alternatif, karena props adalah objek, Anda juga dapat menggunakan sintaksis destruktur seperti ini:</p>', '', ''),
(134, 105, '', 'https://cdn.discordapp.com/attachments/619815534724382720/1194380056420683816/image.png?ex=65b0241b&is=659daf1b&hm=d75e6da7530ca48a581a7803413daa48ee4da25e15bad4a71407eaf53f427d78&', '');

-- --------------------------------------------------------

--
-- Table structure for table `latihan`
--

CREATE TABLE `latihan` (
  `ID_LATIHAN` int(11) NOT NULL,
  `ID_MATERI` int(11) NOT NULL,
  `PERTANYAAN` varchar(100) NOT NULL,
  `STATUS` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `latihan`
--

INSERT INTO `latihan` (`ID_LATIHAN`, `ID_MATERI`, `PERTANYAAN`, `STATUS`) VALUES
(14, 88, 'Apa yang dimaksud dengan elemen HTML?', 1),
(15, 88, 'Apa yang dimaksud dengan tag HTML pembuka?', 1),
(16, 88, 'Apa yang dimaksud dengan hirarki dalam HTML?', 1),
(17, 88, 'Apa fungsi elemen <body> dalam HTML?', 1),
(18, 88, 'Apa yang dimaksud dengan elemen HTML pembuka?', 1),
(19, 106, 'Bagaimana cara mendapatkan elemen HTML dengan ID \'app\' dalam contoh penggunaan React?', 1),
(20, 106, 'Apa fungsi dari createRoot() dalam contoh penggunaan React?', 1),
(21, 106, 'Apa yang dilakukan oleh metode root.render(<h1>Hello world</h1>) dalam contoh penggunaan React?', 1),
(22, 106, 'Mengapa diperlukan ekspresi JSX untuk di-render dalam elemen root?', 1),
(23, 106, 'Apa yang akan terjadi jika sebuah ekspresi JSX memiliki lebih dari satu elemen terluar?', 1),
(24, 107, 'Bagaimana cara mendefinisikan sebuah komponen React menggunakan fungsi?', 1),
(25, 107, 'Apa peran file App.js dalam struktur aplikasi React?', 1),
(26, 107, 'Apa yang dilakukan kode export default MyComponent; pada akhir definisi komponen?', 1),
(27, 107, 'Apa yang dilakukan kode import MyComponent from \'./App\'; pada file index.js?', 1),
(28, 107, 'Mengapa kita menggunakan ekspor default (export default) ketika mengekspor komponen?', 1),
(29, 108, 'Bagaimana cara meneruskan informasi ke props suatu komponen React?', 1),
(30, 108, 'Apa tujuan props pada komponen React?', 1),
(31, 108, 'Apa yang harus dilakukan agar fungsi komponen dapat menggunakan objek props?', 1),
(32, 108, 'Bagaimana Anda dapat mengakses nilai prop di dalam fungsi komponen?', 1),
(33, 108, 'Apa alternatif sintaksis untuk menerima prop menggunakan destructuring?', 1);

-- --------------------------------------------------------

--
-- Table structure for table `learn`
--

CREATE TABLE `learn` (
  `ID_COURSE` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `RATING` int(5) DEFAULT NULL,
  `KOMENTAR` varchar(30) DEFAULT NULL,
  `STATUS` tinyint(1) NOT NULL DEFAULT 0,
  `TGL_MULAI` date NOT NULL DEFAULT current_timestamp(),
  `TGL_SELESAI` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `learn`
--

INSERT INTO `learn` (`ID_COURSE`, `ID_USER`, `RATING`, `KOMENTAR`, `STATUS`, `TGL_MULAI`, `TGL_SELESAI`) VALUES
(22, 1, NULL, NULL, 1, '2024-01-14', NULL),
(22, 18, NULL, NULL, 1, '2024-01-14', NULL),
(22, 19, 5, 'Mantap', 1, '2024-01-14', NULL),
(21, 1, NULL, NULL, 0, '2024-01-15', NULL),
(25, 1, NULL, NULL, 0, '2024-01-15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `main_category`
--

CREATE TABLE `main_category` (
  `ID_MAIN` int(11) NOT NULL,
  `NAMA` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `main_category`
--

INSERT INTO `main_category` (`ID_MAIN`, `NAMA`) VALUES
(1, 'Pemrograman Web'),
(2, 'Pemrograman Mobile'),
(3, 'Machine Learning');

-- --------------------------------------------------------

--
-- Table structure for table `materi`
--

CREATE TABLE `materi` (
  `ID_MATERI` int(11) NOT NULL,
  `ID_MODUL` int(11) NOT NULL,
  `NAMA` varchar(30) NOT NULL,
  `IS_LATIHAN` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materi`
--

INSERT INTO `materi` (`ID_MATERI`, `ID_MODUL`, `NAMA`, `IS_LATIHAN`) VALUES
(73, 76, 'Introduction to HTML', 0),
(74, 76, 'HTML Anatomy', 0),
(75, 76, 'The Body', 0),
(77, 76, 'HTML Structure', 0),
(78, 77, 'Introduction to Table', 0),
(79, 77, 'Create a Table', 0),
(80, 77, 'Table Rows', 0),
(81, 77, 'Table Data', 0),
(82, 77, 'Table Headings', 0),
(83, 77, 'Table Borders', 0),
(84, 78, 'Introduction to HTML Forms', 0),
(85, 78, 'How a Form Works', 0),
(86, 78, 'Text Input', 0),
(88, 76, 'Latihan', 1),
(89, 78, 'Adding a Label', 0),
(92, 81, 'What is JSX', 0),
(93, 81, 'JSX Element', 0),
(96, 81, 'JSX Outer Element', 0),
(97, 81, 'Rendering JSX', 0),
(98, 82, 'React Components', 0),
(99, 82, 'Create a Function Component', 0),
(100, 82, 'Importing and Exporting React ', 0),
(101, 82, 'Using and Rendering a Componen', 0),
(102, 83, 'Props', 0),
(103, 83, 'Access a Component\'s props', 0),
(104, 83, 'Pass props from Component To C', 0),
(105, 83, 'Render a Component\'s props', 0),
(106, 81, 'Latihan', 1),
(107, 82, 'Latihan', 1),
(108, 83, 'Latihan', 1),
(110, 84, 'State', 0),
(111, 84, 'Action', 0),
(112, 84, 'Reducers', 0),
(113, 85, 'What is Redux API?', 0),
(114, 84, 'Rules of Reducers', 0),
(115, 85, 'Create a Redux Store', 0),
(116, 85, 'Dispatch Action to the Store', 0),
(117, 85, 'Action Creators', 0),
(119, 85, 'Respond to State Changes', 0),
(120, 86, 'Introduction to Redux Toolkit', 0),
(121, 86, 'Slices of State', 0),
(122, 86, 'Refatoring with createSlice()', 0),
(123, 86, 'Returned Objects and Auto-Gene', 0),
(124, 87, 'History of PHP', 0),
(125, 87, 'How is PHP used in HTML', 0),
(126, 87, 'How is PHP Executed?', 0),
(127, 87, 'PHP Comments', 0),
(128, 88, 'Strings', 0),
(129, 88, 'Excape Sequences', 0),
(130, 88, 'String Concatenation', 0),
(131, 88, 'Variables', 0),
(132, 88, 'Creating Variables', 0),
(133, 88, 'Using Variaables', 0),
(134, 89, 'Intro to CSS', 0),
(135, 89, 'CSS Anatomy', 0),
(136, 89, 'Styles type', 0),
(137, 89, 'Linking the CSS File', 0),
(138, 90, 'Font Family', 0),
(139, 90, 'Font Size', 0),
(140, 91, 'The Box Model', 0),
(141, 90, 'Font Weight', 0),
(142, 90, 'Text Align', 0),
(143, 90, 'Color and Background Color', 0),
(144, 90, 'Opacity', 0),
(145, 90, 'Background Image', 0),
(146, 90, 'Important', 0),
(147, 91, 'Height and Width', 0),
(148, 91, 'Borders', 0),
(149, 91, 'Border Radius', 0),
(150, 91, 'Padding', 0),
(151, 91, 'Margin', 0),
(152, 91, 'Overflow', 0),
(153, 92, 'Position', 0),
(154, 92, 'Position: Relative', 0),
(155, 92, 'Position: Absolute', 0),
(156, 92, 'Position: Fixed', 0),
(157, 92, 'Position: Sticky', 0),
(158, 92, 'Z-Index', 0);

-- --------------------------------------------------------

--
-- Table structure for table `minat`
--

CREATE TABLE `minat` (
  `ID_USER` int(11) NOT NULL,
  `ID_SKILL` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `minat`
--

INSERT INTO `minat` (`ID_USER`, `ID_SKILL`) VALUES
(1, 1),
(1, 2),
(18, 1),
(18, 2),
(19, 2);

-- --------------------------------------------------------

--
-- Table structure for table `modul`
--

CREATE TABLE `modul` (
  `ID_MODUL` int(11) NOT NULL,
  `ID_COURSE` int(11) NOT NULL,
  `NAMA` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `modul`
--

INSERT INTO `modul` (`ID_MODUL`, `ID_COURSE`, `NAMA`) VALUES
(76, 21, 'Elements and Structure'),
(77, 21, 'Table'),
(78, 21, 'Form'),
(81, 22, 'JSX'),
(82, 22, 'React Component'),
(83, 22, 'Props'),
(84, 23, 'Core Concept in Redux'),
(85, 23, 'Core Redux API'),
(86, 23, 'Redux Toolkit'),
(87, 24, 'Getting Started with PHP'),
(88, 24, 'PHP Strings, Numbers, and Variable'),
(89, 25, 'Syntax and Selectors'),
(90, 25, 'Visual Rules'),
(91, 25, 'The Box Model'),
(92, 25, 'Display and Positioning');

-- --------------------------------------------------------

--
-- Table structure for table `pilihan_jawaban`
--

CREATE TABLE `pilihan_jawaban` (
  `ID_PILIHAN` int(11) NOT NULL,
  `ID_LATIHAN` int(11) NOT NULL,
  `PILIHAN` varchar(100) NOT NULL,
  `IS_JAWABAN` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pilihan_jawaban`
--

INSERT INTO `pilihan_jawaban` (`ID_PILIHAN`, `ID_LATIHAN`, `PILIHAN`, `IS_JAWABAN`) VALUES
(83, 14, 'Satuan konten dalam dokumen HTML yang terbentuk dari tag HTML dan teks atau media yang berisikan.', 1),
(84, 14, 'Nama elemen, dikelilingi oleh tanda kurung sudut pembuka (<) dan penutup (>) yang menandai awal dan ', 0),
(85, 14, 'Tag HTML pertama yang digunakan untuk memulai elemen HTML.', 0),
(86, 14, 'Informasi (teks atau elemen lain) yang terdapat di antara tag pembuka dan penutup suatu elemen HTML.', 0),
(87, 15, 'Satuan konten dalam dokumen HTML yang terbentuk dari tag HTML dan teks atau media yang berisikan.', 0),
(88, 15, 'Nama elemen, dikelilingi oleh tanda kurung sudut pembuka (<) dan penutup (>) yang menandai awal dan ', 0),
(89, 15, 'Tag HTML pertama yang digunakan untuk memulai elemen HTML.', 1),
(90, 15, 'Informasi (teks atau elemen lain) yang terdapat di antara tag pembuka dan penutup suatu elemen HTML.', 0),
(91, 16, 'Tag HTML pertama yang digunakan untuk memulai elemen HTML.', 0),
(92, 16, 'Hubungan antara elemen dan elemen leluhur serta elemen keturunan mereka.', 1),
(93, 16, 'Elemen yang berada di luar elemen lainnya.', 0),
(94, 16, 'Garis miring (/) di dalam tag penutup.', 0),
(95, 17, 'Memasukkan gambar ke dalam halaman web.', 0),
(96, 17, 'Menyediakan judul untuk dokumen, yang ditampilkan di tab browser.', 0),
(97, 17, 'Menandai paragraf teks.', 0),
(98, 17, 'Menyajikan area utama konten yang akan ditampilkan di halaman web.', 1),
(99, 18, 'Satuan konten dalam dokumen HTML yang terbentuk dari tag HTML dan teks atau media yang berisikan.', 0),
(100, 18, 'Nama elemen, dikelilingi oleh tanda kurung sudut pembuka (<) dan penutup (>) yang menandai awal dan ', 1),
(101, 18, 'Tag HTML pertama yang digunakan untuk memulai elemen HTML.', 0),
(102, 18, ' Informasi (teks atau elemen lain) yang terdapat di antara tag pembuka dan penutup suatu elemen HTML', 0),
(103, 19, 'const element = getElement(\'app\');', 0),
(104, 19, 'const element = document.find(\'app\');', 0),
(105, 19, 'const element = document.getElementById(\'app\');', 1),
(106, 19, 'const element = selectElement(\'app\');', 0),
(107, 20, 'Membuat elemen HTML baru.', 0),
(108, 20, 'Membuat root React dari elemen HTML yang ada.', 1),
(109, 20, 'Mengubah struktur root pada dokumen.', 0),
(110, 20, 'Membuat elemen root di dalam container.', 0),
(111, 21, 'Membuat elemen <h1> di dalam root.', 1),
(112, 21, 'Menetapkan konten elemen root menjadi \"Hello world\".', 1),
(113, 21, 'Merender elemen <h1> sebagai konten yang akan ditampilkan.', 1),
(114, 21, 'Menghapus elemen root dari container.', 1),
(115, 22, 'Karena JSX membuat elemen HTML yang unik.', 0),
(116, 22, 'Karena elemen root hanya menerima ekspresi JSX.', 0),
(117, 22, 'Karena JSX menyediakan sintaks yang mirip dengan HTML.', 0),
(118, 22, 'Karena elemen root memerlukan format khusus dari JSX.', 1),
(119, 23, 'Tidak akan terjadi apa-apa.', 1),
(120, 23, 'Compiler JSX akan otomatis memisahkan elemen-elemen tersebut.', 0),
(121, 23, 'Akan terjadi kesalahan karena hanya satu elemen terluar yang diizinkan.', 0),
(122, 23, 'Ekspresi JSX tersebut tidak akan di-render.', 0),
(123, 24, 'class MyComponent extends React.Component', 1),
(124, 24, 'const MyComponent = React.createComponent', 1),
(125, 24, 'function MyComponent() { return <h1>Hello</h1>; }', 1),
(126, 24, 'const MyComponent = React.FunctionComponent', 1),
(127, 25, 'Sebagai file konfigurasi utama', 1),
(128, 25, 'Sebagai file untuk mendefinisikan komponen fungsi', 1),
(129, 25, 'Sebagai file entry point', 1),
(130, 25, 'Sebagai file untuk menentukan logika bisnis', 1),
(131, 26, 'Mengimpor komponen ke file lain', 1),
(132, 26, 'Mengonfigurasi komponen sebagai default ekspor', 1),
(133, 26, 'Menentukan logika render komponen', 1),
(134, 26, 'Mendaftarkan komponen dalam DOM', 1),
(135, 27, 'Mengimpor komponen MyComponent dari file App.js', 0),
(136, 27, 'Mengonfigurasi fungsi MyComponent sebagai entry point aplikasi', 1),
(137, 27, 'Membuat salinan dari MyComponent dalam file index.js', 0),
(138, 27, 'Menentukan lokasi file App.js dalam proyek', 0),
(139, 28, 'Agar komponen bisa diimpor dengan nama yang berbeda', 1),
(140, 28, 'Karena itu membuat komponen menjadi default dalam proyek', 1),
(141, 28, 'Agar komponen bisa diimpor sebagai komponen standar', 1),
(142, 28, 'Karena itu memberikan fleksibilitas lebih besar pada ekspor', 1),
(143, 29, 'Dengan menuliskannya di dalam tag komponen', 1),
(144, 29, 'Dengan memberikan atribut ke komponen', 1),
(145, 29, 'Dengan menggunakan fungsi khusus untuk meneruskan props', 1),
(146, 29, 'Dengan merender objek props di dalam fungsi komponen', 1),
(147, 30, 'Menampilkan informasi ke konsol', 1),
(148, 30, 'Menyesuaikan tata letak komponen', 1),
(149, 30, 'Meneruskan informasi antar komponen', 1),
(150, 30, 'Menyembunyikan informasi komponen', 1),
(151, 31, 'Tidak perlu melakukan apa pun, fungsi komponen otomatis dapat menggunakan props', 1),
(152, 31, 'Menentukan props sebagai parameter fungsi komponen', 1),
(153, 31, 'Menggunakan prop() di dalam fungsi komponen', 1),
(154, 31, 'Mengakses props secara langsung tanpa mendefinisikan parameter', 1),
(155, 32, 'Dengan menggunakan fungsi prop()', 1),
(156, 32, 'Dengan menentukan nilai prop sebagai parameter fungsi komponen', 1),
(157, 32, 'Dengan mengaksesnya langsung menggunakan notasi titik (props.propertyName)', 1),
(158, 32, 'Dengan menggunakan properti() di dalam fungsi komponen', 1),
(159, 33, '{propName}', 1),
(160, 33, 'props.destructure', 1),
(161, 33, '[propName]', 1),
(162, 33, '{ propName }', 1);

-- --------------------------------------------------------

--
-- Table structure for table `progress`
--

CREATE TABLE `progress` (
  `ID_COURSE` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_MATERI` int(11) NOT NULL,
  `SKOR` int(10) NOT NULL DEFAULT 0,
  `STATUS` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `progress`
--

INSERT INTO `progress` (`ID_COURSE`, `ID_USER`, `ID_MATERI`, `SKOR`, `STATUS`) VALUES
(22, 1, 92, 0, 0),
(22, 1, 93, 0, 0),
(22, 1, 96, 0, 0),
(22, 1, 97, 0, 0),
(22, 1, 106, 0, 0),
(22, 1, 98, 0, 0),
(22, 1, 99, 0, 0),
(22, 1, 100, 0, 0),
(22, 1, 101, 0, 0),
(22, 1, 107, 0, 0),
(22, 1, 102, 0, 0),
(22, 1, 103, 0, 0),
(22, 1, 104, 0, 0),
(22, 1, 105, 0, 0),
(22, 1, 108, 0, 0),
(22, 18, 92, 0, 1),
(22, 18, 93, 0, 0),
(22, 18, 96, 0, 0),
(22, 18, 97, 0, 0),
(22, 18, 106, 0, 0),
(22, 18, 98, 0, 0),
(22, 18, 99, 0, 0),
(22, 18, 100, 0, 0),
(22, 18, 101, 0, 0),
(22, 18, 107, 0, 0),
(22, 18, 102, 0, 0),
(22, 18, 103, 0, 0),
(22, 18, 104, 0, 0),
(22, 18, 105, 0, 0),
(22, 18, 108, 0, 0),
(22, 19, 92, 0, 1),
(22, 19, 93, 0, 1),
(22, 19, 96, 0, 1),
(22, 19, 97, 0, 1),
(22, 19, 106, 80, 1),
(22, 19, 98, 0, 1),
(22, 19, 99, 0, 1),
(22, 19, 100, 0, 1),
(22, 19, 101, 0, 1),
(22, 19, 107, 80, 1),
(22, 19, 102, 0, 1),
(22, 19, 103, 0, 1),
(22, 19, 104, 0, 1),
(22, 19, 105, 0, 1),
(22, 19, 108, 100, 1),
(21, 1, 73, 0, 0),
(21, 1, 74, 0, 0),
(21, 1, 75, 0, 0),
(21, 1, 77, 0, 0),
(21, 1, 88, 0, 0),
(21, 1, 78, 0, 0),
(21, 1, 79, 0, 0),
(21, 1, 80, 0, 0),
(21, 1, 81, 0, 0),
(21, 1, 82, 0, 0),
(21, 1, 83, 0, 0),
(21, 1, 84, 0, 0),
(21, 1, 85, 0, 0),
(21, 1, 86, 0, 0),
(21, 1, 89, 0, 0),
(25, 1, 134, 0, 0),
(25, 1, 135, 0, 0),
(25, 1, 136, 0, 0),
(25, 1, 137, 0, 0),
(25, 1, 138, 0, 0),
(25, 1, 139, 0, 0),
(25, 1, 141, 0, 0),
(25, 1, 142, 0, 0),
(25, 1, 143, 0, 0),
(25, 1, 144, 0, 0),
(25, 1, 145, 0, 0),
(25, 1, 146, 0, 0),
(25, 1, 140, 0, 0),
(25, 1, 147, 0, 0),
(25, 1, 148, 0, 0),
(25, 1, 149, 0, 0),
(25, 1, 150, 0, 0),
(25, 1, 151, 0, 0),
(25, 1, 152, 0, 0),
(25, 1, 153, 0, 0),
(25, 1, 154, 0, 0),
(25, 1, 155, 0, 0),
(25, 1, 156, 0, 0),
(25, 1, 157, 0, 0),
(25, 1, 158, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `ID_SKILL` int(10) NOT NULL,
  `NAMA` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`ID_SKILL`, `NAMA`) VALUES
(1, 'Front-end Development'),
(2, 'Back-end Development'),
(3, 'Responsive Web Design'),
(4, 'Web Security'),
(5, 'Mobile UI/UX Design'),
(6, 'Mobile App Testing'),
(7, 'Data Preprocessing');

-- --------------------------------------------------------

--
-- Table structure for table `skill_category`
--

CREATE TABLE `skill_category` (
  `ID_SKILL` int(10) NOT NULL,
  `ID_CATEGORY` int(10) NOT NULL,
  `LEVEL` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skill_category`
--

INSERT INTO `skill_category` (`ID_SKILL`, `ID_CATEGORY`, `LEVEL`) VALUES
(1, 4, 'Mudah'),
(1, 5, 'Mudah'),
(1, 3, 'Mudah'),
(1, 1, 'Menengah'),
(2, 6, 'Mudah'),
(2, 2, 'Menengah');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID_USER` int(11) NOT NULL,
  `IS_ADMIN` tinyint(1) NOT NULL DEFAULT 0,
  `NAMA` varchar(30) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `TGL_MASUK` date NOT NULL DEFAULT current_timestamp(),
  `IS_NEW` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID_USER`, `IS_ADMIN`, `NAMA`, `EMAIL`, `PASSWORD`, `TGL_MASUK`, `IS_NEW`) VALUES
(1, 1, 'Yohanes Weisang', 'admin@gmail.com', '$2b$10$bkAyRN6xoEru9S/3C6FvHePRDLPMT1i2QubxnfKWvxHPog7OmEs0q', '2023-03-22', 0),
(18, 0, 'John Doe', 'johndoe@gmail.com', '$2b$10$TmJ67NjJWuOQqQVutqkZXueku037zCuWeDysqt87l32HB2VbT8Z9G', '2024-01-14', 0),
(19, 0, 'John Doe', 'a@gmail.com', '$2b$10$bSK6eh2JV.rEIGppaBfA5eevYsnAtEW9F.9w9Newhm7ZxV22ZPXhS', '2024-01-14', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID_CATEGORY`),
  ADD KEY `FK_RELATION_1` (`ID_MAIN`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`ID_COURSE`),
  ADD KEY `FK_RELATION_4` (`ID_CATEGORY`);

--
-- Indexes for table `konten`
--
ALTER TABLE `konten`
  ADD PRIMARY KEY (`ID_KONTEN`),
  ADD KEY `FK_RELATION_5` (`ID_MATERI`);

--
-- Indexes for table `latihan`
--
ALTER TABLE `latihan`
  ADD PRIMARY KEY (`ID_LATIHAN`),
  ADD KEY `FK_RELATION_6` (`ID_MATERI`);

--
-- Indexes for table `learn`
--
ALTER TABLE `learn`
  ADD KEY `FK_RELATION_7` (`ID_COURSE`),
  ADD KEY `FK_RELATION_8` (`ID_USER`);

--
-- Indexes for table `main_category`
--
ALTER TABLE `main_category`
  ADD PRIMARY KEY (`ID_MAIN`);

--
-- Indexes for table `materi`
--
ALTER TABLE `materi`
  ADD PRIMARY KEY (`ID_MATERI`),
  ADD KEY `FK_RELATION_9` (`ID_MODUL`);

--
-- Indexes for table `minat`
--
ALTER TABLE `minat`
  ADD KEY `FK_RELATION_3` (`ID_SKILL`),
  ADD KEY `FK_RELATION_2` (`ID_USER`);

--
-- Indexes for table `modul`
--
ALTER TABLE `modul`
  ADD PRIMARY KEY (`ID_MODUL`),
  ADD KEY `FK_RELATION_10` (`ID_COURSE`);

--
-- Indexes for table `pilihan_jawaban`
--
ALTER TABLE `pilihan_jawaban`
  ADD PRIMARY KEY (`ID_PILIHAN`),
  ADD KEY `FK_RELATION_11` (`ID_LATIHAN`);

--
-- Indexes for table `progress`
--
ALTER TABLE `progress`
  ADD KEY `FK_RELATION_12` (`ID_COURSE`),
  ADD KEY `FK_RELATION_13` (`ID_MATERI`),
  ADD KEY `FK_RELATION_14` (`ID_USER`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`ID_SKILL`);

--
-- Indexes for table `skill_category`
--
ALTER TABLE `skill_category`
  ADD KEY `FK_RELATION_405` (`ID_SKILL`),
  ADD KEY `FK_RELATION_406` (`ID_CATEGORY`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_USER`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ID_CATEGORY` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `ID_COURSE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `konten`
--
ALTER TABLE `konten`
  MODIFY `ID_KONTEN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `latihan`
--
ALTER TABLE `latihan`
  MODIFY `ID_LATIHAN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `main_category`
--
ALTER TABLE `main_category`
  MODIFY `ID_MAIN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `materi`
--
ALTER TABLE `materi`
  MODIFY `ID_MATERI` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `modul`
--
ALTER TABLE `modul`
  MODIFY `ID_MODUL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `pilihan_jawaban`
--
ALTER TABLE `pilihan_jawaban`
  MODIFY `ID_PILIHAN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `ID_SKILL` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID_USER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `FK_RELATION_1` FOREIGN KEY (`ID_MAIN`) REFERENCES `main_category` (`ID_MAIN`);

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `FK_RELATION_4` FOREIGN KEY (`ID_CATEGORY`) REFERENCES `category` (`ID_CATEGORY`);

--
-- Constraints for table `konten`
--
ALTER TABLE `konten`
  ADD CONSTRAINT `FK_RELATION_5` FOREIGN KEY (`ID_MATERI`) REFERENCES `materi` (`ID_MATERI`) ON DELETE CASCADE;

--
-- Constraints for table `latihan`
--
ALTER TABLE `latihan`
  ADD CONSTRAINT `FK_RELATION_6` FOREIGN KEY (`ID_MATERI`) REFERENCES `materi` (`ID_MATERI`) ON DELETE CASCADE;

--
-- Constraints for table `learn`
--
ALTER TABLE `learn`
  ADD CONSTRAINT `FK_RELATION_7` FOREIGN KEY (`ID_COURSE`) REFERENCES `course` (`ID_COURSE`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_RELATION_8` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`) ON DELETE CASCADE;

--
-- Constraints for table `materi`
--
ALTER TABLE `materi`
  ADD CONSTRAINT `FK_RELATION_9` FOREIGN KEY (`ID_MODUL`) REFERENCES `modul` (`ID_MODUL`) ON DELETE CASCADE;

--
-- Constraints for table `minat`
--
ALTER TABLE `minat`
  ADD CONSTRAINT `FK_RELATION_2` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_RELATION_3` FOREIGN KEY (`ID_SKILL`) REFERENCES `skill` (`id_skill`);

--
-- Constraints for table `modul`
--
ALTER TABLE `modul`
  ADD CONSTRAINT `FK_RELATION_10` FOREIGN KEY (`ID_COURSE`) REFERENCES `course` (`ID_COURSE`) ON DELETE CASCADE;

--
-- Constraints for table `pilihan_jawaban`
--
ALTER TABLE `pilihan_jawaban`
  ADD CONSTRAINT `FK_RELATION_11` FOREIGN KEY (`ID_LATIHAN`) REFERENCES `latihan` (`ID_LATIHAN`) ON DELETE CASCADE;

--
-- Constraints for table `progress`
--
ALTER TABLE `progress`
  ADD CONSTRAINT `FK_RELATION_12` FOREIGN KEY (`ID_COURSE`) REFERENCES `course` (`ID_COURSE`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_RELATION_13` FOREIGN KEY (`ID_MATERI`) REFERENCES `materi` (`ID_MATERI`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_RELATION_14` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`) ON DELETE CASCADE;

--
-- Constraints for table `skill_category`
--
ALTER TABLE `skill_category`
  ADD CONSTRAINT `FK_RELATION_405` FOREIGN KEY (`ID_SKILL`) REFERENCES `skill` (`id_skill`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_RELATION_406` FOREIGN KEY (`ID_CATEGORY`) REFERENCES `category` (`ID_CATEGORY`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
