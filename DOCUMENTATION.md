# Avatar Engine Project Documentation

## Overview
This project is a full-stack application with a Python backend and a Next.js frontend. It includes services for avatar manipulation, speech synthesis, and more. The repository is organized for clarity and maintainability.

---

## Project Structure

- `apps/backend/` — Python FastAPI backend
  - `main.py` — Main entry point for the backend server
  - `requirements.txt` — Python dependencies
  - `services/` — Backend service modules (e.g., Azure token, SadTalker, state, swap)
  - `start.sh` — Script to start the backend
- `apps/frontend/` — Next.js frontend
  - `src/app/` — Main application code
  - `src/components/` — React components
  - `src/lib/` — Utility libraries
  - `public/` — Static assets
  - `package.json` — Node.js dependencies
- `apps/frontend_old_1755782182/` — Legacy frontend (for reference)
- `.gitignore` — Git ignore rules
- `README.md` — Project overview and instructions

---

## Environment Variables
- Use `.env` files for sensitive configuration (API keys, secrets, etc.).
- Example environment files are provided as `.env.example`.
- **Do not commit real `.env` files to version control.**

---

## Setup Instructions

### Backend (Python)
1. Create a virtual environment:
   ```sh
   python3 -m venv .venv
   source .venv/bin/activate
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and fill in your secrets.
4. Start the backend:
   ```sh
   ./start.sh
   ```

### Frontend (Next.js)
1. Install dependencies:
   ```sh
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in your secrets.
3. Start the frontend:
   ```sh
   npm run dev
   ```

---

## Development Tips
- Use separate virtual environments for Python projects.
- Never commit real `.env` files or secrets.
- Use the provided `.gitignore` to avoid committing unnecessary files.
- For frontend, use `npm run build` for production builds.
- For backend, ensure all dependencies are listed in `requirements.txt`.

---

## Contributing
1. Fork the repository and create a new branch for your feature or bugfix.
2. Follow the code style and structure of the project.
3. Submit a pull request with a clear description of your changes.

---

## License
This project is licensed under the MIT License. See `LICENSE` for details.
