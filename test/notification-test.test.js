import assert from "node:assert/strict";
import test from "node:test";

import { testNotificationFeedback } from "../src/notification-feedback.js";

test("test notification feedback confirms a SENT notification", () => {
  assert.equal(
    testNotificationFeedback({ status: "SENT" }),
    "Đã gửi notification test thành công.",
  );
});

test("test notification feedback rejects an unconfirmed notification", () => {
  assert.throws(
    () => testNotificationFeedback({ status: "SCHEDULED" }),
    /chưa xác nhận gửi thành công/,
  );
});
