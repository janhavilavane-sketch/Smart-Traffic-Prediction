
import React from 'react';

export const SYSTEM_INSTRUCTION = `
You are an AI-powered Smart Traffic Assistant. 
Your role is to assist users with traffic conditions, explain congestion levels, suggest optimal routes, and provide travel insights.

GUIDELINES:
- Be short, clear, and informative.
- Use bullet points for readability.
- Clearly label traffic status as Low, Medium, or High.
- Explain predictions logically (e.g., "Peak hour started," "Rain causing slow flow").
- If data is missing (like source or destination), ask politely.
- NEVER give unsafe driving advice.
- Support emergency prioritization if mentioned.
- Tone: Friendly, professional, and student-friendly.

When providing routes, use this format for clarity:
- Route Name: [Name]
- Status: [Low/Medium/High]
- Est. Time: [X mins]
- Reasoning: [Short explanation]
`;

export const Icons = {
  Traffic: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="3" width="12" height="18" rx="2" ry="2"></rect>
      <circle cx="12" cy="7" r="1"></circle>
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="17" r="1"></circle>
    </svg>
  ),
  Route: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3"></circle>
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path>
      <circle cx="18" cy="5" r="3"></circle>
    </svg>
  ),
  Emergency: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
    </svg>
  ),
  Send: () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  )
};
