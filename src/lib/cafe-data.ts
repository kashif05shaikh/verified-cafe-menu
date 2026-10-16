import menuData from "@/data/menu.json";
import site from "@/data/site.json";
import breakfastPhoto from "@/assets/cafe-breakfast.webp.asset.json";
import counterPhoto from "@/assets/cafe-counter.webp.asset.json";
import detailPhoto from "@/assets/cafe-detail.webp.asset.json";
import drinkPhoto from "@/assets/cafe-drink.webp.asset.json";

export type MenuItem = {
  name: string;
  desc: string;
  price: number | null;
  veg: boolean;
  tags: string[];
  image: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  note: string;
  items: MenuItem[];
};

export const cafe = site;
export const categories = menuData.categories as MenuCategory[];
export const allMenuItems = categories.flatMap((category) => category.items);

export const photos = [
  { id: "cafe-breakfast", src: breakfastPhoto.url, category: "Food", alt: "Coffee, croissants and a plated sandwich on a café table", caption: "Coffee, croissants and a sandwich", width: 771, height: 416 },
  { id: "cafe-counter", src: counterPhoto.url, category: "Interior", alt: "Café counter and espresso machine beside an interior staircase", caption: "The espresso counter and staircase", width: 300, height: 273 },
  { id: "cafe-detail", src: detailPhoto.url, category: "Interior", alt: "Decorative plates displayed on a striped café wall", caption: "Decorative plates on the wall", width: 300, height: 273 },
  { id: "cafe-drink", src: drinkPhoto.url, category: "Drinks", alt: "Iced café drink on a table beside a croissant", caption: "An iced drink and croissant", width: 300, height: 273 },
];

export const hours = cafe.hours;

export function getCafeOpenStatus(now: Date): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = part("weekday");
  const hour = Number(part("hour"));
  const minute = Number(part("minute"));
  const today = hours.find((entry) => entry.day === weekday);
  if (!today) return false;
  const [openingHour, openingMinute] = today.open.split(":").map(Number);
  const [closingHour, closingMinute] = today.close.split(":").map(Number);
  const currentTime = hour * 60 + minute;
  const openingTime = openingHour * 60 + openingMinute;
  const closingTime = closingHour * 60 + closingMinute;
  if (openingTime < closingTime) return currentTime >= openingTime && currentTime < closingTime;
  return currentTime >= openingTime || currentTime < closingTime;
}

export function formatHours(time: string): string {
  const [hourText = "0", minuteText = "00"] = time.split(":");
  const hour = Number(hourText);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minuteText} ${period}`;
}