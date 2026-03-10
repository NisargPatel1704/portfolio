from flask import Flask, render_template, jsonify
import urllib.request
import xml.etree.ElementTree as ET
import re

app = Flask(__name__)

MEDIUM_RSS = "https://medium.com/feed/@nisargpatel24880"

PROJECTS = [
    {
        "id": 1,
        "title": "Cybersecurity Portfolio",
        "subtitle": "Python Security Toolkit",
        "description": "A curated collection of CLI-based security tools covering digital forensics, network vulnerability assessment, web app pentesting (SQLi/XSS), and CTF write-ups. Built with Python, Nmap automation, and YARA rules.",
        "tags": ["Python", "Penetration Testing", "Digital Forensics", "Nmap", "YARA", "CTF"],
        "category": "security",
        "github": "https://github.com/NisargPatel1704/cybersecurity-portfolio",
        "highlights": [
            "Modular CLI security tools suite",
            "Digital forensics with pytsk3 & YARA",
            "Automated network vulnerability assessment",
            "SQLi & XSS vulnerability scanner",
            "PicoCTF write-ups & solutions"
        ]
    },
    {
        "id": 2,
        "title": "Memory AI",
        "subtitle": "RAG-Powered Conversational AI",
        "description": "Full-stack AI application with long-term memory using Retrieval-Augmented Generation (RAG). Powered by GPT-4, FastAPI backend, PostgreSQL memory store, and containerized with Docker Compose.",
        "tags": ["Python", "FastAPI", "GPT-4", "PostgreSQL", "Docker", "RAG"],
        "category": "ai",
        "github": "https://github.com/NisargPatel1704/my-memory-ai",
        "highlights": [
            "GPT-4 with persistent long-term memory",
            "RAG pattern for grounded AI responses",
            "FastAPI + PostgreSQL backend",
            "Docker Compose orchestration",
            "Web-based chat interface"
        ]
    }
]

SKILLS = {
    "Languages": [
        {"name": "Python", "level": 90},
        {"name": "JavaScript", "level": 70},
        {"name": "Bash/Shell", "level": 75},
        {"name": "SQL", "level": 72},
        {"name": "HTML/CSS", "level": 80},
    ],
    "Frameworks": [
        {"name": "Django", "level": 85},
        {"name": "FastAPI", "level": 78},
        {"name": "Flask", "level": 80},
    ],
    "Security": [
        {"name": "Penetration Testing", "level": 75},
        {"name": "Digital Forensics", "level": 70},
        {"name": "Web App Security", "level": 78},
        {"name": "Network Security", "level": 72},
    ],
    "Tools": [
        {"name": "Docker", "level": 75},
        {"name": "Git/GitHub", "level": 85},
        {"name": "Nmap", "level": 78},
        {"name": "Burp Suite", "level": 70},
        {"name": "Wireshark", "level": 72},
    ]
}

@app.route("/")
def index():
    return render_template("index.html", projects=PROJECTS, skills=SKILLS)

@app.route("/api/medium-posts")
def medium_posts():
    try:
        req = urllib.request.Request(MEDIUM_RSS, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as response:
            xml_data = response.read()
        root = ET.fromstring(xml_data)
        ns = {'media': 'http://search.yahoo.com/mrss/'}
        channel = root.find('channel')
        posts = []
        for item in channel.findall('item')[:6]:
            title = item.findtext('title', '')
            link = item.findtext('link', '')
            pub_date = item.findtext('pubDate', '')
            description = item.findtext('description', '')
            summary = re.sub('<[^<]+?>', '', description)[:220] + '...'
            categories = [c.text for c in item.findall('category') if c.text][:3]
            thumbnail = None
            thumb_el = item.find('media:thumbnail', ns)
            if thumb_el is not None:
                thumbnail = thumb_el.get('url')
            if not thumbnail:
                img_match = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', description)
                if img_match:
                    thumbnail = img_match.group(1)
            posts.append({
                "title": title, "link": link, "published": pub_date,
                "summary": summary, "thumbnail": thumbnail, "tags": categories
            })
        return jsonify({"posts": posts, "status": "ok"})
    except Exception as e:
        return jsonify({"posts": [], "status": "error", "message": str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
