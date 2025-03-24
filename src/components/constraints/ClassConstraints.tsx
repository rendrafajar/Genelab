import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Clock, Save } from "lucide-react";

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
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  classId: z.string({
    required_error: "Silahkan pilih kelas",
  }),
  maxDailyHours: z.string(),
  preferredStartTime: z.string(),
  avoidConsecutiveSubjects: z.boolean().default(false),
  avoidDays: z.array(z.string()).default([]),
  preferredDays: z.array(z.string()).default([]),
  specialRequirements: z.string().optional(),
});

interface ClassConstraintsProps {
  classes?: {
    id: string;
    name: string;
    department: string;
  }[];
  onSave?: (data: z.infer<typeof formSchema>) => void;
}

const ClassConstraints = ({
  classes = [
    { id: "1", name: "X RPL 1", department: "Rekayasa Perangkat Lunak" },
    { id: "2", name: "X TKJ 1", department: "Teknik Komputer dan Jaringan" },
    { id: "3", name: "XI MM 1", department: "Multimedia" },
    {
      id: "4",
      name: "XII AKL 1",
      department: "Akuntansi dan Keuangan Lembaga",
    },
  ],
  onSave = () => {},
}: ClassConstraintsProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      maxDailyHours: "8",
      preferredStartTime: "07:00",
      avoidConsecutiveSubjects: false,
      avoidDays: [],
      preferredDays: [],
      specialRequirements: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSave(data);
    // Dalam implementasi nyata, di sini akan ada kode untuk menyimpan data ke backend
    console.log("Form data submitted:", data);
  };

  const daysOfWeek = [
    { id: "monday", label: "Senin" },
    { id: "tuesday", label: "Selasa" },
    { id: "wednesday", label: "Rabu" },
    { id: "thursday", label: "Kamis" },
    { id: "friday", label: "Jumat" },
    { id: "saturday", label: "Sabtu" },
  ];

  const timeSlots = [
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
  ];

  const maxHoursOptions = ["6", "7", "8", "9", "10"];

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Batasan Jadwal Kelas</CardTitle>
        <CardDescription>
          Atur preferensi dan batasan jadwal untuk kelas tertentu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelas</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classes.map((classItem) => (
                        <SelectItem key={classItem.id} value={classItem.id}>
                          {classItem.name} - {classItem.department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Pilih kelas untuk mengatur batasan jadwal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="maxDailyHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maksimum Jam Pelajaran per Hari</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih maksimum jam" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {maxHoursOptions.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour} jam
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Jumlah maksimum jam pelajaran dalam satu hari
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredStartTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu Mulai yang Diinginkan</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih waktu mulai" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Waktu ideal untuk memulai pelajaran
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="avoidConsecutiveSubjects"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Hindari Mata Pelajaran Berurutan yang Sama
                    </FormLabel>
                    <FormDescription>
                      Jangan jadwalkan mata pelajaran yang sama secara berurutan
                      dalam satu hari
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="avoidDays"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Hari yang Dihindari</FormLabel>
                      <FormDescription>
                        Pilih hari yang sebaiknya tidak ada jadwal untuk kelas
                        ini
                      </FormDescription>
                    </div>
                    {daysOfWeek.map((day) => (
                      <FormField
                        key={day.id}
                        control={form.control}
                        name="avoidDays"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={day.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(day.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, day.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== day.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {day.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredDays"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Hari yang Diutamakan</FormLabel>
                      <FormDescription>
                        Pilih hari yang diutamakan untuk jadwal kelas ini
                      </FormDescription>
                    </div>
                    {daysOfWeek.map((day) => (
                      <FormField
                        key={day.id}
                        control={form.control}
                        name="preferredDays"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={day.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(day.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, day.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== day.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {day.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Simpan Batasan
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ClassConstraints;
