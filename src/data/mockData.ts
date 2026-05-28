/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Santri, AttendanceDay, Evaluation, HafalanRecord, JadwalMengaji, TpqNotification, TpqConfig } from "../types";

export const tpqProfile: TpqConfig = {
  name: "E-Santri TPQ",
  subtitle: "TPA AL ASYHAR SIMA",
  address: "Dusun Sima RT 03/RW 02, Desa Sima, Kec. Moga, Pemalang, Jawa Tengah",
  phone: "+62 856-4251-1250",
  email: "tpa.alasyhar.sima@gmail.com",
  headmaster: "Ustadz H. Ahmad Syukron, S.Pd.I",
  foundedYear: "2012",
};

export const initialSantriList: Santri[] = [
  {
    id: "S-101",
    name: "Ahmad Fauzan",
    dateOfBirth: "2015-08-12",
    address: "Sima Krajan RT 02/RW 01, Moga",
    waliName: "Bp. H. Slamet Mulyadi",
    waliPhone: "081234567890",
    classCategory: "Jilid 4",
    joinedDate: "2022-07-01",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" // Mock kids avatar proxy
  },
  {
    id: "S-102",
    name: "Siti Fatimah Azzahra",
    dateOfBirth: "2014-04-20",
    address: "Sima Barat RT 05/RW 02, Moga",
    waliName: "Ibu Siti Aminah",
    waliPhone: "085678901234",
    classCategory: "Al-Qur'an",
    joinedDate: "2021-07-01",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "S-103",
    name: "Muhammad Yusuf Al-Bukhori",
    dateOfBirth: "2013-11-05",
    address: "Dusun Sima RT 01/RW 02, Moga",
    waliName: "Bp. Abdul Malik",
    waliPhone: "087890123456",
    classCategory: "Tahfidz",
    joinedDate: "2020-07-01",
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "S-104",
    name: "Zahra Amirasya",
    dateOfBirth: "2017-01-15",
    address: "Sima Krajan RT 03/RW 02, Moga",
    waliName: "Ibu Kartika Sari",
    waliPhone: "082123456789",
    classCategory: "Jilid 2",
    joinedDate: "2024-01-05",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "S-105",
    name: "Farhan Al-Ghifari",
    dateOfBirth: "2014-09-30",
    address: "Dusun Wetan RT 02/RW 03, Sima",
    waliName: "Bp. Bambang Hermawan",
    waliPhone: "083889012345",
    classCategory: "Jilid 5",
    joinedDate: "2021-01-10",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "S-106",
    name: "Bilal Ramadhan",
    dateOfBirth: "2018-05-18",
    address: "Sima Utara RT 01/RW 02, Moga",
    waliName: "Bp. Ahmad Syaifuddin",
    waliPhone: "085712345678",
    classCategory: "Jilid 1",
    joinedDate: "2024-07-01",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "S-107",
    name: "Aisyah Humaira Salsabila",
    dateOfBirth: "2013-02-28",
    address: "Sima Timur RT 04/RW 01, Moga",
    waliName: "Bp. Dr. Lukman Hakim",
    waliPhone: "081356789012",
    classCategory: "Tahfidz",
    joinedDate: "2020-01-15",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "S-108",
    name: "Rizky Pratama Wijaya",
    dateOfBirth: "2016-12-04",
    address: "Sima Lor RT 02/RW 02, Moga",
    waliName: "Ibu Sri Wahyuni",
    waliPhone: "089978901221",
    classCategory: "Jilid 3",
    joinedDate: "2023-07-01",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120"
  }
];

export const initialAttendance: AttendanceDay[] = [
  {
    date: "2026-05-24",
    records: {
      "S-101": "hadir",
      "S-102": "hadir",
      "S-103": "hadir",
      "S-104": "izin",
      "S-105": "hadir",
      "S-106": "hadir",
      "S-107": "hadir",
      "S-108": "sakit"
    }
  },
  {
    date: "2026-05-25",
    records: {
      "S-101": "hadir",
      "S-102": "hadir",
      "S-103": "hadir",
      "S-104": "hadir",
      "S-105": "hadir",
      "S-106": "izin",
      "S-107": "hadir",
      "S-108": "sakit"
    }
  },
  {
    date: "2026-05-26",
    records: {
      "S-101": "hadir",
      "S-102": "hadir",
      "S-103": "izin",
      "S-104": "hadir",
      "S-105": "hadir",
      "S-106": "hadir",
      "S-107": "hadir",
      "S-108": "hadir"
    }
  },
  {
    date: "2026-05-27",
    records: {
      "S-101": "hadir",
      "S-102": "hadir",
      "S-103": "hadir",
      "S-104": "hadir",
      "S-105": "hadir",
      "S-106": "sakit",
      "S-107": "hadir",
      "S-108": "hadir"
    }
  },
  {
    date: "2026-05-28", // Today in simulation
    records: {
      "S-101": "hadir",
      "S-102": "hadir",
      "S-103": "hadir",
      "S-104": "hadir",
      "S-105": "hadir",
      "S-106": "hadir",
      "S-107": "hadir",
      "S-108": "hadir"
    }
  }
];

export const initialEvaluations: Evaluation[] = [
  {
    id: "E-01",
    santriId: "S-101", // Ahmad Fauzan
    date: "2026-05-27",
    makhorijul: 82,
    tajwid: 80,
    kelancaran: 85,
    hafalanDoa: 90,
    hafalanSurat: 80,
    adabAkhlak: 95,
    keaktifan: 88,
    catatan: "Ananda Fauzan sudah sangat baik kelancarannya di Jilid 4, fokus perbaiki makhraj huruf Dhod (ض) dan Thâ (ط) agar lebih sempurna.",
    ustadzName: "Ustadzah Fatimah"
  },
  {
    id: "E-02",
    santriId: "S-102", // Siti Fatimah
    date: "2026-05-27",
    makhorijul: 88,
    tajwid: 85,
    kelancaran: 90,
    hafalanDoa: 95,
    hafalanSurat: 92,
    adabAkhlak: 98,
    keaktifan: 95,
    catatan: "Sabar dalam membaca, dengung di hukum Ikhfa (إخفاء) harus konsisten ditahan 2 harakat.",
    ustadzName: "Ustadz H. Ahmad Syukron"
  },
  {
    id: "E-03",
    santriId: "S-103", // Muhammad Yusuf
    date: "2026-05-26",
    makhorijul: 92,
    tajwid: 90,
    kelancaran: 95,
    hafalanDoa: 98,
    hafalanSurat: 96,
    adabAkhlak: 97,
    keaktifan: 94,
    catatan: "Setoran Tahfidz surat Al-Mulk sudah lancar mutqin. Dipertahankan tajwid serta irama murattalnya.",
    ustadzName: "Ustadz H. Ahmad Syukron"
  },
  {
    id: "E-04",
    santriId: "S-104", // Zahra
    date: "2026-05-27",
    makhorijul: 75,
    tajwid: 70,
    kelancaran: 78,
    hafalanDoa: 85,
    hafalanSurat: 80,
    adabAkhlak: 92,
    keaktifan: 85,
    catatan: "Ananda Zahra bersemangat sekali di Jilid 2. Masih sering tergesa-gesa membedakan panjang pendek (mad asli) yang 2 harakat.",
    ustadzName: "Ustadzah Fatimah"
  },
  {
    id: "E-05",
    santriId: "S-105", // Farhan
    date: "2026-05-25",
    makhorijul: 80,
    tajwid: 78,
    kelancaran: 84,
    hafalanDoa: 85,
    hafalanSurat: 82,
    adabAkhlak: 88,
    keaktifan: 80,
    catatan: "Farhan progresnya bagus di Jilid 5. Perlu memperkuat hafalan surat pendek khusus Al-A'la agar tidak tertukar ayatnya.",
    ustadzName: "Ustadz Salim"
  }
];

export const initialHafalan: HafalanRecord[] = [
  {
    id: "H-01",
    santriId: "S-101",
    date: "2026-05-25",
    category: "surat",
    title: "Surat Asy-Syams",
    targetProgress: "Ayat 1-15",
    status: "lancar",
    ustadzName: "Ustadzah Fatimah"
  },
  {
    id: "H-02",
    santriId: "S-101",
    date: "2026-05-27",
    category: "doa",
    title: "Doa Memakai Pakaian",
    targetProgress: "Lafal & Terjemahan",
    status: "sebagian",
    ustadzName: "Ustadzah Fatimah"
  },
  {
    id: "H-03",
    santriId: "S-102",
    date: "2026-05-26",
    category: "surat",
    title: "Surat An-Nazi'at",
    targetProgress: "Ayat 1-46",
    status: "lancar",
    ustadzName: "Ustadz H. Ahmad Syukron"
  },
  {
    id: "H-04",
    santriId: "S-103",
    date: "2026-05-28",
    category: "surat",
    title: "Surat Al-Mulk",
    targetProgress: "Ayat 1-30",
    status: "lancar",
    ustadzName: "Ustadz H. Ahmad Syukron"
  },
  {
    id: "H-05",
    santriId: "S-103",
    date: "2026-05-24",
    category: "hadits",
    title: "Hadits Larangan Marah",
    targetProgress: "Teks Arab & Makna",
    status: "lancar",
    ustadzName: "Ustadz H. Ahmad Syukron"
  },
  {
    id: "H-06",
    santriId: "S-104",
    date: "2026-05-27",
    category: "doa",
    title: "Doa Masuk Rumah",
    targetProgress: "Lafal Singkat",
    status: "lancar",
    ustadzName: "Ustadzah Fatimah"
  },
  {
    id: "H-07",
    santriId: "S-104",
    date: "2026-05-28",
    category: "surat",
    title: "Surat Al-Qari'ah",
    targetProgress: "Ayat 1-11",
    status: "sebagian",
    ustadzName: "Ustadzah Fatimah"
  },
  {
    id: "H-08",
    santriId: "S-105",
    date: "2026-05-22",
    category: "asmaul_husna",
    title: "Asmaul Husna 1-20",
    targetProgress: "Hafal Urutan",
    status: "lancar",
    ustadzName: "Ustadz Salim"
  }
];

export const initialJadwalList: JadwalMengaji[] = [
  {
    id: "J-01",
    day: "Senin",
    time: "16:00 - 17:30",
    classCategory: "Jilid 1, Jilid 2, Jilid 3",
    ustadzName: "Ustadzah Fatimah & Ustadzah Nur",
    activity: "Materi Klasikal & Setoran Individu"
  },
  {
    id: "J-02",
    day: "Selasa",
    time: "16:00 - 17:30",
    classCategory: "Jilid 4, Jilid 5, Al-Qur'an",
    ustadzName: "Ustadz Salim & Ustadz Mansur",
    activity: "Taddarus Qur'an & Tajwid Aplikatif"
  },
  {
    id: "J-03",
    day: "Rabu",
    time: "16:00 - 17:30",
    classCategory: "Semua Level / Kelas",
    ustadzName: "Ustadz H. Ahmad Syukron",
    activity: "Kajian Akhlak, Doa & Hadits Sehari-hari"
  },
  {
    id: "J-04",
    day: "Kamis",
    time: "16:00 - 17:30",
    classCategory: "Tahfidz & Qur'an",
    ustadzName: "Ustadz H. Ahmad Syukron",
    activity: "Murojaah Akbar & Ziyadah Tambah Hafalan"
  },
  {
    id: "J-05",
    day: "Jumat",
    time: "16:00 - 17:30",
    classCategory: "Semua Level",
    ustadzName: "Seluruh Ustadz/Ustadzah",
    activity: "Praktik Ibadah, Wudhu, Shalat Berjamaah & Evaluasi Mingguan"
  }
];

export const initialNotifications: TpqNotification[] = [
  {
    id: "N-01",
    title: "Pengumuman Pembagian Raport",
    body: "Diberitahukan kepada seluruh Wali Santri TPA AL ASYHAR SIMA bahwa Raport Evaluasi Belajar Semester Genap akan dibagikan besok Jum'at ba'da mengaji umum.",
    date: "2026-05-28",
    targetRole: "all",
    isReadBySimUser: false
  },
  {
    id: "N-02",
    title: "Informasi Libur Kajian Akhir Bulan",
    body: "TPA AL ASYHAR SIMA akan diliburkan sementara pada hari Sabtu tanggal 30 Mei dalam rangka rapat koordinasi ustadz se-kecamatan.",
    date: "2026-05-27",
    targetRole: "all",
    isReadBySimUser: false
  },
  {
    id: "N-03",
    title: "Undangan Rapat Kurikulum Santri Baru",
    body: "Undangan bagi Seluruh Ustadz dan Ustadzah untuk menghadiri musyawarah penyelarasan silabus Jilid 1 di kantor TPQ pukul 19:30 malam ini.",
    date: "2026-05-28",
    targetRole: "ustadz",
    isReadBySimUser: false
  }
];
