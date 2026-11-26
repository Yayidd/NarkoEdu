import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield, BookOpen, Brain, Award, Heart, MessageSquare, MapPin, User,
  Menu, X, Sun, Moon, Search, CheckCircle, AlertTriangle, Phone,
  ExternalLink, Download, Share2, Calculator, ChevronRight, Lock,
  LogOut, Flag, ThumbsUp, Sparkles, FileText, ArrowLeft, Info, RefreshCw
} from 'lucide-react';

// ==========================================
// DATA DUMMY EDUKATIF (BAHASA INDONESIA)
// ==========================================

const ARTICLES_DATA = [
  {
    id: 'art-1',
    title: 'Bagaimana Narkoba Merusak Sistem Saraf Pusat Remaja?',
    category: 'Dampak Kesehatan',
    readTime: '4 menit',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    summary: 'Otak remaja masih berkembang hingga usia 25 tahun. Paparan zat adiktif dapat mengganggu memori, konsentrasi, dan kontrol emosi secara permanen.',
    content: [
      'Masa remaja adalah periode emas perkembangan otak, khususnya pada bagian prefrontal cortex yang mengatur pengambilan keputusan, kontrol impuls, dan perencanaan masa depan.',
      'Zat psikoaktif membanjiri otak dengan dopamin dalam jumlah tidak wajar. Akibatnya, reseptor alami otak menjadi tumpul dan membuat seseorang kehilangan motivasi untuk aktivitas positif seperti belajar, berolahraga, atau bersosialisasi.',
      'Dalam jangka panjang, kerusakan neurokimia ini memicu gangguan kecemasan, depresi berat, hingga penurunan daya ingat yang sulit dipulihkan.'
    ],
    quiz: [
      {
        q: 'Bagian otak yang mengatur pengambilan keputusan dan masih berkembang hingga usia 25 tahun adalah...',
        options: ['Prefrontal cortex', 'Cerebellum', 'Medulla oblongata', 'Kelenjar pituitari'],
        answer: 0,
        explanation: 'Prefrontal cortex bertanggung jawab atas kontrol impuls dan pengambilan keputusan rasional.'
      },
      {
        q: 'Mengapa zat adiktif membuat remaja kehilangan minat pada hobi positif?',
        options: ['Karena meningkatkan kadar oksigen darah', 'Karena membanjiri otak dengan dopamin berlebih sehingga reseptor alami tumpul', 'Karena memperkuat otot jantung', 'Karena memperbaiki kualitas tidur'],
        answer: 1,
        explanation: 'Lonjakan dopamin buatan membuat otak tidak lagi merespons kebahagiaan dari aktivitas sehat sehari-hari.'
      },
      {
        q: 'Dampak psikologis jangka panjang dari penyalahgunaan narkoba meliputi...',
        options: ['Peningkatan fokus belajar', 'Stabilitas emosi tinggi', 'Gangguan kecemasan dan depresi berat', 'Daya ingat fotografis'],
        answer: 2,
        explanation: 'Ketidakseimbangan zat kimia otak memicu gangguan kecemasan, paranoia, dan depresi.'
      },
      {
        q: 'Kapan perkembangan otak manusia umumnya mencapai kematangan penuh?',
        options: ['Usia 12 tahun', 'Usia 15 tahun', 'Usia 17 tahun', 'Sekitar usia 25 tahun'],
        answer: 3,
        explanation: 'Penelitian neurosains menunjukkan pematangan struktur otak berlanjut hingga sekitar usia 25 tahun.'
      },
      {
        q: 'Langkah terbaik menjaga kesehatan sistem saraf di usia sekolah adalah...',
        options: ['Begadang setiap malam', 'Olahraga teratur, tidur cukup, dan menjauhi zat adiktif', 'Mengonsumsi minuman berenergi berlebihan', 'Mengisolasi diri dari teman'],
        answer: 1,
        explanation: 'Gaya hidup sehat mendukung pembentukan koneksi saraf yang optimal pada remaja.'
      }
    ]
  },
  {
    id: 'art-2',
    title: '7 Cara Elegan Menolak Ajakan Teman Tanpa Takut Dikucilkan',
    category: 'Tips Menolak',
    readTime: '3 menit',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    summary: 'Tekanan teman sebaya sering menjadi pintu awal coba-coba. Pelajari teknik komunikasi asertif agar tetap percaya diri dan aman.',
    content: [
      'Menolak ajakan negatif bukan berarti lemah atau tidak setia kawan. Justru, keberanian berkata tidak menunjukkan kamu punya kendali penuh atas hidupmu sendiri.',
      'Gunakan teknik "Alasan Singkat & Alihkan Topik": katakan dengan santai, "Nggak dulu bro, gue lagi jaga kondisi buat turnamen/ujian minggu depan," lalu segera bahas topik lain seperti game atau musik.',
      'Jika situasi terasa mendesak, segera tinggalkan lokasi dengan alasan sudah ditunggu keluarga di rumah. Teman sejati akan selalu menghargai batasan dan keselamatanmu.'
    ],
    quiz: [
      {
        q: 'Sikap komunikasi yang tegas namun tetap sopan saat menolak ajakan negatif disebut...',
        options: ['Agresif', 'Pasif', 'Asertif', 'Manipulatif'],
        answer: 2,
        explanation: 'Komunikasi asertif menyampaikan penolakan secara jelas tanpa memicu pertengkaran.'
      },
      {
        q: 'Apa ciri teman sebaya yang sehat?',
        options: ['Memaksa ikut mencoba hal berbahaya', 'Menghargai keputusan dan keselamatan kita', 'Mengancam akan menjauhi jika menolak', 'Mengajak bolos sekolah'],
        answer: 1,
        explanation: 'Pertemanan sehat dibangun di atas rasa saling menghormati batasan masing-masing.'
      },
      {
        q: 'Tindakan paling tepat ketika berada di lingkungan yang mulai menawarkan zat mencurigakan adalah...',
        options: ['Mencoba sedikit agar menghargai', 'Segera mencari alasan pulang dan menjauh dari lokasi', 'Diam saja tanpa bertindak', 'Memotret untuk iseng'],
        answer: 1,
        explanation: 'Meninggalkan situasi berisiko secepat mungkin adalah langkah perlindungan diri terbaik.'
      },
      {
        q: 'Kalimat penolakan yang efektif sebaiknya bersifat...',
        options: ['Panjang lebar dan ragu-ragu', 'Singkat, jelas, dan percaya diri', 'Menghina orang lain', 'Berjanji akan mencoba lain kali'],
        answer: 1,
        explanation: 'Jawaban singkat dan tegas menutup celah bagi orang lain untuk terus membujuk.'
      },
      {
        q: 'Mengapa remaja rentan terhadap tekanan teman sebaya (peer pressure)?',
        options: ['Karena kebutuhan diterima dalam kelompok sosial sedang tinggi', 'Karena sudah kebal terhadap zat kimia', 'Karena tidak punya keluarga', 'Karena aturan sekolah terlalu longgar'],
        answer: 0,
        explanation: 'Pada usia remaja, keinginan untuk diterima lingkungan pertemanan sangat kuat sehingga perlu dibekali ketahanan diri.'
      }
    ]
  },
  {
    id: 'art-3',
    title: 'Mengenal UU No. 35 Tahun 2009 tentang Narkotika & Masa Depan Pelajar',
    category: 'Hukum',
    readTime: '5 menit',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    summary: 'Pahami konsekuensi hukum kepemilikan, peredaran, hingga hak rehabilitasi bagi korban penyalahgunaan di Indonesia.',
    content: [
      'Indonesia memiliki regulasi tegas melalui Undang-Undang Nomor 35 Tahun 2009 tentang Narkotika untuk melindungi generasi muda dari ancaman peredaran gelap.',
      'Keterlibatan sebagai kurir atau pengedar—meski berstatus pelajar—membawa ancaman pidana berat yang dapat memutus kesempatan pendidikan dan karier di masa depan.',
      'Di sisi lain, undang-undang juga menjamin hak rehabilitasi medis dan sosial bagi pecandu atau korban penyalahgunaan yang melapor secara sukarela ke Institusi Penerima Wajib Lapor (IPWL).'
    ],
    quiz: [
      {
        q: 'Undang-undang utama yang mengatur tentang Narkotika di Indonesia adalah...',
        options: ['UU No. 35 Tahun 2009', 'UU No. 20 Tahun 2003', 'UU No. 11 Tahun 2008', 'UU No. 36 Tahun 2009'],
        answer: 0,
        explanation: 'UU No. 35 Tahun 2009 merupakan payung hukum utama pencegahan dan pemberantasan narkotika di Indonesia.'
      },
      {
        q: 'Lembaga tempat pecandu atau keluarga melapor untuk mendapatkan pemulihan disebut...',
        options: ['KPU', 'IPWL (Institusi Penerima Wajib Lapor)', 'BPK', 'OJK'],
        answer: 1,
        explanation: 'IPWL ditunjuk pemerintah untuk memberikan layanan asesmen dan rehabilitasi bagi penyalahguna.'
      },
      {
        q: 'Bagaimana status hukum pelajar yang tergiur menjadi kurir paket terlarang?',
        options: ['Bebas dari sanksi karena masih sekolah', 'Tetap diproses hukum sesuai ketentuan yang berlaku', 'Hanya diberi teguran lisan', 'Mendapat penghargaan'],
        answer: 1,
        explanation: 'Pelaku peredaran atau kurir tetap menghadapi proses hukum pidana yang serius.'
      },
      {
        q: 'Tujuan utama rehabilitasi bagi korban penyalahgunaan narkoba adalah...',
        options: ['Menghukum secara fisik', 'Memulihkan kesehatan fisik, mental, dan fungsi sosial', 'Mengasingkan selamanya', 'Menghapus hak pendidikan'],
        answer: 1,
        explanation: 'Rehabilitasi bertujuan memulihkan individu agar dapat kembali produktif di masyarakat.'
      },
      {
        q: 'Siapa yang bertanggung jawab melakukan upaya P4GN di lingkungan sekolah?',
        options: ['Hanya kepala sekolah', 'Hanya petugas BNN', 'Seluruh warga sekolah (siswa, guru, orang tua, dan masyarakat)', 'Hanya ketua OSIS'],
        answer: 2,
        explanation: 'Pencegahan efektif membutuhkan kolaborasi aktif seluruh elemen sekolah dan keluarga.'
      }
    ]
  },
  {
    id: 'art-4',
    title: 'Membangun Benteng Diri Melalui Hobi, Olahraga, dan Komunitas Positif',
    category: 'Pencegahan',
    readTime: '4 menit',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    summary: 'Aktivitas fisik dan karya kreatif memicu hormon bahagia alami (endorfin) yang jauh lebih sehat daripada pelarian sesaat.',
    content: [
      'Rasa bosan, stres tugas sekolah, atau masalah keluarga sering membuat remaja mencari pelarian. Padahal, tubuh kita punya pabrik kebahagiaan alami yang jauh lebih aman.',
      'Berolahraga selama 30 menit, bermain musik, coding, atau aktif di ekstrakurikuler melepaskan endorfin dan serotonin yang meredakan stres secara sehat.',
      'Bergabung dengan komunitas kreatif juga memperluas jaringan pertemanan positif yang saling mendukung pencapaian prestasi.'
    ],
    quiz: [
      {
        q: 'Hormon kebahagiaan alami yang dilepaskan tubuh saat berolahraga adalah...',
        options: ['Adrenalin berlebih', 'Endorfin', 'Kortisol', 'Insulin'],
        answer: 1,
        explanation: 'Endorfin membantu mengurangi rasa sakit dan memicu perasaan positif secara alami.'
      },
      {
        q: 'Cara sehat mengelola stres akibat tekanan tugas sekolah adalah...',
        options: ['Menyimpan masalah sendirian', 'Berolahraga, bercerita ke orang tepercaya, atau menekuni hobi', 'Mencoba zat penenang tanpa resep', 'Bolos pelajaran'],
        answer: 1,
        explanation: 'Aktivitas positif dan dukungan sosial membantu meredakan stres dengan aman.'
      },
      {
        q: 'Manfaat mengikuti ekstrakurikuler atau komunitas positif di sekolah adalah...',
        options: ['Menambah beban pikiran', 'Membangun jejaring teman suportif dan mengasah bakat', 'Mengurangi waktu istirahat total', 'Menjauhkan dari prestasi'],
        answer: 1,
        explanation: 'Lingkungan positif memperkuat ketahanan diri remaja dari pengaruh buruk.'
      },
      {
        q: 'Mengapa pelarian masalah ke zat adiktif justru memperburuk keadaan?',
        options: ['Karena menyelesaikan akar masalah', 'Karena menimbulkan ketergantungan dan masalah kesehatan baru', 'Karena sangat murah', 'Karena disarankan dokter'],
        answer: 1,
        explanation: 'Zat adiktif hanya menutupi masalah sementara sambil menciptakan kerusakan fisik dan mental.'
      },
      {
        q: 'Berapa durasi aktivitas fisik ringan yang disarankan untuk menjaga kebugaran remaja setiap hari?',
        options: ['Minimal 30 menit', '5 jam tanpa henti', '1 menit saja', 'Tidak perlu bergerak'],
        answer: 0,
        explanation: 'Aktivitas fisik 30 menit sehari sudah efektif menjaga kebugaran tubuh dan kesehatan mental.'
      }
    ]
  },
  {
    id: 'art-5',
    title: 'Waspada Zat Adiktif di Sekitar Kita: Rokok Elektrik hingga Inhalansia',
    category: 'Dampak Kesehatan',
    readTime: '4 menit',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    summary: 'Banyak zat adiktif dikemas dengan tampilan menarik dan aroma buah. Kenali risiko tersembunyinya sejak dini.',
    content: [
      'Zat adiktif tidak selalu berbentuk pil atau serbuk mencurigakan. Cairan vape dengan nikotin tinggi maupun penyalahgunaan uap pelarut (inhalansia) sangat berbahaya bagi paru-paru dan otak.',
      'Nikotin pada rokok konvensional maupun elektrik memicu ketergantungan cepat pada remaja dan menurunkan kapasitas paru-paru saat beraktivitas.',
      'Selalu bersikap kritis terhadap produk tanpa izin edar resmi atau cairan isi ulang yang tidak jelas komposisinya.'
    ],
    quiz: [
      {
        q: 'Zat dalam rokok dan vape yang menyebabkan efek ketergantungan kuat adalah...',
        options: ['Vitamin C', 'Nikotin', 'Glukosa', 'Kalsium'],
        answer: 1,
        explanation: 'Nikotin adalah zat adiktif yang memengaruhi sistem saraf dan memicu kecanduan.'
      },
      {
        q: 'Bahaya penyalahgunaan uap zat kimia rumah tangga (inhalansia) adalah...',
        options: ['Menyegarkan pernapasan', 'Merusak sel otak, hati, dan ginjal secara cepat', 'Meningkatkan kecerdasan', 'Menguatkan tulang'],
        answer: 1,
        explanation: 'Uap pelarut kimia bersifat toksik dan dapat merusak organ vital secara permanen.'
      },
      {
        q: 'Mengapa kemasan warna-warni dan rasa buah pada produk adiktif perlu diwaspadai pelajar?',
        options: ['Karena menyehatkan', 'Karena sering digunakan untuk menyamarkan bahaya zat adiktif agar menarik bagi remaja', 'Karena direkomendasikan sekolah', 'Karena mengandung sari buah asli'],
        answer: 1,
        explanation: 'Strategi kemasan menarik kerap menyasar remaja agar menganggap produk tersebut tidak berbahaya.'
      },
      {
        q: 'Organ tubuh yang paling terdampak langsung oleh paparan asap dan aerosol zat adiktif adalah...',
        options: ['Paru-paru dan sistem kardiovaskular', 'Kuku jari', 'Rambut', 'Tulang kering'],
        answer: 0,
        explanation: 'Saluran pernapasan dan pembuluh darah langsung terpapar partikel kimia berbahaya.'
      },
      {
        q: 'Sikap paling aman saat ditawari cairan atau permen yang tidak jelas sumbernya adalah...',
        options: ['Langsung mencicipi', 'Menolak tegas dan tidak menerimanya', 'Membagikan ke teman', 'Menyimpannya di tas'],
        answer: 1,
        explanation: 'Menolak makanan, minuman, atau cairan dari sumber tak dikenal mencegah risiko keracunan maupun jebakan zat terlarang.'
      }
    ]
  },
  {
    id: 'art-6',
    title: 'Peran Keluarga & Guru Sebagai Tempat Curhat Pertama Saat Ada Masalah',
    category: 'Pencegahan',
    readTime: '3 menit',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80',
    summary: 'Komunikasi terbuka dengan orang tua atau guru BK membantu siswa menemukan solusi sehat tanpa terjerumus ke hal negatif.',
    content: [
      'Banyak remaja merasa takut dimarahi ketika menghadapi masalah pertemanan atau tekanan akademik, sehingga memilih memendamnya sendirian.',
      'Padahal, orang tua, wali kelas, dan guru Bimbingan Konseling (BK) hadir untuk mendengarkan dan membantu mencari jalan keluar yang aman.',
      'Mulailah percakapan sederhana di rumah atau ruang BK sekolah saat merasa tertekan—berbagi beban membuat pikiran jauh lebih jernih.'
    ],
    quiz: [
      {
        q: 'Siapa pihak di sekolah yang dapat menjadi tempat konsultasi aman bagi siswa?',
        options: ['Guru Bimbingan Konseling (BK) dan wali kelas', 'Orang asing di luar gerbang', 'Akun anonim tidak dikenal', 'Pedagang keliling'],
        answer: 0,
        explanation: 'Guru BK memiliki kompetensi mendampingi siswa menghadapi masalah psikologis maupun sosial.'
      },
      {
        q: 'Manfaat komunikasi terbuka antara anak dan orang tua adalah...',
        options: ['Memperbesar kesalahpahaman', 'Menciptakan rasa aman dan deteksi dini jika ada ancaman lingkungan', 'Mengurangi kebebasan positif', 'Membuat anak takut bercerita'],
        answer: 1,
        explanation: 'Keluarga yang suportif menjadi benteng pencegahan paling kuat bagi remaja.'
      },
      {
        q: 'Jika mengetahui teman dekat mulai terjerumus penyalahgunaan zat, langkah bijak yang bisa dilakukan adalah...',
        options: ['Ikut mencoba agar kompak', 'Menyebarkan aibnya di media sosial', 'Melaporkan secara rahasia ke guru BK atau orang tuanya agar segera dibantu', 'Membiarkannya saja'],
        answer: 2,
        explanation: 'Bantuan profesional dini sangat menentukan keberhasilan pemulihan teman.'
      },
      {
        q: 'Mengapa memendam stres sendirian berisiko bagi remaja?',
        options: ['Karena membuat emosi menumpuk dan rentan mencari pelarian tidak sehat', 'Karena membuat tubuh lebih kuat', 'Karena meningkatkan nilai rapor', 'Karena disarankan ahli psikologi'],
        answer: 0,
        explanation: 'Stres yang tidak dikelola dengan baik dapat menurunkan kemampuan mengambil keputusan sehat.'
      },
      {
        q: 'Layanan resmi BNN yang dapat dihubungi masyarakat 24 jam untuk konsultasi adalah...',
        options: ['Call Center 184', 'Nomor 9999', 'Nomor 12345', 'Nomor 000'],
        answer: 0,
        explanation: 'Call Center BNN 184 beroperasi 24 jam untuk layanan informasi dan konsultasi P4GN.'
      }
    ]
  },
  {
    id: 'art-7',
    title: 'Mitos vs Fakta Seputar Narkoba yang Sering Menjebak Pelajar',
    category: 'Tips Menolak',
    readTime: '4 menit',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    summary: 'Jangan tertipu anggapan "coba sekali tidak bikin kecanduan" atau "bikin belajar makin fokus". Cek fakta medis sebenarnya!',
    content: [
      'Mitos 1: "Coba sekali saja tidak akan ketagihan." Faktanya, beberapa jenis narkotika dan psikotropika dapat memicu perubahan kimia otak sejak pemakaian pertama dan menimbulkan dorongan kuat untuk mengulanginya.',
      'Mitos 2: "Obat terlarang bikin kuat begadang dan nilai ujian bagus." Faktanya, stimulan ilegal hanya memaksa tubuh melampaui batas wajar hingga memicu kerusakan jantung, halusinasi, dan kelelahan ekstrem.',
      'Mitos 3: "Narkoba membuat pergaulan terlihat keren." Faktanya, kecanduan justru merusak reputasi, menghancurkan prestasi, dan menjauhkan seseorang dari masa depan cerahnya.'
    ],
    quiz: [
      {
        q: 'Bagaimana fakta medis dari anggapan "coba narkoba sekali tidak akan kecanduan"?',
        options: ['Benar sepenuhnya', 'Salah, karena zat adiktif dapat langsung memicu ketergantungan sejak paparan awal', 'Hanya berlaku pada hari libur', 'Tergantung cuaca'],
        answer: 1,
        explanation: 'Zat adiktif bekerja langsung pada sistem reward otak dan berisiko tinggi menimbulkan ketergantungan.'
      },
      {
        q: 'Apa yang sebenarnya terjadi ketika seseorang memakai stimulan ilegal untuk begadang belajar?',
        options: ['Otak menjadi lebih cerdas permanen', 'Tubuh dipaksa bekerja melampaui batas hingga berisiko gagal jantung dan gangguan saraf', 'Tidak perlu tidur selamanya', 'Kesehatan paru-paru meningkat'],
        answer: 1,
        explanation: 'Stimulan ilegal merusak sistem kardiovaskular dan mengganggu fungsi kognitif jangka panjang.'
      },
      {
        q: 'Kunci utama agar tidak mudah termakan hoaks atau mitos seputar zat terlarang adalah...',
        options: ['Percaya semua rumor di tongkrongan', 'Mencari informasi dari sumber medis dan lembaga resmi seperti BNN', 'Mencoba sendiri untuk membuktikan', 'Mengabaikan nasihat dokter'],
        answer: 1,
        explanation: 'Literasi berbasis sumber resmi melindungi pelajar dari informasi menyesatkan.'
      },
      {
        q: 'Dampak nyata penyalahgunaan narkoba terhadap prestasi sekolah adalah...',
        options: ['Meningkatkan kehadiran', 'Menurunkan konsentrasi, motivasi belajar, dan memicu putus sekolah', 'Mempermudah meraih beasiswa', 'Memperbaiki hubungan dengan guru'],
        answer: 1,
        explanation: 'Gangguan fungsi otak dan perilaku berdampak langsung pada penurunan prestasi akademik.'
      },
      {
        q: 'Apa arti sejati menjadi remaja yang "keren" dan berdaya?',
        options: ['Berani melanggar hukum', 'Sehat, berprestasi, kritis, dan mampu menjaga diri dari zat berbahaya', 'Ikut-ikutan tren negatif', 'Menghabiskan uang untuk hal merusak'],
        answer: 1,
        explanation: 'Prestasi dan kendali diri adalah modal utama kesuksesan generasi muda.'
      }
    ]
  },
  {
    id: 'art-8',
    title: 'Mengenal Tahapan Rehabilitasi: Harapan Pulih dan Bangkit Kembali',
    category: 'Hukum',
    readTime: '5 menit',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
    summary: 'Rehabilitasi bukan aib, melainkan langkah medis dan sosial untuk memulihkan masa depan. Kenali tiga tahapan utamanya.',
    content: [
      'Bagi siapa pun yang terlanjur terpapar penyalahgunaan zat, rehabilitasi adalah pintu harapan untuk kembali sehat. Pemerintah menjamin kerahasiaan dan pendampingan bagi warga yang melapor secara sukarela.',
      'Tahap pertama adalah Rehabilitasi Medis (detoksifikasi) di bawah pengawasan dokter untuk membersihkan sisa zat dan menangani gejala putus zat secara aman.',
      'Tahap berikutnya adalah Rehabilitasi Sosial (konseling, terapi kelompok, pelatihan keterampilan) serta Bina Lanjut agar mantan penyalahguna siap kembali bersekolah atau bekerja tanpa kambuh (relapse).'
    ],
    quiz: [
      {
        q: 'Urutan tahapan rehabilitasi penyalahguna narkoba yang tepat adalah...',
        options: ['Bina lanjut → Medis → Sosial', 'Rehabilitasi Medis → Rehabilitasi Sosial → Bina Lanjut', 'Sosial saja tanpa pemeriksaan dokter', 'Langsung dilepas tanpa pendampingan'],
        answer: 1,
        explanation: 'Pemulihan dimulai dari stabilisasi medis, dilanjutkan pemulihan perilaku sosial, hingga pendampingan pascarehabilitasi.'
      },
      {
        q: 'Apa fokus utama pada tahap Rehabilitasi Medis?',
        options: ['Pelatihan kewirausahaan', 'Pemeriksaan kesehatan dan penanganan gejala putus zat oleh tenaga medis', 'Lomba olahraga', 'Ujian kelulusan sekolah'],
        answer: 1,
        explanation: 'Rehabilitasi medis memastikan kondisi fisik pasien stabil dan aman.'
      },
      {
        q: 'Tujuan dari tahap Bina Lanjut (aftercare) adalah...',
        options: ['Mencegah kekambuhan (relapse) dan membantu kembali produktif di masyarakat', 'Memulai kembali kebiasaan lama', 'Menghentikan dukungan keluarga', 'Menghapus riwayat kesehatan'],
        answer: 0,
        explanation: 'Bina lanjut mendampingi proses reintegrasi ke sekolah, keluarga, dan lingkungan kerja.'
      },
      {
        q: 'Bagaimana sikap masyarakat dan teman sekolah yang tepat terhadap penyintas yang sedang menjalani pemulihan?',
        options: ['Mengucilkan dan memberi stigma negatif', 'Memberikan dukungan moral dan lingkungan positif agar tidak kambuh', 'Menawarkan kembali zat terlarang', 'Menjadikannya bahan ejekan'],
        answer: 1,
        explanation: 'Dukungan sosial sangat krusial untuk mencegah kekambuhan.'
      },
      {
        q: 'Apakah korban penyalahgunaan yang melapor secara sukarela ke IPWL akan dipidana?',
        options: ['Tidak, justru mendapatkan hak perawatan dan rehabilitasi sesuai peraturan', 'Langsung dipenjara seumur hidup', 'Dikeluarkan dari kewarganegaraan', 'Didenda miliaran rupiah'],
        answer: 0,
        explanation: 'Sesuai UU Narkotika, pecandu yang melapor sukarela diarahkan untuk menjalani rehabilitasi.'
      }
    ]
  }
];

const DICTIONARY_DATA = [
  {
    id: 'kamus-1',
    name: 'Ganja (Cannabis)',
    category: 'Narkotika',
    visual: 'Daun kering berwarna hijau kecokelatan yang dicacah, linting menyerupai rokok, atau cairan kental berwarna gelap.',
    healthEffects: 'Menurunkan daya ingat jangka pendek, mengganggu koordinasi motorik, memicu halusinasi, serta merusak saluran pernapasan.',
    socialEffects: 'Hilangnya motivasi belajar (amotivational syndrome), menarik diri dari keluarga, dan terjerat sanksi pidana.'
  },
  {
    id: 'kamus-2',
    name: 'Sabu-sabu (Metamfetamin)',
    category: 'Narkotika',
    visual: 'Kristal bening atau putih keabu-abuan menyerupai serpihan kaca halus atau gula batu kecil.',
    healthEffects: 'Kerusakan sel saraf otak, detak jantung tidak beraturan, penurunan berat badan ekstrem, gigi keropos, hingga risiko stroke.',
    socialEffects: 'Perilaku agresif, mudah curiga berlebihan (paranoid), dan merusak hubungan dengan keluarga maupun teman.'
  },
  {
    id: 'kamus-3',
    name: 'Heroin (Putauw)',
    category: 'Narkotika',
    visual: 'Serbuk halus berwarna putih hingga cokelat tua yang berasal dari pengolahan getah tanaman opium.',
    healthEffects: 'Menekan sistem saraf pusat dan pernapasan secara drastis, memicu ketergantungan fisik berat, serta risiko henti napas.',
    socialEffects: 'Ketergantungan total yang menghancurkan produktivitas, masa depan pendidikan, dan stabilitas ekonomi keluarga.'
  },
  {
    id: 'kamus-4',
    name: 'Kokain',
    category: 'Narkotika',
    visual: 'Serbuk kristal halus berwarna putih yang diekstrak dari daun tanaman koka.',
    healthEffects: 'Penyempitan pembuluh darah, tekanan darah tinggi ekstrem, gangguan irama jantung, dan kerusakan jaringan hidung.',
    socialEffects: 'Emosi tidak stabil, impulsif, dan berisiko tinggi terlibat konflik hukum.'
  },
  {
    id: 'kamus-5',
    name: 'Ekstasi (MDMA)',
    category: 'Narkotika',
    visual: 'Tablet atau kapsul berwarna-warni dengan berbagai logo atau cetakan karakter tertentu.',
    healthEffects: 'Peningkatan suhu tubuh ekstrem (hipertermia), dehidrasi berat, kerusakan hati dan ginjal, serta depresi pascapemakaian.',
    socialEffects: 'Menurunkan kemampuan menilai risiko dan membuat remaja rentan terhadap eksploitasi maupun kecelakaan.'
  },
  {
    id: 'kamus-6',
    name: 'Tembakau Sintetis (Gorilla)',
    category: 'Narkotika',
    visual: 'Rajangan daun kering yang disemprot cairan kimia sintetis (cannabinoid sintetis) dengan aroma menyengat.',
    healthEffects: 'Efek racun jauh lebih keras dari ganja alami; menyebabkan kejang, muntah hebat, halusinasi berat, dan pingsan mendadak.',
    socialEffects: 'Hilang kesadaran di tempat umum, merusak reputasi pelajar, dan berhadapan dengan hukum pidana.'
  },
  {
    id: 'kamus-7',
    name: 'Amfetamin',
    category: 'Psikotropika',
    visual: 'Tablet atau serbuk kristal putih hingga kekuningan tanpa bau tajam.',
    healthEffects: 'Insomnia berat, kelelahan ekstrem saat efek hilang, kecemasan akut, dan gangguan fungsi jantung.',
    socialEffects: 'Penurunan performa akademik karena siklus tidur dan konsentrasi yang hancur.'
  },
  {
    id: 'kamus-8',
    name: 'Diazepam (Obat Penenang Tanpa Resep)',
    category: 'Psikotropika',
    visual: 'Tablet kecil berbagai warna (putih, kuning, biru) dalam kemasan strip farmasi yang disalahgunakan di luar pengawasan dokter.',
    healthEffects: 'Kantuk ekstrem, bicara cadel, penurunan refleks tubuh, gangguan pernapasan, dan ketergantungan obat.',
    socialEffects: 'Menurunkan kewaspadaan saat berkendara atau belajar serta memicu perilaku apatis.'
  },
  {
    id: 'kamus-9',
    name: 'Alprazolam (Disalahgunakan)',
    category: 'Psikotropika',
    visual: 'Tablet oval atau bulat bertanda khusus obat keras golongan psikotropika yang hanya sah dengan resep psikiater.',
    healthEffects: 'Gangguan daya ingat, kebingungan mental, depresi berat, dan gejala putus obat berbahaya jika dihentikan mendadak.',
    socialEffects: 'Ketergantungan obat dan kesulitan berinteraksi secara normal di lingkungan sekolah.'
  },
  {
    id: 'kamus-10',
    name: 'LSD (Lysergic Acid Diethylamide)',
    category: 'Psikotropika',
    visual: 'Potongan kertas kecil bergambar (blotter) atau cairan bening tanpa warna.',
    healthEffects: 'Halusinasi visual dan auditori ekstrem, distorsi persepsi waktu, serangan panik hebat, dan gangguan kejiwaan.',
    socialEffects: 'Perilaku tidak terkendali akibat halusinasi yang membahayakan diri sendiri dan orang di sekitar.'
  },
  {
    id: 'kamus-11',
    name: 'Nikotin (Rokok & Vape)',
    category: 'Zat Adiktif Lainnya',
    visual: 'Batangan rokok tembakau atau cairan (liquid) dalam perangkat rokok elektrik dengan berbagai aroma.',
    healthEffects: 'Kecanduan kuat, penyempitan pembuluh darah, penurunan kapasitas paru-paru, dan gangguan perkembangan otak remaja.',
    socialEffects: 'Pemborosan uang saku dan menjadi pintu masuk kebiasaan mencoba zat adiktif yang lebih berbahaya.'
  },
  {
    id: 'kamus-12',
    name: 'Alkohol / Minuman Keras',
    category: 'Zat Adiktif Lainnya',
    visual: 'Cairan bening atau berwarna dalam botol/kemasan yang mengandung etanol.',
    healthEffects: 'Kerusakan fungsi hati (sirosis), peradangan lambung, penurunan koordinasi otak, dan keracunan alkohol.',
    socialEffects: 'Memicu perkelahian, kecelakaan lalu lintas, dan menurunnya kontrol diri remaja.'
  },
  {
    id: 'kamus-13',
    name: 'Inhalansia (Uap Lem / Pelarut Kimia)',
    category: 'Zat Adiktif Lainnya',
    visual: 'Produk kimia rumah tangga atau industri (lem perekat, pengencer cat, aerosol) yang disalahgunakan uapnya.',
    healthEffects: 'Kerusakan permanen pada sel otak, saraf pendengaran, sumsum tulang, hati, dan risiko kematian mendadak akibat gagal jantung.',
    socialEffects: 'Penurunan kecerdasan drastis dan isolasi sosial dari teman sebaya.'
  }
];

const STORIES_DATA = [
  {
    id: 'story-1',
    alias: 'R.A. (19 Tahun)',
    role: 'Mantan Penyalahguna, Kini Mahasiswa Teknik',
    quote: 'Satu keputusan berani untuk jujur ke orang tua menyelamatkan seluruh masa depan saya.',
    summary: 'Berawal dari rasa ingin tahu di kelas 11 SMK, R.A. sempat terjerumus selama 8 bulan sebelum akhirnya menjalani rehabilitasi dan bangkit.',
    fullStory: [
      'Di pertengahan kelas 11 SMK, saya mulai ikut nongkrong di luar jam sekolah. Awalnya hanya diajak merokok, lalu perlahan ditawari pil penenang ilegal dengan alasan biar rileks menghadapi ujian.',
      'Dalam beberapa bulan, nilai praktik saya anjlok drastis. Saya sering bolos, mudah marah di rumah, dan kehilangan kepercayaan dari sahabat-sahabat terdekat.',
      'Titik baliknya terjadi saat guru BK memanggil saya dengan pendekatan yang sangat manusiawi tanpa menghakimi. Bersama orang tua, saya mendatangi layanan rehabilitasi IPWL. Proses pemulihan selama enam bulan mengajarkan saya cara mengelola stres dengan olahraga dan musik. Hari ini saya sudah kuliah semester 3 dan aktif menjadi relawan edukasi sebaya.'
    ]
  },
  {
    id: 'story-2',
    alias: 'D.P. (18 Tahun)',
    role: 'Penyintas & Atlet Futsal Daerah',
    quote: 'Narkoba mencuri napas dan mimpi saya di lapangan; pemulihan mengembalikan semuanya.',
    summary: 'Hampir dicoret dari tim futsal sekolah akibat paparan zat adiktif, D.P. berhasil pulih total dan meraih juara turnamen antar-pelajar.',
    fullStory: [
      'Sebagai kapten tim futsal sekolah, saya dulu merasa fisik saya kuat dan tidak mungkin kecanduan. Anggapan itu ternyata salah besar ketika saya tergoda mencoba tembakau sintetis bersama teman luar sekolah.',
      'Stamina saya merosot tajam hanya dalam hitungan minggu. Jantung sering berdebar kencang saat latihan dan saya sempat pingsan di pinggir lapangan.',
      'Pelatih dan keluarga mendampingi saya menjalani pemulihan medis dan konseling rutin. Butuh disiplin keras untuk melawan rasa ingin kembali memakai, tapi dukungan tim membuat saya bertahan. Tahun lalu, saya kembali dipercaya membawa piala juara tingkat kota.'
    ]
  },
  {
    id: 'story-3',
    alias: 'N.S. (20 Tahun)',
    role: 'Kreator Konten Edukasi Remaja',
    quote: 'Masa lalu bukan vonis mati; selama mau meminta bantuan, selalu ada jalan pulang.',
    summary: 'Terjebak tekanan pergaulan saat masa transisi sekolah, N.S. bangkit lewat pendampingan BNN dan kini menginspirasi ribuan remaja.',
    fullStory: [
      'Saya dulu mengira zat adiktif bisa membantu melupakan masalah keluarga. Kenyataannya, masalah tidak pernah selesai dan justru bertambah dengan rasa cemas berlebihan setiap malam.',
      'Saya akhirnya menghubungi Call Center BNN 184 untuk berkonsultasi secara anonim. Petugas mengarahkan saya ke fasilitas rehabilitasi rawat jalan yang menjaga privasi saya sepenuhnya.',
      'Kini saya menggunakan pengalaman tersebut untuk membuat konten edukasi anti-narkoba di media sosial agar adik-adik kelas SMA/SMK tidak mengulangi kesalahan yang sama.'
    ]
  },
  {
    id: 'story-4',
    alias: 'F.K. (17 Tahun)',
    role: 'Siswa SMA & Duta Anti-Narkoba Sekolah',
    quote: 'Berkata tidak pada teman yang memaksa adalah bentuk self-respect paling tinggi.',
    summary: 'F.K. berhasil keluar dari lingkaran pertemanan toksik sebelum terjerumus lebih jauh dan membentuk klub kreatif di sekolahnya.',
    fullStory: [
      'Saat masuk SMA, saya ingin sekali punya banyak teman. Namun saya sadar lingkaran tongkrongan yang saya ikuti mulai mengarah ke penyalahgunaan obat-obatan terlarang.',
      'Ketika pertama kali ditawari, jantung saya berdebar takut dikucilkan. Saya teringat pesan orang tua untuk selalu mengutamakan masa depan, lalu saya menolak dengan tegas dan memilih pulang.',
      'Meski sempat dijauhi kelompok tersebut, saya justru menemukan teman-teman baru di ekstrakurikuler desain grafis yang jauh lebih suportif dan positif.'
    ]
  },
  {
    id: 'story-5',
    alias: 'A.M. (21 Tahun)',
    role: 'Wirausaha Muda Kuliner',
    quote: 'Uang yang dulu habis untuk merusak diri, sekarang jadi modal usaha yang menghidupi keluarga.',
    summary: 'Setelah menyelesaikan program rehabilitasi sosial, A.M. memanfaatkan pelatihan keterampilan untuk merintis usaha kedai kopi sehat.',
    fullStory: [
      'Selama dua tahun terjerat ketergantungan, tabungan dan barang-barang pribadi saya habis terjual. Saya kehilangan rasa percaya diri untuk bertemu orang lain.',
      'Di pusat rehabilitasi sosial, saya tidak hanya mendapatkan terapi psikologis, tetapi juga pelatihan wirausaha dan manajemen keuangan.',
      'Setelah dinyatakan pulih dan menyelesaikan masa bina lanjut, saya merintis usaha minuman sehat dari nol. Hidup bersih dari narkoba memberi saya ketenangan tidur yang tidak ternilai harganya.'
    ]
  }
];

const MATERIALS_DATA = [
  {
    id: 'mat-1',
    title: 'Poster Kampanye: Otak Cemerlang Tanpa Narkoba',
    type: 'Poster A3 (PNG/PDF)',
    category: 'Kesehatan',
    description: 'Infografis visual perbandingan aktivitas otak sehat vs paparan zat adiktif untuk mading sekolah.',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'mat-2',
    title: 'Pamflet Saku: 5 Jurus Jitu Tolak Ajakan Negatif',
    type: 'Pamflet Lipat',
    category: 'Pencegahan',
    description: 'Panduan praktis komunikasi asertif bagi pelajar SMA/SMK menghadapi tekanan teman sebaya.',
    color: 'from-emerald-600 to-teal-500'
  },
  {
    id: 'mat-3',
    title: 'Infografis Alur Layanan Rehabilitasi & IPWL',
    type: 'Infografis Digital',
    category: 'Layanan Bantuan',
    description: 'Informasi langkah melapor sukarela dan kontak resmi BNN 184 yang menjamin kerahasiaan pelapor.',
    color: 'from-sky-600 to-indigo-500'
  },
  {
    id: 'mat-4',
    title: 'Stiker & Banner Digital: Sekolah Bersinar (Bersih Narkoba)',
    type: 'Media Sosial Kit',
    category: 'Kampanye OSIS',
    description: 'Template kampanye digital untuk kegiatan MPLS dan peringatan Hari Anti Narkotika Internasional (HANI).',
    color: 'from-teal-600 to-emerald-500'
  }
];

// Data terpisah untuk BNN Wilayah Banten sesuai aturan verifikasi keamanan publik
const BNN_BANTEN_DATA = [
  {
    id: 'bnn-banten-prov',
    nama: 'BNN Provinsi Banten',
    alamat: 'DIISI MANUAL',
    telepon: 'DIISI MANUAL',
    latitude: 'DIISI MANUAL',
    longitude: 'DIISI MANUAL',
    verified: false
  },
  {
    id: 'bnn-tangerang-kota',
    nama: 'BNN Kota Tangerang',
    alamat: 'DIISI MANUAL',
    telepon: 'DIISI MANUAL',
    latitude: 'DIISI MANUAL',
    longitude: 'DIISI MANUAL',
    verified: false
  },
  {
    id: 'bnn-tangsel',
    nama: 'BNN Kota Tangerang Selatan',
    alamat: 'DIISI MANUAL',
    telepon: 'DIISI MANUAL',
    latitude: 'DIISI MANUAL',
    longitude: 'DIISI MANUAL',
    verified: false
  },
  {
    id: 'bnn-cilegon',
    nama: 'BNN Kota Cilegon',
    alamat: 'DIISI MANUAL',
    telepon: 'DIISI MANUAL',
    latitude: 'DIISI MANUAL',
    longitude: 'DIISI MANUAL',
    verified: false
  }
];

const BADGES_MASTER = [
  { id: 'badge-reader-1', title: 'Pembaca Pemula', desc: 'Membaca 1 artikel edukasi P4GN', icon: '📖' },
  { id: 'badge-reader-active', title: 'Pembaca Aktif', desc: 'Membaca minimal 4 artikel edukasi', icon: '🔥' },
  { id: 'badge-perfect', title: 'Perfect Score', desc: 'Meraih nilai 100% pada kuis artikel', icon: '🎯' },
  { id: 'badge-graduate', title: 'Duta Muda Bersinar', desc: 'Menyelesaikan seluruh artikel & lulus kuis untuk E-Sertifikat', icon: '🏆' }
];

const BANNED_WORDS = ['anjing', 'bangsat', 'goblok', 'tolol', 'brengsek', 'kontol', 'memek', 'bajingan'];

// ==========================================
// KOMPONEN UTAMA APLIKASI NARKOEDU
// ==========================================

export default function App() {
  // Navigasi & Tema
  const [activeTab, setActiveTab] = useState('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState(null);

  // Autentikasi & Progres User
  const [user, setUser] = useState(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
  const [readArticles, setReadArticles] = useState([]);
  const [quizResults, setQuizResults] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);

  // State Artikel & Kuis
  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategory, setArticleCategory] = useState('Semua');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeQuizArticle, setActiveQuizArticle] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // State Kamus Narkoba
  const [dictSearch, setDictSearch] = useState('');
  const [dictCategory, setDictCategory] = useState('Semua');
  const [flippedCards, setFlippedCards] = useState({});

  // State Kisah Inspiratif
  const [selectedStory, setSelectedStory] = useState(null);

  // State Kalkulator Dampak Finansial
  const [freqPerWeek, setFreqPerWeek] = useState(3);
  const [costPerSession, setCostPerSession] = useState(75000);

  // State Forum Diskusi
  const [forumThreads, setForumThreads] = useState([
    {
      id: 'thread-1',
      author: 'Rizky Pratama (SMK RPL)',
      title: 'Ide kegiatan MPLS anti-narkoba yang seru buat adik kelas?',
      content: 'Halo teman-teman! OSIS sekolah kami mau bikin sesi edukasi P4GN pas MPLS nanti biar nggak membosankan. Ada saran konsep acara atau lomba kreatif?',
      likes: 14,
      likedByMe: false,
      reported: false,
      time: '2 jam lalu',
      replies: [
        { id: 'rep-1', author: 'Salsa Aulia', text: 'Bikin lomba poster digital atau kuis interaktif pakai Kahoot seru banget kak!', time: '1 jam lalu' }
      ]
    },
    {
      id: 'thread-2',
      author: 'Dimas Saputra',
      title: 'Tips jaga fokus belajar tanpa bergantung minuman berenergi berlebihan',
      content: 'Kadang kalau lagi kejar deadline tugas kelompok suka ngantuk berat. Biasanya kalian ngatasinnya gimana biar tetap sehat?',
      likes: 9,
      likedByMe: false,
      reported: false,
      time: '5 jam lalu',
      replies: [
        { id: 'rep-2', author: 'Nadia Putri', text: 'Minum air putih dingin, stretching 5 menit, dan atur teknik Pomodoro 25 menit belajar 5 menit istirahat.', time: '3 jam lalu' }
      ]
    }
  ]);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [replyInputs, setReplyInputs] = useState({});

  // State Auth Form
  const [authMode, setAuthMode] = useState('login');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Cek otomatis pencapaian lencana
  useEffect(() => {
    if (!user) return;
    const newBadges = [...earnedBadges];
    let unlockedName = null;

    if (readArticles.length >= 1 && !newBadges.includes('badge-reader-1')) {
      newBadges.push('badge-reader-1');
      unlockedName = 'Pembaca Pemula';
    }
    if (readArticles.length >= 4 && !newBadges.includes('badge-reader-active')) {
      newBadges.push('badge-reader-active');
      unlockedName = 'Pembaca Aktif';
    }
    if (quizResults.some((q) => q.score === 100) && !newBadges.includes('badge-perfect')) {
      newBadges.push('badge-perfect');
      unlockedName = 'Perfect Score';
    }
    const passedQuizzes = new Set(quizResults.filter((q) => q.score >= 60).map((q) => q.articleId));
    if (readArticles.length >= ARTICLES_DATA.length && passedQuizzes.size >= 3 && !newBadges.includes('badge-graduate')) {
      newBadges.push('badge-graduate');
      unlockedName = 'Duta Muda Bersinar';
    }

    if (newBadges.length !== earnedBadges.length) {
      setEarnedBadges(newBadges);
      if (unlockedName) {
        showToast(`Selamat! Kamu meraih lencana baru: "${unlockedName}"`, 'badge');
      }
    }
  }, [readArticles, quizResults, user]);

  // Handler Navigasi
  const navigateTo = (tab) => {
    setActiveTab(tab);
    setSelectedArticle(null);
    setActiveQuizArticle(null);
    setSelectedStory(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler Login / Register Demo
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authEmail.trim()) return;
    const displayName = authMode === 'register' && authName.trim()
      ? authName.trim()
      : authEmail.split('@')[0];

    setUser({
      name: displayName,
      email: authEmail.trim(),
      school: 'SMA/SMK Negeri Banten'
    });
    showToast(`Selamat datang di NarkoEdu, ${displayName}!`);

    if (redirectAfterLogin) {
      const target = redirectAfterLogin;
      setRedirectAfterLogin(null);
      if (target.type === 'quiz') {
        setActiveTab('artikel');
        setActiveQuizArticle(target.article);
        setQuizAnswers({});
        setQuizSubmitted(false);
      } else {
        navigateTo(target.tab || 'profil');
      }
    } else {
      navigateTo('profil');
    }
  };

  const handleQuickDemoLogin = () => {
    setUser({
      name: 'Siswa Demo',
      email: 'siswa.demo@narkoedu.id',
      school: 'SMK Negeri Contoh'
    });
    showToast('Masuk sebagai Siswa Demo berhasil!');
    if (redirectAfterLogin) {
      const target = redirectAfterLogin;
      setRedirectAfterLogin(null);
      if (target.type === 'quiz') {
        setActiveTab('artikel');
        setActiveQuizArticle(target.article);
        setQuizAnswers({});
        setQuizSubmitted(false);
      } else {
        navigateTo(target.tab || 'profil');
      }
    } else {
      navigateTo('profil');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setReadArticles([]);
    setQuizResults([]);
    setEarnedBadges([]);
    showToast('Kamu telah keluar dari akun.');
    navigateTo('beranda');
  };

  // Handler Tandai Artikel Sudah Dibaca
  const toggleReadArticle = (articleId) => {
    if (!user) {
      showToast('Silakan masuk terlebih dahulu untuk menyimpan progres baca.', 'info');
      setRedirectAfterLogin({ tab: 'artikel' });
      navigateTo('login');
      return;
    }
    if (!readArticles.includes(articleId)) {
      setReadArticles([...readArticles, articleId]);
      showToast('Artikel ditandai sudah dibaca!');
    }
  };

  // Handler Mulai Kuis (Route Guard)
  const handleStartQuiz = (article) => {
    if (!user) {
      showToast('Login diperlukan untuk mengerjakan kuis evaluasi.', 'info');
      setRedirectAfterLogin({ type: 'quiz', article });
      navigateTo('login');
      return;
    }
    setActiveQuizArticle(article);
    setQuizAnswers({});
    setQuizSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitQuiz = () => {
    if (!activeQuizArticle) return;
    const total = activeQuizArticle.quiz.length;
    let correct = 0;
    activeQuizArticle.quiz.forEach((item, idx) => {
      if (quizAnswers[idx] === item.answer) correct++;
    });
    const score = Math.round((correct / total) * 100);
    setQuizSubmitted(true);

    const newResult = {
      id: Date.now(),
      articleId: activeQuizArticle.id,
      articleTitle: activeQuizArticle.title,
      score,
      correct,
      total,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setQuizResults([newResult, ...quizResults]);
    if (!readArticles.includes(activeQuizArticle.id)) {
      setReadArticles([...readArticles, activeQuizArticle.id]);
    }
    showToast(`Kuis selesai! Skor kamu: ${score}%`);
  };

  // Filter Kata Kasar Forum
  const containsProfanity = (text) => {
    const lower = text.toLowerCase();
    return BANNED_WORDS.some((word) => lower.includes(word));
  };

  const handleCreateThread = (e) => {
    e.preventDefault();
    if (!user) {
      showToast('Masuk terlebih dahulu untuk membuat diskusi baru.', 'info');
      navigateTo('login');
      return;
    }
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;
    if (containsProfanity(newThreadTitle) || containsProfanity(newThreadContent)) {
      showToast('Pesan mengandung kata yang tidak pantas. Gunakan bahasa yang sopan dan edukatif.', 'error');
      return;
    }
    const created = {
      id: `thread-${Date.now()}`,
      author: user.name,
      title: newThreadTitle.trim(),
      content: newThreadContent.trim(),
      likes: 0,
      likedByMe: false,
      reported: false,
      time: 'Baru saja',
      replies: []
    };
    setForumThreads([created, ...forumThreads]);
    setNewThreadTitle('');
    setNewThreadContent('');
    showToast('Topik diskusi berhasil dipublikasikan!');
  };

  const handleReplyThread = (threadId) => {
    if (!user) {
      showToast('Masuk terlebih dahulu untuk membalas diskusi.', 'info');
      navigateTo('login');
      return;
    }
    const text = (replyInputs[threadId] || '').trim();
    if (!text) return;
    if (containsProfanity(text)) {
      showToast('Balasan mengandung kata tidak pantas. Mohon perbaiki.', 'error');
      return;
    }
    setForumThreads(
      forumThreads.map((t) =>
        t.id === threadId
          ? {
              ...t,
              replies: [...t.replies, { id: `rep-${Date.now()}`, author: user.name, text, time: 'Baru saja' }]
            }
          : t
      )
    );
    setReplyInputs({ ...replyInputs, [threadId]: '' });
    showToast('Balasan terkirim!');
  };

  const handleToggleLike = (threadId) => {
    if (!user) {
      showToast('Masuk terlebih dahulu untuk menyukai diskusi.', 'info');
      return;
    }
    setForumThreads(
      forumThreads.map((t) =>
        t.id === threadId
          ? { ...t, likes: t.likedByMe ? t.likes - 1 : t.likes + 1, likedByMe: !t.likedByMe }
          : t
      )
    );
  };

  const handleReportThread = (threadId) => {
    setForumThreads(
      forumThreads.map((t) => (t.id === threadId ? { ...t, reported: true } : t))
    );
    showToast('Laporan diterima. Tim moderator akan meninjau postingan ini.', 'info');
  };

  // Unduh Materi P4GN (Simulasi file poster teks/infografis siap cetak)
  const handleDownloadMaterial = (item) => {
    const content = `====================================================
NARKOEDU - MATERI EDUKASI & PENCEGAHAN P4GN
====================================================
Judul Materi : ${item.title}
Jenis Media  : ${item.type}
Kategori     : ${item.category}

Deskripsi:
${item.description}

Pesan Utama:
"Masa Depan Cerah Dimulai dari Keberanian Berkata Tidak pada Narkoba."

Layanan Konsultasi & Bantuan Resmi BNN (24 Jam):
- Call Center BNN : 184
- WhatsApp BNN    : 081221675675
- Kantor Pusat    : Jl. MT. Haryono No. 11 Cawang, Jakarta Timur
====================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.id}-NarkoEdu.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Mengunduh "${item.title}"...`);
  };

  // Cetak / Unduh E-Sertifikat
  const handleDownloadCertificate = () => {
    if (!user) return;
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const certHtml = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>E-Sertifikat NarkoEdu - ${user.name}</title>
<style>
  body { font-family: 'Segoe UI', sans-serif; background: #f0f9ff; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
  .cert { width: 820px; background: white; border: 12px solid #0284c7; padding: 48px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1); position: relative; }
  .inner { border: 3px solid #10b981; padding: 36px; }
  h1 { color: #0369a1; font-size: 34px; margin-bottom: 8px; letter-spacing: 2px; }
  .sub { color: #059669; font-weight: 600; font-size: 16px; margin-bottom: 28px; }
  .name { font-size: 32px; font-weight: bold; color: #0f172a; border-bottom: 2px solid #cbd5e1; display: inline-block; padding: 6px 32px; margin: 16px 0; }
  p { color: #475569; font-size: 16px; line-height: 1.6; }
  .footer { margin-top: 36px; display: flex; justify-content: space-between; font-size: 14px; color: #64748b; }
</style>
</head>
<body>
  <div class="cert">
    <div class="inner">
      <h1>E-SERTIFIKAT APRESIASI</h1>
      <div class="sub">PROGRAM EDUKASI P4GN PELAJAR SMA/SMK — NARKOEDU</div>
      <p>Diberikan dengan bangga kepada:</p>
      <div class="name">${user.name}</div>
      <p>Telah menyelesaikan rangkaian modul literasi pencegahan penyalahgunaan narkoba dan lulus evaluasi pemahaman dasar sebagai <strong>Generasi Muda Bersih Narkoba (Bersinar)</strong>.</p>
      <div class="footer">
        <div>Tanggal Terbit: ${today}</div>
        <div>Platform Edukasi NarkoEdu</div>
      </div>
    </div>
  </div>
  <script>window.print();</script>
</body>
</html>`;
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(certHtml);
      win.document.close();
    } else {
      showToast('Izinkan pop-up browser untuk mencetak E-Sertifikat PDF.', 'info');
    }
  };

  // Kalkulasi Finansial
  const monthlySpend = freqPerWeek * costPerSession * 4;
  const yearlySpend = freqPerWeek * costPerSession * 52;
  const fiveYearSpend = yearlySpend * 5;

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((art) => {
      const matchCat = articleCategory === 'Semua' || art.category === articleCategory;
      const matchSearch =
        art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
        art.summary.toLowerCase().includes(articleSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [articleSearch, articleCategory]);

  const filteredDictionary = useMemo(() => {
    return DICTIONARY_DATA.filter((item) => {
      const matchCat = dictCategory === 'Semua' || item.category === dictCategory;
      const matchSearch =
        item.name.toLowerCase().includes(dictSearch.toLowerCase()) ||
        item.healthEffects.toLowerCase().includes(dictSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [dictSearch, dictCategory]);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'artikel', label: 'Artikel' },
    { id: 'kamus', label: 'Kamus Narkoba' },
    { id: 'kuis', label: 'Kuis' },
    { id: 'materi', label: 'Materi' },
    { id: 'kisah', label: 'Kisah Inspiratif' },
    { id: 'forum', label: 'Forum' },
    { id: 'peta', label: 'Peta Rehabilitasi' },
    { id: 'profil', label: 'Profil' }
  ];

  // Kelayakan Sertifikat
  const passedQuizCount = new Set(quizResults.filter((q) => q.score >= 60).map((q) => q.articleId)).size;
  const certProgress = Math.min(
    100,
    Math.round(((readArticles.length / ARTICLES_DATA.length) * 60) + ((Math.min(passedQuizCount, 3) / 3) * 40))
  );
  const isCertEligible = readArticles.length >= ARTICLES_DATA.length && passedQuizCount >= 3;

  return (
    <div className={darkMode ? 'dark bg-slate-950 text-slate-100 min-h-screen flex flex-col' : 'bg-slate-50 text-slate-800 min-h-screen flex flex-col'}>
      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm animate-bounce">
          <div className={`px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 text-sm font-medium ${
            toast.type === 'error'
              ? 'bg-red-600 text-white border-red-700'
              : toast.type === 'badge'
              ? 'bg-amber-500 text-white border-amber-600'
              : 'bg-sky-700 text-white border-sky-800'
          }`}>
            <Sparkles className="w-5 h-5 shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* NAVBAR RESPONSIF */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/95 border-sky-100 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Logo Brand */}
          <button
            onClick={() => navigateTo('beranda')}
            className="flex items-center gap-2.5 text-left focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-600 to-emerald-500 flex items-center justify-center text-white shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                NarkoEdu
              </span>
              <span className={`block text-[10px] font-medium -mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Edukasi P4GN Pelajar
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-sky-600 text-white'
                    : darkMode
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-600 hover:bg-sky-50 hover:text-sky-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle Dark Mode"
              className={`p-2 rounded-lg border transition-colors ${
                darkMode
                  ? 'border-slate-700 bg-slate-800 text-amber-400 hover:bg-slate-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {user ? (
              <button
                onClick={() => navigateTo('profil')}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-sm font-medium"
              >
                <User className="w-4 h-4" />
                <span className="max-w-[110px] truncate">{user.name}</span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-xs transition-colors"
              >
                Masuk / Daftar
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Menu Navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className={`xl:hidden border-t px-4 py-3 space-y-1 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeTab === item.id
                    ? 'bg-sky-600 text-white'
                    : darkMode
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-700 hover:bg-sky-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-center rounded-lg bg-red-50 text-red-600 text-sm font-semibold"
                >
                  Keluar ({user.name})
                </button>
              ) : (
                <button
                  onClick={() => navigateTo('login')}
                  className="w-full py-2 text-center rounded-lg bg-orange-500 text-white text-sm font-semibold"
                >
                  Masuk / Daftar Akun Siswa
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* ==========================================
            1. BERANDA (LANDING PAGE)
           ========================================== */}
        {activeTab === 'beranda' && (
          <div className="space-y-12">
            {/* Hero Kampanye */}
            <section className="rounded-3xl bg-gradient-to-br from-sky-700 via-sky-600 to-emerald-600 text-white p-8 sm:p-12 shadow-lg relative overflow-hidden">
              <div className="max-w-2xl space-y-5 relative z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-sky-50 text-xs font-semibold backdrop-blur-xs">
                  <Shield className="w-3.5 h-3.5" /> Program Edukasi P4GN Pelajar SMA/SMK
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                  Masa Depan Cemerlang Dimulai dari Keberanian Berkata Tidak.
                </h1>
                <p className="text-sky-100 text-base sm:text-lg leading-relaxed">
                  <strong>NarkoEdu</strong> hadir sebagai ruang belajar interaktif yang suportif untuk memahami fakta medis, hukum, dan strategi menjaga diri agar tetap sehat, berprestasi, dan bebas dari narkoba.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => navigateTo('artikel')}
                    className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md transition-all flex items-center gap-2"
                  >
                    Mulai Belajar Sekarang <ChevronRight className="w-4 h-4" />
                  </button>
                  {!user && (
                    <button
                      onClick={handleQuickDemoLogin}
                      className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold backdrop-blur-xs transition-all"
                    >
                      Coba Mode Siswa Demo
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Statistik Singkat Edukasi */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { label: 'Usia Emas Perkembangan Otak', value: 'Hingga 25 Thn', desc: 'Masa krusial pelajar SMA/SMK membangun potensi maksimal tanpa paparan zat adiktif.' },
                { label: 'Layanan Bantuan BNN 24 Jam', value: 'Call Center 184', desc: 'Konsultasi rahasia, aman, dan didukung pendampingan rehabilitasi profesional.' },
                { label: 'Modul Literasi & Kuis P4GN', value: '8 Artikel + Kuis', desc: 'Dilengkapi kamus istilah, kalkulator dampak finansial, serta E-Sertifikat pelajar.' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-sky-100 shadow-xs'
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-sky-700 dark:text-sky-400 my-1.5">
                    {stat.value}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{stat.desc}</p>
                </div>
              ))}
            </section>

            {/* Highlight Artikel Terbaru */}
            <section className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Artikel Edukasi Pilihan</h2>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Baca materi singkat dan uji pemahamanmu lewat kuis interaktif.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('artikel')}
                  className="text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                >
                  Lihat Semua <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ARTICLES_DATA.slice(0, 3).map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      setActiveTab('artikel');
                      setSelectedArticle(art);
                    }}
                    className={`cursor-pointer rounded-2xl overflow-hidden border transition-all hover:-translate-y-1 ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <img src={art.image} alt={art.title} className="w-full h-44 object-cover" />
                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 font-semibold">
                          {art.category}
                        </span>
                        <span className="text-slate-500">{art.readTime}</span>
                      </div>
                      <h3 className="font-bold text-lg leading-snug line-clamp-2">{art.title}</h3>
                      <p className={`text-sm line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {art.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Fitur Unggulan Quick Access */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Kamus Narkoba', desc: 'Kenali golongan & dampak buruk zat adiktif secara aman.', tab: 'kamus', icon: BookOpen },
                { title: 'Kalkulator Finansial', desc: 'Hitung potensi tabungan masa depan tanpa zat adiktif.', tab: 'materi', icon: Calculator },
                { title: 'Kisah Inspiratif', desc: 'Cerita nyata kebangkitan remaja penyintas.', tab: 'kisah', icon: Heart },
                { title: 'Peta Rehabilitasi', desc: 'Kontak resmi BNN 24 jam & rujukan wilayah Banten.', tab: 'peta', icon: MapPin }
              ].map((box, idx) => {
                const IconComp = box.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => navigateTo(box.tab)}
                    className={`p-5 rounded-2xl border text-left transition-all hover:border-sky-500 ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-3">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base">{box.title}</h3>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{box.desc}</p>
                  </button>
                );
              })}
            </section>
          </div>
        )}

        {/* ==========================================
            2. ARTIKEL & DETAIL ARTIKEL + KUIS
           ========================================== */}
        {activeTab === 'artikel' && !selectedArticle && !activeQuizArticle && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Katalog Artikel Edukasi P4GN</h1>
              <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Pelajari materi pencegahan, dampak kesehatan, hingga aspek hukum. Tandai selesai dibaca untuk membuka kuis & lencana.
              </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari topik artikel..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['Semua', 'Dampak Kesehatan', 'Tips Menolak', 'Hukum', 'Pencegahan'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setArticleCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      articleCategory === cat
                        ? 'bg-sky-600 text-white'
                        : darkMode
                        ? 'bg-slate-900 text-slate-300 border border-slate-800'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-sky-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Kartu Artikel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((art) => {
                const isRead = readArticles.includes(art.id);
                return (
                  <div
                    key={art.id}
                    className={`rounded-2xl overflow-hidden border flex flex-col justify-between transition-all ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="relative">
                        <img src={art.image} alt={art.title} className="w-full h-44 object-cover" />
                        {isRead && (
                          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center gap-1 shadow">
                            <CheckCircle className="w-3.5 h-3.5" /> Sudah Dibaca
                          </span>
                        )}
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-700 font-semibold">
                            {art.category}
                          </span>
                          <span className="text-slate-500">{art.readTime}</span>
                        </div>
                        <h3 className="font-bold text-lg leading-snug">{art.title}</h3>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{art.summary}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 pt-2 flex gap-2">
                      <button
                        onClick={() => setSelectedArticle(art)}
                        className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors"
                      >
                        Baca Artikel
                      </button>
                      <button
                        onClick={() => handleStartQuiz(art)}
                        className="px-3.5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors"
                      >
                        Kuis
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DETAIL ARTIKEL */}
        {activeTab === 'artikel' && selectedArticle && !activeQuizArticle && (
          <div className="max-w-3xl mx-auto space-y-6">
            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Artikel
            </button>

            <article className={`rounded-3xl overflow-hidden border ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-64 sm:h-80 object-cover" />
              <div className="p-6 sm:p-10 space-y-6">
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 font-semibold">
                    {selectedArticle.category}
                  </span>
                  <span className="text-slate-500">Estimasi baca: {selectedArticle.readTime}</span>
                  {readArticles.includes(selectedArticle.id) && (
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Sudah Dibaca
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">{selectedArticle.title}</h1>

                <div className={`space-y-4 text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {selectedArticle.content.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => toggleReadArticle(selectedArticle.id)}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-colors ${
                      readArticles.includes(selectedArticle.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {readArticles.includes(selectedArticle.id) ? 'Sudah Ditandai Dibaca' : 'Tandai Sudah Dibaca'}
                  </button>

                  <button
                    onClick={() => handleStartQuiz(selectedArticle)}
                    className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm flex items-center gap-2 shadow-sm"
                  >
                    <Brain className="w-4 h-4" /> Mulai Kuis Evaluasi (5 Soal)
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* HALAMAN KUIS EVALUASI */}
        {(activeTab === 'kuis' || activeQuizArticle) && (
          <div className="max-w-3xl mx-auto space-y-6">
            {!activeQuizArticle ? (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">Kuis Evaluasi Pemahaman P4GN</h1>
                  <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Pilih topik artikel di bawah untuk mengerjakan 5 soal pilihan ganda dan kumpulkan lencana prestasi.
                  </p>
                </div>
                {!user && (
                  <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-sm text-amber-800 dark:text-amber-200">
                      <Lock className="w-5 h-5 shrink-0" />
                      <span>Kuis hanya dapat diakses setelah masuk akun agar skor tersimpan di profilmu.</span>
                    </div>
                    <button
                      onClick={() => navigateTo('login')}
                      className="px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold shrink-0"
                    >
                      Masuk Sekarang
                    </button>
                  </div>
                )}
                <div className="grid gap-4">
                  {ARTICLES_DATA.map((art) => {
                    const bestScore = quizResults
                      .filter((r) => r.articleId === art.id)
                      .reduce((max, r) => Math.max(max, r.score), 0);
                    return (
                      <div
                        key={art.id}
                        className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-semibold text-sky-600">{art.category}</span>
                          <h3 className="font-bold text-base mt-0.5">{art.title}</h3>
                          <p className="text-xs text-slate-500 mt-1">
                            5 Soal Pilihan Ganda {bestScore > 0 ? `• Skor Tertinggi: ${bestScore}%` : ''}
                          </p>
                        </div>
                        <button
                          onClick={() => handleStartQuiz(art)}
                          className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shrink-0"
                        >
                          Mulai Kuis
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <button
                  onClick={() => {
                    setActiveQuizArticle(null);
                    setQuizSubmitted(false);
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" /> Pilih Topik Kuis Lain
                </button>

                <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div>
                    <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold">
                      Kuis Evaluasi
                    </span>
                    <h2 className="text-2xl font-bold mt-2">{activeQuizArticle.title}</h2>
                  </div>

                  {activeQuizArticle.quiz.map((item, qIdx) => {
                    const userChoice = quizAnswers[qIdx];
                    const isCorrect = userChoice === item.answer;
                    return (
                      <div key={qIdx} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                        <p className="font-semibold text-base">
                          {qIdx + 1}. {item.q}
                        </p>
                        <div className="space-y-2">
                          {item.options.map((opt, optIdx) => {
                            let btnStyle = darkMode
                              ? 'border-slate-700 hover:bg-slate-800'
                              : 'border-slate-200 hover:bg-sky-50';
                            if (!quizSubmitted && userChoice === optIdx) {
                              btnStyle = 'border-sky-600 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-semibold';
                            } else if (quizSubmitted) {
                              if (optIdx === item.answer) {
                                btnStyle = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold';
                              } else if (userChoice === optIdx && optIdx !== item.answer) {
                                btnStyle = 'border-red-500 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300';
                              }
                            }
                            return (
                              <button
                                key={optIdx}
                                disabled={quizSubmitted}
                                onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                                className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors ${btnStyle}`}
                              >
                                {String.fromCharCode(65 + optIdx)}. {opt}
                              </button>
                            );
                          })}
                        </div>
                        {quizSubmitted && (
                          <div className={`p-3 rounded-xl text-xs ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200'
                              : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200'
                          }`}>
                            <strong>{isCorrect ? 'Jawaban Benar!' : 'Kurang Tepat.'}</strong> {item.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {!quizSubmitted ? (
                    <button
                      disabled={Object.keys(quizAnswers).length < activeQuizArticle.quiz.length}
                      onClick={handleSubmitQuiz}
                      className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-sm transition-colors"
                    >
                      Kirim Jawaban & Lihat Skor ({Object.keys(quizAnswers).length}/{activeQuizArticle.quiz.length} Terjawab)
                    </button>
                  ) : (
                    <div className="p-6 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-center space-y-3">
                      <p className="text-sm font-semibold text-sky-700 dark:text-sky-300">Hasil Evaluasi Kamu</p>
                      <p className="text-4xl font-extrabold text-sky-800 dark:text-white">
                        {quizResults[0]?.score ?? 0}%
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Riwayat skor otomatis tersimpan di halaman Profil.
                      </p>
                      <div className="flex justify-center gap-3 pt-2">
                        <button
                          onClick={() => {
                            setQuizAnswers({});
                            setQuizSubmitted(false);
                          }}
                          className="px-4 py-2 rounded-xl border border-sky-600 text-sky-700 dark:text-sky-300 text-xs font-semibold"
                        >
                          Ulangi Kuis
                        </button>
                        <button
                          onClick={() => navigateTo('profil')}
                          className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold"
                        >
                          Lihat Profil & Lencana
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            3. KAMUS NARKOBA (KARTU INTERAKTIF FLIP)
           ========================================== */}
        {activeTab === 'kamus' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-start gap-3">
              <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold text-sky-800 dark:text-sky-200">
                  Catatan Penting: Konten ini hanya untuk edukasi dan pencegahan.
                </p>
                <p className="text-sky-700 dark:text-sky-300 text-xs mt-0.5">
                  Informasi di bawah bertujuan membantu pelajar mengenali jenis zat berbahaya agar mampu menghindarinya. Klik kartu untuk membalik dan melihat dampak kesehatan serta sosialnya.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama zat atau dampak kesehatan..."
                  value={dictSearch}
                  onChange={(e) => setDictSearch(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${
                    darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['Semua', 'Narkotika', 'Psikotropika', 'Zat Adiktif Lainnya'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setDictCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold ${
                      dictCategory === cat
                        ? 'bg-emerald-600 text-white'
                        : darkMode
                        ? 'bg-slate-900 text-slate-300 border border-slate-800'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDictionary.map((item) => {
                const isFlipped = !!flippedCards[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => setFlippedCards({ ...flippedCards, [item.id]: !isFlipped })}
                    className={`cursor-pointer rounded-2xl border p-6 min-h-[250px] flex flex-col justify-between transition-all hover:shadow-md ${
                      isFlipped
                        ? darkMode
                          ? 'bg-slate-800 border-emerald-600'
                          : 'bg-emerald-50/70 border-emerald-400'
                        : darkMode
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {!isFlipped ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.category === 'Narkotika'
                              ? 'bg-red-100 text-red-700'
                              : item.category === 'Psikotropika'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-sky-100 text-sky-700'
                          }`}>
                            {item.category}
                          </span>
                          <RefreshCw className="w-4 h-4 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold">{item.name}</h3>
                        <div>
                          <p className="text-xs font-semibold uppercase text-slate-400">Ciri Visual Umum:</p>
                          <p className={`text-sm mt-1 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                            {item.visual}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-red-600 dark:text-red-400">DAMPAK NEGATIF</span>
                          <RefreshCw className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500">Efek pada Tubuh & Otak:</p>
                          <p className="text-sm mt-0.5">{item.healthEffects}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500">Dampak Kehidupan Sosial:</p>
                          <p className="text-sm mt-0.5">{item.socialEffects}</p>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 text-xs font-semibold text-sky-600 dark:text-sky-400 flex items-center justify-between">
                      <span>{isFlipped ? 'Klik untuk kembali ke info visual' : 'Klik kartu untuk lihat bahaya & dampak'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==========================================
            4. MATERI P4GN & KALKULATOR DAMPAK FINANSIAL
           ========================================== */}
        {activeTab === 'materi' && (
          <div className="space-y-12">
            {/* Galeri Media P4GN */}
            <section className="space-y-5">
              <div>
                <h1 className="text-3xl font-bold">Unduh Materi & Media Kampanye P4GN</h1>
                <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Gunakan poster, pamflet, dan infografis berikut untuk mading kelas, presentasi OSIS, atau kampanye media sosial.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MATERIALS_DATA.map((mat) => (
                  <div
                    key={mat.id}
                    className={`rounded-2xl border overflow-hidden flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className={`h-36 bg-gradient-to-r ${mat.color} p-6 text-white flex flex-col justify-between`}>
                      <span className="self-start px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
                        {mat.type}
                      </span>
                      <h3 className="text-xl font-bold leading-snug">{mat.title}</h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{mat.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleDownloadMaterial(mat)}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" /> Unduh Materi
                        </button>
                        <button
                          onClick={() => {
                            const text = encodeURIComponent(`Yuk pelajari materi "${mat.title}" di NarkoEdu untuk wujudkan sekolah bebas narkoba!`);
                            window.open(`https://wa.me/?text=${text}`, '_blank');
                          }}
                          className="py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Share2 className="w-3.5 h-3.5" /> WhatsApp
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(window.location.href);
                            showToast('Tautan materi disalin! Siap dibagikan ke Instagram/grup.');
                          }}
                          className={`py-2.5 px-3.5 rounded-xl border text-xs font-semibold ${
                            darkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          Salin Link
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Kalkulator Dampak Finansial */}
            <section className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-sky-100 shadow-sm'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Calculator className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Kalkulator Dampak Finansial & Masa Depan</h2>
                  <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Simulasikan berapa besar dana yang terselamatkan jika bebas dari rokok/zat adiktif dan dialihkan untuk masa depan.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span>Frekuensi Pengeluaran per Minggu</span>
                      <span className="text-sky-600">{freqPerWeek} kali / minggu</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="14"
                      value={freqPerWeek}
                      onChange={(e) => setFreqPerWeek(Number(e.target.value))}
                      className="w-full accent-sky-600"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-semibold mb-2">
                      <span>Perkiraan Biaya per Sekali Keluar</span>
                      <span className="text-sky-600">Rp {costPerSession.toLocaleString('id-ID')}</span>
                    </div>
                    <input
                      type="range"
                      min="15000"
                      max="500000"
                      step="5000"
                      value={costPerSession}
                      onChange={(e) => setCostPerSession(Number(e.target.value))}
                      className="w-full accent-sky-600"
                    />
                  </div>

                  {/* Grafik Batang Sederhana */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 space-y-3">
                    <p className="text-xs font-bold uppercase text-slate-500">Perbandingan Akumulasi Tabungan</p>
                    {[
                      { label: '1 Bulan', val: monthlySpend, pct: 15 },
                      { label: '1 Tahun', val: yearlySpend, pct: 45 },
                      { label: '5 Tahun', val: fiveYearSpend, pct: 100 }
                    ].map((bar, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{bar.label}</span>
                          <span>Rp {bar.val.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all"
                            style={{ width: `${bar.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800">
                      <p className="text-xs text-slate-500">Terselamatkan per Bulan</p>
                      <p className="text-xl font-extrabold text-sky-700 dark:text-sky-300 mt-1">
                        Rp {monthlySpend.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                      <p className="text-xs text-slate-500">Terselamatkan per Tahun</p>
                      <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300 mt-1">
                        Rp {yearlySpend.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/30 space-y-2">
                    <p className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                      Dalam 1 tahun (Rp {yearlySpend.toLocaleString('id-ID')}), uang ini bisa dipakai untuk:
                    </p>
                    <ul className="text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
                      <li>• {Math.max(1, Math.floor(yearlySpend / 6500000))} unit Laptop belajar / spesifikasi pemrograman</li>
                      <li>• {Math.max(1, Math.floor(yearlySpend / 500000))} bulan biaya kursus keahlian / beasiswa persiapan kuliah</li>
                      <li>• Tabungan modal usaha mandiri atau perlengkapan hobi produktif</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==========================================
            5. KISAH INSPIRATIF
           ========================================== */}
        {activeTab === 'kisah' && (
          <div className="space-y-6">
            {!selectedStory ? (
              <>
                <div>
                  <h1 className="text-3xl font-bold">Kisah Inspiratif & Pemulihan</h1>
                  <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Seluruh kisah menggunakan inisial nama samaran untuk menjaga privasi dan memotivasi sesama generasi muda.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {STORIES_DATA.map((st) => (
                    <div
                      key={st.id}
                      className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${
                        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 text-white font-bold flex items-center justify-center">
                            {st.alias.slice(0, 2)}
                          </div>
                          <div>
                            <h3 className="font-bold text-base">{st.alias}</h3>
                            <p className="text-xs text-emerald-600 font-medium">{st.role}</p>
                          </div>
                        </div>
                        <blockquote className="italic text-sm font-medium text-sky-700 dark:text-sky-300 border-l-4 border-sky-500 pl-3">
                          "{st.quote}"
                        </blockquote>
                        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{st.summary}</p>
                      </div>
                      <button
                        onClick={() => setSelectedStory(st)}
                        className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold"
                      >
                        Baca Kisah Lengkap
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="max-w-3xl mx-auto space-y-6">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Kisah
                </button>
                <div className={`p-8 rounded-3xl border space-y-5 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                    {selectedStory.role}
                  </span>
                  <h2 className="text-3xl font-extrabold">Perjalanan Bangkit {selectedStory.alias}</h2>
                  <blockquote className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-200 font-semibold italic">
                    "{selectedStory.quote}"
                  </blockquote>
                  <div className={`space-y-4 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {selectedStory.fullStory.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            6. FORUM DISKUSI PELAJAR (DENGAN MODERASI)
           ========================================== */}
        {activeTab === 'forum' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Forum Diskusi Sebaya</h1>
              <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Ruang berbagi ide kegiatan positif, tips belajar, dan saling mendukung antar siswa SMA/SMK.
              </p>
            </div>

            {/* Form Buat Thread */}
            <form
              onSubmit={handleCreateThread}
              className={`p-6 rounded-2xl border space-y-4 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <h2 className="font-bold text-lg">Mulai Topik Diskusi Baru</h2>
              {!user && (
                <p className="text-xs text-amber-600 font-medium">
                  * Kamu perlu masuk akun untuk memublikasikan thread atau balasan.
                </p>
              )}
              <input
                type="text"
                placeholder="Judul diskusi..."
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                  darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              />
              <textarea
                rows="3"
                placeholder="Tulis pertanyaan atau pengalaman positifmu dengan bahasa yang santun..."
                value={newThreadContent}
                onChange={(e) => setNewThreadContent(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                  darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold"
              >
                Kirim Diskusi
              </button>
            </form>

            {/* Daftar Thread */}
            <div className="space-y-5">
              {forumThreads.map((thread) => (
                <div
                  key={thread.id}
                  className={`p-6 rounded-2xl border space-y-4 ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-sky-600">
                        {thread.author} • <span className="text-slate-400 font-normal">{thread.time}</span>
                      </p>
                      <h3 className="text-lg font-bold mt-1">{thread.title}</h3>
                    </div>
                    <button
                      onClick={() => handleReportThread(thread.id)}
                      className={`text-xs flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                        thread.reported
                          ? 'border-red-300 bg-red-50 text-red-600'
                          : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500'
                      }`}
                    >
                      <Flag className="w-3.5 h-3.5" /> {thread.reported ? 'Dilaporkan' : 'Laporkan'}
                    </button>
                  </div>

                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    {thread.content}
                  </p>

                  <div className="flex items-center gap-4 pt-1">
                    <button
                      onClick={() => handleToggleLike(thread.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg ${
                        thread.likedByMe
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> Suka ({thread.likes})
                    </button>
                    <span className="text-xs text-slate-400">{thread.replies.length} Balasan</span>
                  </div>

                  {/* Balasan */}
                  <div className="pl-4 border-l-2 border-sky-200 dark:border-slate-700 space-y-3">
                    {thread.replies.map((rep) => (
                      <div key={rep.id} className="text-sm">
                        <p className="text-xs font-bold text-emerald-600">
                          {rep.author} <span className="text-slate-400 font-normal">• {rep.time}</span>
                        </p>
                        <p className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{rep.text}</p>
                      </div>
                    ))}
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Tulis balasan..."
                        value={replyInputs[thread.id] || ''}
                        onChange={(e) => setReplyInputs({ ...replyInputs, [thread.id]: e.target.value })}
                        className={`flex-1 px-3 py-2 rounded-xl border text-xs ${
                          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                      <button
                        onClick={() => handleReplyThread(thread.id)}
                        className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold"
                      >
                        Balas
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            7. PETA REHABILITASI & KONTAK BNN
           ========================================== */}
        {activeTab === 'peta' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold">Layanan Rehabilitasi & Kontak Resmi BNN</h1>
              <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Referensi edukasi layanan bantuan dan pemulihan penyalahgunaan narkoba.
              </p>
            </div>

            {/* Kontak Nasional BNN Terverifikasi */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-700 to-emerald-600 text-white shadow-md space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-100">
                <CheckCircle className="w-4 h-4" /> Kontak Nasional BNN Terverifikasi (24 Jam)
              </div>
              <h2 className="text-2xl font-extrabold">Badan Narkotika Nasional (BNN) Pusat</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-xs">
                  <p className="text-xs text-sky-100">Call Center Nasional (24 Jam)</p>
                  <p className="text-2xl font-extrabold mt-1">184</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-xs">
                  <p className="text-xs text-sky-100">WhatsApp Layanan BNN</p>
                  <p className="text-xl font-extrabold mt-1">081221675675</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-xs">
                  <p className="text-xs text-sky-100">Alamat Kantor Pusat</p>
                  <p className="text-sm font-semibold mt-1">Jl. MT. Haryono No. 11 Cawang, Jakarta Timur</p>
                </div>
              </div>
            </div>

            {/* Peta & Daftar BNN Wilayah Banten */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Peta Referensi OpenStreetMap Wilayah Banten */}
              <div className={`rounded-2xl overflow-hidden border ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-600" /> Peta Wilayah Provinsi Banten
                  </span>
                  <span className="text-xs text-slate-400">OpenStreetMap</span>
                </div>
                <iframe
                  title="Peta Wilayah Banten"
                  className="w-full h-80 border-0"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=105.8500%2C-6.4500%2C106.7800%2C-5.9800&layer=mapnik"
                />
              </div>

              {/* Daftar BNN Provinsi & Kab/Kota Banten */}
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Alamat dan nomor telepon BNN Provinsi Banten serta BNN kota/kabupaten sedang dalam tahap verifikasi manual melalui situs resmi <strong>bnn.go.id</strong>. Untuk bantuan darurat segera hubungi <strong>Call Center BNN 184</strong>.
                  </span>
                </div>

                {BNN_BANTEN_DATA.map((unit) => (
                  <div
                    key={unit.id}
                    className={`p-5 rounded-2xl border space-y-2 ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-base">{unit.nama}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold">
                        Data sedang diverifikasi
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Alamat: {unit.alamat}</p>
                    <p className="text-xs text-slate-500">Telepon: {unit.telepon}</p>
                    <p className="text-[11px] text-slate-400">
                      Koordinat: {unit.latitude}, {unit.longitude}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            8. HALAMAN LOGIN / REGISTER
           ========================================== */}
        {activeTab === 'login' && (
          <div className="max-w-md mx-auto">
            <div className={`p-8 rounded-3xl border space-y-6 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold">
                  {authMode === 'login' ? 'Masuk ke NarkoEdu' : 'Daftar Akun Pelajar'}
                </h1>
                <p className="text-xs text-slate-500">
                  Simpan progres membaca, riwayat skor kuis, lencana prestasi, dan cetak E-Sertifikat.
                </p>
              </div>

              <button
                onClick={handleQuickDemoLogin}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
              >
                Masuk Cepat (Siswa Demo)
              </button>

              <div className="relative flex py-1 items-center">
                <div className="grow border-t border-slate-200 dark:border-slate-700" />
                <span className="shrink mx-3 text-xs text-slate-400">atau gunakan email</span>
                <div className="grow border-t border-slate-200 dark:border-slate-700" />
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold mb-1">Nama Lengkap Siswa</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Ahmad Fauzan"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                        darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                      }`}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@sekolah.sch.id"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Kata Sandi</label>
                  <input
                    type="password"
                    required
                    placeholder="Minimal 6 karakter"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm ${
                      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold"
                >
                  {authMode === 'login' ? 'Masuk Sekarang' : 'Buat Akun'}
                </button>
              </form>

              <p className="text-center text-xs text-slate-500">
                {authMode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-sky-600 font-bold hover:underline"
                >
                  {authMode === 'login' ? 'Daftar di sini' : 'Masuk di sini'}
                </button>
              </p>
            </div>
          </div>
        )}

        {/* ==========================================
            9. PROFIL SISWA, LENCANA & E-SERTIFIKAT
           ========================================== */}
        {activeTab === 'profil' && (
          <div className="max-w-5xl mx-auto space-y-8">
            {!user ? (
              <div className={`p-10 rounded-3xl border text-center space-y-4 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}>
                <Lock className="w-12 h-12 text-sky-600 mx-auto" />
                <h2 className="text-2xl font-bold">Halaman Profil Siswa</h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Silakan masuk terlebih dahulu untuk memantau progres membaca artikel, riwayat skor kuis, dan mengunduh E-Sertifikat kelulusan.
                </p>
                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => navigateTo('login')}
                    className="px-6 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold"
                  >
                    Masuk / Daftar
                  </button>
                  <button
                    onClick={handleQuickDemoLogin}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold"
                  >
                    Masuk Siswa Demo
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Header Profil */}
                <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-600 to-emerald-500 text-white text-2xl font-bold flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{user.name}</h1>
                      <p className="text-sm text-slate-500">{user.email} • {user.school}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="self-start sm:self-center px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" /> Keluar
                  </button>
                </div>

                {/* Progress Bar Menuju E-Sertifikat */}
                <div className={`p-6 rounded-2xl border space-y-4 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-sky-100'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h2 className="font-bold text-lg">Progres Menuju E-Sertifikat Duta Bersinar</h2>
                      <p className="text-xs text-slate-500">
                        Syarat: Baca seluruh {ARTICLES_DATA.length} artikel ({readArticles.length}/{ARTICLES_DATA.length}) & lulus minimal 3 kuis ({passedQuizCount}/3).
                      </p>
                    </div>
                    <span className="text-lg font-extrabold text-sky-600">{certProgress}%</span>
                  </div>

                  <div className="w-full h-3.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-600 to-emerald-500 transition-all"
                      style={{ width: `${certProgress}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <button
                      onClick={() => {
                        setReadArticles(ARTICLES_DATA.map((a) => a.id));
                        showToast('Simulasi: Seluruh artikel ditandai selesai dibaca!');
                      }}
                      className="text-xs text-sky-600 hover:underline font-medium"
                    >
                      (Demo Cepat: Tandai Semua Artikel Dibaca)
                    </button>
                    <button
                      disabled={!isCertEligible}
                      onClick={handleDownloadCertificate}
                      className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-2"
                    >
                      <Award className="w-4 h-4" /> Unduh / Cetak E-Sertifikat PDF
                    </button>
                  </div>
                </div>

                {/* Koleksi Lencana */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold">Koleksi Lencana Prestasi</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {BADGES_MASTER.map((b) => {
                      const unlocked = earnedBadges.includes(b.id);
                      return (
                        <div
                          key={b.id}
                          className={`p-5 rounded-2xl border text-center space-y-2 transition-all ${
                            unlocked
                              ? darkMode
                                ? 'bg-slate-900 border-amber-500/60'
                                : 'bg-amber-50/50 border-amber-300'
                              : 'opacity-50 border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <div className="text-4xl">{b.icon}</div>
                          <h3 className="font-bold text-sm">{b.title}</h3>
                          <p className="text-xs text-slate-500">{b.desc}</p>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            unlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {unlocked ? 'Diraih' : 'Terkunci'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Riwayat Skor Kuis */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold">Riwayat Skor Kuis</h2>
                  {quizResults.length === 0 ? (
                    <div className={`p-6 rounded-2xl border text-center text-sm text-slate-500 ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      Belum ada riwayat kuis. Yuk baca artikel dan kerjakan kuis evaluasinya!
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {quizResults.map((res) => (
                        <div
                          key={res.id}
                          className={`p-4 rounded-2xl border flex items-center justify-between ${
                            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                          }`}
                        >
                          <div>
                            <p className="font-bold text-sm">{res.articleTitle}</p>
                            <p className="text-xs text-slate-500">
                              Benar {res.correct}/{res.total} soal • {res.date}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                            res.score >= 80
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-sky-100 text-sky-700'
                          }`}>
                            {res.score}%
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className={`border-t mt-16 ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-sky-100 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-sky-600 dark:text-sky-400 text-base">
              <Shield className="w-5 h-5" /> NarkoEdu
            </div>
            <p className="text-xs leading-relaxed">
              Platform edukasi pencegahan penyalahgunaan narkoba (P4GN) bagi pelajar SMA/SMK. Murni bertujuan untuk literasi, pencegahan, dan pemberdayaan generasi muda.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Layanan Bantuan Resmi BNN</h3>
            <p className="text-xs flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" /> Call Center BNN (24 Jam): <strong>184</strong>
            </p>
            <p className="text-xs">WhatsApp BNN: <strong>081221675675</strong></p>
            <p className="text-xs">Kantor Pusat: Jl. MT. Haryono No. 11 Cawang, Jakarta Timur</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Tautan Referensi</h3>
            <a
              href="https://bnn.go.id"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
            >
              Situs Resmi Badan Narkotika Nasional (bnn.go.id) <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <p className="text-xs pt-2 text-slate-400">
              © {new Date().getFullYear()} NarkoEdu P4GN. Semua hak cipta dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
