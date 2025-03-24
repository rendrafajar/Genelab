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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  subject: z.string({
    required_error: "Silahkan pilih mata pelajaran",
  }),
  preferredDays: z.array(z.string()).optional(),
  preferredTimeSlots: z.array(z.string()).optional(),
  avoidDays: z.array(z.string()).optional(),
  avoidTimeSlots: z.array(z.string()).optional(),
  consecutivePeriods: z.number().min(1).max(4).optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const SubjectConstraints = () => {
  const days = [
    { id: "monday", label: "Senin" },
    { id: "tuesday", label: "Selasa" },
    { id: "wednesday", label: "Rabu" },
    { id: "thursday", label: "Kamis" },
    { id: "friday", label: "Jumat" },
    { id: "saturday", label: "Sabtu" },
  ];

  const timeSlots = [
    { id: "1", label: "07:00 - 07:45" },
    { id: "2", label: "07:45 - 08:30" },
    { id: "3", label: "08:30 - 09:15" },
    { id: "4", label: "09:15 - 10:00" },
    { id: "5", label: "10:15 - 11:00" },
    { id: "6", label: "11:00 - 11:45" },
    { id: "7", label: "12:30 - 13:15" },
    { id: "8", label: "13:15 - 14:00" },
    { id: "9", label: "14:00 - 14:45" },
    { id: "10", label: "14:45 - 15:30" },
  ];

  const subjects = [
    { id: "math", name: "Matematika" },
    { id: "physics", name: "Fisika" },
    { id: "chemistry", name: "Kimia" },
    { id: "biology", name: "Biologi" },
    { id: "indonesian", name: "Bahasa Indonesia" },
    { id: "english", name: "Bahasa Inggris" },
    { id: "history", name: "Sejarah" },
    { id: "geography", name: "Geografi" },
    { id: "civics", name: "PKN" },
    { id: "religion", name: "Pendidikan Agama" },
    { id: "pe", name: "Pendidikan Jasmani" },
    { id: "art", name: "Seni Budaya" },
    { id: "programming", name: "Pemrograman" },
    { id: "networking", name: "Jaringan Komputer" },
    { id: "database", name: "Basis Data" },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      preferredDays: [],
      preferredTimeSlots: [],
      avoidDays: [],
      avoidTimeSlots: [],
      consecutivePeriods: 1,
      notes: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Implementasi penyimpanan data batasan mata pelajaran
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <Card>
        <CardHeader>
          <CardTitle>Batasan Mata Pelajaran</CardTitle>
          <CardDescription>
            Atur preferensi waktu untuk mata pelajaran tertentu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mata Pelajaran</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih mata pelajaran" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Pilih mata pelajaran yang akan diatur batasannya
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Preferensi Hari</h3>
                  <div className="border rounded-md p-4">
                    {days.map((day) => (
                      <div
                        key={day.id}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`preferred-day-${day.id}`}
                          onCheckedChange={(checked) => {
                            const currentValues =
                              form.getValues("preferredDays") || [];
                            const newValues = checked
                              ? [...currentValues, day.id]
                              : currentValues.filter(
                                  (value) => value !== day.id,
                                );
                            form.setValue("preferredDays", newValues, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        <label
                          htmlFor={`preferred-day-${day.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Hindari Hari</h3>
                  <div className="border rounded-md p-4">
                    {days.map((day) => (
                      <div
                        key={day.id}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`avoid-day-${day.id}`}
                          onCheckedChange={(checked) => {
                            const currentValues =
                              form.getValues("avoidDays") || [];
                            const newValues = checked
                              ? [...currentValues, day.id]
                              : currentValues.filter(
                                  (value) => value !== day.id,
                                );
                            form.setValue("avoidDays", newValues, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        <label
                          htmlFor={`avoid-day-${day.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {day.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Preferensi Jam</h3>
                  <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`preferred-slot-${slot.id}`}
                          onCheckedChange={(checked) => {
                            const currentValues =
                              form.getValues("preferredTimeSlots") || [];
                            const newValues = checked
                              ? [...currentValues, slot.id]
                              : currentValues.filter(
                                  (value) => value !== slot.id,
                                );
                            form.setValue("preferredTimeSlots", newValues, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        <label
                          htmlFor={`preferred-slot-${slot.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {slot.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Hindari Jam</h3>
                  <div className="border rounded-md p-4 max-h-60 overflow-y-auto">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <Checkbox
                          id={`avoid-slot-${slot.id}`}
                          onCheckedChange={(checked) => {
                            const currentValues =
                              form.getValues("avoidTimeSlots") || [];
                            const newValues = checked
                              ? [...currentValues, slot.id]
                              : currentValues.filter(
                                  (value) => value !== slot.id,
                                );
                            form.setValue("avoidTimeSlots", newValues, {
                              shouldValidate: true,
                            });
                          }}
                        />
                        <label
                          htmlFor={`avoid-slot-${slot.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {slot.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="consecutivePeriods"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Jam Berurutan</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min={1}
                          max={4}
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          className="w-20"
                        />
                        <span className="text-sm text-muted-foreground">
                          jam pelajaran
                        </span>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Jumlah jam pelajaran berurutan yang diinginkan (1-4)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catatan Tambahan</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tambahkan catatan khusus untuk mata pelajaran ini"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Catatan khusus untuk pertimbangan penjadwalan
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="px-0 flex justify-between">
                <Button type="button" variant="outline">
                  Reset
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" /> Simpan Batasan
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubjectConstraints;
