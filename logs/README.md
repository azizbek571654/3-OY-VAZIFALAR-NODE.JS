
```markdown
# 📚 Course Enrollment API

**Course Enrollment API** — bu foydalanuvchilarni turli kurslarga yozish,yoki admin va supper admin rollarini course larni boshqarishi mumkin kurs va enrollment (yozilganlik) bilan ishlovchi asosiy CRUD amallari amalga oshiriladi.

---

# 📦 Foydalanilgan Texnologiyalar

- bcrypt – parollarni xavfsiz shifrlash uchun
- cookie-parser – HTTP cookie'larni o‘qish
- dotenv – muhit o‘zgaruvchilarni .env fayldan yuklash
- express – server va marshrutlarni boshqarish
- joi – so‘rovlarni tekshirish (validation)
- jsonwebtoken – JWT orqali autentifikatsiya qilish
- mongoose – MongoDB bilan ishlashnode-cache – serverda - vaqtinchalik ma’lumot saqlash
- nodemailer – email yuborish uchun
- nodemon – o‘zgarishlarda serverni avtomatik qayta ishga tushurish
- otp-generator – tasodifiy OTP kodlar yaratish
- prettier – kodni formatlash (kod tartibi)
- winston – log yozuvlarini yaratish
- winston-mongodb – loglarni MongoDB ga yozish

---
# 📂 fayil tuzilmasi

project/
├── logs/
│   ├── combined.log
│   └── err.log
├── node_modules/
├── src/
│   ├── controller/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │   ├── logger/
│   │   │   └── logger.js
│   └── validations/
│   └── index.js
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── package.json
├── package-lock.json
└── README.md

---

````
## 🧠 Model Strukturasi

### 🔹 User

```js
  {
    full_name:  type: String,
    email:  type: String,
    Password: type: String,
    role:['superadmin', 'admin', 'teacher', 'student'],
    
  },
```

### 🔹 Course

```js
  {
    title: type: String,
    description: type: String,
    price: type: Number,
    category_id: type: Schema.Types.ObjectId,ref: 'Category',
    author_id: type: Schema.Types.ObjectId, ref: 'User',
  },
```

### 🔹 Enrollment

```js
{
    user_id: type: Schema.Types.ObjectId, ref: 'User',,
    course_id: type: Schema.Types.ObjectId, ref: 'Course',,
    enrolled_at: type: Date,,
    email_send: type: Boolean,
},
```
### 🔹 Category

```js
  {
    name: type: String,
  },
```
### 🔹 Couerse_Reviesws

```js
  {
    user_id: type: Schema.Types.ObjectId, ref: 'User',
    course_id: type: Schema.Types.ObjectId, ref: 'Course',
    rating: type: Number,
    comment: type: String,
  },
```



---

## 🚀 API Endpointlar

### 📚 Category (Kategoriya)

| Method | Endpoint        | Auth            | Description                   |
| ------ | --------------- | --------------- | ----------------------------- |
| POST   | `/category/`    | ❌               | Kategoriya yaratish          |
| GET    | `/category/`    | ❌               | Barcha kategoriyalarni olish |
| GET    | `/category/:id` | ❌               | ID orqali kategoriya olish   |
| PATCH  | `/category/:id` | ✅ `jwt + Admin` | Kategoriyani yangilash       |
| DELETE | `/category/:id` | ✅ `jwt + Admin` | Kategoriyani o‘chirish       |

---

### 📘 Course Review (Kurs Fikrlari)

| Method | Endpoint      | Auth            | Description             |
| ------ | ------------- | --------------- | ----------------------- |
| POST   | `/review/`    | ✅ `jwt`         | Kursga sharh yozish     |
| GET    | `/review/`    | ✅ `jwt + Admin` | Barcha sharhlarni olish |
| GET    | `/review/:id` | ❌               | Sharhni ID orqali olish |
| PATCH  | `/review/:id` | ✅ `jwt`         | Sharhni yangilash       |
| DELETE | `/review/:id` | ✅ `jwt`         | Sharhni o‘chirish       |

---

### 🎓 Course (Kurslar)

| Method | Endpoint             | Auth            | Description                   |
| ------ | -------------------- | --------------- | ----------------------------- |
| POST   | `/course/`           | ✅ `jwt + Admin` | Yangi kurs yaratish           |
| GET    | `/course/`           | ❌               | Barcha kurslarni olish        |
| GET    | `/course/:id`        | ❌               | Kursni ID orqali olish        |
| PATCH  | `/course/:id`        | ✅ `jwt + Admin` | Kursni yangilash              |
| DELETE | `/course/:id`        | ✅ `jwt + Admin` | Kursni o‘chirish              |
| POST   | `/course/:id/enroll` | ✅ `jwt + Admin` | Foydalanuvchini kursga yozish |

---

### 🧾 Enrollment (Yozilishlar)

| Method | Endpoint      | Auth            | Description                    |
| ------ | ------------- | --------------- | ------------------------------ |
| GET    | `/enroll/`    | ❌               | Barcha yozilganlarni olish     |
| GET    | `/enroll/:id` | ❌               | Yozilgan foydalanuvchini olish |
| PATCH  | `/enroll/:id` | ✅ `jwt + Admin` | Yozilgan ma'lumotni yangilash  |
| DELETE | `/enroll/:id` | ✅ `jwt + Admin` | Yozuvni o‘chirish              |

---

### 👤 User (Foydalanuvchilar)

| Method | Endpoint                | Auth                  | Description                         |
| ------ | ----------------------- | --------------------- | ----------------------------------- |
| POST   | `/user/supperadmin`     | ❌                     | Super Admin yaratish                |
| POST   | `/user/auth/register`   | ✅ `jwt + SupperAdmin` | Foydalanuvchi ro‘yxatdan o‘tkazish  |
| POST   | `/user/auth/register/t` | ✅ `jwt + Admin`       | Admin orqali foydalanuvchi yaratish |
| POST   | `/user/auth/login`      | ❌                     | Login qilish                        |
| POST   | `/user/confim-signin`   | ❌                     | Login tasdiqlash                    |
| POST   | `/user/auth/logout`     | ✅ `jwt`               | Logout qilish                       |
| POST   | `/user/token`           | ❌                     | Token olish (access token)          |
| GET    | `/user/`                | ✅ `jwt + Admin`       | Barcha foydalanuvchilarni olish     |
| GET    | `/user/:id`             | ✅ `jwt + Self`        | ID orqali foydalanuvchini olish     |
| PATCH  | `/user/:id`             | ✅ `jwt + Admin`       | Foydalanuvchini yangilash           |
| DELETE | `/user/:id`             | ✅ `jwt + SupperAdmin` | Foydalanuvchini o‘chirish           |

---



## 📧 Email Xabarnoma

* Kursga muvaffaqiyatli yozilgan foydalanuvchiga email yuboriladi.
* user ni tasdiqlayotganda 6 xonali kod yuboradi

---

## 🔐 .env Konfiguratsiyasi

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/yourdbname
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
```

---



## 📌 Eslatmalar
---
* Har bir foydalanuvchi bir kursga faqat bir marta yozilishi mumkin.
* Foydalanuvchi va kurslar avval yaratilgan bo‘lishi kerak.
* Hamma endpointlar REST formatida yozilgan.
```