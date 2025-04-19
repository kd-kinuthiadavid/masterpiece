# Masterpiece Monorepo

A mini role-based platform where users can register and log in as either a Buyer,
Vendor, or Rider built with NestJS (Backend) and Next.js (Frontend).

- **Demo**: [Watch the UI Walkthrough Video](https://www.loom.com/share/4a79a2faab264683b3c6c39e232de635?sid=a76e732f-ba0b-4a48-9372-2a39aec0ad5e)

- **Live**: [masterpiece](https://masterpiece-seven.vercel.app/)

## 🚀 Tech Stack

### Backend (@server)
- **Framework**: NestJS
- **Database**: PostgreSQL (via Supabase) with Drizzle ORM
- **Authentication**: JWT with Passport.js
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier

### Frontend (@client)
- **Framework**: Next.js 15 with App Router
- **UI**: Tailwind CSS, Radix UI (via ShadcnUI)
- **State Management**: React Hooks
- **Authentication**: Cookies
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with class-variance-authority
- **Theming**: next-themes

## ✨ Features

### Authentication & Authorization
- [X] Role-based user registration (Buyer, Vendor, Rider)
- [X] Secure JWT-based authentication
- [X] Protected routes with role-based access control
   - [X] API endpoints
   - [X] Frontend via Nextjs Middleware
- [X] Automatic redirection to role-specific dashboards
- [X] Secure cookie-based session management

### User Roles & Dashboards
- **Buyer Dashboard**
  - [X] Personalized welcome message
  - [X] User profile display (saving user data to database)
  - [X] Marketplace access
  - [X] Secure logout functionality

- **Vendor Dashboard**
  - [X] Role-specific interface
  - [X] Product creation & listing management
  - [X] Secure logout functionality

- **Rider Dashboard**
  - [X] Delivery schedule view
  - [X] Secure logout functionality

### Security Features
- [X] JWT token validation and verification
- [X] Role-based route protection
- [X] Protected API endpoints
- [X] CORS configuration
- [X] Input validation using class-validator and zod

### User Experience
- [X] Responsive design with Tailwind CSS
- [X] Modern UI components with ShadcnUI
- [X] Form validation with Zod
- [X] Toast notifications for user feedback
- [X] Smooth navigation between pages
- [X] Automatic redirection based on user role

## 📁 Project Structure

```
masterpiece/
├── client/                 # Next.js frontend application
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
└── server/                # NestJS backend application
    ├── src/               # Source code
    ├── test/              # Test files
    └── package.json       # Backend dependencies
```

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kd-kinuthiadavid/masterpiece.git && cd masterpiece
   ```

2. Install dependencies for both applications:
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both `server/` and `client/` directories
   - See the Environment Variables section below for required variables

## ⚙️ Environment Variables

### Server (.env)
```env
DATABASE_URL=postgresql://[username]:[password]@[host]:[port]/[database]
JWT_SECRET=your-secret-key
```

### Client (.env)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_JWT_SECRET=your-secret-key
```


**NB:** Ensure that you use the same value for `JWT_SECRET` and `NEXT_PUBLIC_JWT_SECRET`. This is important so that we're able to decode the JWT on the frontend after it's been signed in the backend

## 🚀 Development

### Running the Backend
```bash
cd server
npm run start:dev
```

### Running the Frontend
```bash
cd client
npm run dev
```

The applications will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## 🧪 Testing

### Backend Tests
```bash
cd server
npm run test          # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:cov     # Run tests with coverage
```

### Frontend Tests
```bash
cd client
npm run test
```

## 📦 Building for Production

### Backend
```bash
cd server
npm run build
npm run start:prod
```

### Frontend
```bash
cd client
npm run build
npm run start
```

## 🔒 Security

- JWT-based authentication
   - API protection
   - Route protection for the frontend
   - Role-based route protection
- Environment variables for sensitive data
- Input validation using class-validator and zod
- CORS configuration


## ⚠️ Known Issues

- **Initial User Registration Delay**: The first request when registering a new user might experience a delay of approximately 50 seconds or more. This is due to Render's free tier policy where instances spin down during inactivity. However, subsequent requests will be significantly faster as the instance remains active.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the repository or contact the maintainers.

## 🔗 Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/UI](https://ui.shadcn.com/)
- [supabase](https://supabase.com/)
- [Frontend Deployed at Vercel](https://vercel.com/home)
- [Backend Deployed at Render](https://render.com/)