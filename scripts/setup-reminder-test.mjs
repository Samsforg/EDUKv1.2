import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync("./data/edukora.db");
const uid = Number(process.argv[2] || 223);
db.prepare("INSERT INTO reminder_settings (user_id, enabled, frequency, hour, subjects, updated_at, last_reminder_date) VALUES (?, 1, 'daily', '00:00', '', datetime('now'), NULL) ON CONFLICT(user_id) DO UPDATE SET enabled = 1, hour = '00:00', last_reminder_date = NULL").run(uid);
db.prepare("DELETE FROM notifications WHERE user_id = ? AND title = 'Rappel de révision'").run(uid);
console.log("reminder_settings:", JSON.stringify(db.prepare("SELECT * FROM reminder_settings WHERE user_id = ?").get(uid)));
db.close();