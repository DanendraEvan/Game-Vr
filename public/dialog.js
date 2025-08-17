//DIALOG KOORDINATOR
const NPC_DIALOGS = {
  koordinator: {
    speaker: "Dr. Ahmad Surya - Koordinator Peneliti",
    text: "Selamat datang di Desa Harmoni! Sebagai sosiolog senior, tugasmu adalah mengumpulkan data obyektif tentang konflik kompleks antara sektor pertanian dan industri. Ingat, kebenaran sosiologis terletak pada triangulasi data dari berbagai sumber.",
    tag: "Briefing",
    choices: [
      {
        text: "🔬 Panduan Metodologi Penelitian", 
        submenu: "koordinator_metodologi"
      },
      {
        text: "👥 Identifikasi Key Informants", 
        submenu: "koordinator_informants"
      },
      {
        text: "✅ Validasi Data & Bukti", 
        submenu: "koordinator_validasi"
      }
    ]
  },
  koordinator_metodologi: {
    speaker: "Dr. Ahmad Surya - Metodologi Penelitian",
    text: "Metodologi penelitian yang tepat adalah kunci keberhasilan riset sosial. Mari kita bahas pendekatan yang sesuai.",
    tag: "Metode",
    choices: [
      {
        text: "Pendekatan Kualitatif - Etnografi Partisipatif", 
        response: "Gunakan pendekatan etnografi partisipatif. Observasi langsung kondisi lapangan, wawancara mendalam dengan stakeholder, dan analisis dokumen sekunder. Ini memungkinkan pemahaman konteks sosial yang mendalam."
      },
      {
        text: "Mixed Methods - Triangulasi Data", 
        response: "Kombinasikan data kualitatif dan kuantitatif. Wawancara mendalam untuk memahami perspektif, survei untuk mengukur sikap, dan observasi untuk memvalidasi temuan. Triangulasi memberikan hasil yang lebih valid."
      },
      {
        text: "Analisis Bias & Subjektivitas", 
        response: "Catat bias potensial dari setiap sumber informasi. Setiap stakeholder punya kepentingan. Sebagai peneliti, Anda harus sadar posisi Anda sendiri dan bagaimana itu memengaruhi interpretasi data."
      }
    ]
  },
  koordinator_informants: {
    speaker: "Dr. Ahmad Surya - Key Informants",
    text: "Identifikasi informan kunci yang tepat akan menentukan kualitas data yang Anda kumpulkan.",
    tag: "Informan",
    choices: [
      {
        text: "Pak Seno - Petani Senior (Pengalaman 20 tahun)", 
        response: "Pak Seno sebagai petani senior dengan pengalaman 20 tahun. Dia punya perspektif historis tentang perubahan kondisi pertanian. Namun ingat, dia juga punya kepentingan ekonomi yang mungkin memengaruhi narasinya."
      },
      {
        text: "Bu Anita - Pemilik Pabrik (Latar Teknik Lingkungan)", 
        response: "Bu Anita pemilik pabrik dengan latar belakang teknik lingkungan. Dia memahami aspek teknis operasional tetapi juga punya kepentingan bisnis. Perspektifnya penting untuk memahami sisi industri."
      },
      {
        text: "Data Objektif - Perpustakaan & Kepala Desa", 
        response: "Data objektif di perpustakaan dan kepala desa sebagai mediator. Dokumen resmi dan pihak netral akan memberikan konteks yang lebih seimbang untuk analisis Anda."
      }
    ]
  },
  koordinator_validasi: {
    speaker: "Dr. Ahmad Surya - Validasi Data",
    text: "Validitas data adalah fondasi kredibilitas penelitian sosiologi.",
    tag: "Validasi",
    choices: [
      {
        text: "Cross-Validation Multiple Sources", 
        response: "Cross-check informasi dari multiple sources. Jangan bergantung pada satu sumber saja. Bandingkan data dari petani, pabrik, dan dokumen resmi untuk menemukan konsistensi atau kontradiksi."
      },
      {
        text: "Analisis Kredibilitas & Konsistensi", 
        response: "Perhatikan konsistensi data dan kredibilitas sumber. Apakah informasi yang diberikan konsisten sepanjang waktu? Apakah sumber memiliki track record yang bisa dipercaya?"
      },
      {
        text: "Dokumentasi Empiris", 
        response: "Dokumentasi foto, video, atau pengukuran langsung akan memperkuat validitas temuan Anda. Bukti empiris yang terukur lebih kuat daripada testimoni subjektif."
      }
    ]
  }, 
  
  // DIALOG PETANI
  "farmer": {
    "speaker": "Pak Seno - Petani Senior",
    "text": "Selamat datang di desa kami, Pak. Saya sudah bertani di sini 20 tahun. Belakangan ini ada banyak perubahan yang membuat kami petani khawatir. Kondisi memang tidak seperti dulu lagi.",
    "tag": "Testimoni",
    "choices": [
      {
        "text": "🌾 Kondisi Lahan & Hasil Panen", 
        "submenu": "farmer_kondisi"
      },
      {
        "text": "🏭 Dampak Keberadaan Pabrik", 
        "submenu": "farmer_pabrik"
      },
      {
        "text": "👨‍👧 Generasi Muda & Masa Depan",
        "submenu": "farmer_generasi"
      },
      {
        "text": "🤝 Solusi & Harapan", 
        "submenu": "farmer_solusi"
      }
    ]
  },
  "farmer_kondisi": {
    "speaker": "Pak Seno - Kondisi Lahan",
    "text": "Tentang kondisi lahan dan hasil panen dua tahun terakhir ini...",
    "tag": "Analisis",
    "choices": [
      {
        "text": "Data Spesifik - Penurunan 30%", 
        "response": "Dua tahun terakhir, daun padi banyak yang menguning tidak wajar. Hasil panen menurun drastis sampai 30%, padahal sebelumnya selalu cukup untuk kebutuhan keluarga. Saya catat perubahan itu mulai setelah pabrik berdiri tahun 2022."
      },
      {
        "text": "Perbandingan Wilayah", 
        "response": "Air irigasi makin keruh, baunya menyengat. Sawah Pak Harjo di ujung desa yang airnya masih bersih hasilnya jauh lebih baik. Polanya jelas - dekat pabrik rusak, yang jauh tetap normal."
      },
      {
        "text": "Perspektif Nasib Petani", 
        "response": "Ya panennya memang nggak begitu bagus, tapi ya sudah namanya nasib petani kadang untung kadang rugi. Musim juga tidak menentu akhir-akhir ini."
      }
    ]
  },
  "farmer_pabrik": {
    "speaker": "Pak Seno - Dampak Pabrik",
    "text": "Tentang perubahan sejak pabrik beroperasi...",
    "tag": "Observasi",
    "choices": [
      {
        "text": "Bukti Kualitas Air", 
        "response": "Air irigasi berubah total - keruh, bau kimia, ikan-ikan mati. Timing-nya pas setelah pabrik mulai produksi massal. Ini bukan kebetulan musiman."
      },
      {
        "text": "Dampak Ekonomi Jangka Panjang", 
        "response": "Kalau ini berlanjut, banyak petani bangkrut. Lahan menganggur, pemuda enggan bertani, ekonomi desa bisa lumpuh. Sudah mulai terlihat sekarang."
      },
      {
        "text": "Ketidakpastian Penyebab", 
        "response": "Setelah ada pabrik, memang banyak berubah. Tapi saya kurang tahu pasti sebab-akibatnya. Mungkin ada faktor lain juga."
      }
    ]
  },
  "farmer_generasi": {
    "speaker": "Pak Seno - Generasi Muda",
    "text": "Tentang anak saya dan pemuda desa...",
    "tag": "Transformasi",
    "choices": [
      {
        "text": "Alasan Beralih ke Pabrik", 
        "response": "Anak saya bilang, di pabrik jam kerjanya jelas, gaji tetap tiap bulan plus asuransi. Bertani tidak menentu - musim gagal bisa rugi besar. Generasi sekarang butuh kepastian."
      },
      {
        "text": "Masa Depan Pertanian Desa", 
        "response": "Kalau anak muda semua kerja di pabrik atau kota, siapa yang akan melanjutkan pertanian? Sistem bagi hasil pun sudah tidak menarik bagi mereka."
      },
      {
        "text": "Pilihan Pragmatis", 
        "response": "Katanya sih cuma bosan bertani, pengen coba suasana baru. Tapi saya tahu dasarnya karena penghasilan di pabrik lebih stabil."
      }
    ]
  },
  "farmer_solusi": {
    "speaker": "Pak Seno - Solusi",
    "text": "Tentang harapan penyelesaian masalah...",
    "tag": "Solusi",
    "choices": [
      {
        "text": "Audit Ilmiah Independen", 
        "response": "Sebaiknya ada tim netral yang tes air dan tanah, hasilnya diumumkan terbuka. Kalau terbukti pabrik salah, harus diperbaiki. Kalau tidak, kami juga harus menerima."
      },
      {
        "text": "Pendekatan Kolaboratif", 
        "response": "Pemerintah desa, pengelola pabrik, dan petani harus duduk bersama. Evaluasi secara ilmiah, bukan asal tuduh. Semua pihak perlu terbuka."
      },
      {
        "text": "Evolusi Pandangan", 
        "response": "Awalnya saya yakin pabrik penyebab semua. Tapi setelah dengar argumen mereka, saya sadar perlu bukti kuat sebelum menyalahkan. Pemerintah harus cepat ambil keputusan."
      }
    ]
  }, 

  //DIALOG PEMILIK PABRIK
  "factory_owner": {
    "speaker": "Bu Anita - Pemilik Pabrik",
    "text": "Selamat datang di pabrik kami. Kami berkomitmen menjalankan bisnis yang bertanggung jawab. Ada beberapa hal yang mungkin perlu diluruskan tentang operasional kami.",
    "tag": "Pembuka",
    "choices": [
      {
        "text": "♻️ Sistem Pengolahan Limbah", 
        "submenu": "factory_limbah"
      },
      {
        "text": "🤝 Hubungan dengan Petani", 
        "submenu": "factory_relasi"
      },
      {
        "text": "📊 Program CSR & Dampak", 
        "submenu": "factory_csr"
      },
      {
        "text": "🔄 Evaluasi Kebijakan", 
        "submenu": "factory_kebijakan"
      }
    ]
  },
  "factory_limbah": {
    "speaker": "Bu Anita - Pengolahan Limbah",
    "text": "Tentang sistem pengelolaan limbah kami...",
    "tag": "Teknis Operasional",
    "choices": [
      {
        "text": "Prosedur Standar", 
        "response": "Kami punya sistem IPAL (Instalasi Pengolahan Air Limbah) yang diuji dua pekan sekali oleh tim independen. Semua laporan pengujian terdokumentasi rapi dan bisa diakses untuk verifikasi."
      },
      {
        "text": "Transparansi Publik", 
        "response": "Kami terbuka jika warga ingin inspeksi langsung. Sudah ada mekanisme pengaduan melalui website dan posko kelurahan. Pabrik tidak mungkin sembarangan membuang limbah ke sungai - risikonya terlalu besar."
      },
      {
        "text": "Penjelasan Sederhana", 
        "response": "Pabrik sudah dilengkapi alat pengolah limbah modern. Prosesnya melalui tiga tahap penyaringan sebelum dibuang sesuai standar Baku Mutu."
      }
    ]
  },
  "factory_relasi": {
    "speaker": "Bu Anita - Relasi dengan Petani",
    "text": "Tentang dinamika dengan komunitas petani...",
    "tag": "Analisis Sosial",
    "choices": [
      {
        "text": "Akar Masalah", 
        "response": "Faktor utamanya adalah komunikasi yang kurang intensif dan minimnya pertukaran data objektif. Kami mengakui kadang lalai dalam sosialisasi, sementara warga juga jarang memverifikasi informasi."
      },
      {
        "text": "Solusi Kolaboratif", 
        "response": "Saya mengajak semua pihak duduk bersama. Mari adakan audit independen dengan biaya patungan (pabrik-petani-pemerintah) agar hasilnya benar-benar netral. Kami siap berdiskusi terbuka."
      },
      {
        "text": "Persepsi Masyarakat", 
        "response": "Keberadaan pabrik sering dijadikan kambing hitam. Padahal bisa saja ada faktor lain seperti perubahan iklim atau pola tanam yang berpengaruh."
      }
    ]
  },
  "factory_csr": {
    "speaker": "Bu Anita - Program CSR",
    "text": "Tentang kontribusi sosial pabrik...",
    "tag": "Tanggung Jawab Sosial",
    "choices": [
      {
        "text": "Evaluasi Program", 
        "response": "Program CSR baru berjalan 1 tahun. Dari survei kepuasan warga dan realisasi bantuan alat pertanian, beberapa program kurang efektif. Tahun depan akan kami restrukturisasi berdasarkan masukan lapangan."
      },
      {
        "text": "Dampak Ekonomi", 
        "response": "Jika operasional dibatasi, efisiensi produksi akan turun. Konsekuensinya mungkin ada pengurangan tenaga kerja lokal. Tapi jika terbukti limbah kami bermasalah, kami siap investasi perbaikan meski biaya operasional meningkat."
      },
      {
        "text": "Pernyataan Umum", 
        "response": "CSR kami sudah berjalan dan pasti cukup membantu warga. Ada pelatihan keterampilan dan bantuan permodalan UMKM."
      }
    ]
  },
  "factory_kebijakan": {
    "speaker": "Bu Anita - Evaluasi Kebijakan",
    "text": "Tentang penyesuaian kebijakan pabrik...",
    "tag": "Refleksi",
    "choices": [
      {
        "text": "Perubahan Strategi", 
        "response": "Setelah mendengar aspirasi warga, kami akan meningkatkan transparansi data limbah melalui dashboard online real-time. Juga membentuk tim pengawasan bersama warga dan pemerintah desa."
      },
      {
        "text": "Komitmen Berkelanjutan", 
        "response": "Pesan saya ke petani: Mari bangun dialog konstruktif. Pabrik bukan musuh, tapi mitra pembangunan. Kami siap berinvestasi lebih untuk solusi win-win solution."
      },
      {
        "text": "Status Quo", 
        "response": "Secara umum kebijakan sudah cukup memadai. Mungkin hanya perlu intensifikasi sosialisasi agar informasi lebih tersebar merata."
      }
    ]
  }, 

  //DIALOG KEPALA DESA
  "village_head": {
    "speaker": "Pak Rahmat - Kepala Desa",
    "text": "Selamat datang di Desa Harmoni. Sebagai kepala desa, saya berusaha menyeimbangkan pembangunan ekonomi dan kelestarian lingkungan. Mari kita bahas isu ini secara menyeluruh.",
    "tag": "Pembuka",
    "choices": [
      {
        "text": "📈 Dampak Keberadaan Pabrik", 
        "submenu": "head_dampak"
      },
      {
        "text": "⚖️ Mediasi Konflik", 
        "submenu": "head_mediasi"
      },
      {
        "text": "📝 Evaluasi Kebijakan", 
        "submenu": "head_kebijakan"
      },
      {
        "text": "🛠️ Solusi ke Depan", 
        "submenu": "head_solusi"
      }
    ]
  },
  "head_dampak": {
    "speaker": "Pak Rahmat - Dampak Pabrik",
    "text": "Tentang perubahan desa sejak industrialisasi...",
    "tag": "Analisis Dampak",
    "choices": [
      {
        "text": "Data Ekonomi vs Lingkungan", 
        "response": "Ekonomi desa naik signifikan dengan terbukanya lapangan kerja, tapi catatan kantor desa menunjukkan penurunan produktivitas sawah sebesar 15% tahun lalu. Ini harus diatasi tanpa mengorbankan pencapaian ekonomi."
      },
      {
        "text": "Perspektif Pembangunan", 
        "response": "Perubahan pasti terjadi ketika desa berkembang. Yang penting kita kelola bersama agar kemajuan ekonomi tidak merusak dasar pertanian kita."
      },
      {
        "text": "Pernyataan Umum", 
        "response": "Desa jelas makin maju dengan adanya pabrik. Fasilitas umum dan perputaran uang meningkat pesat."
      }
    ]
  },
  "head_mediasi": {
    "speaker": "Pak Rahmat - Mediasi Konflik",
    "text": "Tentang tantangan mendamaikan kepentingan...",
    "tag": "Analisis Sosial",
    "choices": [
      {
        "text": "Akar Konflik", 
        "response": "Petani khawatirkan lingkungan, pekerja pabrik pertahankan penghidupan. Masalahnya, data ilmiah yang jelas masih minim sehingga sulit mengambil keputusan obyektif."
      },
      {
        "text": "Strategi Mediasi", 
        "response": "Kami sedang susun format dialog terstruktur dengan protokol jelas: (1) Catat semua keluhan, (2) Verifikasi data, (3) Cari titik temu. Tidak boleh asal pilih salah satu pihak."
      },
      {
        "text": "Kendala Praktis", 
        "response": "Memang sulit karena kepentingan mereka bertolak belakang. Tapi sebagai pemerintah desa, kami harus tetap netral."
      }
    ]
  },
  "head_kebijakan": {
    "speaker": "Pak Rahmat - Kebijakan Desa",
    "text": "Tentang evaluasi perizinan dan regulasi...",
    "tag": "Refleksi Kebijakan",
    "choices": [
      {
        "text": "Evaluasi Izin Pabrik", 
        "response": "Proses perizinan awal sudah melalui konsultasi AMDAL dan musyawarah desa. Namun kondisi lapangan sekarang mengharuskan peninjauan ulang secara periodik, bukan hanya saat awal operasi."
      },
      {
        "text": "Perubahan Regulasi", 
        "response": "Kami akan usulkan aturan baru: izin operasi pabrik harus dievaluasi tiap 6 bulan dengan parameter lingkungan yang ketat. Ini belajar dari pengalaman tahun lalu."
      },
      {
        "text": "Status Quo", 
        "response": "Prosedur yang ada sudah cukup baik. Tinggal sosialisasi ke warga agar lebih paham mekanismenya."
      }
    ]
  },
  "head_solusi": {
    "speaker": "Pak Rahmat - Solusi",
    "text": "Tentang langkah strategis ke depan...",
    "tag": "Rekomendasi",
    "choices": [
      {
        "text": "Struktur Kolaboratif", 
        "response": "Akan dibentuk Dewan Multi-Pihak berisi perwakilan petani, manajemen pabrik, dan desa. Setiap keputusan harus berdasar data terverifikasi dan dicatat secara terbuka."
      },
      {
        "text": "Advokasi ke Pemerintah", 
        "response": "Ke kabupaten kami minta dua hal: (1) Audit independen oleh ahli lingkungan, (2) Bantuan teknis untuk memetakan solusi win-win solution antara ekonomi dan ekologi."
      },
      {
        "text": "Pendekatan Hierarkis", 
        "response": "Lebih baik serahkan ke pemerintah atas. Kami di desa hanya menjalankan instruksi dari tingkat kabupaten."
      }
    ]
  }, 

  //KETUA KELOMPOK TANI
  "farmer_leader": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Sebagai perwakilan petani Desa Harmoni, saya sampaikan keprihatinan kami dengan bukti-bukti konkret. Mari kita bahas berdasarkan catatan lapangan yang kami dokumentasikan.",
    "tag": "Pembuka",
    "choices": [
      {
        "text": "💧 Bukti Perubahan Kualitas Air", 
        "submenu": "leader_air"
      },
      {
        "text": "🌱 Pola Kerusakan Lahan", 
        "submenu": "leader_lahan"
      },
      {
        "text": "📊 Strategi Perlawanan", 
        "submenu": "leader_strategi"
      },
      {
        "text": "🛠️ Solusi Teknis", 
        "submenu": "leader_solusi"
      }
    ]
  },
  "leader_air": {
    "speaker": "Ketua Kelompok Tani - Kualitas Air",
    "text": "Tentang perubahan kualitas air irigasi...",
    "tag": "Data Lingkungan",
    "choices": [
      {
        "text": "Data Terukur", 
        "response": "Kami catat parameter air mingguan selama 8 bulan terakhir. Hasilnya: tingkat kekeruhan meningkat 65%, pH turun menjadi 4.2, dan kandungan logam berat melebihi baku mutu. Semua terdokumentasi dalam buku catatan ini."
      },
      {
        "text": "Korelasi Waktu", 
        "response": "Gejala kerusakan muncul konsisten 48-72 jam setelah periode pembuangan limbah rutin pabrik. Pola ini terulang 11 kali dalam pengamatan kami."
      },
      {
        "text": "Observasi Visual", 
        "response": "Airnya jelas lebih kotor sekarang. Warna kecoklatan dan bau menyengat yang tidak biasa."
      }
    ]
  },
  "leader_lahan": {
    "speaker": "Ketua Kelompok Tani - Kerusakan Lahan",
    "text": "Tentang perubahan kondisi pertanian...",
    "tag": "Analisis Spasial",
    "choices": [
      {
        "text": "Pola Sebaran", 
        "response": "Kerusakan menyebar dari saluran irigasi utama dengan tingkat keparahan berbeda. Petak sawah dalam radius 500m dari pabrik mengalami penurunan hasil 40-60%, sementara yang lebih jauh hanya 15-20%."
      },
      {
        "text": "Kasus Resistensi", 
        "response": "Petani dengan sistem pengairan sumur dalam dan rotasi tanaman menunjukkan ketahanan lebih baik. Data perbandingan kami menunjukkan hasil mereka hanya turun 8-12%."
      },
      {
        "text": "Pernyataan Umum", 
        "response": "Tanah tidak sebaik dulu. Tanaman mudah layu dan hasil panen menyusut."
      }
    ]
  },
  "leader_strategi": {
    "speaker": "Ketua Kelompok Tani - Strategi",
    "text": "Tentang upaya perlawanan yang dilakukan...",
    "tag": "Taktik Organisasi",
    "choices": [
      {
        "text": "Evaluasi Efektivitas", 
        "response": "Dari semua pendekatan, hanya pengaduan resmi melalui jalur hukum yang memberi hasil terukur. Proses hukum memaksa pabrik merespon dalam 14 hari kerja, berbeda dengan aksi demonstrasi atau lobi informal."
      },
      {
        "text": "Respon Pemerintah", 
        "response": "Respon awal cepat (3 hari), tetapi realisasi rencana aksi hanya 28%. Kami catat 5 janji yang tidak terealisasi dari 7 kesepakatan."
      },
      {
        "text": "Pendekatan Konvensional", 
        "response": "Sudah berusaha semampu kami melalui jalur musyawarah, tapi pemerintah tidak serius menindaklanjuti."
      }
    ]
  },
  "leader_solusi": {
    "speaker": "Ketua Kelompok Tani - Solusi",
    "text": "Tentang rekomendasi teknis...",
    "tag": "Rencana Aksi",
    "choices": [
      {
        "text": "Infrastruktur Alternatif", 
        "response": "Kami usulkan: (1) Jaringan irigasi alternatif dari sumber air bawah tanah, (2) Sistem pemantauan limbah partisipatif dengan protokol pengambilan sampel standar, (3) Pelatihan pertanian adaptif untuk varietas tahan."
      },
      {
        "text": "Proyeksi Kerusakan", 
        "response": "Berdasarkan data tren: 65% lahan akan tidak produktif dalam 3 tahun dengan kerugian ekonomi mencapai 43% pendapatan petani. Butuh intervensi segera sebelum mencapai titik kritis."
      },
      {
        "text": "Penyederhanaan Masalah", 
        "response": "Solusinya sederhana - pabrik harus bertanggung jawab sepenuhnya atas kerusakan ini dan mengganti rugi petani."
      }
    ]
  }, 

  //AKTIVIS PENGAIRAN
  "water_activist": {
    "speaker": "Aktivis Pengairan",
    "text": "Sebagai jaringan pemantau kualitas air independen, kami memiliki data terperinci tentang kondisi lingkungan di Desa Harmoni. Mari kita bahas temuan kami secara metodologis.",
    "tag": "Pembuka",
    "choices": [
      {
        "text": "🔬 Metodologi Penelitian", 
        "submenu": "activist_method"
      },
      {
        "text": "⚠️ Parameter Kritis", 
        "submenu": "activist_parameter"
      },
      {
        "text": "🗺️ Pola Sebaran", 
        "submenu": "activist_distribution"
      },
      {
        "text": "🛡️ Rekomendasi Teknis", 
        "submenu": "activist_solution"
      }
    ]
  },
  "activist_method": {
    "speaker": "Aktivis - Metode Pengujian",
    "text": "Tentang protokol penelitian kami...",
    "tag": "Scientific Protocol",
    "choices": [
      {
        "text": "Standar Mutu", 
        "response": "Kami mengikuti protokol BMLHK dengan ketat: pengambilan sampel di 15 titik strategis (hulu-tengah-hilir) setiap 2 minggu, menggunakan kit pengujian standar dan analisis di lab terakreditasi KAN. Semua prosedur terdokumentasi."
      },
      {
        "text": "Peningkatan Metode", 
        "response": "Kami sedang kembangkan sistem database terintegrasi dengan parameter lebih lengkap, serta memperluas jaringan relawan pemantauan untuk cakupan lebih menyeluruh."
      },
      {
        "text": "Penjelasan Sederhana", 
        "response": "Pengujian rutin kami lakukan dengan alat standar di berbagai lokasi. Hasilnya selalu kami catat untuk pemantauan berkala."
      }
    ]
  },
  "activist_parameter": {
    "speaker": "Aktivis - Parameter Darurat",
    "text": "Tentang indikator pencemaran kritis...",
    "tag": "Risk Analysis",
    "choices": [
      {
        "text": "Data Kontaminan", 
        "response": "Kadar logam berat (khususnya merkuri dan kadmium) melebihi baku mutu hingga 5x lipat di titik tertentu. Pola fluktuasinya konsisten dengan jadwal operasi pabrik - puncaknya 72 jam setelah produksi massal."
      },
      {
        "text": "Dampak Kesehatan", 
        "response": "Parameter BOD dan COD yang tinggi menunjukkan penurunan kualitas air secara biologis. Ini berpotensi menyebabkan gangguan pencernaan dan penyakit kulit berdasarkan studi WHO."
      },
      {
        "text": "Peringatan Umum", 
        "response": "Banyak kandungan berbahaya dalam air melebihi ambang aman. Masyarakat sebaiknya tidak mengonsumsi langsung tanpa pengolahan."
      }
    ]
  },
  "activist_distribution": {
    "speaker": "Aktivis - Pola Sebaran",
    "text": "Tentang distribusi spasial pencemaran...",
    "tag": "Geospatial Analysis",
    "choices": [
      {
        "text": "Analisis Hotspot", 
        "response": "Daerah dataran rendah di sepanjang aliran langsung dari saluran pabrik menunjukkan kontaminasi 3x lebih tinggi. Radius 1km dari titik pembuangan memiliki tingkat pencemaran konsisten di atas ambang bahaya."
      },
      {
        "text": "Proyeksi Kontaminasi", 
        "response": "Model prediktif kami memperkirakan sumber air utama akan melampaui ambang berbahaya dalam 18-24 bulan dengan laju pencemaran saat ini. Penyebaran mengikuti pola aliran sungai musiman."
      },
      {
        "text": "Observasi Lokal", 
        "response": "Pencemaran tidak merata karena perbedaan letak geografis. Daerah dekat pabrik jelas lebih tercemar."
      }
    ]
  },
  "activist_solution": {
    "speaker": "Aktivis - Solusi",
    "text": "Tentang rekomendasi teknis...",
    "tag": "Engineering Solution",
    "choices": [
      {
        "text": "Intervensi Struktural", 
        "response": "Perlu sistem filtrasi bertahap (fisika-kimia-biologi), rehabilitasi DAS dengan tanaman penyerap polutan, serta instalasi sensor kualitas air real-time yang terhubung dengan sistem peringatan dini."
      },
      {
        "text": "Evaluasi Tindakan", 
        "response": "Upaya darurat seperti distribusi filter sementara berhasil turunkan risiko kesehatan 35%, tapi solusi permanen membutuhkan intervensi teknis dan perubahan kebijakan pembuangan limbah."
      },
      {
        "text": "Rekomendasi Sederhana", 
        "response": "Pembersihan menyeluruh saluran air dan pengawasan ketat pembuangan limbah pabrik harus segera dilakukan."
      }
    ]
  }, 

  //PENGAMAT PERTANIAN LOKAL
  "agri_observer": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "",
    "tag": "",
    "choices": [
      {
        "text": "🌱 Indikator Kerusakan", 
        "submenu": "observer_damage"
      },
      {
        "text": "📉 Tren Produktivitas", 
        "submenu": "observer_trends"
      },
      {
        "text": "🏛️ Evaluasi Kebijakan", 
        "submenu": "observer_policy"
      },
      {
        "text": "🔮 Proyeksi Masa Depan",
        "submenu": "observer_future"
      }
    ]
  },
  "observer_damage": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "",
    "tag": "Interpretasi",
    "choices": [
      {
        "text": "Jawaban kritis", 
        "response": "Penurunan drastis mikroorganisma tanah esensial dan perubahan karakteristik fisika-kimia tanah yang mengganggu kesuburan"
      },
      {
        "text": "Jawaban alternatif", 
        "response": "Banyak lahan yang tidak bisa ditanami"
      }
    ]
  },
  "observer_trends": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "",
    "tag": "Analisis",
    "choices": [
      {
        "text": "Jawaban kritis", 
        "response": "Data lima tahun terakhir menunjukkan penurunan produktivitas 5.2% per tahun, jauh lebih cepat dibanding rata-rata regional"
      },
      {
        "text": "Jawaban alternatif", 
        "response": "Hasil panen terus menurun"
      }
    ]
  },
  "observer_policy": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "",
    "tag": "Evaluasi",
    "choices": [
      {
        "text": "Jawaban kritis", 
        "response": "Implementasi program hanya mencapai 40% dari rencana awal dengan keterlambatan signifikan dalam komponen krusial"
      },
      {
        "text": "Jawaban alternatif", 
        "response": "Program tidak berjalan baik"
      }
    ]
  },
  "observer_future": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "",
    "tag": "Inferensi",
    "choices": [
      {
        "text": "Jawaban kritis", 
        "response": "Dalam satu dekade diperkirakan tingkat ketergantungan pangan impor akan meningkat hingga 75% jika tidak ada perubahan kebijakan"
      },
      {
        "text": "Jawaban alternatif", 
        "response": "Akan terjadi krisis pangan parah"
      }
    ]
  }
}