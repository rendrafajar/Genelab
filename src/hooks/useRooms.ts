import { useState, useEffect } from "react";
import { Room, roomService } from "@/services/roomService";

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const data = await roomService.getRooms();
      setRooms(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred"),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const addRoom = async (room: Omit<Room, "id">) => {
    try {
      const newRoom = await roomService.createRoom(room);
      setRooms((prevRooms) => [...prevRooms, newRoom]);
      return newRoom;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred"),
      );
      throw err;
    }
  };

  const updateRoom = async (id: string, room: Partial<Room>) => {
    try {
      const updatedRoom = await roomService.updateRoom(id, room);
      setRooms((prevRooms) =>
        prevRooms.map((r) => (r.id === id ? updatedRoom : r)),
      );
      return updatedRoom;
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred"),
      );
      throw err;
    }
  };

  const deleteRoom = async (id: string) => {
    try {
      await roomService.deleteRoom(id);
      setRooms((prevRooms) => prevRooms.filter((r) => r.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred"),
      );
      throw err;
    }
  };

  return {
    rooms,
    loading,
    error,
    fetchRooms,
    addRoom,
    updateRoom,
    deleteRoom,
  };
};
