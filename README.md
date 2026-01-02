# Attack & Defense CTF Platform - Frontend

A modern, **bright-themed** Attack-Defense CTF Platform frontend built with React 18 + Vite + shadcn/ui that connects to a Spring Boot backend.

![CTF Platform](https://img.shields.io/badge/CTF-Platform-3b82f6?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-000000?style=for-the-badge)

## 🎨 Features

- **Bright Modern UI** - Clean, professional design with vibrant accent colors
- **shadcn/ui Components** - Built with accessible, customizable components
- **Mock Authentication** - Test accounts for immediate demo/testing
- **Real-time Scoreboard** - Live team rankings with auto-refresh
- **Role-Based Access Control** - Admin, Teacher, and Team roles
- **Team Management** - Create, edit, delete teams with CSV bulk import
- **Game Control** - Start, stop, and monitor CTF games
- **File Uploads** - Upload checker scripts and vulnbox files
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Type-Safe** - Full TypeScript support

## 🔐 Test Accounts

**Important:** The platform includes mock authentication with hardcoded test accounts for demo/testing:

### Teacher Account
```
Username: teacher
Password: teacher123
Role: TEACHER
Team: Instructors
Permissions: All management features
```

### Student/Team Account
```
Username: student
Password: student123
Role: TEAM
Team: Alpha Team
Permissions: View dashboard and scoreboard
```

### Admin Account
```
Username: admin
Password: admin123
Role: ADMIN
Team: Administrators
Permissions: Full system access
```

**Demo Mode Banner:** When using test accounts, a blue banner will appear indicating "Demo Mode Active"

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Spring Boot backend running at `http://localhost:8080/api` (optional - works with mock auth)

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

5. **Login with test account**
   - Use `teacher/teacher123` to see all features
   - Use `student/student123` to see team view
   - Use `admin/admin123` for admin features

## 📦 Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## 🏗️ Project Structure

```
src/
├── app/                    # App setup (Router, App component)
├── components/             
│   ├── ui/                 # shadcn/ui components
│   ├── common/             # Wrapper components
│   ├── layout/             # Navbar, PageLayout, DemoModeBanner
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
├── lib/                    # shadcn/ui utilities
└── styles/                 # Global CSS (Tailwind)
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
- `POST /auth/login` - User login (supports mock accounts)
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

## 👥 User Roles & Permissions

| Feature | TEAM | TEACHER | ADMIN |
|---------|:----:|:-------:|:-----:|
| Login / Logout | ✅ | ✅ | ✅ |
| View Scoreboard | ✅ | ✅ | ✅ |
| View Own Dashboard | ✅ | ✅ | ✅ |
| Manage Teams | ❌ | ✅ | ✅ |
| Bulk Import Teams | ❌ | ✅ | ✅ |
| Upload Files | ❌ | ✅ | ✅ |
| Control Game | ❌ | ✅ | ✅ |

## 🎨 Design System - Bright Theme

### Color Palette
```css
Primary:    #3b82f6 (Vibrant Blue)
Secondary:  #8b5cf6 (Purple)
Accent:     #10b981 (Emerald Green)
Success:    #22c55e (Green)
Warning:    #f59e0b (Amber)
Error:      #ef4444 (Red)
Background: #ffffff, #f8fafc (White/Light Gray)
```

### Typography
- **Body:** Inter (default shadcn/ui)
- **Headings:** System font stack
- **Code:** JetBrains Mono

### Component Library
Built with **shadcn/ui** - A collection of accessible and customizable components:
- Button, Card, Input, Label, Badge
- Dialog, Alert Dialog, Alert
- Table, Skeleton, Tabs
- Toast notifications (Sonner)

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + Vite |
| Language | TypeScript 5.2 |
| UI Components | **shadcn/ui** |
| Styling | **Tailwind CSS** |
| Routing | React Router v6 |
| State | Zustand |
| HTTP | Axios |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Animations | Framer Motion |
| Tables | TanStack Table |
| Notifications | Sonner (shadcn/ui Toast) |

## 📝 Environment Variables

Create a `.env` file if you need to customize the API URL:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🔒 Security

- JWT token authentication
- Mock authentication for testing (can be disabled)
- Automatic token refresh
- Protected routes with role-based access
- 401/403 error handling
- XSS protection

## 🧪 Testing the Platform

1. **Start the application**: `npm run dev`
2. **Go to**: http://localhost:3000
3. **Login**: Use `teacher/teacher123` for full access
4. **Navigate**: Explore Dashboard, Teams, Game Control, Scoreboard
5. **Observe**: Demo Mode banner shows you're using a test account
6. **Switch roles**: Logout and login with `student/student123` to see team view

## 📱 Responsive Design

The platform is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 Documentation

- [UPDATE_GUIDE.md](UPDATE_GUIDE.md) - Comprehensive transformation guide
- [FEATURES.md](FEATURES.md) - Detailed feature breakdown
- [COMPLETION_SUMMARY.md](COMPLETION_SUMMARY.md) - Implementation summary

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- React community
- All contributors

---

**Built with ❤️ for CTF enthusiasts**
