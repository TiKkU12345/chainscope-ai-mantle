# ChainScope AI — Smart Contract Auditor for Mantle

AI-powered smart contract analysis for Mantle Network. Paste any Mantle contract address and receive an instant plain-English audit — transactions decoded, gas patterns identified, and security risks ranked.

![Backend](https://img.shields.io/badge/backend-FastAPI-009688?logo=fastapi)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-61DAFB?logo=react)
![LLM](https://img.shields.io/badge/llm-Groq%20%7C%20Llama_3.3_70B-blue)
![Network](https://img.shields.io/badge/network-Mantle_Sepolia_Testnet-000)

---

## Live Demo

| Service | URL |
|---------|-----|
| Frontend | https://chainscope-ai-mantle-lake.vercel.app |
| Backend API | https://chainscope-ai-mantle.onrender.com |

---

## Deployed Contract

**Mantle Sepolia Testnet**

| Contract | Address | Description |
|----------|---------|-------------|
| AuditRecord | `0xd045a4bc4f55b2b7c6d734163ffe28ca2c71cb3c` | Audit hash storage on Mantle Sepolia Testnet |

---

## What It Does

ChainScope AI takes any Mantle smart contract address and generates a complete audit report:

- **Transaction Summary** — Plain-English explanation of what the contract does
- **Gas Intelligence** — Average gas usage and specific optimization tips based on actual code
- **Security Flags** — LLM-powered vulnerability detection with HIGH/MEDIUM/LOW severity ranking
- **Risk Score** — 0-100 score indicating overall contract safety
- **On-chain Verifiability** — Audit hash permanently stored on Mantle Testnet

---

## Architecture

```
chainscope-ai-mantle
├── frontend/                # React + Vite frontend
│   ├── src/
│   │   ├── main.jsx        # App entry
│   │   ├── App.jsx         # Main UI
│   │   └── App.css         # Styling
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # FastAPI backend
│   ├── main.py             # API routes (/analyze)
│   ├── mantle_fetch.py     # Mantle Sepolia explorer client
│   ├── llm_analyzer.py     # Groq LLM analysis (Llama 3.3 70B)
│   └── requirements.txt
│
└── contracts/               # Solidity smart contracts
```

### Data Flow

```
User Input (contract address)
        │
        ▼
   Frontend (React)
        │  POST /analyze
        ▼
   FastAPI Backend
        │
        ├──▶ mantle_fetch.py
        │         └──▶ Mantle Sepolia Explorer API
        │                   └──▶ Source code + ABI (if verified)
        │
        └──▶ llm_analyzer.py
                  └──▶ Groq API (Llama 3.3 70B)
                            └──▶ Structured audit (JSON)
        │
        ▼
   Response (risk score, flags, gas insights, summary)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 5 + CSS |
| Backend | FastAPI + Python 3.10+ |
| Data Source | Mantle Sepolia Explorer API (Blockscout) |
| LLM / Analysis | Groq API — Llama 3.3 70B Versatile |
| Blockchain | Solidity, Mantle Sepolia Testnet |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Local Setup

### 1. Backend

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
# Create backend/.env with:
# GROQ_API_KEY=<your_groq_api_key>

# Start server
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### 2. Frontend

```bash
cd frontend

npm install

# Create frontend/.env.local with:
# VITE_API_URL=http://localhost:8000

npm run dev
```

Frontend runs at `http://localhost:5173`

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | API key for Groq LLM inference |

### Frontend (`frontend/.env.local`)

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `https://chainscope-ai-mantle.onrender.com` | Backend API base URL |

---

## API Reference

### `GET /`
Health check.

```json
{ "message": "ChainScope AI Backend Running" }
```

### `POST /analyze`

**Request:**
```json
{ "contract_address": "0xd045a4bc4f55b2b7c6d734163ffe28ca2c71cb3c" }
```

**Response:**
```json
{
  "success": true,
  "contract_address": "0xd045a4bc4f55b2b7c6d734163ffe28ca2c71cb3c",
  "is_verified": true,
  "contract_name": "AuditRecord",
  "summary": {
    "contract_type": "Custom",
    "description": "This contract stores audit hashes on-chain for verifiability."
  },
  "gas_insights": {
    "average_gas": 45000,
    "optimization_tip": "Consider using events instead of storage for audit logs to save gas."
  },
  "security_flags": [
    { "severity": "Low", "issue": "No access control on storeAudit — anyone can write." }
  ],
  "risk_score": 25
}
```

---

## Hackathon

Built for **Mantle Turing Test Hackathon 2026** — Track: AI DevTools

**Team**: 4-member team combining AI/ML engineering, full-stack development, and Web3 basics.

**X**: [@AVISHKARKU71986](https://x.com/AVISHKARKU71986)

---

## License

MIT — Built for the Mantle ecosystem · 2026
