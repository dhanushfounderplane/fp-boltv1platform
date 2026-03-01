from fastapi import FastAPI, HTTPException, Depends, Header, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict, Any, List
from datetime import datetime
import os
import logging
from dotenv import load_dotenv
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

load_dotenv()

logging.basicConfig(
    level=os.getenv('LOG_LEVEL', 'INFO'),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="FounderPlane API",
    description="API for FounderPlane - Founder Stage Assessment Platform",
    version="1.0.0"
)

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')
CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',')

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request, exc):
    return JSONResponse(
        status_code=429,
        content={"detail": "Rate limit exceeded"}
    )

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    stage: Optional[str] = None
    service_interest: Optional[str] = None
    source_page: Optional[str] = None
    message: Optional[str] = None
    quiz_answers: Optional[Dict[str, str]] = None

class LeadUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    stage: Optional[str] = None
    service_interest: Optional[str] = None
    status: Optional[str] = None
    message: Optional[str] = None
    quiz_answers: Optional[Dict[str, str]] = None
    ai_assessment: Optional[Dict[str, Any]] = None

class Lead(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    company: Optional[str]
    stage: Optional[str]
    service_interest: Optional[str]
    source_page: Optional[str]
    message: Optional[str]
    status: str
    created_at: str
    updated_at: str
    quiz_answers: Optional[Dict[str, str]]
    ai_assessment: Optional[Dict[str, Any]]

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "founderplane-backend",
        "environment": ENVIRONMENT
    }

@app.post("/api/leads", response_model=Lead)
@limiter.limit("10/minute")
async def create_lead(lead: LeadCreate, request=None):
    try:
        now = datetime.utcnow().isoformat()

        if not SUPABASE_URL or not SUPABASE_KEY:
            raise HTTPException(status_code=500, detail="Database not configured")

        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        data = lead.model_dump()
        data['status'] = 'New'
        data['created_at'] = now
        data['updated_at'] = now

        response = supabase.table('leads').insert(data).execute()

        if response.data:
            return Lead(**response.data[0])
        else:
            raise HTTPException(status_code=400, detail="Failed to create lead")

    except Exception as e:
        logger.error(f"Error creating lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/leads")
@limiter.limit("30/minute")
async def list_leads(
    admin_password: Optional[str] = Header(None, alias="X-Admin-Password"),
    request=None
):
    try:
        expected_password = os.getenv('ADMIN_PASSWORD')
        if not expected_password or admin_password != expected_password:
            raise HTTPException(status_code=401, detail="Unauthorized")

        if not SUPABASE_URL or not SUPABASE_KEY:
            raise HTTPException(status_code=500, detail="Database not configured")

        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        response = supabase.table('leads').select('*').order('created_at', desc=True).execute()
        return response.data or []

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching leads: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/leads/{lead_id}", response_model=Lead)
@limiter.limit("30/minute")
async def get_lead(
    lead_id: str,
    admin_password: Optional[str] = Header(None, alias="X-Admin-Password"),
    request=None
):
    try:
        expected_password = os.getenv('ADMIN_PASSWORD')
        if not expected_password or admin_password != expected_password:
            raise HTTPException(status_code=401, detail="Unauthorized")

        if not SUPABASE_URL or not SUPABASE_KEY:
            raise HTTPException(status_code=500, detail="Database not configured")

        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        response = supabase.table('leads').select('*').eq('id', lead_id).maybeSingle().execute()

        if response.data:
            return Lead(**response.data)
        else:
            raise HTTPException(status_code=404, detail="Lead not found")

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.put("/api/leads/{lead_id}", response_model=Lead)
@limiter.limit("20/minute")
async def update_lead(
    lead_id: str,
    lead_update: LeadUpdate,
    admin_password: Optional[str] = Header(None, alias="X-Admin-Password"),
    request=None
):
    try:
        expected_password = os.getenv('ADMIN_PASSWORD')
        if not expected_password or admin_password != expected_password:
            raise HTTPException(status_code=401, detail="Unauthorized")

        if not SUPABASE_URL or not SUPABASE_KEY:
            raise HTTPException(status_code=500, detail="Database not configured")

        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        update_data = lead_update.model_dump(exclude_unset=True)
        update_data['updated_at'] = datetime.utcnow().isoformat()

        response = supabase.table('leads').update(update_data).eq('id', lead_id).execute()

        if response.data:
            return Lead(**response.data[0])
        else:
            raise HTTPException(status_code=404, detail="Lead not found")

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.delete("/api/leads/{lead_id}")
@limiter.limit("10/minute")
async def delete_lead(
    lead_id: str,
    admin_password: Optional[str] = Header(None, alias="X-Admin-Password"),
    request=None
):
    try:
        expected_password = os.getenv('ADMIN_PASSWORD')
        if not expected_password or admin_password != expected_password:
            raise HTTPException(status_code=401, detail="Unauthorized")

        if not SUPABASE_URL or not SUPABASE_KEY:
            raise HTTPException(status_code=500, detail="Database not configured")

        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        supabase.table('leads').delete().eq('id', lead_id).execute()
        return {"success": True, "message": "Lead deleted"}

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting lead: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/api/analytics/summary")
@limiter.limit("30/minute")
async def get_analytics_summary(
    admin_password: Optional[str] = Header(None, alias="X-Admin-Password"),
    request=None
):
    try:
        expected_password = os.getenv('ADMIN_PASSWORD')
        if not expected_password or admin_password != expected_password:
            raise HTTPException(status_code=401, detail="Unauthorized")

        if not SUPABASE_URL or not SUPABASE_KEY:
            raise HTTPException(status_code=500, detail="Database not configured")

        from supabase import create_client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

        leads_response = supabase.table('leads').select('*').execute()
        leads = leads_response.data or []

        total_leads = len(leads)
        new_leads = sum(1 for l in leads if l.get('status') == 'New')
        contacted = sum(1 for l in leads if l.get('status') == 'Contacted')
        converted = sum(1 for l in leads if l.get('status') == 'Converted')

        return {
            "total_leads": total_leads,
            "new_leads": new_leads,
            "contacted": contacted,
            "converted": converted,
            "conversion_rate": (converted / total_leads * 100) if total_leads > 0 else 0
        }

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching analytics: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
