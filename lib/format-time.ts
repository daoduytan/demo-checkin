export function formatSmartTime(dateInput: string | Date) {
  const date = new Date(dateInput);
  const now = new Date();

  // Tính chênh lệch mili giây
  const diffMs = now.getTime() - date.getTime();

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);

  // Kiểm tra xem có cùng ngày không
  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isSameDay) {
    // Format "from now" đơn giản
    if (diffSec < 60) return "vừa xong";
    if (diffMin < 60) return `${diffMin} phút trước`;
    return `${diffHour} giờ trước`;
  } else {
    // Format theo ngày giờ DD/MM/YYYY HH:mm
    const pad = (n: number) => String(n).padStart(2, "0");
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    return `${day}/${month}/${year} ${hour}:${minute}`;
  }
}
