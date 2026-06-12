from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# #Sourav
app = FastAPI(
    title="ChainScope AI API",
    description="Smart Contract Analysis API for Mantle",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    contract_address: str

@app.get("/")
def home():
    return {"message": "ChainScope AI Backend Running"}

@app.post("/analyze")
def analyze_contract(data: AnalyzeRequest):
    return {
        "success": True,
        "contract_address": data.contract_address,
        "summary": {
            "contract_type": "ERC-20 Token",
            "description": "This contract handles token transfers on Mantle testnet with standard ERC-20 functionality."
        },
        "gas_insights": {
            "average_gas": 45000,
            "optimization_tip": "Consider batching transfers to reduce per-transaction overhead."
        },
        "security_flags": [
            {
                "severity": "Medium",
                "issue": "Missing access control",
                "description": "Some functions lack proper access modifiers."
            }
        ],
        "risk_score": 42,
        "audit_hash": "0x6758D4228f51EAcC011Bb986fccc1816838eb338"
    }