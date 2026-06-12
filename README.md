# Chainscope AI Mantle

FastAPI backend for analyzing job contract addresses.

## Deployed Contract
`0x6758D4228f51EAcC011Bb986fccc1816838eb338`

## Structure
- `/backend` - FastAPI application with `/analyze` endpoint
- `/frontend` - Frontend application (TBD)
- `/contracts` - Smart contract files (TBD)

## Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## API
- `GET /` - Health check
- `POST /analyze` - Analyze contract address (accepts JSON with `contract_address` field)