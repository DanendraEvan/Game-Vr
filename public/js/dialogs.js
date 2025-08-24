const NPC_DIALOGS = {
  // 1. NPC KOORDINATOR (Briefing Awal Penelitian)
  koordinator: {
    speaker: "KOORDINATOR DESA\nPak Peno",
    text: "Selamat datang, tim sosiolog muda. Desa Sukamaju sedang menghadapi krisis: harga sayur melonjak, pabrik baru memicu konflik, dan warga terpecah pendapatnya.\nTugas kalian: mengumpulkan data, mewawancarai warga, lalu membuat laporan dengan rekomendasi solusi.",
    choices: [
      {
        text: "Kami ingin fokus meneliti dampak pabrik terhadap desa.",
        submenu: "koordinator_A"
      },
      {
        text: "Kami akan memulai dengan wawancara warga dan petani dulu.",
        submenu: "koordinator_B"
      },
      {
        text: "Kami ingin mempelajari seluruh faktor, bukan hanya pabrik.",
        submenu: "koordinator_C"
      }
    ]
  },
  koordinator_A: {
    speaker: "KOORDINATOR DESA\nPak Peno",
    text: "Pabrik memang penting, tapi jangan langsung menyimpulkan.\nKalian harus bicara dengan Bu Anita, Ketua Tani, dan Aktivis Perairan. Semua perspektif berbeda.",
    impact: "Memunculkan akses zona pabrik."
  },
  koordinator_B: {
    speaker: "KOORDINATOR DESA\nPak Peno",
    text: "Bagus, mulai dari warga akan memberi gambaran nyata.\nSaya sarankan bertemu Petani Senior dan Pengamat Pertanian untuk data awal.",
    impact: "Membuka zona wawancara warga."
  },
  koordinator_C: {
    speaker: "KOORDINATOR DESA\nPak Peno",
    text: "Pendekatan komprehensif.\nWawancara warga, ambil dokumen di perpustakaan, observasi sawah, dan analisis data harga sayur di koperasi.",
    impact: "Memberi akses penuh ke semua zona + laporan koperasi."
  },

  // 2. NPC KEPALA DESA (Kebijakan & Konflik Sosial)
  kepala_desa: {
    speaker: "KEPALA DESA\nPak Mardi",
    text: "Situasi desa rumit. Ada warga yang senang pabrik memberi pekerjaan, ada yang protes karena sawah gagal panen. Pemerintah daerah belum ambil tindakan tegas.",
    choices: [
      {
        text: "Apakah pabrik penyebab utama gagal panen?",
        submenu: "kepala_desa_A"
      },
      {
        text: "Apakah ada kebijakan pemerintah tentang harga sayur?",
        submenu: "kepala_desa_B"
      },
      {
        text: "Kami ingin data lengkap soal konflik warga dan pabrik.",
        submenu: "kepala_desa_C"
      }
    ]
  },
  kepala_desa_A: {
    speaker: "KEPALA DESA\nPak Mardi",
    text: "Belum tentu. Air keruh sejak pabrik berdiri, tapi curah hujan juga berubah.\nKalian perlu cek laporan kualitas air dan wawancara Aktivis Perairan.",
    impact: "Arahkan ke zona observasi air."
  },
  kepala_desa_B: {
    speaker: "KEPALA DESA\nPak Mardi",
    text: "Belum ada regulasi baru. Saat ini harga dikendalikan tengkulak.\nData distribusi ada di koperasi, saya beri aksesnya.",
    impact: "Buka arsip koperasi."
  },
  kepala_desa_C: {
    speaker: "KEPALA DESA\nPak Mardi",
    text: "Ada dokumen hasil musyawarah desa.\nAmbil salinannya di perpustakaan untuk analisis kalian.",
    impact: "Akses dokumen konflik."
  },

  // 3. NPC PETANI SENIOR (Produksi & Krisis Tenaga Kerja)
  petani_senior: {
    speaker: "PETANI SENIOR\nPak Yono",
    text: "Dulu panen kubis saya 30 karung. Sekarang tinggal 10. Air irigasi berubah warna, pemuda lebih suka kerja di pabrik.",
    choices: [
      {
        text: "Apakah limbah pabrik memengaruhi panen?",
        submenu: "petani_senior_A"
      },
      {
        text: "Kenapa pemuda meninggalkan pertanian?",
        submenu: "petani_senior_B"
      },
      {
        text: "Apakah ada catatan panen tahunan?",
        submenu: "petani_senior_C"
      }
    ]
  },
  petani_senior_A: {
    speaker: "PETANI SENIOR\nPak Yono",
    text: "Ikan di sungai mati, tapi saya tak mau menuduh.\nCek hasil uji air di perpustakaan.",
    impact: "Membuka NPC Aktivis Perairan."
  },
  petani_senior_B: {
    speaker: "PETANI SENIOR\nPak Yono",
    text: "Gaji pabrik Rp3 juta, hasil tani kadang hanya Rp1 juta.\nAnak saya sendiri kerja di pabrik.",
    impact: "Membuka akses NPC Bu Anita."
  },
  petani_senior_C: {
    speaker: "PETANI SENIOR\nPak Yono",
    text: "Ada catatan panen 10 tahun terakhir.\nKalian bisa meminjamnya dari koperasi.",
    impact: "Membuka data grafik panen."
  },

  // 4. NPC PENGAMAT PERTANIAN (Analisis Tanaman)
  pengamat_pertanian: {
    speaker: "PENGAMAT PERTANIAN\nPak Hari",
    text: "Saya memantau hasil panen desa sejak 5 tahun lalu. Penurunannya mencapai 40%. Penyebabnya kompleks: kualitas air, cuaca, dan migrasi tenaga kerja.",
    choices: [
      {
        text: "Apakah penurunan ini murni karena cuaca?",
        submenu: "pengamat_pertanian_A"
      },
      {
        text: "Apakah ada laporan resmi tentang kualitas tanah?",
        submenu: "pengamat_pertanian_B"
      },
      {
        text: "Kami ingin analisis dampak irigasi dan distribusi.",
        submenu: "pengamat_pertanian_C"
      }
    ]
  },
  pengamat_pertanian_A: {
    speaker: "PENGAMAT PERTANIAN\nPak Hari",
    text: "Tidak sepenuhnya. Curah hujan berubah, tapi pabrik juga memengaruhi air.",
    impact: "Membuka NPC Aktivis Perairan."
  },
  pengamat_pertanian_B: {
    speaker: "PENGAMAT PERTANIAN\nPak Hari",
    text: "Ada laporan detail di perpustakaan desa. Saya beri aksesnya.",
    impact: "Akses perpustakaan."
  },
  pengamat_pertanian_C: {
    speaker: "PENGAMAT PERTANIAN\nPak Hari",
    text: "Gabungkan data distribusi koperasi dengan laporan irigasi untuk analisis lengkap.",
    impact: "Akses tabel distribusi harga."
  },

  // 5. NPC AKTIVIS PERAIRAN (Kualitas Air & Lingkungan)
  aktivis_perairan: {
    speaker: "AKTIVIS PERAIRAN\nMas Kumar",
    text: "Kami mengukur kualitas air sungai. Hasilnya: kandungan limbah naik 60% sejak pabrik beroperasi.\nPabrik membantah, warga marah. Situasi makin panas.",
    choices: [
      {
        text: "Apakah pabrik pasti penyebab pencemaran?",
        submenu: "aktivis_perairan_A"
      },
      {
        text: "Apa dampak air tercemar terhadap sawah?",
        submenu: "aktivis_perairan_B"
      },
      {
        text: "Apakah ada audit independen?",
        submenu: "aktivis_perairan_C"
      }
    ]
  },
  aktivis_perairan_A: {
    speaker: "AKTIVIS PERAIRAN\nMas Kumar",
    text: "Kami punya sampel air dan foto, tapi untuk bukti legal perlu audit resmi.",
    impact: "Buka akses arsip audit."
  },
  aktivis_perairan_B: {
    speaker: "AKTIVIS PERAIRAN\nMas Kumar",
    text: "Tanaman layu, panen turun, dan tanah keras.\nData lengkapnya ada di laporan kami.",
    impact: "Buka laporan lingkungan."
  },
  aktivis_perairan_C: {
    speaker: "AKTIVIS PERAIRAN\nMas Kumar",
    text: "Audit independen belum dilakukan. Kalian bisa mendorong forum mediasi.",
    impact: "Akses forum mediasi."
  },

  // 6. NPC KETUA TANI (Distribusi & Kebijakan Harga)
  ketua_tani: {
    speaker: "Ketua Tani\nOm Joko",
    text: "Harga sayur dikendalikan tengkulak, bibit mahal, air tercemar.\nPetani tertekan, kami butuh kebijakan baru.",
    choices: [
      {
        text: "Apakah koperasi bisa mengatur harga?",
        submenu: "ketua_tani_A"
      },
      {
        text: "Apakah petani konflik dengan pabrik?",
        submenu: "ketua_tani_B"
      },
      {
        text: "Bagaimana strategi bertahan petani?",
        submenu: "ketua_tani_C"
      }
    ]
  },
  ketua_tani_A: {
    speaker: "Ketua Tani\nOm Joko",
    text: "Koperasi membantu, tapi kecil pengaruhnya.",
    impact: "Akses data koperasi."
  },
  ketua_tani_B: {
    speaker: "Ketua Tani\nOm Joko",
    text: "Sebagian petani menuntut pabrik, sebagian bekerja di sana.",
    impact: "Buka dialog warga-pabrik."
  },
  ketua_tani_C: {
    speaker: "Ketua Tani\nOm Joko",
    text: "Kami butuh kebijakan harga, subsidi bibit, dan perbaikan irigasi.",
    impact: "Akses forum kebijakan."
  },

  // 7. NPC BU ANITA (Pemilik Pabrik)
  bu_anita: {
    speaker: "Pemilik Pabrik\nBu Anita",
    text: "Selamat datang di pabrik kami. Ada yang bisa saya bantu?",
    choices: [
        {
            text: "Kami ingin tahu proses pengelolaan limbah di sini.",
            submenu: "bu_anita_limbah"
        },
        {
            text: "Bagaimana hubungan pabrik dengan masyarakat sekitar?",
            submenu: "bu_anita_masyarakat"
        },
        {
            text: "Apa kontribusi pabrik terhadap ekonomi desa?",
            submenu: "bu_anita_ekonomi"
        }
    ]
  },
  bu_anita_limbah: {
      speaker: "Pemilik Pabrik\nBu Anita",
      text: "Kami memiliki sistem pengelolaan limbah modern yang memenuhi standar pemerintah. Kami rutin melakukan uji lab dan hasilnya selalu di bawah ambang batas.",
      impact: "Membuka data laporan uji limbah."
  },
  bu_anita_masyarakat: {
      speaker: "Pemilik Pabrik\nBu Anita",
      text: "Kami selalu berusaha menjaga hubungan baik. Kami memprioritaskan warga lokal untuk bekerja di sini dan memiliki program CSR untuk membantu masyarakat.",
      impact: "Membuka data program CSR."
  },
  bu_anita_ekonomi: {
      speaker: "Pemilik Pabrik\nBu Anita",
      text: "Pabrik ini telah menyerap banyak tenaga kerja dan memberikan pemasukan signifikan bagi desa melalui pajak dan retribusi.",
      impact: "Membuka data kontribusi ekonomi pabrik."
  }
};
