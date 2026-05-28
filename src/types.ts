/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = "admin" | "ustadz" | "wali";

export interface Santri {
  id: string;
  name: string;
  dateOfBirth: string;
  address: string;
  waliName: string;
  waliPhone: string;
  classCategory: string; // "Jilid 1" | "Jilid 2" | "Jilid 3" | "Jilid 4" | "Jilid 5" | "Al-Qur'an" | "Al-Qur'an 1" | "Al-Qur'an 2" | "Tahfidz"
  photoUrl?: string;
  joinedDate: string;
}

export type AttendanceStatus = "hadir" | "izin" | "sakit" | "alfa";

export interface AttendanceDay {
  date: string; // YYYY-MM-DD
  records: { [santriId: string]: AttendanceStatus };
}

export interface Evaluation {
  id: string;
  santriId: string;
  date: string;
  makhorijul: number; // 0 - 100
  tajwid: number; // 0 - 100
  kelancaran: number; // 0 - 100
  hafalanDoa: number; // 0 - 100
  hafalanSurat: number; // 0 - 100
  adabAkhlak: number; // 0 - 100
  keaktifan: number; // 0 - 100
  catatan: string;
  ustadzName: string;
}

export interface HafalanRecord {
  id: string;
  santriId: string;
  date: string;
  category: "doa" | "surat" | "hadits" | "asmaul_husna";
  title: string;          // e.g. "Surat An-Naba'", "Doa Masuk Masjid"
  targetProgress: string; // e.g. "Ayat 1-10", "Lancar"
  status: "belum" | "sebagian" | "lancar";
  ustadzName: string;
}

export interface JadwalMengaji {
  id: string;
  day: string; // "Senin", "Selasa", etc.
  time: string; // "16:00 - 17:30"
  classCategory: string;
  ustadzName: string;
  activity: string;
}

export interface TpqNotification {
  id: string;
  title: string;
  body: string;
  date: string;
  targetRole: "all" | "ustadz" | "wali" | "admin";
  isReadBySimUser: boolean;
}

export interface TpqConfig {
  name: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  headmaster: string;
  foundedYear: string;
}
