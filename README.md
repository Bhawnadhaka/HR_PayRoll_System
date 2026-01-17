# HR Payroll AI - Agentic System

An intelligent HR payroll management system powered by Groq AI with function calling, built with React and FastAPI.

## Features

- Agentic AI chat with 6 intelligent tools
- Real-time payroll calculations (Indian CTC model)
- Attendance tracking with leave management
- Employee management (HR can add/edit)
- Role-based access control
- Beautiful responsive UI with Tailwind CSS
- No database required (serverless-ready)

## Tech Stack

**Frontend:** React 18, Vite, React Router, Recharts, Tailwind CSS  
**Backend:** FastAPI, Uvicorn  
**AI:** Groq API (Llama 3.3-70B)

## Local Setup

### Prerequisites
- Node.js 20+
- Python 3.8+
- Groq API key

### Installation

1. **Install Dependencies**
```bash
npm install
cd backend && pip install -r requirements.txt
```

2. **Set Environment Variable**
```bash
export GROQ_API_KEY=your_groq_api_key
```

3. **Build Frontend**
```bash
npm run build
```

4. **Run Backend**
```bash
cd backend && python main_agentic.py
```

5. **Access Application**
```
http://localhost:8000
```

### Demo Credentials

**HR Access:**
- Username: `hr`
- Password: `hr123`

**Employee Access:**
- Username: `raj` / Password: `raj123`
- Username: `priya` / Password: `priya123`

## Deployment (Render)

1. **Push to GitHub**
```bash
git add .
git commit -m "Deploy HR Payroll AI"
git push
```

2. **Create Web Service on Render**
- Connect your GitHub repository
- Add environment variable: `GROQ_API_KEY`
- Render will use `render.yaml` automatically

3. **Live in 3-5 minutes!**

## Documentation

See [TECHNICAL_DOCUMENTATION.md](TECHNICAL_DOCUMENTATION.md) for:
- System architecture
- Payroll calculation formulas
- AI chat interface details
- API documentation

## License

MIT License
