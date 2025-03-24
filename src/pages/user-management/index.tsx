import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserTable from "@/components/user-management/UserTable";
import UserForm from "@/components/user-management/UserForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
  lastLogin?: string;
  status: "active" | "inactive";
}

interface UserFormValues {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user" | "viewer";
}

const UserManagementPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserFormValues | null>(null);
  const [users, setUsers] = useState<User[]>([
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
  ]);

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    // Convert User to UserFormValues
    const userFormValues: UserFormValues = {
      name: user.name,
      username: user.id, // Using ID as username for this example
      email: user.email,
      password: "", // Empty password for edit mode
      role: user.role,
    };
    setCurrentUser(userFormValues);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    // Filter out the deleted user
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleFormSubmit = (data: UserFormValues) => {
    if (currentUser?.username) {
      // Update existing user
      setUsers(
        users.map((user) => {
          if (user.id === currentUser.username) {
            return {
              ...user,
              name: data.name,
              email: data.email,
              role: data.role,
            };
          }
          return user;
        }),
      );
    } else {
      // Add new user
      const newUser: User = {
        id: `${users.length + 1}`,
        name: data.name,
        email: data.email,
        role: data.role,
        lastLogin: "-",
        status: "active",
      };
      setUsers([...users, newUser]);
    }
    setIsFormOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="bg-slate-50 min-h-full">
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onAdd={handleAddUser}
        />

        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-md">
            <UserForm
              user={currentUser || undefined}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default UserManagementPage;
