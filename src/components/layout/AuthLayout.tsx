import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  logoUrl?: string;
  footerText?: string;
}

const AuthLayout = ({
  children,
  title = "Sistem Penjadwalan Otomatis SMK",
  subtitle = "Masuk untuk mengakses sistem penjadwalan",
  logoUrl = "https://api.dicebear.com/7.x/initials/svg?seed=SMK&backgroundColor=0369a1&fontSize=36",
  footerText = "© 2023 Sistem Penjadwalan Otomatis SMK. Hak Cipta Dilindungi.",
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 mb-4 rounded-full overflow-hidden bg-primary flex items-center justify-center">
            <img
              src={logoUrl}
              alt="Logo Sekolah"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            {title}
          </h1>
          <p className="text-sm text-gray-500 text-center mt-1">{subtitle}</p>
        </div>

        <Card className="w-full bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center">Autentikasi</CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full flex items-center gap-4">
              <Separator className="flex-grow" />
              <span className="text-xs text-gray-400">atau</span>
              <Separator className="flex-grow" />
            </div>
            <Button variant="outline" className="w-full">
              Hubungi Administrator
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">{footerText}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
