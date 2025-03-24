import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";
import { id as idID } from "date-fns/locale";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Edit,
  Filter,
  MoreVertical,
  RefreshCw,
  Save,
  Trash2,
  AlertCircle,
} from "lucide-react";

interface ScheduleItem {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  day: string;
  timeSlot: string;
  classGroup: string;
  color?: string;
}

interface ScheduleTableProps {
  scheduleData?: ScheduleItem[];
  viewType?: "class" | "teacher" | "room" | "subject";
  onSaveChanges?: (updatedSchedule: ScheduleItem[]) => void;
  onDeleteItem?: (itemId: string) => void;
  isEditable?: boolean;
  filterValue?: string;
}

const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const timeSlots = [
  "07:00 - 07:45",
  "07:45 - 08:30",
  "08:30 - 09:15",
  "09:15 - 10:00",
  "10:15 - 11:00",
  "11:00 - 11:45",
  "11:45 - 12:30",
  "13:00 - 13:45",
  "13:45 - 14:30",
  "14:30 - 15:15",
];

// Memoized to prevent regeneration on every render
const generateMockData = (): ScheduleItem[] => {
  const mockData: ScheduleItem[] = [];
  const subjects = [
    "Matematika",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Fisika",
    "Kimia",
    "Biologi",
    "Sejarah",
    "Geografi",
    "Ekonomi",
    "Sosiologi",
  ];
  const teachers = [
    "Budi Santoso",
    "Siti Rahayu",
    "Ahmad Hidayat",
    "Dewi Lestari",
    "Joko Widodo",
    "Tri Sutrisno",
    "Rina Marlina",
    "Agus Setiawan",
    "Eko Prasetyo",
    "Nurul Hidayah",
  ];
  const rooms = [
    "R101",
    "R102",
    "R103",
    "R104",
    "R105",
    "Lab Komputer",
    "Lab Fisika",
    "Lab Kimia",
    "Lab Biologi",
    "Perpustakaan",
  ];
  const classes = [
    "X TKJ 1",
    "X TKJ 2",
    "XI TKJ 1",
    "XI TKJ 2",
    "XII TKJ 1",
    "XII TKJ 2",
    "X RPL 1",
    "XI RPL 1",
    "XII RPL 1",
    "X MM 1",
  ];
  const colors = [
    "#FFD6A5",
    "#CAFFBF",
    "#9BF6FF",
    "#BDB2FF",
    "#FFC6FF",
    "#FDFFB6",
    "#A0C4FF",
    "#FFB5A7",
    "#D0F4DE",
    "#E4C1F9",
  ];

  let id = 1;
  daysOfWeek.forEach((day) => {
    timeSlots.forEach((timeSlot) => {
      // Add 1-3 classes per time slot
      const numClasses = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numClasses; i++) {
        const subjectIndex = Math.floor(Math.random() * subjects.length);
        mockData.push({
          id: `schedule-${id++}`,
          subject: subjects[subjectIndex],
          teacher: teachers[Math.floor(Math.random() * teachers.length)],
          room: rooms[Math.floor(Math.random() * rooms.length)],
          day,
          timeSlot,
          classGroup: classes[Math.floor(Math.random() * classes.length)],
          color: colors[subjectIndex],
        });
      }
    });
  });

  return mockData;
};

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  scheduleData = React.useMemo(() => generateMockData(), []),
  viewType = "class",
  onSaveChanges = () => {},
  onDeleteItem = () => {},
  isEditable = true,
  filterValue = "",
}) => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(scheduleData);
  const [filteredSchedule, setFilteredSchedule] =
    useState<ScheduleItem[]>(scheduleData);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>(filterValue);
  const [currentViewType, setCurrentViewType] = useState<
    "class" | "teacher" | "room" | "subject"
  >(viewType);

  useEffect(() => {
    setSchedule(scheduleData);
    applyFilter(activeFilter, scheduleData);
  }, [scheduleData]);

  useEffect(() => {
    setCurrentViewType(viewType);
  }, [viewType]);

  useEffect(() => {
    applyFilter(filterValue);
    setActiveFilter(filterValue);
  }, [filterValue]);

  const applyFilter = (filter: string, data = schedule) => {
    if (!filter) {
      setFilteredSchedule(data);
      return;
    }

    const filtered = data.filter((item) => {
      switch (currentViewType) {
        case "class":
          return item.classGroup.toLowerCase().includes(filter.toLowerCase());
        case "teacher":
          return item.teacher.toLowerCase().includes(filter.toLowerCase());
        case "room":
          return item.room.toLowerCase().includes(filter.toLowerCase());
        case "subject":
          return item.subject.toLowerCase().includes(filter.toLowerCase());
        default:
          return true;
      }
    });

    setFilteredSchedule(filtered);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination || !isEditable) return;

    const { source, destination } = result;
    const itemId = result.draggableId;
    const item = schedule.find((s) => s.id === itemId);

    if (!item) return;

    // Extract day and time slot from destination ID
    const [destDay, destTimeSlot] = destination.droppableId.split("|");

    // Create updated item
    const updatedItem = {
      ...item,
      day: destDay,
      timeSlot: destTimeSlot,
    };

    // Update schedule
    const updatedSchedule = schedule.map((s) =>
      s.id === itemId ? updatedItem : s,
    );

    setSchedule(updatedSchedule);
    applyFilter(activeFilter, updatedSchedule);
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    onSaveChanges(schedule);
    setHasChanges(false);
  };

  const handleDeleteItem = (id: string) => {
    const updatedSchedule = schedule.filter((item) => item.id !== id);
    setSchedule(updatedSchedule);
    applyFilter(activeFilter, updatedSchedule);
    setHasChanges(true);
    onDeleteItem(id);
  };

  const getScheduleItemsByDayAndTime = (day: string, timeSlot: string) => {
    return filteredSchedule.filter(
      (item) => item.day === day && item.timeSlot === timeSlot,
    );
  };

  const getFilterOptions = () => {
    const options = new Set<string>();

    schedule.forEach((item) => {
      switch (currentViewType) {
        case "class":
          options.add(item.classGroup);
          break;
        case "teacher":
          options.add(item.teacher);
          break;
        case "room":
          options.add(item.room);
          break;
        case "subject":
          options.add(item.subject);
          break;
      }
    });

    return Array.from(options).sort();
  };

  const renderScheduleItem = (item: ScheduleItem, index: number) => {
    return (
      <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
        isDragDisabled={!isEditable}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`p-2 mb-2 rounded-md shadow-sm ${snapshot.isDragging ? "opacity-70" : "opacity-100"}`}
            style={{
              backgroundColor: item.color || "#f3f4f6",
              ...provided.draggableProps.style,
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium">{item.subject}</div>
                <div className="text-xs">{item.teacher}</div>
                <div className="text-xs">{item.room}</div>
                <div className="text-xs">{item.classGroup}</div>
              </div>
              {isEditable && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDeleteItem(item.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, d MMMM yyyy", {
    locale: idID,
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">
            Jadwal{" "}
            {currentViewType === "class"
              ? "Kelas"
              : currentViewType === "teacher"
                ? "Guru"
                : currentViewType === "room"
                  ? "Ruangan"
                  : "Mata Pelajaran"}
          </h2>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <div className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {getFilterOptions().map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => {
                    setActiveFilter(option);
                    applyFilter(option);
                  }}
                  className={activeFilter === option ? "bg-muted" : ""}
                >
                  {option}
                </DropdownMenuItem>
              ))}
              {activeFilter && (
                <DropdownMenuItem
                  onClick={() => {
                    setActiveFilter("");
                    applyFilter("");
                  }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset Filter
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {isEditable && hasChanges && (
            <Button onClick={handleSaveChanges} size="sm">
              <Save className="mr-2 h-4 w-4" />
              Simpan Perubahan
            </Button>
          )}
        </div>
      </div>

      {filteredSchedule.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium">Tidak ada jadwal ditemukan</h3>
          <p className="text-sm text-gray-500 mt-2">
            {activeFilter
              ? `Tidak ada jadwal yang cocok dengan filter "${activeFilter}"`
              : "Belum ada jadwal yang dibuat"}
          </p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>
                {isEditable
                  ? "Drag and drop untuk mengubah jadwal"
                  : "Jadwal tidak dapat diubah dalam mode ini"}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">Jam</TableHead>
                  {daysOfWeek.map((day) => (
                    <TableHead key={day} className="min-w-[200px]">
                      {day}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((timeSlot) => (
                  <TableRow key={timeSlot}>
                    <TableCell className="font-medium">{timeSlot}</TableCell>
                    {daysOfWeek.map((day) => (
                      <TableCell
                        key={`${day}-${timeSlot}`}
                        className="align-top p-2"
                      >
                        <Droppable
                          droppableId={`${day}|${timeSlot}`}
                          isDropDisabled={!isEditable}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              className={`min-h-[100px] rounded-md ${snapshot.isDraggingOver ? "bg-gray-100" : ""}`}
                            >
                              {getScheduleItemsByDayAndTime(day, timeSlot).map(
                                (item, index) =>
                                  renderScheduleItem(item, index),
                              )}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DragDropContext>
      )}

      {isEditable && (
        <div className="mt-4 text-sm text-gray-500">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center">
                  <Edit className="h-4 w-4 mr-1" />
                  <span>Petunjuk Penggunaan</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Drag and drop jadwal untuk memindahkan ke slot waktu lain</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default ScheduleTable;
