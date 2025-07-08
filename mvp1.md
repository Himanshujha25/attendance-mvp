✅ MVP 1.0 Features Breakdown
👨‍🎓 USER (Student)
Signup/Login

Join class with teacher code

Mark today's attendance

Only today’s date is visible

Button disabled if already marked

View past data – (optional for v2.0)

👨‍🏫 ADMIN (Teacher)
Signup/Login

Create class with code (auto generated)

Generate attendance code (valid for 1 min or 30 min)

View Attendance Data (charts, tables)

Download CSV or Excel (optional)

🔐 Attendance Logic Flow (Secure & Clear)
Teacher creates attendance code (valid for 1 or 30 minutes).

Student enters code → backend verifies → marks date only once.

Attendance is locked for that day after marking.

📊 Admin Dashboard (Analysis)
Chart: Weekly/Monthly/Yearly attendance

Filters: By class, by student

Export options

🧠 Scalability Notes
Use role-based auth (Admin vs Student).

Structure DB by:

users

classes

attendance_logs

codes

🎨 UI/UX
Minimal with clear CTAs (Tailwind is perfect here)

Mobile responsive

Use modals for code inputs & toasts for feedback