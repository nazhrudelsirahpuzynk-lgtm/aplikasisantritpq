/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  CheckSquare,
  FileText,
  Calendar,
  User,
  LogOut,
  Plus,
  Search,
  Trash2,
  Edit,
  Sparkles,
  Bell,
  Phone,
  MapPin,
  Info,
  HelpCircle,
  ChevronRight,
  GraduationCap,
  Award,
  Download,
  RefreshCw,
  Home,
  Check,
  CheckCircle,
  AlertCircle
} from "lucide-react";

import {
  Santri,
  AttendanceDay,
  Evaluation,
  HafalanRecord,
  JadwalMengaji,
  TpqNotification,
  UserRole
} from "./types";

import {
  tpqProfile,
  initialSantriList,
  initialAttendance,
  initialEvaluations,
  initialHafalan,
  initialJadwalList,
  initialNotifications
} from "./data/mockData";

import SplashView from "./components/SplashView";
import LoginView from "./components/LoginView";
import RaportPDFView from "./components/RaportPDFView";
import { IslamicMandala, IslamicBorder, MosqueIcon } from "./components/IslamOrnaments";

export default function App() {
  // State Initialization from LocalStorage (Local DB Persistence)
  const [santris, setSantris] = useState<Santri[]>(() => {
    const local = localStorage.getItem("tpq_santris");
    return local ? JSON.parse(local) : initialSantriList;
  });

  const [attendance, setAttendance] = useState<AttendanceDay[]>(() => {
    const local = localStorage.getItem("tpq_attendance");
    return local ? JSON.parse(local) : initialAttendance;
  });

  const [evaluations, setEvaluations] = useState<Evaluation[]>(() => {
    const local = localStorage.getItem("tpq_evaluations");
    return local ? JSON.parse(local) : initialEvaluations;
  });

  const [hafalan, setHafalan] = useState<HafalanRecord[]>(() => {
    const local = localStorage.getItem("tpq_hafalan");
    return local ? JSON.parse(local) : initialHafalan;
  });

  const [notifications, setNotifications] = useState<TpqNotification[]>(() => {
    const local = localStorage.getItem("tpq_notifications");
    return local ? JSON.parse(local) : initialNotifications;
  });

  // Basic UI State
  const [currentScreen, setCurrentScreen] = useState<"splash" | "login" | "dashboard" | "santri" | "absensi" | "evaluasi" | "hafalan" | "raport" | "jadwal" | "profil_tpq">("splash");
  const [userRole, setUserRole] = useState<UserRole>("ustadz");
  const [userName, setUserName] = useState("Ustadzah Fatimah");
  const [linkedSantriId, setLinkedSantriId] = useState<string | undefined>("S-101");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClassFilter, setSelectedClassFilter] = useState("Semua");
  
  // Notification Indicator State
  const [showNotificationsList, setShowNotificationsList] = useState(false);

  // Gemini loading states
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState("");

  // CRUD Modals States
  const [isSantriModalOpen, setIsSantriModalOpen] = useState(false);
  const [editingSantri, setEditingSantri] = useState<Santri | null>(null);
  const [santriForm, setSantriForm] = useState({
    name: "",
    dateOfBirth: "",
    address: "",
    waliName: "",
    waliPhone: "",
    classCategory: "Jilid 1",
    photoUrl: ""
  });

  // Evaluasi editing selections
  const [activeEvalSantriId, setActiveEvalSantriId] = useState("S-101");
  const [evalForm, setEvalForm] = useState({
    makhorijul: 80,
    tajwid: 80,
    kelancaran: 80,
    hafalanDoa: 80,
    hafalanSurat: 80,
    adabAkhlak: 90,
    keaktifan: 85,
    catatan: ""
  });

  // Hafalan logging selection
  const [activeHafalanSantriId, setActiveHafalanSantriId] = useState("S-101");
  const [hafalanForm, setHafalanForm] = useState({
    category: "surat" as "doa" | "surat" | "hadits" | "asmaul_husna",
    title: "",
    targetProgress: "",
    status: "lancar" as "belum" | "sebagian" | "lancar"
  });

  // Device orientation / skin toggle for high visual polish
  const [deviceColor, setDeviceColor] = useState<"emerald" | "amber" | "charcoal">("emerald");

  // Custom dialog/alert state for iframe compatibility & native-smooth UI
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    confirmText: "Ya",
    cancelText: "Batal",
    isDanger: false
  });

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "info" | "warning";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  // Sync back to localStorage upon changes
  useEffect(() => {
    localStorage.setItem("tpq_santris", JSON.stringify(santris));
  }, [santris]);

  useEffect(() => {
    localStorage.setItem("tpq_attendance", JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem("tpq_evaluations", JSON.stringify(evaluations));
  }, [evaluations]);

  useEffect(() => {
    localStorage.setItem("tpq_hafalan", JSON.stringify(hafalan));
  }, [hafalan]);

  useEffect(() => {
    localStorage.setItem("tpq_notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Load appropriate default evaluation when activeEvalSantriId is swapped
  useEffect(() => {
    const existing = evaluations.find(e => e.santriId === activeEvalSantriId);
    if (existing) {
      setEvalForm({
        makhorijul: existing.makhorijul,
        tajwid: existing.tajwid,
        kelancaran: existing.kelancaran,
        hafalanDoa: existing.hafalanDoa,
        hafalanSurat: existing.hafalanSurat,
        adabAkhlak: existing.adabAkhlak,
        keaktifan: existing.keaktifan,
        catatan: existing.catatan
      });
      setAiRecommendation("");
    } else {
      setEvalForm({
        makhorijul: 80,
        tajwid: 80,
        kelancaran: 80,
        hafalanDoa: 80,
        hafalanSurat: 80,
        adabAkhlak: 90,
        keaktifan: 85,
        catatan: ""
      });
      setAiRecommendation("");
    }
  }, [activeEvalSantriId, evaluations]);

  // Handler for direct Login mock up integration
  const handleLoginSuccess = (role: UserRole, user: string, waliOfSantriId?: string) => {
    setUserRole(role);
    setUserName(user);
    setLinkedSantriId(waliOfSantriId);
    if (role === "wali" && waliOfSantriId) {
      setActiveEvalSantriId(waliOfSantriId);
      setActiveHafalanSantriId(waliOfSantriId);
    }
    setCurrentScreen("dashboard");
    // Show a welcome push notification
    addPushNotification(
      "Sistem Terhubung",
      `Alhamdulillah, Anda masuk sebagai ${role.toUpperCase()}: ${user}`,
      role
    );
  };

  // Helper to add custom push notifications at runtime
  const addPushNotification = (title: string, body: string, targetRole: "all" | "ustadz" | "wali" | "admin") => {
    const newNotif: TpqNotification = {
      id: "N-" + Date.now(),
      title,
      body,
      date: new Date().toISOString().split("T")[0],
      targetRole,
      isReadBySimUser: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Generate dynamic AI mentoring from server Express route
  const handleGenerateAiRecommendation = async () => {
    setAiGenerating(true);
    const targetSantri = santris.find(s => s.id === activeEvalSantriId);
    if (!targetSantri) return;

    try {
      const response = await fetch("/api/recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: targetSantri.name,
          classCategory: targetSantri.classCategory,
          makhorijul: evalForm.makhorijul,
          tajwid: evalForm.tajwid,
          kelancaran: evalForm.kelancaran,
          adabAkhlak: evalForm.adabAkhlak,
          keaktifan: evalForm.keaktifan,
          catatanUstadz: evalForm.catatan
        })
      });

      const data = await response.json();
      if (data.recommendation) {
        setAiRecommendation(data.recommendation);
        // Pre-fill the Ustadz remarks with AI draft!
        setEvalForm(prev => ({
          ...prev,
          catatan: data.recommendation
        }));
      } else if (data.error) {
        setAiRecommendation(`gagal memuat: ${data.error}`);
      }
    } catch (e: any) {
      setAiRecommendation("Koneksi gagal. Pastikan Server-side API Anda siap.");
    } finally {
      setAiGenerating(false);
    }
  };

  // CRUD ops for Student
  const handleOpenSantriModal = (santri?: Santri) => {
    if (santri) {
      setEditingSantri(santri);
      setSantriForm({
        name: santri.name,
        dateOfBirth: santri.dateOfBirth,
        address: santri.address,
        waliName: santri.waliName,
        waliPhone: santri.waliPhone,
        classCategory: santri.classCategory,
        photoUrl: santri.photoUrl || ""
      });
    } else {
      setEditingSantri(null);
      setSantriForm({
        name: "",
        dateOfBirth: "2016-01-01",
        address: "Sima Krajan, Moga",
        waliName: "",
        waliPhone: "08",
        classCategory: "Jilid 1",
        photoUrl: ""
      });
    }
    setIsSantriModalOpen(true);
  };

  const handleSaveSantri = (e: React.FormEvent) => {
    e.preventDefault();
    if (!santriForm.name.trim() || !santriForm.waliName.trim()) {
      setAlertModal({
        isOpen: true,
        title: "Data Kurang Lengkap",
        message: "Harap lengkapi Nama Santri & Nama Wali!",
        type: "warning"
      });
      return;
    }

    if (editingSantri) {
      // Update
      const updated = santris.map(s => {
        if (s.id === editingSantri.id) {
          return {
            ...s,
            name: santriForm.name,
            dateOfBirth: santriForm.dateOfBirth,
            address: santriForm.address,
            waliName: santriForm.waliName,
            waliPhone: santriForm.waliPhone,
            classCategory: santriForm.classCategory,
            photoUrl: santriForm.photoUrl || undefined
          };
        }
        return s;
      });
      setSantris(updated);
      addPushNotification("Santri Diperbarui", `${santriForm.name} diperbarui oleh Admin.`, "all");
    } else {
      // Create
      const newId = "S-" + (100 + santris.length + 1);
      const newSantri: Santri = {
        id: newId,
        name: santriForm.name,
        dateOfBirth: santriForm.dateOfBirth,
        address: santriForm.address,
        waliName: santriForm.waliName,
        waliPhone: santriForm.waliPhone,
        classCategory: santriForm.classCategory,
        joinedDate: new Date().toISOString().split("T")[0],
        photoUrl: santriForm.photoUrl || `https://images.unsplash.com/photo-${1500000000000 + santris.length * 50000}?auto=format&fit=crop&q=80&w=120`
      };
      setSantris([newSantri, ...santris]);
      addPushNotification("Santri Baru Terdaftar", `${santriForm.name} telah bergabung di kelas ${santriForm.classCategory}.`, "all");
    }

    setIsSantriModalOpen(false);
  };

  const handleDeleteSantri = (id: string, name: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Hapus Santri",
      message: `Apakah Anda yakin ingin menghapus data santri ${name}?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      isDanger: true,
      onConfirm: () => {
        setSantris(prev => prev.filter(s => s.id !== id));
        addPushNotification("Santri Dihapus", `Data santri ${name} telah dihapus dari sistem.`, "admin");
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  // Kehadiran (Attendance) state marker
  const handleMarkAttendance = (santriId: string, status: "hadir" | "izin" | "sakit" | "alfa") => {
    const todayStr = "2026-05-28";
    const dayIndex = attendance.findIndex(a => a.date === todayStr);

    if (dayIndex >= 0) {
      const updated = [...attendance];
      updated[dayIndex] = {
        ...updated[dayIndex],
        records: {
          ...updated[dayIndex].records,
          [santriId]: status
        }
      };
      setAttendance(updated);
    } else {
      const newDay: AttendanceDay = {
        date: todayStr,
        records: {
          [santriId]: status
        }
      };
      setAttendance([...attendance, newDay]);
    }
  };

  // Evaluation save trigger
  const handleSaveEvaluation = () => {
    const existingIdx = evaluations.findIndex(e => e.santriId === activeEvalSantriId);
    const newEval: Evaluation = {
      id: existingIdx >= 0 ? evaluations[existingIdx].id : "E-" + Date.now(),
      santriId: activeEvalSantriId,
      date: "2026-05-28",
      makhorijul: evalForm.makhorijul,
      tajwid: evalForm.tajwid,
      kelancaran: evalForm.kelancaran,
      hafalanDoa: evalForm.hafalanDoa,
      hafalanSurat: evalForm.hafalanSurat,
      adabAkhlak: evalForm.adabAkhlak,
      keaktifan: evalForm.keaktifan,
      catatan: evalForm.catatan || "Terus semangat belajar mengaji.",
      ustadzName: userName
    };

    if (existingIdx >= 0) {
      const updated = [...evaluations];
      updated[existingIdx] = newEval;
      setEvaluations(updated);
    } else {
      setEvaluations([newEval, ...evaluations]);
    }

    const sName = santris.find(s => s.id === activeEvalSantriId)?.name || "Santri";
    addPushNotification(
      "Nilai & Evaluasi Baru",
      `Ustadz baru saja menyimpan raport bimbingan evaluasi untuk ananda ${sName}.`,
      "wali"
    );

    setAlertModal({
      isOpen: true,
      title: "Raport Disimpan",
      message: `Alhamdulillah, Nilai Evaluasi untuk ${sName} berhasil disimpan!`,
      type: "success"
    });
  };

  // Memorization addition
  const handleAddHafalan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hafalanForm.title.trim()) {
      setAlertModal({
        isOpen: true,
        title: "Input Kurang",
        message: "Masukkan Judul Hafalan!",
        type: "warning"
      });
      return;
    }

    const newHafalan: HafalanRecord = {
      id: "H-" + Date.now(),
      santriId: activeHafalanSantriId,
      date: new Date().toISOString().split("T")[0],
      category: hafalanForm.category,
      title: hafalanForm.title,
      targetProgress: hafalanForm.targetProgress || "Seluruh Ayat",
      status: hafalanForm.status,
      ustadzName: userName
    };

    setHafalan([newHafalan, ...hafalan]);
    const sName = santris.find(s => s.id === activeHafalanSantriId)?.name || "Santri";
    
    // Clear form except selections
    setHafalanForm(prev => ({ ...prev, title: "", targetProgress: "" }));

    addPushNotification(
      "Kemajuan Hafalan",
      `Setoran Hafalan ${hafalanForm.category.toUpperCase()} "${hafalanForm.title}" santri ${sName} dicatat: ${hafalanForm.status.toUpperCase()}`,
      "wali"
    );
  };

  // Calculate generic dashboard figures
  const totalSantriCount = santris.length;
  const filteredSantris = santris.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.waliName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.id.includes(searchQuery);
    const matchesClass = selectedClassFilter === "Semua" || s.classCategory === selectedClassFilter;
    if (userRole === "wali") {
      return matchesSearch && matchesClass && s.id === linkedSantriId;
    }
    return matchesSearch && matchesClass;
  });

  // Calculate today's attendance metrics
  const todayRecord = attendance.find(a => a.date === "2026-05-28");
  let presenceTodayCount = 0;
  if (todayRecord) {
    Object.values(todayRecord.records).forEach((r) => {
      if (r === "hadir") presenceTodayCount++;
    });
  } else {
    presenceTodayCount = totalSantriCount; // default as seeded
  }

  // Find notifications addressable to current user
  const visibleNotifications = notifications.filter(n => {
    if (n.targetRole === "all") return true;
    return n.targetRole === userRole;
  });

  const unreadCount = visibleNotifications.filter(n => !n.isReadBySimUser).length;

  const handleMarkNotificationsAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isReadBySimUser: true }));
    setNotifications(updated);
  };

  // Active student in Raport generator
  const activeReportSantri = santris.find(s => s.id === activeEvalSantriId) || santris[0];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row font-sans text-slate-100">
      
      {/* LEFT COLUMN: Project Controls, Simulation Environment details */}
      <div className="lg:w-1/3 xl:w-96 p-6 bg-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2.5">
              <span className="p-1.5 bg-emerald-700/30 text-emerald-400 rounded-lg">
                <GraduationCap className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-bold tracking-tight text-white font-serif">E-Santri TPQ</h1>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ini adalah media simulasi interaktif berkinerja tinggi yang dibangun untuk mereformasi sistem akademik di <strong>TPA AL ASYHAR SIMA</strong>.
            </p>
          </div>

          {/* SIMULATOR QUICK SWITCHERS */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-amber-500 uppercase tracking-widest flex items-center space-x-1.5">
              <span>🎛️</span>
              <span>DASHBOARD KONTROL PRESET ROLE</span>
            </h3>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
              <p className="text-xs text-slate-300">
                Ganti role untuk melihat bagaimana antarmuka menyesuaikan hak akses secara instan:
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleLoginSuccess("admin", "admin.asyhar")}
                  className={`w-full py-2.5 px-3 text-left rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                    userRole === "admin"
                      ? "bg-amber-500 text-emerald-950 shadow"
                      : "bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>🛠️</span>
                    <span>Admin Utama (Full Access)</span>
                  </span>
                  <span>{userRole === "admin" && "✓"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoginSuccess("ustadz", "ustadzah.fatimah")}
                  className={`w-full py-2.5 px-3 text-left rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                    userRole === "ustadz"
                      ? "bg-amber-500 text-emerald-950 shadow"
                      : "bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>🕌</span>
                    <span>Ustadz / Guru (Evaluator)</span>
                  </span>
                  <span>{userRole === "ustadz" && "✓"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleLoginSuccess("wali", "wali.fauzan", "S-101")}
                  className={`w-full py-2.5 px-3 text-left rounded-lg text-xs font-semibold flex items-center justify-between transition ${
                    userRole === "wali"
                      ? "bg-amber-500 text-emerald-950 shadow"
                      : "bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>👨‍👩‍👦</span>
                    <span>Wali Santri (Ahmad Fauzan)</span>
                  </span>
                  <span>{userRole === "wali" && "✓"}</span>
                </button>
              </div>
            </div>

            {/* PUSH NOTIFICATION INJECTOR FOR TESTING */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-semibold text-slate-200">Kirim Notifikasi Simulasi</h4>
              <p className="text-[11px] text-slate-400">Uji reaktivitas push notification Firebase di handphone:</p>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => addPushNotification("Kegiatan Ekstra", "Pengumuman: Besok pagi praktik shalat jenazah jam 08.00.", "all")}
                  className="p-2 bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-lg text-[10px] font-semibold text-emerald-300 text-center transition"
                >
                  📢 Umum
                </button>
                <button
                  type="button"
                  onClick={() => addPushNotification("Informasi Libur", "Sesuai kalender akademik, TPQ libur menyambut awal Ramadhan.", "all")}
                  className="p-2 bg-amber-950/45 hover:bg-amber-950/80 border border-amber-900/60 rounded-lg text-[10px] font-semibold text-amber-300 text-center transition"
                >
                  🌴 Libur TPQ
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DEVELOPER SIGNATURE BLOCK FOOTER */}
        <div className="pt-6 border-t border-slate-800 text-center space-y-2 lg:block hidden">
          <p className="text-[11px] text-slate-400">
            Aplikasi ini terhubung ke <span className="text-emerald-400 font-mono">Simulated Firestore Database</span> lokal yang andal.
          </p>
          <div className="text-[10px] text-amber-500/80 font-mono tracking-widest uppercase">
            Designed for TPA AL ASYHAR SIMA
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Mobile Smartphone App Simulator */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-6 lg:p-8 overflow-y-auto">
        
        {/* Smartphone Bezel Wrap */}
        <div className="relative w-full max-w-[420px] aspect-[9/19] min-h-[780px] bg-slate-950 rounded-[3rem] p-4 shadow-2xl border-4 border-slate-700/80 flex flex-col justify-between overflow-hidden">
          
          {/* Top Speaker and Camera Notch Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-2xl z-40 flex items-center justify-center space-x-2">
            <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-800"></div>
          </div>

          {/* Smartphone Screen Canvas */}
          <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden flex flex-col relative text-slate-800 select-none">
            
            {/* SCREEN TOP LEVEL METADATA ROW */}
            <div className="bg-emerald-950 text-emerald-250/90 text-[10px] px-6 pt-7 pb-2 flex justify-between items-center z-50 font-mono">
              <span>09:17</span>
              <div className="flex items-center space-x-1.5">
                <span>SIM_LTE</span>
                <span>📶</span>
                <span>🔋 100%</span>
              </div>
            </div>

            {/* SCREEN ROUTER CONTROLLER */}
            <div className="flex-1 overflow-y-auto flex flex-col">
              {currentScreen === "splash" ? (
                <SplashView onFinish={() => setCurrentScreen("login")} />
              ) : currentScreen === "login" ? (
                <LoginView onLoginSuccess={handleLoginSuccess} />
              ) : (
                
                // MAIN APPLICATION WRAPPER (AFTER LOGIN)
                <div className="flex-1 flex flex-col h-full bg-slate-50 relative pb-16">
                  
                  {/* APP BAR HEADER */}
                  <div className="bg-emerald-900 text-white pt-2.5 pb-4 px-4 flex items-center justify-between shadow-md relative z-20 rounded-b-2xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shadow">
                        <MosqueIcon className="w-5 h-5 text-emerald-950" />
                      </div>
                      <div>
                        <h2 className="text-[13px] font-extrabold tracking-wide text-amber-400">E-Santri</h2>
                        <p className="text-[9px] text-emerald-200 uppercase font-bold tracking-widest">Al-Asyhar Sima</p>
                      </div>
                    </div>

                    {/* Notification Bell Badge Trigger */}
                    <div className="flex items-center space-x-2 relative">
                      <button
                        type="button"
                        onClick={() => {
                          setShowNotificationsList(!showNotificationsList);
                          if (!showNotificationsList) handleMarkNotificationsAsRead();
                        }}
                        className="p-1.5 bg-emerald-950/40 hover:bg-emerald-950/70 text-amber-400 rounded-full relative transition active:scale-95"
                      >
                        <Bell className="w-4 h-4" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[8.5px] font-bold text-white flex items-center justify-center animate-bounce">
                            {unreadCount}
                          </span>
                        )}
                      </button>

                      {/* LogOut action */}
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmModal({
                            isOpen: true,
                            title: "Keluar Sistem",
                            message: "Apakah Anda yakin ingin log out/keluar dari sistem?",
                            confirmText: "Keluar",
                            cancelText: "Batal",
                            isDanger: true,
                            onConfirm: () => {
                              setCurrentScreen("login");
                              setConfirmModal(prev => ({ ...prev, isOpen: false }));
                            }
                          });
                        }}
                        className="p-1.5 bg-emerald-950/40 hover:bg-red-950 text-red-300 rounded-full transition"
                        title="Logout Aplikasi"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* SCREEN BODY VIEWS */}
                  
                  {/* 1. DASHBOARD VIEW (HOME) */}
                  {currentScreen === "dashboard" && (
                    <div className="p-4 space-y-4 flex-1">
                      {/* Greeting Header */}
                      <div className="bg-gradient-to-r from-emerald-950 to-emerald-850 p-4 rounded-2xl text-white shadow relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5">
                          <IslamicMandala className="w-36 h-36" />
                        </div>
                        <p className="text-[10px] text-amber-400 uppercase font-extrabold tracking-wider">
                          Assalamualaikum Raheem
                        </p>
                        <h3 className="text-sm font-extrabold mt-0.5 text-ellipsis overflow-hidden whitespace-nowrap">
                          {userName}
                        </h3>
                        <p className="text-[10px] text-emerald-100/80 italic mt-2">
                          “Sebaik-baik kalian adalah orang yang belajar Al-Qur’an dan mengajarkannya.” (HR. Bukhari)
                        </p>
                      </div>

                      {/* STATS BENTO BARS */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-3">
                          <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">
                            <Users className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Santri Aktif</p>
                            <p className="text-base font-extrabold text-slate-800 font-mono">{totalSantriCount}</p>
                          </div>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-center space-x-3">
                          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                            <CheckSquare className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Hadir Hari Ini</p>
                            <p className="text-base font-extrabold text-slate-800 font-mono">{presenceTodayCount}</p>
                          </div>
                        </div>
                      </div>

                      {/* FEATURE SHORTCUTS GRID */}
                      <div className="space-y-2">
                        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Layanan Utama</h4>
                        
                        <div className="grid grid-cols-4 gap-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => setCurrentScreen("santri")}
                            className="bg-white p-2.5 rounded-xl border border-slate-100 hover:border-emerald-800/10 shadow-sm flex flex-col items-center space-y-1 z-10"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                              <Users className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">Santri</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCurrentScreen("absensi")}
                            className="bg-white p-2.5 rounded-xl border border-slate-100 hover:border-emerald-800/10 shadow-sm flex flex-col items-center space-y-1 z-10"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                              <CheckSquare className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">Absensi</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCurrentScreen("evaluasi")}
                            className="bg-white p-2.5 rounded-xl border border-slate-100 hover:border-emerald-800/10 shadow-sm flex flex-col items-center space-y-1 z-10"
                          >
                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                              <Sparkles className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">Evaluasi</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCurrentScreen("hafalan")}
                            className="bg-white p-2.5 rounded-xl border border-slate-100 hover:border-emerald-800/10 shadow-sm flex flex-col items-center space-y-1 z-10"
                          >
                            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                              <Award className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">Hafalan</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-4 gap-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => setCurrentScreen("raport")}
                            className="bg-white p-2.5 rounded-xl border border-slate-100 hover:border-emerald-800/10 shadow-sm flex flex-col items-center space-y-1 z-10"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                              <FileText className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">Raport</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCurrentScreen("jadwal")}
                            className="bg-white p-2.5 rounded-xl border border-slate-100 hover:border-emerald-800/10 shadow-sm flex flex-col items-center space-y-1 z-10"
                          >
                            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">Jadwal</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setCurrentScreen("profil_tpq")}
                            className="bg-white p-2.5 rounded-xl border border-slate-100 hover:border-emerald-800/10 shadow-sm flex flex-col items-center space-y-1 z-10"
                          >
                            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                              <Info className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">Info TPQ</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedClassFilter("Semua");
                              setCurrentScreen("santri");
                            }}
                            className="bg-white p-2.5 rounded-xl border border-slate-100 hover:border-emerald-800/10 shadow-sm flex flex-col items-center space-y-1 z-10"
                          >
                            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-700 flex items-center justify-center">
                              <Plus className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-bold text-slate-600">Kelas</span>
                          </button>
                        </div>
                      </div>

                      {/* QUICK JADWAL CARD */}
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <h4 className="text-xs font-bold text-slate-800 flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-700"></span>
                            <span>Kajian Hari Ini</span>
                          </h4>
                          <span className="text-[9px] text-emerald-800 font-bold px-2 py-0.5 bg-emerald-50 rounded-full font-mono">Kamis</span>
                        </div>
                        
                        <div className="space-y-1 text-xs">
                          <p className="font-bold text-slate-700">Murojaah Akbar & Ziyadah Hafalan</p>
                          <p className="text-[11px] text-slate-500">Pukul 16:00 - 17:30 • Tahfidz & Qur'an</p>
                          <p className="text-[10px] text-amber-600 font-semibold italic mt-1 font-sans">Oleh: Ustadz H. Ahmad Syukron</p>
                        </div>
                      </div>

                      {/* INTEGRATED GRAPH PREKEMBANGAN (Visual Canvas mockup) */}
                      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold text-slate-800">
                          Grafik Kehadiran Mingguan (%)
                        </h4>
                        
                        {/* Quick Interactive Simulated Chart */}
                        <div className="h-20 flex items-end justify-between space-x-2 pt-2">
                          {[
                            { day: "Sen", val: 85 },
                            { day: "Sel", val: 92 },
                            { day: "Rab", val: 88 },
                            { day: "Kam", val: 100 },
                            { day: "Jum", val: 90 },
                          ].map((item, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center">
                              <div
                                style={{ height: `${item.val * 0.6}px` }}
                                className="w-full bg-gradient-to-t from-emerald-900 to-emerald-700 rounded-t-sm relative group cursor-pointer transition-all duration-300 hover:scale-x-105"
                              >
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 p-0.5 bg-slate-900 text-amber-400 text-[8px] font-bold font-mono rounded opacity-0 group-hover:opacity-100 transition duration-150">
                                  {item.val}%
                                </div>
                              </div>
                              <span className="text-[9px] text-slate-400 mt-1.5 font-bold font-mono">{item.day}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* 2. DATA SANTRI VIEW (LIST & MODAL CRUD) */}
                  {currentScreen === "santri" && (
                    <div className="p-4 space-y-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-extrabold text-emerald-950 flex items-center space-x-1.5">
                          <span>🎒</span>
                          <span>Data Kelola Santri</span>
                        </h3>

                        {userRole !== "wali" && (
                          <button
                            type="button"
                            onClick={() => handleOpenSantriModal()}
                            className="px-2.5 py-1.5 bg-emerald-850 hover:bg-emerald-900 text-white rounded-lg text-[10px] font-bold flex items-center space-x-1.5 shadow"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Tambah Santri</span>
                          </button>
                        )}
                      </div>

                      {/* SEARCH BAR */}
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Cari nama santri..."
                          className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 font-medium"
                        />
                      </div>

                      {/* QUICK CLASS CATEGORIES HORIZONTAL FITLER */}
                      <div className="overflow-x-auto flex space-x-1.5 pb-2 scrollbar-none">
                        {["Semua", "Jilid 1", "Jilid 2", "Jilid 3", "Jilid 4", "Jilid 5", "Al-Qur'an", "Al-Qur'an 1", "Al-Qur'an 2", "Tahfidz"].map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setSelectedClassFilter(cat)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-semibold whitespace-nowrap border transition ${
                              selectedClassFilter === cat
                                ? "bg-amber-500 border-amber-500 text-emerald-950 shadow-sm"
                                : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50"
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      {/* SANTRI CARDS LIST */}
                      <div className="space-y-3 overflow-y-auto flex-1 max-h-[460px]">
                        {filteredSantris.length === 0 ? (
                          <div className="py-12 text-center text-xs text-slate-400">
                            Tidak ada data santri ditemukan.
                          </div>
                        ) : (
                          filteredSantris.map((s) => (
                            <div
                              key={s.id}
                              className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-800/10 transition-all flex justify-between items-start space-x-3.5 relative overflow-hidden"
                            >
                              <div className="flex space-x-3">
                                {/* Avatars */}
                                <img
                                  src={s.photoUrl}
                                  alt={s.name}
                                  referrerPolicy="no-referrer"
                                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-emerald-50 bg-slate-100 flex-shrink-0"
                                />
                                <div className="space-y-0.5">
                                  <div className="flex items-center space-x-2">
                                    <h4 className="text-xs font-extrabold text-slate-800">{s.name}</h4>
                                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-900 rounded-md text-[8.5px] font-bold">
                                      {s.classCategory}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 font-mono tracking-wider">No. Induk: {s.id}</p>
                                  <p className="text-[10.5px] text-slate-500 font-medium">Wali: {s.waliName}</p>
                                  <div className="flex items-center text-[10px] text-slate-400 space-x-1 pt-1">
                                    <Phone className="w-3 h-3 text-slate-400" />
                                    <span>{s.waliPhone}</span>
                                  </div>
                                </div>
                              </div>

                              {/* CRUD Actions if admin/ustadz */}
                              {userRole !== "wali" && (
                                <div className="flex flex-col space-y-2 z-10">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenSantriModal(s)}
                                    className="p-1 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded text-amber-600 transition"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  {userRole === "admin" && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteSantri(s.id, s.name)}
                                      className="p-1 bg-slate-50 hover:bg-red-50 border border-slate-100 rounded text-red-600 transition"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>

                    </div>
                  )}

                  {/* 3. ABSENSI VIEW */}
                  {currentScreen === "absensi" && (
                    <div className="p-4 space-y-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-100">
                        <h3 className="text-sm font-extrabold text-emerald-950 flex items-center space-x-1.5">
                          <span>📅</span>
                          <span>Presensi Santri Hari Ini</span>
                        </h3>
                        <span className="text-[10px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                          28 May 2026
                        </span>
                      </div>

                      {userRole === "wali" ? (
                        <div className="space-y-4">
                          <p className="text-xs text-slate-500 italic">
                            Berikut adalah ringkasan absensi pribadi untuk ananda Anda:
                          </p>
                          {/* Wali attendance panel */}
                          {santris.filter(s => s.id === linkedSantriId).map(s => {
                            const presence = attendance.map(day => ({
                              date: day.date,
                              status: day.records[s.id] || "hadir"
                            }));
                            return (
                              <div key={s.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                                <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                                  <span className="text-xs font-bold text-slate-800">{s.name}</span>
                                  <span className="px-2 py-0.5 bg-emerald-900 text-white font-bold text-[9px] rounded-md">{s.classCategory}</span>
                                </div>

                                <div className="space-y-2">
                                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Riwayat Presensi Mingguan</h4>
                                  <div className="space-y-1.5 max-h-40 overflow-y-auto">
                                    {presence.map((p, pIdx) => (
                                      <div key={pIdx} className="flex justify-between items-center text-xs text-slate-600 bg-slate-50/50 p-2 rounded">
                                        <span className="font-mono font-medium">{p.date}</span>
                                        <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase ${
                                          p.status === "hadir" ? "bg-emerald-50 text-emerald-800" :
                                          p.status === "izin" ? "bg-amber-50 text-amber-800" :
                                          p.status === "sakit" ? "bg-blue-50 text-blue-800" : "bg-red-50 text-red-800"
                                        }`}>
                                          {p.status}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[440px]">
                          <p className="text-[10.5px] leading-relaxed text-slate-400 mb-2 italic">
                            Atur kehadiran harian santri. Data langsung terekam pada kalender akademik raport.
                          </p>
                          {santris.map((s) => {
                            const dayRecord = attendance.find(a => a.date === "2026-05-28");
                            const status = (dayRecord && dayRecord.records[s.id]) || "hadir";

                            return (
                              <div
                                key={s.id}
                                className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0"
                              >
                                <div className="space-y-0.5">
                                  <p className="text-xs font-extrabold text-slate-800">{s.name}</p>
                                  <p className="text-[9.5px] text-slate-400 font-mono italic">No. Induk: {s.id} • {s.classCategory}</p>
                                </div>

                                <div className="flex space-x-1.5">
                                  {(["hadir", "izin", "sakit", "alfa"] as const).map((opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      id={`btn-abs-${s.id}-${opt}`}
                                      onClick={() => handleMarkAttendance(s.id, opt)}
                                      className={`px-2 py-1 text-[9px] font-extrabold rounded-md uppercase border transition-all ${
                                        status === opt
                                          ? opt === "hadir"
                                            ? "bg-emerald-800 border-emerald-800 text-white"
                                            : opt === "izin"
                                            ? "bg-amber-500 border-amber-500 text-emerald-950"
                                            : opt === "sakit"
                                            ? "bg-blue-605 border-blue-600 text-white bg-blue-600"
                                            : "bg-red-600 border-red-650 text-white bg-red-600"
                                          : "bg-slate-50 border-slate-200/60 text-slate-500 hover:bg-slate-100"
                                      }`}
                                    >
                                      {opt.charAt(0)}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                    </div>
                  )}

                  {/* 4. EVALUASI BELAJAR (SLIDERS & AI CO-PILOT!) */}
                  {currentScreen === "evaluasi" && (
                    <div className="p-4 space-y-4 flex-1 flex flex-col overflow-y-auto">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-extrabold text-emerald-950 flex items-center space-x-1.5">
                          <span>🌟</span>
                          <span>Evaluasi & Nilai Santri</span>
                        </h3>
                      </div>

                      {/* SANTRI SWAP SELECTOR */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm space-y-2">
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                          Pilih Santri yang Dinilai
                        </label>
                        {userRole === "wali" ? (
                          <div className="p-2 bg-slate-50 border rounded-lg text-xs font-bold text-slate-700">
                            {santris.find(s => s.id === linkedSantriId)?.name || "Santri"}
                          </div>
                        ) : (
                          <select
                            id="sel-eval-santri"
                            value={activeEvalSantriId}
                            onChange={(e) => setActiveEvalSantriId(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-950 focus:outline-none focus:ring-1 focus:ring-emerald-800 focus:border-emerald-800"
                          >
                            {santris.map(s => (
                              <option key={s.id} value={s.id}>
                                {s.name} ({s.classCategory})
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      {/* SLIDERS CONTAINER */}
                      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 pb-4">
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Penilaian Guru (0-100)</h4>

                          {[
                            { key: "makhorijul", name: "Makhorijul Huruf" },
                            { key: "tajwid", name: "Tajwid (Hukum Bacaan)" },
                            { key: "kelancaran", name: "Kelancaran Membaca" },
                            { key: "hafalanDoa", name: "Hafalan Doa Pilihan" },
                            { key: "hafalanSurat", name: "Hafalan Surat Pendek" },
                            { key: "adabAkhlak", name: "Adab & Akhlak Santri" },
                            { key: "keaktifan", name: "Keaktifan di TPQ" }
                          ].map((item) => {
                            const val = (evalForm as any)[item.key];
                            return (
                              <div key={item.key} className="space-y-1">
                                <div className="flex justify-between items-center text-xs">
                                  <span className="font-semibold text-slate-600">{item.name}</span>
                                  <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg">{val}</span>
                                </div>
                                <input
                                  type="range"
                                  min="40"
                                  max="100"
                                  id={`slider-${item.key}`}
                                  disabled={userRole === "wali"}
                                  value={val}
                                  onChange={(e) => setEvalForm(prev => ({ ...prev, [item.key]: parseInt(e.target.value) }))}
                                  className="w-full accent-emerald-850 h-1 bg-slate-100 rounded-lg appearance-auto cursor-pointer"
                                />
                              </div>
                            );
                          })}

                          {/* Remarks area */}
                          <div className="space-y-1">
                            <label className="block text-xs font-semibold text-slate-600">Catatan Manual Pelatih</label>
                            <textarea
                              id="txt-eval-catatan"
                              value={evalForm.catatan}
                              disabled={userRole === "wali"}
                              onChange={(e) => setEvalForm(prev => ({ ...prev, catatan: e.target.value }))}
                              placeholder="Masukkan evaluasi bimbingan..."
                              rows={2}
                              className="w-full p-3 border border-slate-200 bg-slate-50/50 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-800 focus:bg-white transition"
                            />
                          </div>

                          {/* AI RECOMMENDATION / ASSISTANT GENERATOR BUTTON */}
                          {userRole !== "wali" && (
                            <div className="pt-2 border-t border-slate-150 space-y-3">
                              <button
                                type="button"
                                id="btn-generate-ai-rec"
                                onClick={handleGenerateAiRecommendation}
                                disabled={aiGenerating}
                                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-emerald-950 font-extrabold text-[11px] rounded-xl shadow-md flex items-center justify-center space-x-2 transition active:scale-95 disabled:opacity-50"
                              >
                                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                <span>{aiGenerating ? "Ustadzah AI Menganalisa Nilai..." : "Gunakan CO-PILOT AI Ustadz (Gemini)"}</span>
                              </button>

                              {aiRecommendation && (
                                <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-1.5 text-[10px] text-slate-700 leading-relaxed font-sans relative">
                                  <span className="absolute top-1.5 right-1.5 text-xs">✨</span>
                                  <p className="font-bold text-amber-700">Draf Saran Guru (Disusun oleh AI Gemini):</p>
                                  <p className="font-medium italic">"{aiRecommendation}"</p>
                                  <p className="text-[8.5px] text-emerald-800 font-bold mt-1 uppercase">✓ Otomatis tersemat ke raport santri!</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Save Trigger */}
                        {userRole !== "wali" && (
                          <button
                            type="button"
                            id="btn-save-eval"
                            onClick={handleSaveEvaluation}
                            className="w-full py-3 bg-emerald-850 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition shadow-md active:scale-98 flex items-center justify-center space-x-1.5"
                          >
                            <span>Simpan Raport Evaluasi</span>
                            <span>💾</span>
                          </button>
                        )}
                      </div>

                    </div>
                  )}

                  {/* 5. HAFALAN SANTRI VIEW */}
                  {currentScreen === "hafalan" && (
                    <div className="p-4 space-y-4 flex-1 flex flex-col overflow-y-auto">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-extrabold text-emerald-950 flex items-center space-x-1.5">
                          <span>📖</span>
                          <span>Buku Hafalan Santri</span>
                        </h3>
                      </div>

                      {/* Active student selector */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm space-y-2">
                        <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                          Pilih Santri
                        </label>
                        {userRole === "wali" ? (
                          <div className="p-2 bg-slate-50 border rounded-lg text-xs font-bold text-slate-700">
                            {santris.find(s => s.id === linkedSantriId)?.name || "Santri"}
                          </div>
                        ) : (
                          <select
                            id="sel-hafalan-santri"
                            value={activeHafalanSantriId}
                            onChange={(e) => setActiveHafalanSantriId(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-950 focus:outline-none focus:ring-1 focus:ring-emerald-800"
                          >
                            {santris.map(s => (
                              <option key={s.id} value={s.id}>
                                {s.name} ({s.classCategory})
                              </option>
                            ))}
                          </select>
                        )}
                      </div>

                      {/* ADD HAFALAN LOG FORM (USTADZ / ADMIN ONLY) */}
                      {userRole !== "wali" && (
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                          <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Catat Setoran Hafalan Baru</h4>
                          <form onSubmit={handleAddHafalan} className="space-y-3.5">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[9.5px] font-bold text-slate-400 mb-1">Kategori</label>
                                <select
                                  value={hafalanForm.category}
                                  onChange={(e) => setHafalanForm(prev => ({ ...prev, category: e.target.value as any }))}
                                  className="w-full p-2 border border-slate-150 rounded-lg text-xs focus:outline-none bg-slate-50"
                                >
                                  <option value="surat">Surat Pendek</option>
                                  <option value="doa">Doa Harian</option>
                                  <option value="hadits">Hadits Nabi</option>
                                  <option value="asmaul_husna">Asmaul Husna</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[9.5px] font-bold text-slate-400 mb-1">Status</label>
                                <select
                                  value={hafalanForm.status}
                                  onChange={(e) => setHafalanForm(prev => ({ ...prev, status: e.target.value as any }))}
                                  className="w-full p-2 border border-slate-150 bg-slate-50 rounded-lg text-xs focus:outline-none"
                                >
                                  <option value="lancar">Lancar Mutqin</option>
                                  <option value="sebagian">Sebagian Lancar</option>
                                  <option value="belum">Mengulang (Belum)</option>
                                </select>
                              </div>
                            </div>

                            <div>
                              <input
                                type="text"
                                value={hafalanForm.title}
                                onChange={(e) => setHafalanForm(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Nama Al-Qur'an (eg. Surat Al-Insyirah)"
                                className="w-full p-2 border border-slate-150 rounded-lg text-xs focus:outline-none bg-slate-50 focus:bg-white"
                                required
                              />
                            </div>

                            <div className="flex space-x-2">
                              <input
                                type="text"
                                value={hafalanForm.targetProgress}
                                onChange={(e) => setHafalanForm(prev => ({ ...prev, targetProgress: e.target.value }))}
                                placeholder="Target (contoh: Ayat 1-8)"
                                className="flex-1 p-2 border border-slate-150 rounded-lg text-xs focus:outline-none bg-slate-50 focus:bg-white"
                              />
                              <button
                                type="submit"
                                id="btn-save-hafalan"
                                className="px-4 bg-emerald-850 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold"
                              >
                                Tambah
                              </button>
                            </div>
                          </form>
                        </div>
                      )}

                      {/* HISTORY OF MEMORIZATION RECORDS */}
                      <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                          Daftar Setoran Selesai
                        </h4>

                        {hafalan.filter(h => h.santriId === (userRole === "wali" ? linkedSantriId : activeHafalanSantriId)).length === 0 ? (
                          <div className="py-8 text-center text-slate-400 text-xs">
                            Belum ada riwayat setoran hafalan tercatat.
                          </div>
                        ) : (
                          hafalan
                            .filter(h => h.santriId === (userRole === "wali" ? linkedSantriId : activeHafalanSantriId))
                            .map((h) => (
                              <div
                                key={h.id}
                                className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center space-x-2"
                              >
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-0.5 text-[8.5px] font-bold rounded uppercase ${
                                      h.category === "surat" ? "bg-amber-50 text-amber-700" :
                                      h.category === "doa" ? "bg-blue-50 text-blue-700" :
                                      h.category === "hadits" ? "bg-purple-50 text-purple-700" : "bg-emerald-50 text-emerald-700"
                                    }`}>
                                      {h.category === "asmaul_husna" ? "Asmaul" : h.category}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono italic">{h.date}</span>
                                  </div>
                                  <h5 className="text-xs font-extrabold text-slate-800 mt-1">{h.title}</h5>
                                  <p className="text-[10.5px] text-slate-500 font-medium">Batas: {h.targetProgress} • Ustadz: {h.ustadzName}</p>
                                </div>

                                <div className="text-right">
                                  <span className={`px-2 py-1 rounded-full text-[9px] font-extrabold uppercase ${
                                    h.status === "lancar" ? "bg-emerald-50 text-emerald-800" :
                                    h.status === "sebagian" ? "bg-amber-50 text-amber-800" : "bg-red-50 text-red-800"
                                  }`}>
                                    {h.status === "lancar" ? "Lancar" : h.status === "sebagian" ? "Sebagian" : "Kurang"}
                                  </span>
                                </div>
                              </div>
                            ))
                        )}
                      </div>

                    </div>
                  )}

                  {/* 6. RAPORT & DIGITAL PRINT SLIP */}
                  {currentScreen === "raport" && (
                    <div className="p-4 space-y-4 flex-1 flex flex-col overflow-y-auto">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <h3 className="text-sm font-extrabold text-emerald-950 flex items-center space-x-1.5">
                          <span>📝</span>
                          <span>E-Raport Digital Santri</span>
                        </h3>
                      </div>

                      {/* Student selection */}
                      {userRole !== "wali" && (
                        <div className="bg-white p-3 rounded-xl border border-slate-150 space-y-2">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Pilih Raport Santri
                          </label>
                          <select
                            id="sel-report-santri"
                            value={activeEvalSantriId}
                            onChange={(e) => setActiveEvalSantriId(e.target.value)}
                            className="bg-slate-550 w-full p-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 bg-slate-50"
                          >
                            {santris.map(s => (
                              <option key={s.id} value={s.id}>{s.name} ({s.classCategory})</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Display the gorgeous printable PDF block we extracted! */}
                      {activeReportSantri ? (
                        <RaportPDFView
                          santri={activeReportSantri}
                          evaluation={evaluations.find(e => e.santriId === activeReportSantri.id)}
                          attendanceDays={attendance}
                          tpqProfile={tpqProfile}
                        />
                      ) : (
                        <div className="p-8 text-center text-xs text-slate-400">
                          Harap pilih santri untuk memuat raport.
                        </div>
                      )}
                    </div>
                  )}

                  {/* 7. JADWAL VIEW */}
                  {currentScreen === "jadwal" && (
                    <div className="p-4 space-y-4 flex-1 flex flex-col overflow-y-auto">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                        <h3 className="text-sm font-extrabold text-emerald-950 flex items-center space-x-1.5">
                          <span>📅</span>
                          <span>Kalender & Jadwal Mengaji</span>
                        </h3>
                      </div>

                      <div className="space-y-3.5">
                        {initialJadwalList.map((j) => (
                          <div
                            key={j.id}
                            className="bg-white p-3.5 rounded-2xl border border-slate-150/40 shadow-sm space-y-1.5 relative overflow-hidden"
                          >
                            {/* Accent indicator */}
                            <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-amber-500 to-amber-600"></div>

                            <div className="pl-3">
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-extrabold text-emerald-900 uppercase font-serif">{j.day}</span>
                                <span className="text-[9.5px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                                  {j.time}
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-slate-800 mt-2">{j.activity}</h4>
                              <p className="text-[10.5px] text-slate-500 font-medium pt-1">
                                Kelas: <strong className="text-slate-700">{j.classCategory}</strong>
                              </p>
                              <p className="text-[9.5px] text-amber-600 font-semibold italic">
                                Pengajar: {j.ustadzName}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 8. LAINNYA & INFO TPQ */}
                  {currentScreen === "profil_tpq" && (
                    <div className="p-4 space-y-4 flex-1 flex flex-col overflow-y-auto">
                      <div className="flex justify-between items-center pb-2 border-b border-emerald-900/10">
                        <h3 className="text-sm font-extrabold text-emerald-950 flex items-center space-x-1.5">
                          <span>🕌</span>
                          <span>Profil & Informasi TPQ</span>
                        </h3>
                      </div>

                      {/* Visual Banner */}
                      <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-4 rounded-2xl text-white shadow-md relative overflow-hidden text-center space-y-2">
                        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                          <IslamicMandala className="w-48 h-48" />
                        </div>
                        <div className="w-12 h-12 bg-amber-500 text-emerald-950 rounded-full flex items-center justify-center mx-auto shadow-md">
                          <MosqueIcon className="w-8 h-8" />
                        </div>
                        <h4 className="text-sm font-bold text-amber-400">TPA AL ASYHAR SIMA</h4>
                        <p className="text-[10px] text-emerald-100 max-w-xs mx-auto">
                          Menciptakan Generasi Qur'ani yang Cerdas, Mandiri, Berakhlakul Karimah, dan Cinta Islam Sejak Dini.
                        </p>
                      </div>

                      {/* Accordion List Detail */}
                      <div className="space-y-3">
                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs text-xs space-y-1.5">
                          <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Kepala Lembaga</p>
                          <p className="font-extrabold text-emerald-950">{tpqProfile.headmaster}</p>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs text-xs space-y-1.5">
                          <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Tahun Berdiri</p>
                          <p className="font-extrabold text-slate-700">{tpqProfile.foundedYear} M (Telah &gt;14 tahun berdedikasi)</p>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs text-xs space-y-1.5">
                          <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Alamat Lengkap</p>
                          <p className="font-medium text-slate-600 leading-relaxed">
                            {tpqProfile.address}
                          </p>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-xs text-xs space-y-1.5">
                          <p className="text-slate-400 font-bold uppercase text-[9px] tracking-wider">Hubungi Kami / WhatsApp</p>
                          <p className="font-mono font-bold text-emerald-800">{tpqProfile.phone}</p>
                        </div>
                      </div>

                      {/* TUTORIAL / BANTUAN */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Butuh Bantuan?</h4>
                        <div className="bg-white p-3 rounded-xl border border-slate-100 text-[10.5px] leading-relaxed text-slate-500 space-y-1.5">
                          <p>
                            • <strong>Perubahan data</strong> dapat dikoordinasikan langsung ke Kepala TPQ melalui tombol WhatsApp.
                          </p>
                          <p>
                            • <strong>Untuk Ustadz:</strong> Jangan lupa klik <em>Gunakan Co-Pilot AI</em> di tab Evaluasi untuk bantuan menyusun nasehat parenting santri.
                          </p>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* BOTTOM NAVIGATION LAYER */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-150 flex justify-around items-center px-2 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
                    <button
                      type="button"
                      onClick={() => setCurrentScreen("dashboard")}
                      className={`flex flex-col items-center justify-center space-y-0.5 transition ${
                        currentScreen === "dashboard" ? "text-emerald-850 scale-105" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <Home className="w-5 h-5" />
                      <span className="text-[9px] font-bold">Utama</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentScreen("santri")}
                      className={`flex flex-col items-center justify-center space-y-0.5 transition ${
                        currentScreen === "santri" ? "text-emerald-850 scale-105" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <Users className="w-5 h-5" />
                      <span className="text-[9px] font-bold">Santri</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentScreen("absensi")}
                      className={`flex flex-col items-center justify-center space-y-0.5 transition ${
                        currentScreen === "absensi" ? "text-emerald-850 scale-105" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <CheckSquare className="w-5 h-5" />
                      <span className="text-[9px] font-bold">Presensi</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentScreen("evaluasi")}
                      className={`flex flex-col items-center justify-center space-y-0.5 transition ${
                        currentScreen === "evaluasi" ? "text-emerald-850 scale-105" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <Sparkles className="w-5 h-5" />
                      <span className="text-[9px] font-bold">Evaluasi</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCurrentScreen("raport")}
                      className={`flex flex-col items-center justify-center space-y-0.5 transition ${
                        currentScreen === "raport" ? "text-emerald-850 scale-105" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      <FileText className="w-5 h-5" />
                      <span className="text-[9px] font-bold">Raport</span>
                    </button>
                  </div>

                  {/* FLOAT NOTIFICATIONS MODAL OVERLAY */}
                  {showNotificationsList && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex flex-col justify-end z-40">
                      <div className="bg-white rounded-t-3xl p-4 max-h-[75%] overflow-y-auto space-y-3 shadow-2xl animate-slide-up duration-250">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <h4 className="text-xs font-extrabold text-emerald-950 flex items-center space-x-1">
                            <span>🔔</span>
                            <span>Notifikasi Masuk ({visibleNotifications.length})</span>
                          </h4>
                          <button
                            type="button"
                            onClick={() => setShowNotificationsList(false)}
                            className="px-2.5 py-1 text-[10px] font-bold text-slate-500 hover:bg-slate-100 rounded-lg"
                          >
                            Tutup
                          </button>
                        </div>

                        <div className="space-y-3">
                          {visibleNotifications.length === 0 ? (
                            <p className="text-center py-6 text-xs text-slate-400">Belum ada pengumuman.</p>
                          ) : (
                            visibleNotifications.map((notif) => (
                              <div
                                key={notif.id}
                                className="p-3 bg-slate-50/70 hover:bg-slate-50 border border-slate-100 rounded-xl space-y-1.5 text-xs text-slate-700"
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-extrabold text-emerald-900">{notif.title}</span>
                                  <span className="text-[9px] text-slate-400 font-mono italic">{notif.date}</span>
                                </div>
                                <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
                                  {notif.body}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SANTRI DETAILS / ADD FORM MODAL */}
                  {isSantriModalOpen && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                      <div className="bg-white rounded-2xl w-full max-w-sm p-4 shadow-2xl border border-slate-105 overflow-y-auto max-h-[90%]">
                        <div className="flex justify-between items-center pb-2 border-b mb-3">
                          <h4 className="text-xs font-extrabold text-emerald-950">
                            {editingSantri ? "Ubah Data Santri" : "Tambah Santri Baru"}
                          </h4>
                          <button
                            type="button"
                            onClick={() => setIsSantriModalOpen(false)}
                            className="text-slate-400 text-sm font-bold"
                          >
                            ✕
                          </button>
                        </div>

                        <form onSubmit={handleSaveSantri} className="space-y-3 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                              Nama Lengkap
                            </label>
                            <input
                              type="text"
                              value={santriForm.name}
                              onChange={(e) => setSantriForm({ ...santriForm, name: e.target.value })}
                              placeholder="Fauzan Ahmad"
                              className="w-full p-2 border border-slate-200 bg-slate-50 rounded-lg text-xs"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                                Tanggal Lahir
                              </label>
                              <input
                                type="date"
                                value={santriForm.dateOfBirth}
                                onChange={(e) => setSantriForm({ ...santriForm, dateOfBirth: e.target.value })}
                                className="w-full p-2 border border-slate-200 bg-slate-50 rounded-lg text-xs"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                                Kelas / Level
                              </label>
                              <select
                                value={santriForm.classCategory}
                                onChange={(e) => setSantriForm({ ...santriForm, classCategory: e.target.value })}
                                className="w-full p-2 border border-slate-200 bg-slate-50 rounded-lg text-xs"
                              >
                                {["Jilid 1", "Jilid 2", "Jilid 3", "Jilid 4", "Jilid 5", "Al-Qur'an", "Al-Qur'an 1", "Al-Qur'an 2", "Tahfidz"].map((lvl) => (
                                  <option key={lvl} value={lvl}>{lvl}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                              Alamat Santri
                            </label>
                            <input
                              type="text"
                              value={santriForm.address}
                              onChange={(e) => setSantriForm({ ...santriForm, address: e.target.value })}
                              placeholder="Sima Krajan RT 03/RW 02"
                              className="w-full p-2 border border-slate-200 bg-slate-50 rounded-lg text-xs"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                                Nama Orang Tua / Wali
                              </label>
                              <input
                                type="text"
                                value={santriForm.waliName}
                                onChange={(e) => setSantriForm({ ...santriForm, waliName: e.target.value })}
                                placeholder="H. Mulyadi"
                                className="w-full p-2 border border-slate-200 bg-slate-50 rounded-lg text-xs"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                                No. HP Wali Santri
                              </label>
                              <input
                                type="text"
                                value={santriForm.waliPhone}
                                onChange={(e) => setSantriForm({ ...santriForm, waliPhone: e.target.value })}
                                placeholder="081234..."
                                className="w-full p-2 border border-slate-200 bg-slate-50 rounded-lg text-xs"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                              URL Foto (Opsional)
                            </label>
                            <input
                              type="url"
                              value={santriForm.photoUrl}
                              onChange={(e) => setSantriForm({ ...santriForm, photoUrl: e.target.value })}
                              placeholder="https://..."
                              className="w-full p-2 border border-slate-200 bg-slate-50 rounded-lg text-xs"
                            />
                          </div>

                          <div className="pt-2 flex space-x-2 font-bold justify-end">
                            <button
                              type="button"
                              onClick={() => setIsSantriModalOpen(false)}
                              className="px-4 py-2 text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg"
                            >
                              Batal
                            </button>
                            <button
                              type="submit"
                              id="btn-confirm-save-santri"
                              className="px-4 py-2 bg-emerald-850 hover:bg-emerald-900 text-white rounded-lg shadow"
                            >
                              Simpan Data
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* CUSTOM CONFIRMATION DIALOG MODAL */}
            {confirmModal.isOpen && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in">
                <div className="bg-white rounded-2xl w-full max-w-[280px] p-5 shadow-2xl border border-slate-100/50 transform scale-100 transition-all">
                  <div className="flex items-center space-x-2 text-amber-500 mb-2">
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                    <h3 className="text-xs font-extrabold text-slate-850 uppercase tracking-wide">
                      {confirmModal.title}
                    </h3>
                  </div>
                  <p className="text-[11.5px] text-slate-500 leading-relaxed font-semibold mb-4">
                    {confirmModal.message}
                  </p>
                  <div className="flex space-x-2 justify-end text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                      className="px-3 py-1.5 text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                      {confirmModal.cancelText || "Batal"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        confirmModal.onConfirm();
                      }}
                      className={`px-3 py-1.5 text-white rounded-lg transition shadow-sm ${
                        confirmModal.isDanger
                          ? "bg-red-600 hover:bg-red-700 active:scale-95"
                          : "bg-emerald-850 hover:bg-emerald-900 active:scale-95"
                      }`}
                    >
                      {confirmModal.confirmText || "Ya"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CUSTOM ALERT MESSAGE MODAL */}
            {alertModal.isOpen && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] animate-fade-in">
                <div className="bg-white rounded-2xl w-full max-w-[280px] p-5 shadow-2xl border border-slate-100/50 transform scale-100 transition-all text-center">
                  <div className="flex flex-col items-center justify-center mb-3">
                    {alertModal.type === "success" ? (
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
                        <CheckCircle className="w-6 h-6 animate-bounce" />
                      </div>
                    ) : alertModal.type === "warning" ? (
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-2">
                        <AlertCircle className="w-6 h-6 animate-pulse" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                        <Info className="w-6 h-6" />
                      </div>
                    )}
                    <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">
                      {alertModal.title}
                    </h3>
                  </div>
                  <p className="text-[11.5px] text-slate-500 leading-relaxed font-semibold mb-4">
                    {alertModal.message}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
                    className="w-full py-2 bg-emerald-850 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold transition shadow-md"
                  >
                    Mengerti
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN NAVIGATION BAR UNDERLAY (DECORATIVE SMARTPHONE BEZEL NOTCH BOTTOM) */}
            <div className="bg-slate-900 text-[9px] text-center text-slate-600/80 py-1.5 z-50">
              <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto"></div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
