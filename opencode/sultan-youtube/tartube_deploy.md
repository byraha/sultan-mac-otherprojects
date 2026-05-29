# Tartube Deployment Plan

## Overview
Tartube is a GUI frontend for youtube-dl/yt-dlp to download and manage YouTube videos.

---

## 1. Prerequisites

### System Dependencies
```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-tk ffmpeg
```

### Verify Python
```bash
python3 --version   # Requires 3.6+
pip3 --version
```

---

## 2. Install yt-dlp (Backend Downloader)

### Option A: Using pipx (Recommended)
```bash
sudo apt install pipx
pipx ensurepath
pipx install yt-dlp
yt-dlp --version
```

### Option B: Using apt (System-wide)
```bash
pipx upgrade yt-dlp

# Update Tartube
pipx upgrade tartube
```

---

## 9. Quick Reference Commands

```bash
# Launch
tartube

# Launch with debug logs
tartube --debug

# Update everything
pipx upgrade tartube yt-dlp
```

### Option C: Using virtual environment
```bash
python3 -m venv ~/yt-venv
~/yt-venv/bin/pip install --upgrade yt-dlp
~/yt-venv/bin/yt-dlp --version
```

---

## 3. Install Tartube

### Option A: Install via pipx (Recommended)
```bash
pipx install tartube
tartube
```

### Option B: Install from Source (Latest)
```bash
git clone https://gitlab.com/axcore/tartube.git
cd tartube
pip3 install -r requirements.txt
python3 setup.py install
```

### Option C: Linux Binary (Portable)
Download from: https://github.com/axcore/tartube/releases

---

## 4. Run Tartube

```bash
tartube
```

Or from source directory:
```bash
python3 tartube.py
```

---

## 5. First-Time Configuration

1. **Set yt-dlp as the downloader**: Settings → Backend → Select `yt-dlp`
2. **Set download directory**: Settings → General → Output folder
3. **Configure video quality**: Settings → Formats → Preferred quality
4. **(Optional) Set cookies**: If downloading age-restricted content, import browser cookies

---

## 6. Verify Functionality

- **Test download**: Add a video URL → Click "Download Now"
- **Check output**: Verify files appear in the output directory
- **Playback test**: Open downloaded file with a media player

---

## 7. Troubleshooting

| Issue | Solution |
|-------|----------|
| `tkinter not found` | Install: `sudo apt install python3-tk idle3` |
| `ModuleNotFoundError` | Run: `pip3 install -r requirements.txt` |
| Download fails | Update yt-dlp: `pip3 install --upgrade yt-dlp` |
| GUI won't launch | Ensure display server running: `echo $DISPLAY` |

---

## 8. Maintenance

```bash
# Update yt-dlp regularly
pip3 install --upgrade yt-dlp

# Update Tartube
pip3 install --upgrade tartube
```

---

## 9. Quick Reference Commands

```bash
# Launch
tartube

# Launch with debug logs
tartube --debug

# Update everything
pip3 install --upgrade tartube yt-dlp
```
