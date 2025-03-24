import React, { useState } from "react";
import { PlusCircle, Pencil, Trash2, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

// Define schema for teacher form validation
const teacherFormSchema = z.object({
  nip: z.string().min(1, { message: "NIP harus diisi" }),
  nama: z.string().min(1, { message: "Nama harus diisi" }),
  jenisKelamin: z.enum(["L", "P"], {
    required_error: "Jenis kelamin harus dipilih",
  }),
  bidangKeahlian: z.string().min(1, { message: "Bidang keahlian harus diisi" }),
  noTelepon: z.string().min(1, { message: "Nomor telepon harus diisi" }),
  email: z.string().email({ message: "Format email tidak valid" }),
  status: z.enum(["Aktif", "Tidak Aktif"], {
    required_error: "Status harus dipilih",
  }),
});

type TeacherFormValues = z.infer<typeof teacherFormSchema>;

interface Teacher extends TeacherFormValues {
  id: string;
}

interface TeacherManagementProps {
  teachers?: Teacher[];
}

const TeacherManagement = ({ teachers = [] }: TeacherManagementProps) => {
  const [teacherList, setTeacherList] = useState<Teacher[]>(
    teachers.length > 0
      ? teachers
      : [
          {
            id: "1",
            nip: "198501152010011001",
            nama: "Budi Santoso, S.Pd",
            jenisKelamin: "L",
            bidangKeahlian: "Matematika",
            noTelepon: "081234567890",
            email: "budi.santoso@smk.sch.id",
            status: "Aktif",
          },
          {
            id: "2",
            nip: "198703222011012002",
            nama: "Siti Rahayu, M.Pd",
            jenisKelamin: "P",
            bidangKeahlian: "Bahasa Inggris",
            noTelepon: "085678901234",
            email: "siti.rahayu@smk.sch.id",
            status: "Aktif",
          },
          {
            id: "3",
            nip: "199005102012011003",
            nama: "Ahmad Fauzi, S.T",
            jenisKelamin: "L",
            bidangKeahlian: "Teknik Komputer dan Jaringan",
            noTelepon: "087890123456",
            email: "ahmad.fauzi@smk.sch.id",
            status: "Aktif",
          },
        ],
  );

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAvailabilityDialogOpen, setIsAvailabilityDialogOpen] =
    useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const form = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: {
      nip: "",
      nama: "",
      jenisKelamin: "L",
      bidangKeahlian: "",
      noTelepon: "",
      email: "",
      status: "Aktif",
    },
  });

  const handleAddTeacher = (data: TeacherFormValues) => {
    const newTeacher = {
      id: Date.now().toString(),
      ...data,
    };
    setTeacherList([...teacherList, newTeacher]);
    setIsAddDialogOpen(false);
    form.reset();
  };

  const handleEditTeacher = (data: TeacherFormValues) => {
    if (selectedTeacher) {
      const updatedTeachers = teacherList.map((teacher) =>
        teacher.id === selectedTeacher.id ? { ...teacher, ...data } : teacher,
      );
      setTeacherList(updatedTeachers);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteTeacher = () => {
    if (selectedTeacher) {
      const filteredTeachers = teacherList.filter(
        (teacher) => teacher.id !== selectedTeacher.id,
      );
      setTeacherList(filteredTeachers);
      setIsDeleteDialogOpen(false);
      setSelectedTeacher(null);
    }
  };

  const openEditDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    form.reset(teacher);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  const openAvailabilityDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsAvailabilityDialogOpen(true);
  };

  // Mock data for teacher availability
  const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const timeSlots = [
    "07:00 - 07:45",
    "07:45 - 08:30",
    "08:30 - 09:15",
    "09:15 - 10:00",
    "10:15 - 11:00",
    "11:00 - 11:45",
    "11:45 - 12:30",
    "13:00 - 13:45",
    "13:45 - 14:30",
    "14:30 - 15:15",
  ];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Manajemen Data Guru
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Tambah Guru
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tambah Data Guru</DialogTitle>
              <DialogDescription>
                Masukkan informasi guru baru di bawah ini.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAddTeacher)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="nip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIP</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan NIP" {...field} />
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
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jenisKelamin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Kelamin</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="L">Laki-laki</SelectItem>
                          <SelectItem value="P">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bidangKeahlian"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bidang Keahlian</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan bidang keahlian"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="noTelepon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nomor telepon"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Aktif">Aktif</SelectItem>
                          <SelectItem value="Tidak Aktif">
                            Tidak Aktif
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Simpan</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Daftar Guru SMK</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>NIP</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Jenis Kelamin</TableHead>
              <TableHead>Bidang Keahlian</TableHead>
              <TableHead>No. Telepon</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teacherList.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.nip}</TableCell>
                <TableCell>{teacher.nama}</TableCell>
                <TableCell>
                  {teacher.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
                </TableCell>
                <TableCell>{teacher.bidangKeahlian}</TableCell>
                <TableCell>{teacher.noTelepon}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${teacher.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {teacher.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openAvailabilityDialog(teacher)}
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(teacher)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDeleteDialog(teacher)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Teacher Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Data Guru</DialogTitle>
            <DialogDescription>
              Ubah informasi guru di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditTeacher)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="nip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIP</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan NIP" {...field} />
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
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jenisKelamin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Kelamin</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis kelamin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="L">Laki-laki</SelectItem>
                        <SelectItem value="P">Perempuan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bidangKeahlian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bidang Keahlian</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan bidang keahlian"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="noTelepon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nomor telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Simpan Perubahan</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Teacher Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus data guru{" "}
              <span className="font-semibold">{selectedTeacher?.nama}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteTeacher}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Teacher Availability Dialog */}
      <Dialog
        open={isAvailabilityDialogOpen}
        onOpenChange={setIsAvailabilityDialogOpen}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Ketersediaan Waktu Mengajar</DialogTitle>
            <DialogDescription>
              Atur ketersediaan waktu mengajar untuk guru{" "}
              <span className="font-semibold">{selectedTeacher?.nama}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Jam</TableHead>
                  {daysOfWeek.map((day) => (
                    <TableHead key={day}>{day}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((timeSlot, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{timeSlot}</TableCell>
                    {daysOfWeek.map((day) => (
                      <TableCell
                        key={`${day}-${index}`}
                        className="text-center"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          defaultChecked={Math.random() > 0.3} // Random default values for demo
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsAvailabilityDialogOpen(false)}>
              Simpan Ketersediaan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherManagement;
