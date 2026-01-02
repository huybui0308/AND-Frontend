# Attack & Defense CTF Platform - Frontend

A modern, cyberpunk-themed Attack-Defense CTF Platform frontend built with React 18 + Vite that connects to a Spring Boot backend.

![CTF Platform](https://img.shields.io/badge/CTF-Platform-00f0ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)

## 🎨 Features

- **Cyberpunk UI/UX** - Terminal aesthetic with neon colors and glassmorphism effects
- **Real-time Scoreboard** - Live team rankings with auto-refresh
- **Role-Based Access Control** - Admin, Teacher, and Team roles
- **Team Management** - Create, edit, delete teams with CSV bulk import
- **Game Control** - Start, stop, and monitor CTF games
- **File Uploads** - Upload checker scripts and vulnbox files
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Type-Safe** - Full TypeScript support
- **Modern Stack** - React 18, Vite, Zustand, Framer Motion

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Spring Boot backend running at `http://localhost:8080/api`

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/huybui0308/AND-Frontend.git
   cd AND-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📦 Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 🏗️ Project Structure

```
src/
├── app/                    # App setup (Router, App component)
├── components/             # Reusable components
│   ├── common/             # Button, Modal, Card, Input, etc.
│   ├── layout/             # Navbar, PageLayout, AnimatedBg
│   ├── auth/               # LoginForm, SignupForm, ProtectedRoute
│   ├── team/               # Team components
│   ├── scoreboard/         # Scoreboard components
│   └── game/               # Game control components
├── pages/                  # Page components
│   ├── public/             # Login, Signup, Scoreboard
│   ├── team/               # Team Dashboard
│   ├── admin/              # Admin pages
│   └── error/              # Error pages (404, 403)
├── services/               # API services (Axios)
├── stores/                 # Zustand state management
├── types/                  # TypeScript interfaces
├── styles/                 # Global CSS
└── main.tsx                # Entry point
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🔌 API Integration

The frontend connects to the backend at `http://localhost:8080/api` with the following endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - Team registration
- `GET /auth/me` - Get current user

### Teams
- `GET /teams` - List all teams
- `POST /teams` - Create team
- `PUT /teams/{id}` - Update team
- `DELETE /teams/{id}` - Delete team
- `POST /teams/bulk` - Import from CSV

### Game
- `GET /game/status` - Game status
- `POST /game/start` - Start game
- `POST /game/stop` - Stop game
- `GET /scoreboard` - Live scoreboard

### Upload
- `POST /upload/checker` - Upload checker script (.py)
- `POST /upload/vulnbox` - Upload vulnbox (.zip)

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **TEAM** | View scoreboard, view own dashboard |
| **TEACHER** | All team permissions + manage teams, control game, upload files |
| **ADMIN** | All permissions |

## 🎨 Theme

The platform uses a cyberpunk color scheme:

- **Primary**: Cyan `#00f0ff`
- **Secondary**: Magenta `#ff00ff`
- **Accent**: Yellow `#ffff00`
- **Success**: `#00ff88`
- **Warning**: `#ffaa00`
- **Error**: `#ff4444`

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + Vite |
| Language | TypeScript 5.2 |
| Routing | React Router v6 |
| State | Zustand |
| HTTP | Axios |
| Styling | Vanilla CSS with CSS Variables |
| Forms | React Hook Form |
| Icons | Lucide React |
| Animations | Framer Motion |
| Notifications | React Hot Toast |

## 📝 Environment Variables

Create a `.env` file if you need to customize the API URL:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🔒 Security

- JWT token authentication
- Automatic token refresh
- Protected routes with role-based access
- 401/403 error handling
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Cyberpunk design inspiration
- React community
- All contributors

---

**Built with ❤️ for CTF enthusiasts**