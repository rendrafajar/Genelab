import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { School, Calendar, Users, BookOpen, Clock } from "lucide-react";
import LoginForm from "./auth/LoginForm";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError("");

    // Simulasi proses login
    setTimeout(() => {
      setIsLoading(false);
      // Untuk demo, navigasi ke dashboard
      navigate("/dashboard");
    }, 1500);
  };

  const features = [
    {
      icon: <Calendar className="h-10 w-10 text-blue-600" />,
      title: "Penjadwalan Otomatis",
      description: "Menghasilkan jadwal optimal dengan algoritma genetika",
    },
    {
      icon: <Users className="h-10 w-10 text-green-600" />,
      title: "Manajemen Data",
      description: "Kelola data guru, kelas, ruangan, dan mata pelajaran",
    },
    {
      icon: <BookOpen className="h-10 w-10 text-purple-600" />,
      title: "Kurikulum Terintegrasi",
      description: "Sesuaikan jadwal dengan kurikulum SMK yang berlaku",
    },
    {
      icon: <Clock className="h-10 w-10 text-orange-600" />,
      title: "Optimasi Waktu",
      description: "Atur preferensi dan batasan waktu secara fleksibel",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <School className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">
              Sistem Penjadwalan SMK
            </h1>
          </div>
          <div>
            <Button
              variant="ghost"
              className="mr-2"
              onClick={() => navigate("/about")}
            >
              Tentang
            </Button>
            <Button variant="ghost" onClick={() => navigate("/contact")}>
              Kontak
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          {/* Left side - Hero content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
              Jadwal Pelajaran Optimal dengan{" "}
              <span className="text-blue-600">Algoritma Genetika</span>
            </h2>
            <p className="text-lg text-gray-600">
              Sistem penjadwalan otomatis untuk SMK yang mempertimbangkan
              berbagai batasan dan preferensi, menghasilkan jadwal yang optimal
              untuk guru dan siswa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="mb-3 mt-2">{feature.icon}</div>
                    <h3 className="font-semibold text-gray-800">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right side - Login form */}
          <div className="w-full md:w-5/12 mt-8 md:mt-0">
            <div className="bg-white rounded-xl shadow-xl p-1">
              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center justify-center md:justify-start">
                <School className="h-6 w-6 text-blue-600 mr-2" />
                <span className="text-gray-700 font-semibold">
                  Sistem Penjadwalan SMK
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1 text-center md:text-left">
                © 2023 Sistem Penjadwalan Otomatis SMK. Hak Cipta Dilindungi.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-blue-600"
              >
                Bantuan
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-blue-600"
              >
                Kebijakan Privasi
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-blue-600"
              >
                Syarat & Ketentuan
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
