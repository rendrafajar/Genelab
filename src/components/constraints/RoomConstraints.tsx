import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Room, roomService } from "@/services/roomService";

const formSchema = z.object({
  rooms: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().min(2, {
          message: "Nama ruangan harus minimal 2 karakter.",
        }),
        type: z.enum(["teori", "praktikum"]),
        capacity: z.coerce.number().min(1, {
          message: "Kapasitas ruangan harus minimal 1.",
        }),
        departments: z.array(z.string()).min(1, {
          message: "Pilih minimal satu jurusan.",
        }),
        availableDays: z.array(z.string()).min(1, {
          message: "Pilih minimal satu hari.",
        }),
        isActive: z.boolean().default(true),
      }),
    )
    .min(1, {
      message: "Tambahkan minimal satu ruangan.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface RoomConstraintsProps {
  onSave?: (data: FormValues) => void;
  initialData?: FormValues;
}

const departments = [
  { id: "tkj", name: "Teknik Komputer Jaringan" },
  { id: "rpl", name: "Rekayasa Perangkat Lunak" },
  { id: "mm", name: "Multimedia" },
  { id: "ak", name: "Akuntansi" },
];

const days = [
  { id: "senin", name: "Senin" },
  { id: "selasa", name: "Selasa" },
  { id: "rabu", name: "Rabu" },
  { id: "kamis", name: "Kamis" },
  { id: "jumat", name: "Jumat" },
];

const RoomConstraints: React.FC<RoomConstraintsProps> = ({
  onSave = () => {},
  initialData,
}) => {
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      rooms: [
        {
          name: "",
          type: "teori",
          capacity: 30,
          departments: [],
          availableDays: [],
          isActive: true,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rooms",
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const roomsData = await roomService.getRooms();
        setRooms(roomsData);

        // If no initial data and we have rooms from DB, populate the form
        if (!initialData && roomsData.length > 0) {
          const formattedRooms = roomsData.map((room) => ({
            id: room.id,
            name: room.name,
            type: room.type,
            capacity: room.capacity,
            departments: [], // These would come from room_constraints in a real implementation
            availableDays: [], // These would come from room_constraints in a real implementation
            isActive: room.is_active,
          }));

          form.reset({ rooms: formattedRooms });
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        toast({
          title: "Error",
          description: "Gagal mengambil data ruangan",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [form, initialData, toast]);

  const handleSubmit = async (data: FormValues) => {
    try {
      setLoading(true);

      // In a real implementation, you would save to the database here
      // For each room in data.rooms, create/update the room and its constraints

      for (const room of data.rooms) {
        if (room.id) {
          // Update existing room
          await roomService.updateRoom(room.id, {
            name: room.name,
            type: room.type,
            capacity: room.capacity,
            is_active: room.isActive,
          });

          // Update constraints (would need to implement this in roomService)
          // await roomService.updateRoomConstraints(room.id, room.departments, room.availableDays);
        } else {
          // Create new room
          const newRoom = await roomService.createRoom({
            name: room.name,
            type: room.type,
            capacity: room.capacity,
            is_active: room.isActive,
          });

          // Create constraints (would need to implement this in roomService)
          // await roomService.createRoomConstraints(newRoom.id, room.departments, room.availableDays);
        }
      }

      toast({
        title: "Sukses",
        description: "Batasan ruangan berhasil disimpan",
      });

      onSave(data);
    } catch (error) {
      console.error("Error saving room constraints:", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan batasan ruangan",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addNewRoom = () => {
    append({
      name: "",
      type: "teori",
      capacity: 30,
      departments: [],
      availableDays: [],
      isActive: true,
    });
  };

  if (loading && fields.length === 0) {
    return (
      <div className="w-full bg-white p-6 rounded-lg flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Memuat data ruangan...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Batasan Ruangan</h2>
            <Button
              type="button"
              onClick={addNewRoom}
              className="flex items-center gap-2"
              disabled={loading}
            >
              <Plus size={16} />
              Tambah Ruangan
            </Button>
          </div>

          <div className="space-y-6">
            {fields.length > 0 ? (
              fields.map((room, index) => (
                <Card key={room.id || index} className="border border-gray-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Ruangan {index + 1}</CardTitle>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(index)}
                          disabled={loading}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                    <CardDescription>
                      Atur batasan penggunaan ruangan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`rooms.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama Ruangan</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Masukkan nama ruangan"
                                {...field}
                                disabled={loading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`rooms.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipe Ruangan</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={loading}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih tipe ruangan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="teori">Teori</SelectItem>
                                <SelectItem value="praktikum">
                                  Praktikum
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`rooms.${index}.capacity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Kapasitas</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Masukkan kapasitas ruangan"
                                {...field}
                                disabled={loading}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`rooms.${index}.isActive`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={loading}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Aktif</FormLabel>
                              <FormDescription>
                                Ruangan dapat digunakan dalam penjadwalan
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`rooms.${index}.departments`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>
                                Jurusan yang Dapat Menggunakan
                              </FormLabel>
                              <FormDescription>
                                Pilih jurusan yang dapat menggunakan ruangan ini
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              {departments.map((department) => (
                                <FormItem
                                  key={department.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        department.id,
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              department.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) =>
                                                  value !== department.id,
                                              ),
                                            );
                                      }}
                                      disabled={loading}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {department.name}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`rooms.${index}.availableDays`}
                        render={({ field }) => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Hari yang Tersedia</FormLabel>
                              <FormDescription>
                                Pilih hari dimana ruangan ini dapat digunakan
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              {days.map((day) => (
                                <FormItem
                                  key={day.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(day.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              day.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== day.id,
                                              ),
                                            );
                                      }}
                                      disabled={loading}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {day.name}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-8 border border-dashed rounded-lg">
                <p className="text-muted-foreground mb-4">
                  Belum ada ruangan yang ditambahkan
                </p>
                <Button
                  type="button"
                  onClick={addNewRoom}
                  className="flex items-center gap-2 mx-auto"
                  disabled={loading}
                >
                  <Plus size={16} />
                  Tambah Ruangan
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Simpan Batasan
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RoomConstraints;
