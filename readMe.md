# Full-Stack Video Management Application

## Project Description
This application is a full-stack solution for managing videos, including recording, storing, and playing videos. It includes three primary pages: a **Dashboard**, a **Video Recording Page**, and a **Video Player Page**. Video files are stored locally using backend APIs, with controllers for seamless user interactions.

---

## Key Features

### 1. Dashboard Page
- Provides an overview of the application.
- Displays a list of all recorded videos stored locally for a user.
- Navigation options to:
  - **Video Recording Page**: Record a new video.
  - **Video Player Page**: Play any saved video.

### 2. Video Recording Page
- Users can record videos directly from their device's camera.
- Videos are saved locally on the server using API calls.
- Full control over recording with options:
  - **Start** / **Pause** / **Resume** / **Stop Recording**.
  
### 3. Video Player Page
- Fetches video files from the server's local storage via APIs.
- Plays selected videos with full playback controllers:
  - **Play**, **Pause**, **Seek**, and **Volume Control**.

---

## Application Architecture

### 1. Storage
- Videos are stored in the local filesystem for quick access and retrieval.

### 2. API Design
- **POST** `/record`: Save a recorded video to the local storage.
- **GET** `/videos`: Retrieve a list of saved videos and their metadata.
- **GET** `/video/:id`: Fetch and stream a specific video for playback.

---

## Technical Requirements

### Frontend (React)
#### 1. Dashboard
- Displays a list of all recorded videos with metadata.
- Includes navigation buttons to the **Video Recording** and **Video Player** pages.

#### 2. Video Recording Page
- Uses the **MediaRecorder API** for video recording.
- Provides controllers for:
  - **Start**, **Pause**, **Resume**, and **Stop Recording**.
- Video files are uploaded to the backend via the **POST `/record`** API.

#### 3. Video Player Page
- Dropdown or list for selecting a video to play.
- Full playback controllers:
  - **Play**, **Pause**, **Seek**, and **Volume Adjustment**.
- Fetches video files from the backend using the **GET `/video/:id`** API.

---

### Backend (Node.js + Express)
#### API Endpoints
1. **POST** `/record`:
   - Accepts video file uploads from the frontend.
   - Saves video files in the local filesystem.
   
2. **GET** `/videos`:
   - Returns metadata (e.g., filenames, durations) of all saved videos.
   
3. **GET** `/video/:id`:
   - Streams a specific video file for playback.

---

## Installation and Setup

### Prerequisites
- **Node.js** (v16+)
- **MongoDB**
- **npm** (or **yarn**)
- A modern web browser for frontend testing.

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/RyomenDev/VIDEO_mgt_App.git
