export function testNotificationFeedback(notification) {
  if (notification?.status !== "SENT") {
    throw new Error("Notification service chưa xác nhận gửi thành công.");
  }
  return "Đã gửi notification test thành công.";
}
