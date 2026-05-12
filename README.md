<div align="center">

<img src="public/logo.svg" alt="Linkify Logo" width="120" />

# 🔗 Linkify

### Your links. One page. Zero friction.

A modern, open-source Linktree alternative built from scratch in one day.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Linkify-D6E752?style=for-the-badge&logo=vercel&logoColor=black)](https://link-tree-rho-dun.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎨 **5 Premium Templates** | Classic, Minimal, Gradient, Neon, and fully Custom backgrounds |
| 🖼️ **Custom Backgrounds** | Solid color, gradient, or image URL with light/dark text toggle |
| 🔗 **Unlimited Links** | Add links to any platform with custom labels |
| 👤 **Public Profile Pages** | Clean `yoursite.com/username` public URLs |
| 📱 **Fully Responsive** | Looks great on desktop, tablet, and mobile |
| 🔒 **Auth System** | JWT-based signup/login with bcrypt password hashing |
| ⚡ **Live Preview** | See changes in real-time in a phone mockup while editing |
| 🌈 **Animated Glow Card** | Rotating RGB border effect on public profile pages |
| 🔔 **Toast Notifications** | Styled global notifications matching the brand |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Frontend** | React 19, Tailwind CSS v4 |
| **Database** | MongoDB with Mongoose |
| **Auth** | JWT + bcrypt (cookie-based sessions) |
| **Notifications** | react-hot-toast |
| **Images** | next/image with remote patterns |
| **Deployment** | Vercel |

---

## 🌐 Live Demo

🔗 **[https://link-tree-rho-dun.vercel.app](https://link-tree-rho-dun.vercel.app)**

> Sign up, create your profile, and share your links — all in under a minute.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **MongoDB** Atlas cluster (or local MongoDB instance)

### 1. Clone the repo

```bash
git clone https://github.com/akashsingh062/link-tree.git
cd link-tree
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/linkify
JWT_SECRET=your-super-secret-jwt-key
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
link-tree/
├── app/
│   ├── (main)/              # Main layout routes
│   │   ├── page.js          # Landing page
│   │   ├── about/           # About page
│   │   ├── create/          # Link editor/dashboard
│   │   ├── login/           # Login page
│   │   └── signup/          # Signup page
│   ├── (profile)/
│   │   └── [username]/      # Dynamic public profile pages
│   ├── api/
│   │   ├── auth/            # Auth endpoints (signup, login, logout, me)
│   │   └── tree/            # CRUD endpoints for link trees
│   ├── globals.css          # Design system (CSS variables + animations)
│   └── layout.js            # Root layout with Toaster
├── components/
│   ├── Navbar.js            # Navigation bar
│   ├── Footer.js            # Footer
│   ├── ProfileTemplates.js  # 5 template components + ProfileAvatar
│   └── PlatformIcons.js     # Platform icon set (20+ platforms)
├── lib/
│   └── utils.js             # Tailwind class merge utility
├── models/
│   ├── User.js              # User schema
│   └── LinkTree.js          # LinkTree schema
└── dbConnect.js             # MongoDB connection singleton
```

---

## 🎨 Available Templates

| Template | Style |
|----------|-------|
| **Classic** | Navy background with lime accents |
| **Minimal** | Clean stone/white aesthetic |
| **Gradient** | Vibrant violet → fuchsia → orange gradient |
| **Neon** | Dark cyberpunk with cyan/purple neon accents |
| **Custom** | Your own colors, gradients, or background images |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Create a new account |
| `POST` | `/api/auth/login` | Login and get JWT cookie |
| `POST` | `/api/auth/logout` | Clear auth cookie |
| `GET` | `/api/auth/me` | Get current user info |
| `GET` | `/api/tree` | Get current user's link tree |
| `POST` | `/api/tree` | Create a new link tree |
| `PUT` | `/api/tree` | Update existing link tree |
| `DELETE` | `/api/tree` | Delete link tree |
| `GET` | `/api/tree/[username]` | Get public link tree by username |

---

## 🧑‍💻 Built By

**Akash Singh** — 

- GitHub: [@akashsingh062](https://github.com/akashsingh062)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**If you found this project useful, consider giving it a ⭐ on GitHub!**

</div>
