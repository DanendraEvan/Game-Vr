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
    "speaker": "Petani (Pak Seno)",
    "text": "Apa yang ingin Anda ketahui tentang kondisi kami sebagai petani?",
    "tag": "Opening",
    "choices": [
      {
        "text": "Bagaimana Bapak menggambarkan kondisi lahan dan hasil panen dalam dua tahun terakhir?",
        "submenu": "farmer_harvest"
      },
      {
        "text": "Apa perubahan utama yang terjadi sejak pabrik berdiri di pinggir desa?",
        "submenu": "farmer_changes"
      },
      {
        "text": "Siapa menurut Bapak yang seharusnya bertanggung jawab jika hasil panen menurun?",
        "submenu": "farmer_responsibility"
      },
      {
        "text": "Jika masalah air terus terjadi, apa dampak yang Bapak khawatirkan?",
        "submenu": "farmer_concerns"
      },
      {
        "text": "Apa saran Bapak untuk menyelesaikan konflik petani dan pabrik?",
        "submenu": "farmer_solution"
      },
      {
        "text": "Setelah mendengar sisi pabrik dan pemerintah desa, adakah pandangan Bapak yang berubah?",
        "submenu": "farmer_reflection"
      },
      {
        "text": "Apa alasan anak Bapak sekarang memilih bekerja di pabrik?",
        "submenu": "farmer_children"
      }
    ]
  },
  "farmer_harvest": {
    "speaker": "Petani (Pak Seno)",
    "text": "Tentang kondisi lahan dan hasil panen...",
    "tag": "Interpretasi",
    "choices": [
      {
        "text": "[Observasi Terdata]",
        "response": "Dua tahun terakhir, daun padi banyak yang menguning. Hasil panen menurun sampai 30%, padahal sebelumnya selalu cukup untuk kebutuhan keluarga. Saya catat perubahan itu mulai setelah pabrik berdiri."
      },
      {
        "text": "[Penerimaan Pasif]",
        "response": "Panennya nggak begitu bagus, ya sudah namanya nasib petani kadang untung kadang rugi."
      }
    ]
  },
  "farmer_changes": {
    "speaker": "Petani (Pak Seno)",
    "text": "Tentang perubahan sejak pabrik berdiri...",
    "tag": "Analisis",
    "choices": [
      {
        "text": "[Analisis Komparatif]",
        "response": "Yang jelas, air irigasi makin keruh, baunya menyengat. Saya bandingkan dengan sawah Pak Harjo di ujung desa, wilayahnya yang airnya bersih hasilnya lebih baik. Ada perubahan yang bukan cuma karena musim."
      },
      {
        "text": "[Pengamatan Umum]",
        "response": "Setelah ada pabrik, ya memang banyak yang berubah, tapi saya kurang tahu sebab pastinya."
      }
    ]
  },
  "farmer_responsibility": {
    "speaker": "Petani (Pak Seno)",
    "text": "Tentang tanggung jawab atas penurunan hasil panen...",
    "tag": "Evaluasi",
    "choices": [
      {
        "text": "[Pendekatan Objektif]",
        "response": "Menurut saya, pemerintah desa dan pengelola pabrik harus duduk bersama dengan petani; evaluasi air dan lahan secara ilmiah, bukan asal tuduh."
      },
      {
        "text": "[Sikap Pasif]",
        "response": "Ya siapa aja yang penting masalah ini cepat selesai, saya ikut saja kata kepala desa."
      }
    ]
  },
  "farmer_concerns": {
    "speaker": "Petani (Pak Seno)",
    "text": "Tentang dampak jika masalah air terus berlanjut...",
    "tag": "Inferensi",
    "choices": [
      {
        "text": "[Proyeksi Sistemik]",
        "response": "Kalau ini berlanjut, banyak petani bisa bangkrut, lahan menganggur, orang muda makin enggan bertani, ekonomi desa bisa lumpuh."
      },
      {
        "text": "[Kekhawatiran Sederhana]",
        "response": "Kalau begini terus ya repot juga, mungkin panen makin jelek."
      }
    ]
  },
  "farmer_solution": {
    "speaker": "Petani (Pak Seno)",
    "text": "Tentang saran penyelesaian konflik...",
    "tag": "Penjelasan",
    "choices": [
      {
        "text": "[Solusi Berbasis Bukti]",
        "response": "Sebaiknya ada tim netral yang benar-benar tes air dan tanah, hasilnya diumumkan terbuka. Kalau terbukti pabrik salah, harus diperbaiki. Kalau tidak, kita juga harus terima."
      },
      {
        "text": "[Harapan Instan]",
        "response": "Sebaiknya pemerintah cepat ambil keputusan supaya tidak gaduh."
      }
    ]
  },
  "farmer_reflection": {
    "speaker": "Petani (Pak Seno)",
    "text": "Tentang perubahan pandangan setelah mendengar berbagai pihak...",
    "tag": "Self-Regulation",
    "choices": [
      {
        "text": "[Refleksi Kritis]",
        "response": "Awalnya saya yakin pasti pabrik penyebab semua. Tapi setelah dengar dokumen dan argumen mereka, saya sadar harus ada bukti kuat sebelum menyalahkan."
      },
      {
        "text": "[Sikap Rigid]",
        "response": "Saya tetap sama saja, pikiran saya nggak berubah."
      }
    ]
  },
  "farmer_children": {
    "speaker": "Petani (Pak Seno)",
    "text": "Tentang pilihan anak bekerja di pabrik...",
    "tag": "Interpretasi",
    "choices": [
      {
        "text": "[Analisis Rasional]",
        "response": "Anak saya bilang, di pabrik jam kerjanya jelas, gaji tetap tiap bulan, bahkan dapat asuransi dan pelatihan. Bertani tidak menentu, musim gagal bisa rugi."
      },
      {
        "text": "[Penjelasan Sederhana]",
        "response": "Katanya bosan bertani, pengen coba suasana baru."
      }
    ]
  }, 

  //DIALOG PEMILIK PABRIK
  "factory_owner": {
    "speaker": "Pemilik Pabrik (Bu Anita)",
    "text": "Apa yang ingin Anda ketahui tentang operasional pabrik kami?",
    "tag": "Opening",
    "choices": [
      {
        "text": "Bisa Ibu jelaskan proses pengolahan limbah di pabrik?",
        "submenu": "owner_waste"
      },
      {
        "text": "Apa faktor utama yang memengaruhi hubungan pabrik dan petani?",
        "submenu": "owner_relations"
      },
      {
        "text": "Bagaimana Ibu menilai efektivitas CSR pabrik?",
        "submenu": "owner_csr"
      },
      {
        "text": "Jika aktivitas pabrik dibatasi, apa dampaknya?",
        "submenu": "owner_restrictions"
      },
      {
        "text": "Apa pesan Ibu jika bicara dengan komunitas petani?",
        "submenu": "owner_message"
      },
      {
        "text": "Setelah dengar aspirasi warga, adakah kebijakan yang ingin diubah?",
        "submenu": "owner_policy_change"
      }
    ]
  },
  "owner_waste": {
    "speaker": "Pemilik Pabrik (Bu Anita)",
    "text": "Tentang proses pengolahan limbah...",
    "tag": "Interpretasi",
    "choices": [
      {
        "text": "[Transparansi Data]",
        "response": "Kami punya sistem IPAL yang diuji dua pekan sekali oleh tim independen. Laporan pengujian air selalu dicatat dan bisa dicek. Selain itu, kami terbuka jika warga ingin inspeksi."
      },
      {
        "text": "[Jaminan Umum]",
        "response": "Pabrik sudah punya alat pengolah limbah kok, tidak mungkin langsung buang ke sungai."
      }
    ]
  },
  "owner_relations": {
    "speaker": "Pemilik Pabrik (Bu Anita)",
    "text": "Tentang hubungan pabrik dan petani...",
    "tag": "Analisis",
    "choices": [
      {
        "text": "[Analisis Akar Masalah]",
        "response": "Kurangnya komunikasi dan minimnya data objektif yang diterima kedua pihak. Kami kadang lalai sosialisasi, warga juga kurang mencari fakta."
      },
      {
        "text": "[Asumsi Sederhana]",
        "response": "Mungkin karena adanya pabrik saja, jadi warga pikir itu sumber masalah."
      }
    ]
  },
  "owner_csr": {
    "speaker": "Pemilik Pabrik (Bu Anita)",
    "text": "Tentang efektivitas program CSR...",
    "tag": "Evaluasi",
    "choices": [
      {
        "text": "[Evaluasi Berbasis Data]",
        "response": "Program CSR baru jalan setahun. Kami evaluasi dari survei kepuasan warga dan realisasi bantuan alat pertanian. Beberapa program kurang efektif, jadi tahun depan akan diubah."
      },
      {
        "text": "[Keyakinan Tanpa Bukti]",
        "response": "Sudah ada CSR, pasti cukup membantu warga."
      }
    ]
  },
  "owner_restrictions": {
    "speaker": "Pemilik Pabrik (Bu Anita)",
    "text": "Tentang pembatasan aktivitas pabrik...",
    "tag": "Inferensi",
    "choices": [
      {
        "text": "[Analisis Komprehensif]",
        "response": "Kalau produksi dibatasi, efisiensi turun, kemungkinan akan ada pengurangan pekerja lokal. Namun, jika terbukti limbah kami bermasalah, kami siap perbaiki proses meski biaya naik."
      },
      {
        "text": "[Prediksi Negatif]",
        "response": "Kalau dibatasi, pasti perusahaan rugi dan banyak pekerja dirumahkan."
      }
    ]
  },
  "owner_message": {
    "speaker": "Pemilik Pabrik (Bu Anita)",
    "text": "Tentang pesan untuk komunitas petani...",
    "tag": "Penjelasan",
    "choices": [
      {
        "text": "[Pendekatan Kolaboratif]",
        "response": "Mari duduk bersama, kita adakan audit independen, biaya dari dua pihak dan pemerintah agar hasilnya netral. Pabrik terbuka diskusi."
      },
      {
        "text": "[Permintaan Kepercayaan]",
        "response": "Saya harap petani percaya, pabrik tidak jahat."
      }
    ]
  },
  "owner_policy_change": {
    "speaker": "Pemilik Pabrik (Bu Anita)",
    "text": "Tentang perubahan kebijakan setelah mendengar aspirasi...",
    "tag": "Self-Regulation",
    "choices": [
      {
        "text": "[Refleksi dan Adaptasi]",
        "response": "Ya, dengan diskusi terakhir saya sadar perlu transparansi data limbah secara terbuka dan pengawasan rutin oleh warga."
      },
      {
        "text": "[Mempertahankan Kebijakan]",
        "response": "Rasanya kebijakan sudah cukup, mungkin perlu lebih sosialisasi saja."
      }
    ]
  }, 

  //DIALOG KEPALA DESA
  "village_head": {
    "speaker": "Kepala Desa (Pak Rahmat)",
    "text": "Apa yang ingin Anda ketahui tentang kondisi desa kami?",
    "tag": "Opening",
    "choices": [
      {
        "text": "Bagaimana perubahan desa sejak berdirinya pabrik?",
        "submenu": "head_changes"
      },
      {
        "text": "Tantangan terbesar menyatukan aspirasi petani dan pekerja pabrik?",
        "submenu": "head_challenges"
      },
      {
        "text": "Apakah izin pabrik sudah tepat?",
        "submenu": "head_permit"
      },
      {
        "text": "Apa solusi terbaik menurut Bapak untuk desa Harmoni?",
        "submenu": "head_solution"
      },
      {
        "text": "Argumen utama jika menjelaskan ke pemerintah kabupaten?",
        "submenu": "head_argument"
      },
      {
        "text": "Apakah ada keputusan desa yang ingin Bapak tinjau ulang?",
        "submenu": "head_review"
      }
    ]
  },
  "head_changes": {
    "speaker": "Kepala Desa (Pak Rahmat)",
    "text": "Tentang perubahan desa...",
    "tag": "Interpretasi",
    "choices": [
      {
        "text": "[Analisis Data]",
        "response": "Ekonomi desa naik, banyak lapangan kerja baru, tapi beberapa wilayah sawah produktivitasnya turun. Data panen di kantor desa menunjukkan penurunan 15% tahun lalu."
      },
      {
        "text": "[Pernyataan Umum]",
        "response": "Pasti banyak berubah, tapi desa makin maju dengan adanya pabrik."
      }
    ]
  },
  "head_challenges": {
    "speaker": "Kepala Desa (Pak Rahmat)",
    "text": "Tentang tantangan menyatukan aspirasi...",
    "tag": "Analisis",
    "choices": [
      {
        "text": "[Analisis Konflik]",
        "response": "Aspirasi petani soal lingkungan, pekerja pabrik soal penghasilan. Seringkali data yang berdasar belum jelas, maka pemerintah desa kesulitan membuat keputusan obyektif."
      },
      {
        "text": "[Pengamatan Sederhana]",
        "response": "Sulit memang, karena dua-duanya saling bertentangan keinginannya."
      }
    ]
  },
  "head_permit": {
    "speaker": "Kepala Desa (Pak Rahmat)",
    "text": "Tentang kelayakan izin pabrik...",
    "tag": "Evaluasi",
    "choices": [
      {
        "text": "[Evaluasi Berbasis Data]",
        "response": "Awal izin pabrik kami diskusikan dengan warga dan konsultasi amdal. Namun, sekarang data lapangan mengharuskan kami evaluasi ulang agar tidak terjadi kerugian lingkungan."
      },
      {
        "text": "[Justifikasi Prosedural]",
        "response": "Sudah sesuai prosedur, dulu semuanya setuju."
      }
    ]
  },
  "head_solution": {
    "speaker": "Kepala Desa (Pak Rahmat)",
    "text": "Tentang solusi terbaik untuk desa...",
    "tag": "Inferensi",
    "choices": [
      {
        "text": "[Rencana Struktural]",
        "response": "Dibentuk dewan bersama dengan perwakilan petani, pabrik, dan desa. Evaluasi berbasis data dan keputusan dicatatkan terbuka"
      },
      {
        "text": "[Delegasi Tanggung Jawab]",
        "response": "Ikuti saja apa kata pemerintah pusat, jangan terlalu ramai."
      }
    ]
  },
  "head_argument": {
    "speaker": "Kepala Desa (Pak Rahmat)",
    "text": "Tentang argumen ke pemerintah kabupaten...",
    "tag": "Penjelasan",
    "choices": [
      {
        "text": "[Proposal Teknis]",
        "response": "Perlu ada intervensi audit dan bantuan teknis, agar data baru bisa memperkuat klaim dan mempertemukan kepentingan ekonomi maupun lingkungan."
      },
      {
        "text": "[Laporan Umum]",
        "response": "Laporkan saja, biar atasan tahu desa ini butuh bantuan."
      }
    ]
  },
  "head_review": {
    "speaker": "Kepala Desa (Pak Rahmat)",
    "text": "Tentang tinjauan ulang keputusan...",
    "tag": "Self-Regulation",
    "choices": [
      {
        "text": "[Refleksi Kritis]",
        "response": "Iya, izin pabrik harus lebih sering ditinjau bukan hanya saat awal, tapi secara periodik sesuai data."
      },
      {
        "text": "[Mempertahankan Status Quo]",
        "response": "Saya kira semua berjalan sesuai aturan, tidak perlu ditinjau lagi."
      }
    ]
  }, 

  //KETUA KELOMPOK TANI
  "farmer_leader": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Apa yang ingin Anda ketahui tentang masalah pertanian kami?",
    "tag": "Opening",
    "choices": [
      {
        "text": "Bisa Bapak jelaskan perubahan kualitas air sejak pabrik beroperasi?",
        "submenu": "leader_water"
      },
      {
        "text": "Perubahan utama apa yang Bapak amati pada lahan pertanian?",
        "submenu": "leader_land"
      },
      {
        "text": "Mengapa beberapa petani tidak mengalami masalah kerusakan lahan?",
        "submenu": "leader_resilience"
      },
      {
        "text": "Bagaimana hubungan jadwal operasi pabrik dengan masalah tanaman?",
        "submenu": "leader_schedule"
      },
      {
        "text": "Seberapa efektif upaya yang sudah dilakukan kelompok tani?",
        "submenu": "leader_efforts"
      },
      {
        "text": "Bagaimana respon pemerintah terhadap keluhan ini?",
        "submenu": "leader_response"
      },
      {
        "text": "Apa yang akan terjadi jika kondisi ini terus berlanjut?",
        "submenu": "leader_projection"
      },
      {
        "text": "Dampak ekonomi jangka panjang untuk petani?",
        "submenu": "leader_economy"
      },
      {
        "text": "Solusi konkret apa yang Bapak usulkan?",
        "submenu": "leader_solution"
      },
      {
        "text": "Apa yang akan diperbaiki dalam strategi kelompok?",
        "submenu": "leader_improvement"
      }
    ]
  },
  "leader_water": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Tentang perubahan kualitas air...",
    "tag": "Interpretasi",
    "choices": [
      {
        "text": "[Data Terukur]",
        "response": "Kami melakukan pencatatan parameter air rutin tiap minggu dan menemukan penurunan kualitas signifikan dalam 8 bulan terakhir dengan data yang terdokumentasi"
      },
      {
        "text": "[Observasi]",
        "response": "Airnya memang tampak lebih kotor sekarang"
      }
    ]
  },
  "leader_land": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Tentang perubahan lahan...",
    "tag": "Interpretasi",
    "choices": [
      {
        "text": "[Analisis Spasial]",
        "response": "Terdapat pola kerusakan spesifik yang menyebar dari saluran irigasi utama dengan tingkat keparahan berbeda di tiap petak sawah"
      },
      {
        "text": "[Pengamatan Umum]",
        "response": "Tanahnya tidak sebaik dulu"
      }
    ]
  },
  "leader_resilience": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Tentang petani yang tidak terdampak...",
    "tag": "Analisis",
    "choices": [
      {
        "text": "[Studi Komparatif]",
        "response": "Setelah kami teliti, petani dengan sistem pengairan alternatif dan pola tanam rotasi menunjukkan ketahanan lebih baik berdasarkan data perbandingan"
      },
      {
        "text": "[Asumsi]",
        "response": "Mungkin karena lokasi mereka lebih beruntung"
      }
    ]
  },
  "leader_schedule": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Tentang jadwal pabrik...",
    "tag": "Analisis",
    "choices": [
      {
        "text": "[Catatan Harian]",
        "response": "Catatan harian kami menunjukkan gejala kerusakan muncul konsisten 48-72 jam setelah periode pembuangan limbah rutin pabrik"
      },
      {
        "text": "[Korelasi]",
        "response": "Tanaman sering rusak saat pabrik sedang aktif"
      }
    ]
  },
  "leader_efforts": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Tentang upaya kami...",
    "tag": "Evaluasi",
    "choices": [
      {
        "text": "[Evaluasi Efektivitas]",
        "response": "Dari semua pendekatan yang dicoba, hanya pengaduan resmi melalui jalur hukum yang memberi hasil terukur berdasarkan perkembangan kasus"
      },
      {
        "text": "[Pernyataan]",
        "response": "Sudah berusaha semampu kami"
      }
    ]
  },
  "leader_response": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Tentang respon pemerintah...",
    "tag": "Evaluasi",
    "choices": [
      {
        "text": "[Data Realisasi]",
        "response": "Respon awal cepat dalam 3 hari tapi follow up lambat, hanya 28% rencana aksi yang terealisasi penuh sampai sekarang"
      },
      {
        "text": "[Kesimpulan]",
        "response": "Pemerintah tidak serius menangani"
      }
    ]
  },
  "leader_projection": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Tentang proyeksi kerusakan...",
    "tag": "Inferensi",
    "choices": [
      {
        "text": "[Proyeksi Data]",
        "response": "Proyeksi berbasis data menunjukkan 65% lahan akan tidak produktif dalam 36 bulan jika tren kerusakan tetap seperti sekarang"
      },
      {
        "text": "[Prediksi]",
        "response": "Sawah akan habis semua"
      }
    ]
  },
  "leader_economy": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Tentang dampak ekonomi...",
    "tag": "Inferensi",
    "choices": [
      {
        "text": "[Simulasi Ekonomi]",
        "response": "Simulasi ekonomi menunjukkan penurunan pendapatan rata-rata 43% dalam 5 tahun jika tidak ada intervensi berarti"
      },
      {
        "text": "[Dampak]",
        "response": "Kehidupan petani akan sulit"
      }
    ]
  },
  "leader_solution": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Tentang solusi...",
    "tag": "Penjelasan",
    "choices": [
      {
        "text": "[Rencana Teknis]",
        "response": "Membangun jaringan irigasi alternatif, program pelatihan pertanian adaptif, serta sistem pemantauan limbah partisipatif dengan protokol jelas"
      },
      {
        "text": "[Tuntutan]",
        "response": "Pabrik harus bertanggungjawab sepenuhnya"
      }
    ]
  },
  "leader_improvement": {
    "speaker": "Ketua Kelompok Tani",
    "text": "Tentang perbaikan strategi...",
    "tag": "Self-Regulation",
    "choices": [
      {
        "text": "[Rencana Pengembangan]",
        "response": "Meningkatkan sistem dokumentasi bukti, melatih analisis data dasar, serta memperluas jaringan dengan organisasi pendukung terkait"
      },
      {
        "text": "[Komitmen]",
        "response": "Akan lebih keras memperjuangkan hak kami"
      }
    ]
  }, 

  //AKTIVIS PENGAIRAN
  "water_activist": {
    "speaker": "Aktivis Pengairan",
    "text": "Apa yang ingin Anda ketahui tentang kondisi air di wilayah kami?",
    "tag": "Opening",
    "choices": [
      {
        "text": "Metode pengujian air seperti apa yang digunakan?", 
        "submenu": "activist_methods"
      },
      {
        "text": "Parameter apa yang paling mengkhawatirkan?", 
        "submenu": "activist_parameters"
      },
      {
        "text": "Mengapa pencemaran tidak merata di semua area?", 
        "submenu": "activist_distribution"
      },
      {
        "text": "Bagaimana efektivitas upaya penanganan selama ini?",
        "submenu": "activist_effectiveness"
      },
      {
        "text": "Apa prediksi jika tidak ada tindakan lebih serius?",
        "submenu": "activist_prediction"
      },
      {
        "text": "Apa rekomendasi teknis untuk memperbaiki kualitas air?",
        "submenu": "activist_recommendations"
      },
      {
        "text": "Apa yang akan diperbaiki dalam metodologi penelitian?",
        "submenu": "activist_improvements"
      }
    ]
  },
  "activist_methods": {
    "speaker": "Aktivis Pengairan",
    "text": "Tentang metode pengujian kami...",
    "tag": "Interpretasi",
    "choices": [
      {
        "text": "[Jawaban Teknis]", 
        "response": "Mengikuti protokol standar BMLHK dengan pengambilan sampel di 15 titik strategis secara periodik dan analisis lab terakreditasi"
      },
      {
        "text": "[Jawaban Sederhana]", 
        "response": "Kami lakukan pengujian rutin dengan alat standar"
      }
    ]
  },
  "activist_parameters": {
    "speaker": "Aktivis Pengairan",
    "text": "Mengenai parameter yang mengkhawatirkan...",
    "tag": "Interpretasi",
    "choices": [
      {
        "text": "[Data Spesifik]", 
        "response": "Kadar logam berat tertentu melebihi baku mutu hingga 5 kali lipat dalam beberapa sampel dengan pola fluktuasi yang konsisten"
      },
      {
        "text": "[Pernyataan Umum]", 
        "response": "Banyak kandungan berbahaya di air"
      }
    ]
  },
  "activist_distribution": {
    "speaker": "Aktivis Pengairan",
    "text": "Tentang distribusi pencemaran...",
    "tag": "Analisis",
    "choices": [
      {
        "text": "[Analisis Spasial]", 
        "response": "Analisis spasial menunjukkan daerah dataran rendah dengan aliran air langsung dari saluran pembuangan pabrik memiliki tingkat kontaminasi 3 kali lebih tinggi"
      },
      {
        "text": "[Penjelasan Sederhana]", 
        "response": "Mungkin karena perbedaan letak geografis"
      }
    ]
  },
  "activist_effectiveness": {
    "speaker": "Aktivis Pengairan",
    "text": "Tentang efektivitas penanganan...",
    "tag": "Evaluasi",
    "choices": [
      {
        "text": "[Evaluasi Kritis]", 
        "response": "Tindakan darurat berhasil mengurangi dampak di beberapa titik tapi membutuhkan solusi struktural yang belum terwujud sepenuhnya"
      },
      {
        "text": "[Tanggapan Umum]", 
        "response": "Sudah ada kemajuan sedikit"
      }
    ]
  },
  "activist_prediction": {
    "speaker": "Aktivis Pengairan",
    "text": "Mengenai prediksi kami...",
    "tag": "Inferensi",
    "choices": [
      {
        "text": "[Proyeksi Ilmiah]", 
        "response": "Model kontaminasi kami memperkirakan sumber air utama akan melewati ambang berbahaya dalam 18-24 bulan dengan laju saat ini"
      },
      {
        "text": "[Pernyataan Sederhana]", 
        "response": "Semua air akan tercemar total"
      }
    ]
  },
  "activist_recommendations": {
    "speaker": "Aktivis Pengairan",
    "text": "Tentang rekomendasi teknis...",
    "tag": "Penjelasan",
    "choices": [
      {
        "text": "[Rencana Komprehensif]", 
        "response": "Sistem filtrasi bertahap, rehabilitasi daerah aliran sungai, serta implementasi teknologi pemantauan kualitas air real-time"
      },
      {
        "text": "[Saran Sederhana]", 
        "response": "Perlu pembersihan menyeluruh"
      }
    ]
  },
  "activist_improvements": {
    "speaker": "Aktivis Pengairan",
    "text": "Tentang perbaikan metodologi...",
    "tag": "Self-Regulation",
    "choices": [
      {
        "text": "[Rencana Pengembangan]", 
        "response": "Menambah parameter uji, memperluas jaringan relawan pemantauan, serta mengembangkan sistem database terintegrasi"
      },
      {
        "text": "[Pernyataan Umum]", 
        "response": "Akan lebih intensif melakukan pengujian"
      }
    ]
  }, 

  //PENGAMAT PERTANIAN LOKAL
  "agri_observer": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "Apa yang ingin Anda tanyakan mengenai kondisi pertanian kami?",
    "tag": "Opening",
    "choices": [
      {
        "text": "Apa indikator utama kerusakan ekosistem pertanian?", 
        "submenu": "observer_damage"
      },
      {
        "text": "Bagaimana tren produktivitas pertanian wilayah ini?", 
        "submenu": "observer_trends"
      },
      {
        "text": "Bagaimana kinerja program pemerintah dalam penanganan ini?", 
        "submenu": "observer_policy"
      },
      {
        "text": "Apa dampak jangka panjang bagi ketahanan pangan?",
        "submenu": "observer_future"
      },
      {
        "text": "Apa strategi adaptasi paling realistis?",
        "submenu": "observer_adaptation"
      },
      {
        "text": "Apa yang akan diperbaiki dalam metode pengamatan?",
        "submenu": "observer_methods"
      }
    ]
  },
  "observer_damage": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "Mengenai indikator kerusakan ekosistem pertanian...",
    "tag": "Interpretasi",
    "choices": [
      {
        "text": "[Jawaban Analitis]", 
        "response": "Penurunan drastis mikroorganisma tanah esensial dan perubahan karakteristik fisika-kimia tanah yang mengganggu kesuburan"
      },
      {
        "text": "[Jawaban Sederhana]", 
        "response": "Banyak lahan yang tidak bisa ditanami"
      }
    ]
  },
  "observer_trends": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "Tentang tren produktivitas pertanian...",
    "tag": "Analisis",
    "choices": [
      {
        "text": "[Jawaban Berbasis Data]", 
        "response": "Data lima tahun terakhir menunjukkan penurunan produktivitas 5.2% per tahun, jauh lebih cepat dibanding rata-rata regional"
      },
      {
        "text": "[Jawaban Umum]", 
        "response": "Hasil panen terus menurun"
      }
    ]
  },
  "observer_policy": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "Tentang kinerja program pemerintah...",
    "tag": "Evaluasi",
    "choices": [
      {
        "text": "[Jawaban Terukur]", 
        "response": "Implementasi program hanya mencapai 40% dari rencana awal dengan keterlambatan signifikan dalam komponen krusial"
      },
      {
        "text": "[Jawaban Sederhana]", 
        "response": "Program tidak berjalan baik"
      }
    ]
  },
  "observer_future": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "Mengenai dampak jangka panjang...",
    "tag": "Inferensi",
    "choices": [
      {
        "text": "[Proyeksi Ilmiah]", 
        "response": "Dalam satu dekade diperkirakan tingkat ketergantungan pangan impor akan meningkat hingga 75% jika tidak ada perubahan kebijakan"
      },
      {
        "text": "[Pernyataan Umum]", 
        "response": "Akan terjadi krisis pangan parah"
      }
    ]
  },
  "observer_adaptation": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "Tentang strategi adaptasi...",
    "tag": "Penjelasan",
    "choices": [
      {
        "text": "[Rekomendasi Komprehensif]", 
        "response": "Kombinasi teknologi pertanian presisi, perubahan sistem budidaya, dan penguatan kapasitas kelembagaan petani berbasis bukti"
      },
      {
        "text": "[Saran Sederhana]", 
        "response": "Perlu revolusi sistem pertanian"
      }
    ]
  },
  "observer_methods": {
    "speaker": "Pengamat Pertanian Lokal",
    "text": "Mengenai perbaikan metode...",
    "tag": "Self-Regulation",
    "choices": [
      {
        "text": "[Rencana Pengembangan]", 
        "response": "Memperluas cakupan variabel penelitian dengan memasukkan lebih banyak aspek sosial-ekonomi dan meningkatkan frekuensi pengambilan data"
      },
      {
        "text": "[Pernyataan Umum]", 
        "response": "Akan lebih sering turun lapangan"
      }
    ]
  }
}