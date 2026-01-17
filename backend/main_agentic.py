# Agentic AI Backend with Grok Tool Calling
# No Database - Uses JSON data from frontend

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import os
import json
from pathlib import Path

app = FastAPI(title="HR Payroll AI - Agentic System")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

# Pydantic Models
class ChatMessage(BaseModel):
    message: str
    empId: str
    context: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    response: str
    toolCalls: Optional[List[str]] = None

# Agentic AI with Grok Tool Calling
class AgenticHRAssistant:
    """Fully agentic AI assistant with Grok function calling"""
    
    def __init__(self):
        self.api_key = GROQ_API_KEY
        self.client = None
        self.tools = self._define_tools()
        
        if self.api_key:
            try:
                from openai import OpenAI
                self.client = OpenAI(
                    api_key=self.api_key,
                    base_url="https://api.groq.com/openai/v1"
                )
                print("✅ Agentic AI initialized with Grok")
            except Exception as e:
                print(f"⚠️ Could not initialize Grok: {e}")
    
    def _define_tools(self):
        """Define tools/functions for the AI agent"""
        return [
            {
                "type": "function",
                "function": {
                    "name": "get_employee_profile",
                    "description": "Get detailed employee profile including name, position, department, salary, join date",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "empId": {"type": "string", "description": "Employee ID"}
                        },
                        "required": ["empId"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "get_salary_details",
                    "description": "Get salary breakdown including CTC, deductions, net pay for specific month",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "empId": {"type": "string", "description": "Employee ID"},
                            "month": {"type": "string", "description": "Month name like 'January 2026'"}
                        },
                        "required": ["empId"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "get_attendance_record",
                    "description": "Get attendance details including working days, leaves, overtime for a month",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "empId": {"type": "string", "description": "Employee ID"},
                            "month": {"type": "string", "description": "Month name"}
                        },
                        "required": ["empId"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "calculate_leave_balance",
                    "description": "Calculate remaining leave balance and leave quota",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "empId": {"type": "string", "description": "Employee ID"}
                        },
                        "required": ["empId"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "get_team_members",
                    "description": "Get list of team members in same department",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "empId": {"type": "string", "description": "Employee ID"}
                        },
                        "required": ["empId"]
                    }
                }
            },
            {
                "type": "function",
                "function": {
                    "name": "compare_salary_with_average",
                    "description": "Compare employee salary with department average",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "empId": {"type": "string", "description": "Employee ID"}
                        },
                        "required": ["empId"]
                    }
                }
            }
        ]
    
    def execute_tool(self, tool_name: str, arguments: dict, context: dict):
        """Execute the requested tool"""
        employees = context.get('employees', [])
        attendance = context.get('attendance', [])
        payroll = context.get('payroll', [])
        
        empId = arguments.get('empId')
        
        if tool_name == "get_employee_profile":
            emp = next((e for e in employees if e['empId'] == empId), None)
            return emp if emp else {"error": "Employee not found"}
        
        elif tool_name == "get_salary_details":
            month = arguments.get('month', 'January 2026')
            salary = next((p for p in payroll if p['empId'] == empId and p['month'] == month), None)
            if not salary:
                # Get latest month
                emp_payrolls = [p for p in payroll if p['empId'] == empId]
                salary = emp_payrolls[-1] if emp_payrolls else None
            return salary if salary else {"error": "Payroll not found"}
        
        elif tool_name == "get_attendance_record":
            month = arguments.get('month', 'January 2026')
            att = next((a for a in attendance if a['empId'] == empId and a['month'] == month), None)
            if not att:
                emp_attendance = [a for a in attendance if a['empId'] == empId]
                att = emp_attendance[-1] if emp_attendance else None
            return att if att else {"error": "Attendance not found"}
        
        elif tool_name == "calculate_leave_balance":
            emp_attendance = [a for a in attendance if a['empId'] == empId]
            recent_att = emp_attendance[-1] if emp_attendance else None
            if recent_att:
                return {
                    "sickLeaveUsed": recent_att.get('sickLeave', 0),
                    "sickLeaveQuota": 10,
                    "paidLeaveUsed": recent_att.get('paidLeave', 0),
                    "paidLeaveQuota": 15,
                    "month": recent_att.get('month')
                }
            return {"error": "No attendance data"}
        
        elif tool_name == "get_team_members":
            emp = next((e for e in employees if e['empId'] == empId), None)
            if emp:
                team = [e for e in employees if e['department'] == emp['department'] and e['empId'] != empId]
                return {"department": emp['department'], "members": team[:5]}
            return {"error": "Employee not found"}
        
        elif tool_name == "compare_salary_with_average":
            emp = next((e for e in employees if e['empId'] == empId), None)
            if emp:
                dept_employees = [e for e in employees if e['department'] == emp['department']]
                avg_salary = sum(e['salary'] for e in dept_employees) / len(dept_employees)
                return {
                    "employeeSalary": emp['salary'],
                    "departmentAverage": round(avg_salary, 2),
                    "difference": round(emp['salary'] - avg_salary, 2),
                    "department": emp['department']
                }
            return {"error": "Employee not found"}
        
        return {"error": f"Unknown tool: {tool_name}"}
    
    async def chat(self, message: str, empId: str, context: dict):
        """Main agentic chat interface with tool calling"""
        if not self.client:
            return {
                "response": "⚠️ AI not configured. Please set GROQ_API_KEY environment variable.",
                "toolCalls": []
            }
        
        try:
            # First API call - let AI decide which tools to use
            messages = [
                {
                    "role": "system",
                    "content": f"""You are an intelligent HR assistant with access to employee data. 
                    Current employee ID: {empId}
                    Use the available tools to answer questions accurately.
                    Format currency in Indian Rupees (₹).
                    Be friendly, professional, and use emojis appropriately."""
                },
                {"role": "user", "content": message}
            ]
            
            response = self.client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages,
                tools=self.tools,
                tool_choice="auto",
                temperature=0.3
            )
            
            assistant_message = response.choices[0].message
            tool_calls_made = []
            
            # Check if AI wants to use tools
            if assistant_message.tool_calls:
                # Execute all tool calls
                messages.append(assistant_message)
                
                for tool_call in assistant_message.tool_calls:
                    function_name = tool_call.function.name
                    arguments = json.loads(tool_call.function.arguments)
                    
                    tool_calls_made.append(function_name)
                    
                    # Execute the tool
                    result = self.execute_tool(function_name, arguments, context)
                    
                    # Add tool result to messages
                    messages.append({
                        "role": "tool",
                        "content": json.dumps(result),
                        "tool_call_id": tool_call.id
                    })
                
                # Second API call - generate final response with tool results
                final_response = self.client.chat.completions.create(
                    model="llama-3.3-70b-versatile",
                    messages=messages,
                    temperature=0.3
                )
                
                return {
                    "response": final_response.choices[0].message.content,
                    "toolCalls": tool_calls_made
                }
            else:
                # No tools needed, return direct response
                return {
                    "response": assistant_message.content,
                    "toolCalls": []
                }
        
        except Exception as e:
            print(f"Error in agentic chat: {e}")
            return {
                "response": f"❌ Error: {str(e)}",
                "toolCalls": []
            }

# Global agent instance
agent = AgenticHRAssistant()

@app.post("/api/chat")
async def chat_endpoint(chat_msg: ChatMessage):
    """Agentic AI chat endpoint"""
    result = await agent.chat(chat_msg.message, chat_msg.empId, chat_msg.context or {})
    return result

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "ai_enabled": agent.client is not None,
        "tools_available": len(agent.tools)
    }

# Mount static files (for production)
dist_dir = Path(__file__).parent.parent / "dist"
if dist_dir.exists():
    app.mount("/assets", StaticFiles(directory=str(dist_dir / "assets")), name="assets")

@app.get("/{full_path:path}")
def serve_frontend(full_path: str):
    """Serve React frontend for all non-API routes (SPA routing)"""
    # If it's an API route, let it 404
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="Not found")
    
    frontend_path = Path(__file__).parent.parent / "dist" / "index.html"
    if frontend_path.exists():
        return FileResponse(frontend_path)
    return {"message": "Build frontend first: npm run build"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
