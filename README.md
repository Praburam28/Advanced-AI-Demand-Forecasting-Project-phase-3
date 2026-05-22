🚀 Advanced AI Demand Forecasting System

An enterprise-grade AI-powered Demand Forecasting SaaS platform built using FastAPI, React, Tailwind CSS, MySQL, and Machine Learning concepts.

The system provides:

📈 Real-time demand forecasting
🤖 AI model comparison & retraining
📊 Advanced analytics dashboard
🔔 Live notifications
👥 Role-based authentication
📑 Reports & insights generation
🧠 Seasonal trend detection
⚠️ Inventory risk analysis
🌐 Global search functionality
📡 System monitoring
🛠️ Tech Stack
🔹 Frontend
React.js
Tailwind CSS
Axios
React Router DOM
Recharts
Lucide React Icons
🔹 Backend
FastAPI
SQLAlchemy
JWT Authentication
WebSocket
Pydantic
🔹 Database
MySQL
🔹 AI / ML Features
Demand Prediction
Ensemble Forecasting
Seasonal Trend Detection
Anomaly Detection
Accuracy Scoring
📂 Project Structure
advanced-ai-demand-forecasting/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── ml/
│   │   ├── utils/
│   │   ├── websocket/
│   │   ├── database/
│   │   └── main.py
│   │
│   ├── uploads/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
⚙️ Backend Setup
1️⃣ Open Backend Folder
cd backend
2️⃣ Create Virtual Environment
python -m venv venv
3️⃣ Activate Environment
Windows
venv\Scripts\Activate
4️⃣ Install Requirements
pip install -r requirements.txt
🗄️ MySQL Database Setup
Create Database
CREATE DATABASE demand_forecasting_db_new;
🔐 Environment Variables

Create .env inside backend folder.

DATABASE_URL=mysql+pymysql://root:yourpassword@localhost/demand_forecasting_db_new

SECRET_KEY=supersecretkey

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
▶️ Run Backend
Development Mode
python -m uvicorn app.main:app --reload
Faster Production Mode
python -m uvicorn app.main:app
🌐 Swagger API

Open:

http://127.0.0.1:8000/docs
🎨 Frontend Setup
1️⃣ Open Frontend Folder
cd frontend
2️⃣ Install Dependencies
npm install
3️⃣ Run Frontend
npm run dev
🌍 Frontend URL
http://localhost:5173
🔑 Authentication
Register User
POST /auth/register
{
  "full_name": "Prabu",
  "email": "prabu@gmail.com",
  "password": "prabu123",
  "role": "Super Admin"
}
Login
POST /auth/login
{
  "email": "prabu@gmail.com",
  "password": "prabu123"
}
📊 Core Features
✅ Dashboard
Advanced SaaS UI
Live analytics
Revenue prediction
Forecast trend charts
Region-wise analytics
Category-wise insights
✅ Dataset Management
Upload CSV/XLSX datasets
Sales & revenue extraction
Dataset pagination
Search & filtering
Dataset analytics
✅ AI Forecasting
Generate forecasts
Compare forecasting models
AI retraining
Seasonal trend detection
Inventory risk analysis
Anomaly detection
✅ Reports & Insights
Generate PDF reports
Generate Excel reports
AI-generated business summaries
Download analytics reports
✅ Role Management

Supported Roles:

Super Admin
Analyst
Viewer

Features:

Role-based access control
User management
Enable/disable users
Permission restriction
✅ Notifications

Real-time WebSocket notifications for:

Dataset uploads
Forecast generation
Dashboard updates
✅ System Monitoring
API activity logs
Forecasting history
CPU & memory metrics
Active user tracking
✅ Global Search

Search across:

Datasets
Forecasts
Reports
Users
📁 Sample Dataset Format
date,product,category,region,sales,revenue
2026-01-01,Laptop,Electronics,South,120,240000
2026-01-02,Mobile,Electronics,North,90,180000
🔔 WebSocket Notifications

Frontend listens on:

ws://127.0.0.1:8000/ws/dashboard
📈 AI Forecast Output

Example:

{
  "predicted_demand": 850,
  "predicted_revenue": 540000,
  "accuracy_score": 94.5,
  "seasonal_trend": "High Seasonal Demand",
  "inventory_risk": "Balanced Inventory"
}
🧠 AI Modules
Forecasting Models
Linear Regression
Random Forest
Gradient Boosting
Ensemble Model
📌 Future Improvements
Docker deployment
Kubernetes scaling
Real ML model training
Cloud deployment
Email notifications
Mobile app support
👨‍💻 Developed By
Prabu Ram

Advanced AI Demand Forecasting SaaS Project

⭐ Project Highlights

✅ Enterprise SaaS UI
✅ FastAPI Backend
✅ AI Forecasting
✅ Real-time Notifications
✅ Advanced Analytics
✅ Tailwind Responsive Design
✅ Role-Based Authentication
✅ Search & Monitoring System
✅ Reports & Insights Module

👨‍💻 Author

PrabuRam R
