import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
  lastLogin?: string;
  status: "active" | "inactive";
}

interface UserTableProps {
  users?: User[];
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
  onAdd?: () => void;
}

const UserTable = ({
  users = [
    {
      id: "1",
      name: "Admin Utama",
      email: "admin@smk.edu",
      role: "admin",
      lastLogin: "2023-06-15 08:30",
      status: "active",
    },
    {
      id: "2",
      name: "Budi Santoso",
      email: "budi@smk.edu",
      role: "user",
      lastLogin: "2023-06-14 10:15",
      status: "active",
    },
    {
      id: "3",
      name: "Dewi Lestari",
      email: "dewi@smk.edu",
      role: "user",
      lastLogin: "2023-06-13 14:45",
      status: "active",
    },
    {
      id: "4",
      name: "Eko Prasetyo",
      email: "eko@smk.edu",
      role: "viewer",
      lastLogin: "2023-06-10 09:20",
      status: "inactive",
    },
    {
      id: "5",
      name: "Fitri Handayani",
      email: "fitri@smk.edu",
      role: "viewer",
      lastLogin: "2023-06-12 11:30",
      status: "active",
    },
  ],
  onEdit = () => {},
  onDelete = () => {},
  onAdd = () => {},
}: UserTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      onDelete(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const getRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-blue-500">Admin</Badge>;
      case "user":
        return <Badge className="bg-green-500">User</Badge>;
      case "viewer":
        return <Badge className="bg-gray-500">Viewer</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500">Aktif</Badge>;
      case "inactive":
        return (
          <Badge variant="outline" className="text-gray-500">
            Tidak Aktif
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manajemen Pengguna</h2>
        <Button onClick={onAdd} className="flex items-center gap-2">
          <UserPlus size={16} />
          <span>Tambah Pengguna</span>
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Cari pengguna..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>Daftar pengguna sistem penjadwalan</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Login Terakhir</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>{user.lastLogin || "-"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onEdit(user)}
                          className="cursor-pointer"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(user)}
                          className="cursor-pointer text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Hapus</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  Tidak ada pengguna yang ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus Pengguna</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Apakah Anda yakin ingin menghapus pengguna{" "}
              <span className="font-semibold">{userToDelete?.name}</span>?
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserTable;
