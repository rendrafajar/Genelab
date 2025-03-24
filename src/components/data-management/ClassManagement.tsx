import React, { useState } from "react";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Nama kelas harus minimal 2 karakter" }),
  grade: z.string({ required_error: "Pilih tingkat kelas" }),
  department: z.string({ required_error: "Pilih jurusan" }),
  capacity: z.coerce
    .number()
    .min(1, { message: "Kapasitas minimal 1 siswa" })
    .max(50, { message: "Kapasitas maksimal 50 siswa" }),
});

type FormValues = z.infer<typeof formSchema>;

type ClassData = {
  id: string;
  name: string;
  grade: string;
  department: string;
  capacity: number;
};

interface ClassManagementProps {
  initialData?: ClassData[];
}

const ClassManagement = ({ initialData = [] }: ClassManagementProps) => {
  const [classes, setClasses] = useState<ClassData[]>(
    initialData.length > 0
      ? initialData
      : [
          {
            id: "1",
            name: "X RPL A",
            grade: "X",
            department: "Rekayasa Perangkat Lunak",
            capacity: 36,
          },
          {
            id: "2",
            name: "XI TKJ B",
            grade: "XI",
            department: "Teknik Komputer dan Jaringan",
            capacity: 32,
          },
          {
            id: "3",
            name: "XII MM C",
            grade: "XII",
            department: "Multimedia",
            capacity: 30,
          },
        ],
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassData | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      grade: "",
      department: "",
      capacity: 30,
    },
  });

  const onSubmit = (data: FormValues) => {
    if (editingClass) {
      // Update existing class
      setClasses(
        classes.map((cls) =>
          cls.id === editingClass.id ? { ...cls, ...data } : cls,
        ),
      );
    } else {
      // Add new class
      const newClass = {
        id: Date.now().toString(),
        ...data,
      };
      setClasses([...classes, newClass]);
    }

    setIsDialogOpen(false);
    setEditingClass(null);
    form.reset();
  };

  const handleEdit = (classData: ClassData) => {
    setEditingClass(classData);
    form.reset({
      name: classData.name,
      grade: classData.grade,
      department: classData.department,
      capacity: classData.capacity,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setClasses(classes.filter((cls) => cls.id !== id));
  };

  const handleAddNew = () => {
    setEditingClass(null);
    form.reset({
      name: "",
      grade: "",
      department: "",
      capacity: 30,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Kelas</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Kelas
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingClass ? "Edit Kelas" : "Tambah Kelas Baru"}
              </DialogTitle>
              <DialogDescription>
                {editingClass
                  ? "Ubah informasi kelas yang sudah ada"
                  : "Tambahkan kelas baru ke dalam sistem"}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Kelas</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: X RPL A" {...field} />
                      </FormControl>
                      <FormDescription>
                        Masukkan nama kelas dengan format tingkat, jurusan, dan
                        rombel
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="grade"
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
                            <SelectItem value="X">X (Sepuluh)</SelectItem>
                            <SelectItem value="XI">XI (Sebelas)</SelectItem>
                            <SelectItem value="XII">XII (Dua Belas)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kapasitas</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" max="50" {...field} />
                        </FormControl>
                        <FormDescription>Jumlah maksimal siswa</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="department"
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
                          <SelectItem value="Rekayasa Perangkat Lunak">
                            Rekayasa Perangkat Lunak (RPL)
                          </SelectItem>
                          <SelectItem value="Teknik Komputer dan Jaringan">
                            Teknik Komputer dan Jaringan (TKJ)
                          </SelectItem>
                          <SelectItem value="Multimedia">
                            Multimedia (MM)
                          </SelectItem>
                          <SelectItem value="Akuntansi">
                            Akuntansi (AK)
                          </SelectItem>
                          <SelectItem value="Administrasi Perkantoran">
                            Administrasi Perkantoran (AP)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">
                    {editingClass ? "Simpan Perubahan" : "Tambah Kelas"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableCaption>Daftar kelas yang tersedia di sistem</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Kelas</TableHead>
              <TableHead>Tingkat</TableHead>
              <TableHead>Jurusan</TableHead>
              <TableHead>Kapasitas</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.map((cls) => (
              <TableRow key={cls.id}>
                <TableCell className="font-medium">{cls.name}</TableCell>
                <TableCell>{cls.grade}</TableCell>
                <TableCell>{cls.department}</TableCell>
                <TableCell>{cls.capacity} siswa</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(cls)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(cls.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClassManagement;
