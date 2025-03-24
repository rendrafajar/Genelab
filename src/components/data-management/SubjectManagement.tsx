import React, { useState } from "react";
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  kode: z.string().min(2, {
    message: "Kode mata pelajaran minimal 2 karakter",
  }),
  nama: z.string().min(3, {
    message: "Nama mata pelajaran minimal 3 karakter",
  }),
  jenis: z.string({
    required_error: "Pilih jenis mata pelajaran",
  }),
  tingkat: z.string({
    required_error: "Pilih tingkat kelas",
  }),
  jurusan: z.string({
    required_error: "Pilih jurusan",
  }),
  jam_per_minggu: z.string().transform((val) => parseInt(val, 10)),
  deskripsi: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Subject {
  id: string;
  kode: string;
  nama: string;
  jenis: string;
  tingkat: string;
  jurusan: string;
  jam_per_minggu: number;
  deskripsi?: string;
}

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: "1",
      kode: "MTK10",
      nama: "Matematika",
      jenis: "Teori",
      tingkat: "X",
      jurusan: "Semua Jurusan",
      jam_per_minggu: 4,
      deskripsi: "Mata pelajaran dasar matematika untuk kelas 10",
    },
    {
      id: "2",
      kode: "BIG11",
      nama: "Bahasa Inggris",
      jenis: "Teori",
      tingkat: "XI",
      jurusan: "Semua Jurusan",
      jam_per_minggu: 3,
      deskripsi: "Mata pelajaran bahasa inggris untuk kelas 11",
    },
    {
      id: "3",
      kode: "RPL12",
      nama: "Pemrograman Web",
      jenis: "Praktikum",
      tingkat: "XII",
      jurusan: "RPL",
      jam_per_minggu: 6,
      deskripsi: "Mata pelajaran pemrograman web untuk kelas 12 jurusan RPL",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm<FormValues>({
    defaultValues: {
      kode: "",
      nama: "",
      jenis: "",
      tingkat: "",
      jurusan: "",
      jam_per_minggu: "0",
      deskripsi: "",
    },
  });

  const openAddDialog = () => {
    form.reset();
    setIsEditMode(false);
    setIsOpen(true);
  };

  const openEditDialog = (subject: Subject) => {
    form.reset({
      kode: subject.kode,
      nama: subject.nama,
      jenis: subject.jenis,
      tingkat: subject.tingkat,
      jurusan: subject.jurusan,
      jam_per_minggu: subject.jam_per_minggu.toString(),
      deskripsi: subject.deskripsi || "",
    });
    setCurrentSubject(subject);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const onSubmit = (data: FormValues) => {
    if (isEditMode && currentSubject) {
      // Edit existing subject
      setSubjects(
        subjects.map((subject) =>
          subject.id === currentSubject.id ? { ...subject, ...data } : subject,
        ),
      );
    } else {
      // Add new subject
      const newSubject: Subject = {
        id: Date.now().toString(),
        ...data,
      };
      setSubjects([...subjects, newSubject]);
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus mata pelajaran ini?")) {
      setSubjects(subjects.filter((subject) => subject.id !== id));
    }
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.jurusan.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Mata Pelajaran</h2>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Tambah Mata Pelajaran
        </Button>
      </div>

      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Cari mata pelajaran..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableCaption>Daftar mata pelajaran dalam kurikulum</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nama Mata Pelajaran</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Tingkat</TableHead>
              <TableHead>Jurusan</TableHead>
              <TableHead className="text-center">Jam/Minggu</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.kode}</TableCell>
                  <TableCell>{subject.nama}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${subject.jenis === "Teori" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                    >
                      {subject.jenis}
                    </span>
                  </TableCell>
                  <TableCell>{subject.tingkat}</TableCell>
                  <TableCell>{subject.jurusan}</TableCell>
                  <TableCell className="text-center">
                    {subject.jam_per_minggu}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(subject)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(subject.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  Tidak ada data mata pelajaran yang ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode
                ? "Edit Mata Pelajaran"
                : "Tambah Mata Pelajaran Baru"}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Ubah informasi mata pelajaran di bawah ini."
                : "Isi formulir berikut untuk menambahkan mata pelajaran baru."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="kode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Mata Pelajaran</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: MTK10" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Mata Pelajaran</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Matematika" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="jenis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Teori">Teori</SelectItem>
                          <SelectItem value="Praktikum">Praktikum</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tingkat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tingkat</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tingkat" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="X">X (Kelas 10)</SelectItem>
                          <SelectItem value="XI">XI (Kelas 11)</SelectItem>
                          <SelectItem value="XII">XII (Kelas 12)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jam_per_minggu"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jam Per Minggu</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="12"
                          placeholder="Contoh: 4"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Jumlah jam pelajaran per minggu
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="jurusan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jurusan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jurusan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Semua Jurusan">
                          Semua Jurusan
                        </SelectItem>
                        <SelectItem value="RPL">
                          Rekayasa Perangkat Lunak (RPL)
                        </SelectItem>
                        <SelectItem value="TKJ">
                          Teknik Komputer dan Jaringan (TKJ)
                        </SelectItem>
                        <SelectItem value="MM">Multimedia (MM)</SelectItem>
                        <SelectItem value="AKL">
                          Akuntansi dan Keuangan Lembaga (AKL)
                        </SelectItem>
                        <SelectItem value="OTKP">
                          Otomatisasi Tata Kelola Perkantoran (OTKP)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deskripsi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Deskripsi singkat tentang mata pelajaran"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Deskripsi singkat tentang mata pelajaran (opsional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">
                  {isEditMode ? "Simpan Perubahan" : "Tambah Mata Pelajaran"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubjectManagement;
