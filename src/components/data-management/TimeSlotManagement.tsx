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

// Define the schema for time slot form validation
const timeSlotFormSchema = z.object({
  name: z.string().min(1, { message: "Nama slot waktu harus diisi" }),
  startTime: z.string().min(1, { message: "Waktu mulai harus diisi" }),
  endTime: z.string().min(1, { message: "Waktu selesai harus diisi" }),
  day: z.string().min(1, { message: "Hari harus dipilih" }),
  type: z.string().min(1, { message: "Tipe slot harus dipilih" }),
});

type TimeSlotFormValues = z.infer<typeof timeSlotFormSchema>;

interface TimeSlot {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  day: string;
  type: string;
}

interface TimeSlotManagementProps {
  timeSlots?: TimeSlot[];
  onAddTimeSlot?: (timeSlot: Omit<TimeSlot, "id">) => void;
  onUpdateTimeSlot?: (id: string, timeSlot: Omit<TimeSlot, "id">) => void;
  onDeleteTimeSlot?: (id: string) => void;
}

const TimeSlotManagement = ({
  timeSlots = [
    {
      id: "1",
      name: "Jam 1",
      startTime: "07:00",
      endTime: "07:45",
      day: "Senin",
      type: "Reguler",
    },
    {
      id: "2",
      name: "Jam 2",
      startTime: "07:45",
      endTime: "08:30",
      day: "Senin",
      type: "Reguler",
    },
    {
      id: "3",
      name: "Istirahat 1",
      startTime: "09:15",
      endTime: "09:30",
      day: "Senin",
      type: "Istirahat",
    },
  ],
  onAddTimeSlot = () => {},
  onUpdateTimeSlot = () => {},
  onDeleteTimeSlot = () => {},
}: TimeSlotManagementProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null,
  );

  const addForm = useForm<TimeSlotFormValues>({
    resolver: zodResolver(timeSlotFormSchema),
    defaultValues: {
      name: "",
      startTime: "",
      endTime: "",
      day: "",
      type: "",
    },
  });

  const editForm = useForm<TimeSlotFormValues>({
    resolver: zodResolver(timeSlotFormSchema),
    defaultValues: {
      name: "",
      startTime: "",
      endTime: "",
      day: "",
      type: "",
    },
  });

  const handleAddSubmit = (data: TimeSlotFormValues) => {
    onAddTimeSlot(data);
    addForm.reset();
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (data: TimeSlotFormValues) => {
    if (selectedTimeSlot) {
      onUpdateTimeSlot(selectedTimeSlot.id, data);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedTimeSlot) {
      onDeleteTimeSlot(selectedTimeSlot.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    editForm.reset({
      name: timeSlot.name,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
      day: timeSlot.day,
      type: timeSlot.type,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setIsDeleteDialogOpen(true);
  };

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const slotTypes = ["Reguler", "Istirahat", "Upacara", "Ekstrakulikuler"];

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Slot Waktu</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Tambah Slot Waktu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Slot Waktu Baru</DialogTitle>
              <DialogDescription>
                Isi detail slot waktu yang akan ditambahkan ke dalam sistem.
              </DialogDescription>
            </DialogHeader>
            <Form {...addForm}>
              <form
                onSubmit={addForm.handleSubmit(handleAddSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Slot</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contoh: Jam 1, Istirahat 1"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Masukkan nama untuk slot waktu ini.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addForm.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Waktu Mulai</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="endTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Waktu Selesai</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={addForm.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hari</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih hari" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day} value={day}>
                              {day}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipe Slot</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tipe slot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {slotTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
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

      <Table>
        <TableCaption>
          Daftar slot waktu yang tersedia dalam sistem.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Hari</TableHead>
            <TableHead>Waktu Mulai</TableHead>
            <TableHead>Waktu Selesai</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((slot) => (
            <TableRow key={slot.id}>
              <TableCell className="font-medium">{slot.name}</TableCell>
              <TableCell>{slot.day}</TableCell>
              <TableCell>{slot.startTime}</TableCell>
              <TableCell>{slot.endTime}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${slot.type === "Reguler" ? "bg-blue-100 text-blue-800" : slot.type === "Istirahat" ? "bg-green-100 text-green-800" : slot.type === "Upacara" ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800"}`}
                >
                  {slot.type}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(slot)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => openDeleteDialog(slot)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Slot Waktu</DialogTitle>
            <DialogDescription>
              Ubah detail slot waktu yang sudah ada.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(handleEditSubmit)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Slot</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Jam 1, Istirahat 1"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Masukkan nama untuk slot waktu ini.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu Mulai</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waktu Selesai</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editForm.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hari</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih hari" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Slot</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tipe slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {slotTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus slot waktu "
              {selectedTimeSlot?.name}"? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimeSlotManagement;
