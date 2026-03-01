# FounderPlane - Founder Stage Assessment Platform

A modern SaaS platform for assessing founder maturity levels and providing personalized guidance for business growth.

## Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **Supabase JS Client** - Backend integration

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Supabase** - Database & authentication
- **Slowapi** - Rate limiting
- **Python 3.11+**

### Database & Auth
- **Supabase PostgreSQL** - Database
- **Supabase Auth** - Authentication
- **Row Level Security (RLS)** - Data protection

## Project Structure

```
project/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand state management
│   │   ├── lib/             # Utilities and API clients
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                  # FastAPI application
│   ├── server.py            # Main server with routes
│   ├── requirements.txt      # Python dependencies
│   └── .env.example          # Environment variables template
│
├── .env                      # Environment variables
├── package.json              # Root package config
└── README.md                 # This file
```

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- npm or yarn
- Supabase account (free tier available at supabase.com)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd project
```

2. **Install root dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create `.env` file in the project root:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Create `backend/.env`:
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key
ADMIN_PASSWORD=your-secure-password
ENVIRONMENT=development
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

4. **Install frontend dependencies**
```bash
cd frontend
npm install
cd ..
```

5. **Install backend dependencies**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### Running the Application

**Development mode** (runs both frontend and backend):
```bash
npm run dev
```

This will start:
- Frontend dev server: http://localhost:5173
- Backend API server: http://localhost:8000
- API documentation: http://localhost:8000/docs

**Frontend only**:
```bash
npm run dev:frontend
```

**Backend only**:
```bash
npm run dev:backend
```

### Building for Production

```bash
npm run build
```

This builds both frontend and backend for production.

## API Endpoints

### Leads
- `POST /api/leads` - Create a new lead
- `GET /api/leads` - List all leads (admin only)
- `GET /api/leads/{lead_id}` - Get lead details (admin only)
- `PUT /api/leads/{lead_id}` - Update lead (admin only)
- `DELETE /api/leads/{lead_id}` - Delete lead (admin only)

### Analytics
- `GET /api/analytics/summary` - Get analytics summary (admin only)

### Health
- `GET /health` - Health check endpoint

All admin endpoints require `X-Admin-Password` header with the admin password.

## Features

### Current
- ✅ Lead capture and management
- ✅ Admin dashboard with filtering
- ✅ Authentication with Supabase
- ✅ Rate limiting on API endpoints
- ✅ Row Level Security (RLS) for data protection
- ✅ Responsive design with Tailwind CSS
- ✅ Type-safe frontend with TypeScript

### Planned
- 📋 Lead scoring and stage assessment
- 📊 Advanced analytics and reporting
- 💬 AI-powered lead insights
- 📧 Email integration and automation
- 🔄 CRM integration (HubSpot, Salesforce)
- 📱 Mobile app

## Database Schema

### Tables

**profiles**
- User profiles linked to auth
- Stores admin and role information
- RLS policies for user privacy

**leads**
- Core lead information
- Quiz answers and AI assessment data
- Status tracking and source tracking

**lead_analytics**
- Event tracking for leads
- Flexible JSONB data storage
- Performance indexes for queries

All tables include:
- UUID primary keys
- Timestamps (created_at, updated_at)
- Row Level Security (RLS)
- Performance indexes

## Security

- **Authentication**: Supabase Auth with email/password
- **Database Security**: PostgreSQL Row Level Security (RLS)
- **Rate Limiting**: SlowAPI for endpoint protection
- **CORS**: Configured for development and production
- **Admin Verification**: Header-based password verification
- **Input Validation**: Pydantic schemas for all inputs

## Development Guidelines

### Frontend
- Use TypeScript for type safety
- Follow component composition patterns
- Use Zustand for state management
- Tailwind CSS for styling
- Keep components under 200 lines

### Backend
- Use Pydantic for validation
- Add proper error handling
- Log important events
- Use type hints
- Document API endpoints

### Database
- Always enable RLS on new tables
- Create restrictive policies by default
- Add indexes for frequently queried columns
- Use migrations for schema changes

## Troubleshooting

### Supabase Connection Issues
- Verify SUPABASE_URL and SUPABASE_KEY in .env
- Check Supabase project is active
- Ensure service role key (not anon key) for backend

### Rate Limit Issues
- Check request frequency
- Add appropriate delays between requests
- Contact admin to increase limits if needed

### CORS Errors
- Verify CORS_ORIGINS includes your frontend URL
- Check all requests include proper headers
- Test with `curl` to rule out browser issues

## Deployment

### Frontend (Vercel, Netlify)
```bash
npm run build:frontend
# Deploy the `frontend/dist` directory
```

### Backend (Railway, Heroku, AWS)
```bash
# Ensure requirements.txt is up to date
pip freeze > backend/requirements.txt

# Deploy with Python runtime
python server.py
```

### Environment Variables
Set all `.env` variables in your deployment platform's environment configuration.

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Contact: support@founderplane.com
- Documentation: https://docs.founderplane.com
