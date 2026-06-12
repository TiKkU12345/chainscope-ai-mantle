from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="ChainScope AI API",
    description="Smart Contract Analysis API for Mantle",
    version="1.0.0"
)


class AnalyzeRequest(BaseModel):
    contract_address: str


@app.get("/")
def home():
    return {
        "message": "ChainScope AI Backend Running"
    }


@app.post("/analyze")
def analyze_contract(data: AnalyzeRequest):
    contract_address = data.contract_address

    return {
        "success": True,
        "contract_address": contract_address,
        "summary": {
            "contract_type": "ERC-20 Token",
            "description": "Sample smart contract analysis."
        },
        "gas_insights": {
            "average_gas": 45000,
            "optimization_tip": "Consider reducing storage writes."
        },
        "security_flags": [
            {
                "severity": "Medium",
                "issue": "Missing access control checks"
            }
        ],
        "risk_score": 72
    }