export interface DemoGuide {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  languages: string[];
  availableHours: string;
  guideFee: number;
  avgRating: number;
  cabBooking: boolean;
  hotelBooking: boolean;
  bio: string;
}

export const demoGuides: DemoGuide[] = [
  {
    id: "demo-delhi",
    name: "Aisha Verma",
    phone: "+91 98200 11223",
    city: "Delhi",
    state: "Delhi",
    languages: ["English", "Hindi"],
    availableHours: "09:00-18:00",
    guideFee: 1200,
    avgRating: 4.8,
    cabBooking: true,
    hotelBooking: false,
    bio: "Old Delhi walking tours, food trails, and heritage sites."
  },
  {
    id: "demo-jaipur",
    name: "Rohit Sharma",
    phone: "+91 99580 77881",
    city: "Jaipur",
    state: "Rajasthan",
    languages: ["English", "Hindi", "Marwari"],
    availableHours: "08:00-17:00",
    guideFee: 1500,
    avgRating: 4.7,
    cabBooking: true,
    hotelBooking: true,
    bio: "Forts, palaces, and local craft experiences in Jaipur."
  },
  {
    id: "demo-goa",
    name: "Nisha D'Souza",
    phone: "+91 98816 55421",
    city: "Goa",
    state: "Goa",
    languages: ["English", "Hindi", "Konkani"],
    availableHours: "10:00-19:00",
    guideFee: 1800,
    avgRating: 4.6,
    cabBooking: true,
    hotelBooking: true,
    bio: "Beaches, heritage churches, and hidden food spots."
  },
  {
    id: "demo-kerala",
    name: "Arjun Menon",
    phone: "+91 97780 33419",
    city: "Kochi",
    state: "Kerala",
    languages: ["English", "Malayalam", "Hindi"],
    availableHours: "07:00-16:00",
    guideFee: 1400,
    avgRating: 4.9,
    cabBooking: false,
    hotelBooking: true,
    bio: "Backwater experiences, culture walks, and local markets."
  },
  {
    id: "demo-hampi",
    name: "Meera Kulkarni",
    phone: "+91 98451 22990",
    city: "Hampi",
    state: "Karnataka",
    languages: ["English", "Kannada", "Hindi"],
    availableHours: "06:30-15:30",
    guideFee: 1100,
    avgRating: 4.5,
    cabBooking: false,
    hotelBooking: false,
    bio: "Temple ruins, sunrise viewpoints, and cycling routes."
  },
  {
    id: "demo-varanasi",
    name: "Siddharth Rai",
    phone: "+91 95602 44190",
    city: "Varanasi",
    state: "Uttar Pradesh",
    languages: ["English", "Hindi", "Bhojpuri"],
    availableHours: "05:30-14:00",
    guideFee: 1300,
    avgRating: 4.7,
    cabBooking: false,
    hotelBooking: false,
    bio: "Ghats, sunrise boat rides, and spiritual heritage tours."
  },
  {
    id: "demo-mumbai",
    name: "Priya Nair",
    phone: "+91 98191 77110",
    city: "Mumbai",
    state: "Maharashtra",
    languages: ["English", "Hindi", "Marathi"],
    availableHours: "09:30-18:30",
    guideFee: 1700,
    avgRating: 4.6,
    cabBooking: true,
    hotelBooking: false,
    bio: "City highlights, art districts, and street food trails."
  },
  {
    id: "demo-agra",
    name: "Rahul Singh",
    phone: "+91 98736 55082",
    city: "Agra",
    state: "Uttar Pradesh",
    languages: ["English", "Hindi"],
    availableHours: "06:00-15:00",
    guideFee: 1250,
    avgRating: 4.8,
    cabBooking: true,
    hotelBooking: false,
    bio: "Taj Mahal sunrise tours and Mughal heritage walks."
  },
  {
    id: "demo-udaipur",
    name: "Kavya Rathore",
    phone: "+91 97990 66441",
    city: "Udaipur",
    state: "Rajasthan",
    languages: ["English", "Hindi", "Mewari"],
    availableHours: "08:30-17:30",
    guideFee: 1550,
    avgRating: 4.7,
    cabBooking: false,
    hotelBooking: true,
    bio: "Lakeside palaces, heritage havelis, and cultural shows."
  },
  {
    id: "demo-shimla",
    name: "Ishaan Kapoor",
    phone: "+91 98163 33910",
    city: "Shimla",
    state: "Himachal Pradesh",
    languages: ["English", "Hindi"],
    availableHours: "08:00-16:00",
    guideFee: 1350,
    avgRating: 4.5,
    cabBooking: true,
    hotelBooking: false,
    bio: "Colonial trails, mountain views, and local markets."
  }
];
