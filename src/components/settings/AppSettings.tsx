import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  appName: z.string().min(2, {
    message: "Nama aplikasi harus memiliki minimal 2 karakter.",
  }),
  logoUrl: z.string().url({
    message: "URL logo harus valid.",
  }),
  footerText: z.string().min(2, {
    message: "Teks footer harus memiliki minimal 2 karakter.",
  }),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Warna harus dalam format hex yang valid (contoh: #FF5733).",
  }),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Warna harus dalam format hex yang valid (contoh: #FF5733).",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AppSettings = () => {
  const [logoPreview, setLogoPreview] = useState<string>(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=school",
  );

  const defaultValues: FormValues = {
    appName: "Sistem Penjadwalan SMK",
    logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=school",
    footerText: "© 2023 Sistem Penjadwalan SMK. Hak Cipta Dilindungi.",
    primaryColor: "#4F46E5",
    secondaryColor: "#10B981",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: FormValues) => {
    // Dalam implementasi nyata, ini akan menyimpan pengaturan ke database
    console.log("Pengaturan aplikasi disimpan:", data);
    alert("Pengaturan berhasil disimpan!");
  };

  const handleLogoUrlChange = (url: string) => {
    setLogoPreview(url);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Pengaturan Aplikasi
        </h1>
        <p className="text-gray-600">
          Konfigurasi tampilan dan informasi dasar aplikasi penjadwalan SMK.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Aplikasi</CardTitle>
              <CardDescription>
                Ubah nama, logo, dan teks footer aplikasi.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="appName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Aplikasi</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan nama aplikasi"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Nama ini akan ditampilkan di header dan title browser.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Logo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/logo.png"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              handleLogoUrlChange(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          URL gambar logo yang akan ditampilkan di header
                          aplikasi.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="footerText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teks Footer</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan teks footer"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Teks yang akan ditampilkan di bagian footer aplikasi.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="primaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Warna Utama</FormLabel>
                          <div className="flex gap-2">
                            <div
                              className="w-10 h-10 rounded border"
                              style={{ backgroundColor: field.value }}
                            />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormDescription>
                            Warna utama untuk tombol dan elemen penting.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="secondaryColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Warna Sekunder</FormLabel>
                          <div className="flex gap-2">
                            <div
                              className="w-10 h-10 rounded border"
                              style={{ backgroundColor: field.value }}
                            />
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </div>
                          <FormDescription>
                            Warna sekunder untuk aksen dan highlight.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <CardFooter className="px-0 pt-4">
                    <Button type="submit" className="w-full md:w-auto">
                      <Save className="mr-2 h-4 w-4" />
                      Simpan Pengaturan
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Pratinjau</CardTitle>
              <CardDescription>Tampilan logo aplikasi saat ini</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4 overflow-hidden rounded-lg border shadow-sm">
                <img
                  src={logoPreview}
                  alt="Logo Aplikasi"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback";
                  }}
                />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-lg">{form.watch("appName")}</h3>
                <div
                  className="mt-2 text-xs text-gray-500 p-2 border-t"
                  style={{ borderColor: form.watch("secondaryColor") }}
                >
                  {form.watch("footerText")}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Warna Tema</CardTitle>
              <CardDescription>Pratinjau warna tema aplikasi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Warna Utama</p>
                  <div
                    className="h-10 rounded-md"
                    style={{ backgroundColor: form.watch("primaryColor") }}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Warna Sekunder</p>
                  <div
                    className="h-10 rounded-md"
                    style={{ backgroundColor: form.watch("secondaryColor") }}
                  />
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium mb-2">Contoh Tombol</p>
                  <Button
                    className="mr-2"
                    style={{ backgroundColor: form.watch("primaryColor") }}
                  >
                    Tombol Utama
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2"
                    style={{
                      borderColor: form.watch("secondaryColor"),
                      color: form.watch("secondaryColor"),
                    }}
                  >
                    Tombol Sekunder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;
