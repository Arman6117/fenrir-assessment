import { Finding, LogEntry, ScanStage } from "@/types/scan";
import { FileText, FlaskConical, Network, ShieldCheck } from "lucide-react";
import { FaSpider } from "react-icons/fa";

export const STAGES: { key: ScanStage; Icon: React.ElementType }[] = [
    { key: "Spidering",  Icon: FaSpider },
    { key: "Mapping",    Icon: Network },
    { key: "Testing",    Icon: FlaskConical },
    { key: "Validating", Icon: ShieldCheck },
    { key: "Reporting",  Icon: FileText },
  ];
  
  export const INITIAL_LOGS: LogEntry[] = [
    { id: 1,  time: "09:00:00", message: "I'll begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration.", type: "normal" },
    { id: 2,  time: "09:01:00", message: "Good! target is online. Now let me perform port scanning to identify running services.", type: "normal" },
    { id: 3,  time: "09:02:00", message: "Excellent reconnaissance results:\n  - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.", type: "code" },
    { id: 4,  time: "09:03:00", message: 'Great! I found a login page for a Help Desk Platform. I can see a useful comment: "TODO: Delete the testing account (test:test)". Let me test this credential. The login redirects to /password/test. Let me follow that path and explore it.', type: "highlight-teal" },
    { id: 5,  time: "09:04:00", message: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to '#' which means the current page. Let me try a different approach.", type: "normal" },
    { id: 6,  time: "09:05:00", message: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the test:test password directly on other endpoints.", type: "highlight-teal" },
    { id: 7,  time: "09:06:00", message: "Great! I can access the dashboard using the 'X-UserId: 10032' header. The dashboard shows \"Welcome, John Doe\". This suggests an **IDOR vulnerability** - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application...", type: "highlight-orange" },
  ];
  
  export const INITIAL_FINDINGS: Finding[] = [
    { id: "f1", severity: "Critical", title: "SQL Injection in Authentication Endpoint", endpoint: "/api/users/profile",  description: "Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.", time: "10:45:23" },
    { id: "f2", severity: "High",     title: "Unauthorized Access to User Metadata",    endpoint: "/api/auth/login",    description: "Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.", time: "10:45:23" },
    { id: "f3", severity: "Medium",   title: "Broken Authentication Rate Limiting",     endpoint: "/api/search",        description: "No effective rate limiting detected on login attempts. Automated brute-force attempts possible.", time: "10:45:23" },
  ];
  
  export const NEW_LOGS: LogEntry[] = [
    { id: 8,  time: "09:07:00", message: "Testing SQL injection vectors on the login endpoint. Detected time-based blind injection via user parameter.", type: "highlight-red" },
    { id: 9,  time: "09:08:00", message: "Confirmed: `' OR SLEEP(5)--` causes 5 second delay. Database is MySQL. Extracting schema information now.", type: "code" },
    { id: 10, time: "09:09:00", message: "Rate limit check on /api/search: 1000 requests in 10 seconds — no throttling detected. Brute force is possible.", type: "highlight-orange" },
  ];
  
  export const NEW_FINDING: Finding = {
    id: "f4", severity: "Low", title: "Missing Security Headers", endpoint: "/api/*",
    description: "Several HTTP security headers are absent including X-Frame-Options, CSP, and HSTS.", time: "10:46:01"
  };
  
  