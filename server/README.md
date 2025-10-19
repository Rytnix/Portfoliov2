# Portfolio Backend Server

This is the backend server for handling contact form email submissions.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### POST /api/send-email
Sends an email using Gmail SMTP.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email sent successfully!"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "Server is running"
}
```

## Configuration

The email is configured to:
- **From:** utkarshrock1510@gmail.com (using app password)
- **To:** work.utkarsh19@gmail.com
- **Reply-To:** The sender's email from the form

## Note

Gmail app password is hardcoded for simplicity. For production, use environment variables.
