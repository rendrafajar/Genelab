import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, UserIcon, X } from "lucide-react";

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

// Definisi skema validasi form
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Nama harus minimal 2 karakter" }),
  username: z.string().min(3, { message: "Username harus minimal 3 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password harus minimal 6 karakter" }),
  role: z.enum(["admin", "user", "viewer"], {
    required_error: "Silakan pilih role pengguna",
  }),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  user?: UserFormValues;
  onSubmit: (data: UserFormValues) => void;
  onCancel: () => void;
}

const UserForm = ({
  user = {
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  },
  onSubmit = () => {},
  onCancel = () => {},
}: UserFormProps) => {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: user,
  });

  const handleSubmit = (data: UserFormValues) => {
    onSubmit(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2 text-primary" />
          <h2 className="text-xl font-semibold">
            {user.username ? "Edit Pengguna" : "Tambah Pengguna"}
          </h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="rounded-full hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan username" {...field} />
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
                  <Input
                    type="email"
                    placeholder="contoh@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {user.username ? "Ubah Password" : "Password"}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Masukkan password"
                    {...field}
                  />
                </FormControl>
                {user.username && (
                  <FormDescription>
                    Biarkan kosong jika tidak ingin mengubah password
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih role pengguna" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Admin: Akses penuh ke semua fitur
                  <br />
                  User: Dapat input data dan generate jadwal
                  <br />
                  Viewer: Hanya dapat melihat jadwal
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
            <Button type="submit">
              {user.username ? "Perbarui" : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
