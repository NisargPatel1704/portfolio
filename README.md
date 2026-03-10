# Nisarg Patel — Portfolio Website

A dark-themed, hacker-aesthetic portfolio built with **Python & Flask**.

## Project Structure
```
portfolio/
├── app.py               # Flask app & routes
├── requirements.txt     # Python dependencies
├── templates/
│   └── index.html       # Single-page Jinja2 template
└── static/
    ├── css/style.css    # Dark hacker aesthetic styles
    └── js/main.js       # Terminal animation, Medium RSS, skill bars
```

## Setup & Run

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run locally
python app.py

# 3. Open http://localhost:5000
```

## Features
- ⌨️ Terminal typing animation on hero
- 📡 Live Medium RSS feed via `/api/medium-posts`
- 📊 Animated skill bars with Intersection Observer
- 🎨 Full dark hacker aesthetic (green-on-black, scanlines, hex grid)
- 📱 Fully responsive (mobile hamburger menu)
- ⚡ Scroll-reveal animations throughout

## Deploy to Render / Railway
1. Push to GitHub
2. Connect repo to Render (free tier)
3. Set start command: `gunicorn app:app`
4. Add `gunicorn` to requirements.txt

## Customize
- Edit `PROJECTS` list in `app.py` to add/remove projects
- Edit `SKILLS` dict in `app.py` to update skill levels
- Replace `@nisargpatel24880` in app.py & HTML with your Medium username
