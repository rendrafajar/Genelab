import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { supabase } from "@/lib/supabase";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";

interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
  error?: string;
}

const LoginForm = ({
  onSubmit = () => {},
  isLoading: propIsLoading = false,
  error: propError = "",
}: LoginFormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(propIsLoading);
  const [error, setError] = useState(propError);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Call the onSubmit prop for any external handling
      onSubmit({ email, password });

      // For demo purposes, we'll check for admin credentials
      // In a real app, you would use Supabase auth.signInWithPassword
      if (email === "admin@sekolah.sch.id" && password === "admin123") {
        // Simulate successful login
        setTimeout(() => {
          setIsLoading(false);
          // Store user info in localStorage for persistence
          localStorage.setItem("userRole", "admin");
          localStorage.setItem("userName", "Admin Sekolah");
          localStorage.setItem("schoolName", "SMK Negeri 1");

          // Navigate to dashboard
          navigate("/dashboard");
        }, 1000);
      } else if (email === "guru@sekolah.sch.id" && password === "guru123") {
        // User role login
        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem("userRole", "user");
          localStorage.setItem("userName", "Guru Matematika");
          localStorage.setItem("schoolName", "SMK Negeri 1");
          navigate("/dashboard");
        }, 1000);
      } else if (
        email === "viewer@sekolah.sch.id" &&
        password === "viewer123"
      ) {
        // Viewer role login
        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem("userRole", "viewer");
          localStorage.setItem("userName", "Pengamat Jadwal");
          localStorage.setItem("schoolName", "SMK Negeri 1");
          navigate("/dashboard");
        }, 1000);
      } else {
        // Invalid credentials
        setIsLoading(false);
        setError("Email atau kata sandi tidak valid");
      }

      /* Uncomment this for real Supabase authentication
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Gagal masuk. Periksa email dan kata sandi Anda.");
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        // Get user role from database
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role, name, school_name')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          setError("Gagal mendapatkan data pengguna");
          setIsLoading(false);
          return;
        }

        // Store user info
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('schoolName', userData.school_name);

        // Navigate to dashboard
        navigate("/dashboard");
      }
      */
    } catch (err) {
      console.error("Login error:", err);
      setError("Terjadi kesalahan saat login. Silakan coba lagi.");
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold text-center text-gray-800">
          Masuk ke Sistem
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Sistem Penjadwalan Otomatis SMK
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@sekolah.sch.id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">
              Kata Sandi
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label
                htmlFor="remember"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Ingat saya
              </Label>
            </div>
            <Button
              variant="link"
              className="text-sm text-blue-600 hover:text-blue-800 p-0"
              type="button"
            >
              Lupa kata sandi?
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Memproses...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Masuk</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-gray-600">
          Belum memiliki akun? Hubungi administrator sekolah
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
