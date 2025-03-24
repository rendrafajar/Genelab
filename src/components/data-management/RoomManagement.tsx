import React, { useState } from "react";
import { PlusCircle, Pencil, Trash2, Search } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Define form schema for room data validation
const roomFormSchema = z.object({
  roomName: z.string().min(2, { message: "Nama ruangan harus diisi" }),
  roomCode: z.string().min(1, { message: "Kode ruangan harus diisi" }),
  capacity: z.string().min(1, { message: "Kapasitas harus diisi" }),
  roomType: z.string({
    required_error: "Silakan pilih tipe ruangan",
  }),
  facilities: z.array(z.string()).optional(),
  isAvailable: z.boolean().default(true),
});

type RoomFormValues = z.infer<typeof roomFormSchema>;

// Mock data for rooms
const defaultRooms = [
  {
    id: "1",
    roomName: "Laboratorium Komputer 1",
    roomCode: "LAB-KOM-1",
    capacity: "30",
    roomType: "praktikum",
    facilities: ["Komputer", "Proyektor", "AC"],
    isAvailable: true,
  },
  {
    id: "2",
    roomName: "Ruang Teori 101",
    roomCode: "R-101",
    capacity: "40",
    roomType: "teori",
    facilities: ["Proyektor", "Papan Tulis"],
    isAvailable: true,
  },
  {
    id: "3",
    roomName: "Laboratorium Jaringan",
    roomCode: "LAB-NET",
    capacity: "25",
    roomType: "praktikum",
    facilities: ["Komputer", "Peralatan Jaringan", "AC"],
    isAvailable: true,
  },
  {
    id: "4",
    roomName: "Ruang Teori 102",
    roomCode: "R-102",
    capacity: "35",
    roomType: "teori",
    facilities: ["Proyektor", "Papan Tulis", "AC"],
    isAvailable: false,
  },
];

// Mock data for facilities
const facilityOptions = [
  { id: "komputer", label: "Komputer" },
  { id: "proyektor", label: "Proyektor" },
  { id: "ac", label: "AC" },
  { id: "papan-tulis", label: "Papan Tulis" },
  { id: "peralatan-jaringan", label: "Peralatan Jaringan" },
  { id: "sound-system", label: "Sound System" },
];

interface RoomManagementProps {
  initialRooms?: typeof defaultRooms;
}

const RoomManagement = ({
  initialRooms = defaultRooms,
}: RoomManagementProps) => {
  const [rooms, setRooms] = useState(initialRooms);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<(typeof rooms)[0] | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize form
  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      roomName: "",
      roomCode: "",
      capacity: "",
      roomType: "",
      facilities: [],
      isAvailable: true,
    },
  });

  // Filter rooms based on search query
  const filteredRooms = rooms.filter(
    (room) =>
      room.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.roomCode.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle form submission
  const onSubmit = (data: RoomFormValues) => {
    if (editingRoom) {
      // Update existing room
      setRooms(
        rooms.map((room) =>
          room.id === editingRoom.id ? { ...room, ...data } : room,
        ),
      );
    } else {
      // Add new room
      const newRoom = {
        id: (rooms.length + 1).toString(),
        ...data,
      };
      setRooms([...rooms, newRoom]);
    }

    // Reset form and close dialog
    form.reset();
    setIsDialogOpen(false);
    setEditingRoom(null);
  };

  // Handle edit room
  const handleEditRoom = (room: (typeof rooms)[0]) => {
    setEditingRoom(room);
    form.reset({
      roomName: room.roomName,
      roomCode: room.roomCode,
      capacity: room.capacity,
      roomType: room.roomType,
      facilities: room.facilities,
      isAvailable: room.isAvailable,
    });
    setIsDialogOpen(true);
  };

  // Handle delete room
  const handleDeleteRoom = (roomId: string) => {
    setRooms(rooms.filter((room) => room.id !== roomId));
  };

  // Handle dialog open
  const handleDialogOpen = () => {
    form.reset({
      roomName: "",
      roomCode: "",
      capacity: "",
      roomType: "",
      facilities: [],
      isAvailable: true,
    });
    setEditingRoom(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manajemen Ruangan</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleDialogOpen}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Ruangan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>
                {editingRoom ? "Edit Ruangan" : "Tambah Ruangan Baru"}
              </DialogTitle>
              <DialogDescription>
                {editingRoom
                  ? "Ubah informasi ruangan di bawah ini."
                  : "Isi detail ruangan baru di bawah ini."}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="roomName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Ruangan</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan nama ruangan"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roomCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kode Ruangan</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan kode ruangan"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kapasitas</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukkan kapasitas ruangan"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="roomType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipe Ruangan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih tipe ruangan" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="teori">Ruang Teori</SelectItem>
                            <SelectItem value="praktikum">
                              Ruang Praktikum
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="facilities"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Fasilitas</FormLabel>
                        <FormDescription>
                          Pilih fasilitas yang tersedia di ruangan ini
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {facilityOptions.map((facility) => (
                          <FormField
                            key={facility.id}
                            control={form.control}
                            name="facilities"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={facility.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        facility.label,
                                      )}
                                      onCheckedChange={(checked) => {
                                        const currentValues = field.value || [];
                                        return checked
                                          ? field.onChange([
                                              ...currentValues,
                                              facility.label,
                                            ])
                                          : field.onChange(
                                              currentValues.filter(
                                                (value) =>
                                                  value !== facility.label,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {facility.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isAvailable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Tersedia</FormLabel>
                        <FormDescription>
                          Centang jika ruangan tersedia untuk digunakan
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button type="submit">
                    {editingRoom ? "Perbarui" : "Simpan"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari ruangan..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Table>
        <TableCaption>Daftar ruangan yang tersedia di sekolah</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nama Ruangan</TableHead>
            <TableHead>Kode</TableHead>
            <TableHead>Kapasitas</TableHead>
            <TableHead>Tipe</TableHead>
            <TableHead>Fasilitas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRooms.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                Tidak ada data ruangan yang ditemukan
              </TableCell>
            </TableRow>
          ) : (
            filteredRooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell className="font-medium">{room.roomName}</TableCell>
                <TableCell>{room.roomCode}</TableCell>
                <TableCell>{room.capacity}</TableCell>
                <TableCell>
                  {room.roomType === "teori"
                    ? "Ruang Teori"
                    : "Ruang Praktikum"}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {room.facilities?.map((facility, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      room.isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {room.isAvailable ? "Tersedia" : "Tidak Tersedia"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditRoom(room)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteRoom(room.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RoomManagement;
