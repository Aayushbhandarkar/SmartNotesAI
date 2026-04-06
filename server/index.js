import express from "express"
import dotenv from "dotenv"
import connectDb from "./utils/connectDb.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.route.js"
import notesRouter from "./routes/genrate.route.js"
import pdfRouter from "./routes/pdf.route.js"
import creditRouter from "./routes/credits.route.js"
import { stripeWebhook } from "./controllers/credits.controller.js"

// ✅ FIX: Only load .env in development, not in production
if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const app = express()

app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// ✅ FIX: Update CORS to handle both development and production
const allowedOrigins = [
  'https://smartnotesaiclient.onrender.com',
  'http://localhost:3000',
  'http://localhost:5173'  // Vite default port
]

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}))

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000

// ✅ ADD THIS DEBUGGING - Check if env vars are loaded (remove after fixing)
console.log('=== Environment Variables Status ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URL:', process.env.MONGODB_URL ? '✅ Set' : '❌ Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Set' : '❌ Missing');
console.log('CLIENT_URL:', process.env.CLIENT_URL);
console.log('=====================================');

app.get("/",(req,res)=>{
    res.json({message:"ExamNotes AI Backend Running 🚀"})
})

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/notes", notesRouter)
app.use("/api/pdf", pdfRouter)
app.use("/api/credit", creditRouter)

app.listen(PORT,()=>{
    console.log(`✅ Server running on port ${PORT}`)
    connectDb()
})
