import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Plus, Trash2 } from "lucide-react";

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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const formSchema = z.object({
  teacherId: z.string({
    required_error: "Silahkan pilih guru",
  }),
  availabilityConstraints: z.array(
    z.object({
      day: z.string(),
      timeSlots: z.array(z.string()),
    }),
  ),
  preferredDays: z.array(z.string()).optional(),
  preferredTimeSlots: z.array(z.string()).optional(),
  maxHoursPerDay: z.string().optional(),
  consecutiveHours: z.string().optional(),
});

interface TeacherConstraintsProps {
  teachers?: Array<{ id: string; name: string }>;
  days?: Array<{ id: string; name: string }>;
  timeSlots?: Array<{ id: string; startTime: string; endTime: string }>;
  onSave?: (data: z.infer<typeof formSchema>) => void;
}

const TeacherConstraints: React.FC<TeacherConstraintsProps> = ({
  teachers = [
    { id: "1", name: "Budi Santoso" },
    { id: "2", name: "Siti Rahayu" },
    { id: "3", name: "Ahmad Wijaya" },
  ],
  days = [
    { id: "1", name: "Senin" },
    { id: "2", name: "Selasa" },
    { id: "3", name: "Rabu" },
    { id: "4", name: "Kamis" },
    { id: "5", name: "Jumat" },
  ],
  timeSlots = [
    { id: "1", startTime: "07:00", endTime: "07:45" },
    { id: "2", startTime: "07:45", endTime: "08:30" },
    { id: "3", startTime: "08:30", endTime: "09:15" },
    { id: "4", startTime: "09:15", endTime: "10:00" },
    { id: "5", startTime: "10:15", endTime: "11:00" },
    { id: "6", startTime: "11:00", endTime: "11:45" },
    { id: "7", startTime: "12:30", endTime: "13:15" },
    { id: "8", startTime: "13:15", endTime: "14:00" },
  ],
  onSave = () => {},
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherId: "",
      availabilityConstraints: days.map((day) => ({
        day: day.id,
        timeSlots: [],
      })),
      preferredDays: [],
      preferredTimeSlots: [],
      maxHoursPerDay: "6",
      consecutiveHours: "4",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSave(data);
    console.log("Form data submitted:", data);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Batasan dan Preferensi Guru</h2>
            <p className="text-gray-500">
              Atur ketersediaan dan preferensi waktu mengajar untuk guru
            </p>
          </div>

          <FormField
            control={form.control}
            name="teacherId"
            render={({ field }) => (
              <FormItem className="w-full md:w-1/2">
                <FormLabel>Pilih Guru</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih guru" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Pilih guru untuk mengatur batasan jadwal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Card>
            <CardHeader>
              <CardTitle>Ketersediaan Waktu</CardTitle>
              <CardDescription>
                Pilih slot waktu yang tersedia untuk mengajar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {days.map((day, dayIndex) => (
                  <div key={day.id} className="border p-4 rounded-md">
                    <h3 className="font-medium mb-3">{day.name}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => {
                        const slotId = `${day.id}-${slot.id}`;
                        return (
                          <div
                            key={slotId}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={slotId}
                              checked={form
                                .getValues()
                                .availabilityConstraints[
                                  dayIndex
                                ].timeSlots.includes(slot.id)}
                              onCheckedChange={(checked) => {
                                const currentConstraints = [
                                  ...form.getValues().availabilityConstraints,
                                ];
                                if (checked) {
                                  currentConstraints[dayIndex].timeSlots.push(
                                    slot.id,
                                  );
                                } else {
                                  currentConstraints[dayIndex].timeSlots =
                                    currentConstraints[
                                      dayIndex
                                    ].timeSlots.filter((id) => id !== slot.id);
                                }
                                form.setValue(
                                  "availabilityConstraints",
                                  currentConstraints,
                                  { shouldDirty: true, shouldTouch: true },
                                );
                              }}
                            />
                            <label
                              htmlFor={slotId}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {slot.startTime} - {slot.endTime}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferensi Mengajar</CardTitle>
              <CardDescription>
                Atur preferensi hari dan jam mengajar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Hari Preferensi</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {days.map((day) => (
                      <div key={day.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`pref-day-${day.id}`}
                          checked={form
                            .getValues()
                            .preferredDays?.includes(day.id)}
                          onCheckedChange={(checked) => {
                            const currentPreferredDays =
                              form.getValues().preferredDays || [];
                            if (checked) {
                              form.setValue("preferredDays", [
                                ...currentPreferredDays,
                                day.id,
                              ]);
                            } else {
                              form.setValue(
                                "preferredDays",
                                currentPreferredDays.filter(
                                  (id) => id !== day.id,
                                ),
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`pref-day-${day.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Jam Preferensi</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`pref-slot-${slot.id}`}
                          checked={form
                            .getValues()
                            .preferredTimeSlots?.includes(slot.id)}
                          onCheckedChange={(checked) => {
                            const currentPreferredSlots =
                              form.getValues().preferredTimeSlots || [];
                            if (checked) {
                              form.setValue("preferredTimeSlots", [
                                ...currentPreferredSlots,
                                slot.id,
                              ]);
                            } else {
                              form.setValue(
                                "preferredTimeSlots",
                                currentPreferredSlots.filter(
                                  (id) => id !== slot.id,
                                ),
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`pref-slot-${slot.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {slot.startTime} - {slot.endTime}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Batasan Tambahan</CardTitle>
              <CardDescription>
                Atur batasan jam mengajar per hari
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="maxHoursPerDay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maksimal Jam Per Hari</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih maksimal jam" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[2, 3, 4, 5, 6, 7, 8].map((hours) => (
                            <SelectItem key={hours} value={hours.toString()}>
                              {hours} jam
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Jumlah maksimal jam mengajar dalam satu hari
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="consecutiveHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maksimal Jam Berturut-turut</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih maksimal jam berturut-turut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[2, 3, 4, 5, 6].map((hours) => (
                            <SelectItem key={hours} value={hours.toString()}>
                              {hours} jam
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Jumlah maksimal jam mengajar berturut-turut tanpa jeda
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Simpan Batasan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TeacherConstraints;
