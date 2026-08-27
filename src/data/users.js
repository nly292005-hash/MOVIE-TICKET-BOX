export const MOCK_USERS = [
  {
    id: "user_admin",
    name: "Quản Trị Viên",
    email: "admin@gmail.com",
    password: "admin123",
    role: "ADMIN",
    phone: "0901234567",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    favorites: [],
    bookings: []
  },
  {
    id: "user_manager",
    name: "Quản Lý Rạp",
    email: "manager@gmail.com",
    password: "manager123",
    role: "MANAGER",
    phone: "0902345678",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manager",
    favorites: [],
    bookings: []
  },
  {
    id: "user_1",
    name: "Lý Nam Anh",
    email: "namanh@gmail.com",
    password: "123456",
    role: "MEMBER",
    phone: "0988123456",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NamAnh",
    favorites: ["1", "3", "9"], // ID phim: Attack on Titan, Demon Slayer, Spider-Man
    bookings: [
      {
        id: "TK00128",
        movieTitle: "Attack on Titan",
        theater: "CGV Vincom Center",
        seats: ["A5", "A6"],
        date: "2026-08-15",
        time: "19:00",
        amount: 220000,
        status: "PAID"
      }
    ]
  },
  {
    id: "user_2",
    name: "Trần Minh Khoa",
    email: "khoa@gmail.com",
    password: "123456",
    role: "VIP",
    phone: "0912345678",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MinhKhoa",
    favorites: ["2", "5"], // ID phim: Avatar, Minecraft
    bookings: [
      {
        id: "TK00127",
        movieTitle: "Demon Slayer",
        theater: "Lotte Cinema Landmark",
        seats: ["B5", "B6", "B7"],
        date: "2026-08-14",
        time: "16:45",
        amount: 270000,
        status: "PAID"
      }
    ]
  },
  {
    id: "user_3",
    name: "Nguyễn Thu Hà",
    email: "ha@gmail.com",
    password: "123456",
    role: "MEMBER",
    phone: "0905112233",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ThuHa",
    favorites: ["1", "2", "4", "7"],
    bookings: [
      {
        id: "TK00126",
        movieTitle: "Avatar",
        theater: "Galaxy Cinema Nguyễn Du",
        seats: ["C5"],
        date: "2026-08-13",
        time: "17:00",
        amount: 110000,
        status: "PAID"
      }
    ]
  },
  {
    id: "user_4",
    name: "Phạm Thị Hương",
    email: "huong.pham@gmail.com",
    password: "123456",
    role: "VIP",
    phone: "0934888999",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HuongPham",
    favorites: ["5", "6"],
    bookings: [
      {
        id: "TK00125",
        movieTitle: "Minecraft",
        theater: "BHD Star Cineplex",
        seats: ["D1", "D2"],
        date: "2026-08-15",
        time: "19:30",
        amount: 200000,
        status: "PENDING"
      }
    ]
  },
  {
    id: "user_5",
    name: "Đặng Quốc Bảo",
    email: "quocbao@gmail.com",
    password: "123456",
    role: "MEMBER",
    phone: "0977444555",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=QuocBao",
    favorites: ["4", "8"],
    bookings: [
      {
        id: "TK00124",
        movieTitle: "The LEGO Movie",
        theater: "CGV Vincom Center",
        seats: ["F8", "F9"],
        date: "2026-08-12",
        time: "17:00",
        amount: 240000,
        status: "PAID"
      }
    ]
  },
  {
    id: "user_6",
    name: "Vũ Thảo Trinh",
    email: "thaotrinh@gmail.com",
    password: "123456",
    role: "MEMBER",
    phone: "0922666777",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ThaoTrinh",
    favorites: ["6"],
    bookings: [
      {
        id: "TK00123",
        movieTitle: "Minions",
        theater: "Galaxy Cinema Nguyễn Du",
        seats: ["E10"],
        date: "2026-08-10",
        time: "19:45",
        amount: 100000,
        status: "REFUNDED",
        refundAmount: 100000
      }
    ]
  },
  {
    id: "user_7",
    name: "Hoàng Đức Anh",
    email: "ducanh@gmail.com",
    password: "123456",
    role: "VIP",
    phone: "0966333222",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DucAnh",
    favorites: ["3", "7", "9"],
    bookings: [
      {
        id: "TK00122",
        movieTitle: "Mulan",
        theater: "Lotte Cinema Landmark",
        seats: ["G3", "G4"],
        date: "2026-08-15",
        time: "20:40",
        amount: 190000,
        status: "PAID"
      }
    ]
  },
  {
    id: "user_8",
    name: "Bùi Tuyết Mai",
    email: "tuyetmai@gmail.com",
    password: "123456",
    role: "MEMBER",
    phone: "0918999111",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TuyetMai",
    favorites: ["8"],
    bookings: [
      {
        id: "TK00121",
        movieTitle: "Scary Movie",
        theater: "BHD Star Cineplex",
        seats: ["H1", "H2"],
        date: "2026-08-15",
        time: "17:25",
        amount: 180000,
        status: "PAID"
      }
    ]
  },
  {
    id: "user_9",
    name: "Trịnh Quốc Việt",
    email: "quocviet@gmail.com",
    password: "123456",
    role: "MEMBER",
    phone: "0903777888",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=QuocViet",
    favorites: ["2", "9"],
    bookings: [
      {
        id: "TK00120",
        movieTitle: "Spider-Man",
        theater: "CGV Vincom Center",
        seats: ["J5", "J6"],
        date: "2026-08-14",
        time: "20:25",
        amount: 210000,
        status: "PAID"
      }
    ]
  },
  {
    id: "user_10",
    name: "Lê Ngọc Linh",
    email: "ngoclinh@gmail.com",
    password: "123456",
    role: "MEMBER",
    phone: "0945123987",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NgocLinh",
    favorites: ["1", "5", "6"],
    bookings: [] // Người dùng mới chưa đặt vé
  }
];

export default MOCK_USERS;