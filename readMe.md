## Before moving to the link, kindly note that this will not work as expected, as the media files are uploaded to localStorage instead of a cloud storage service (for the reasons mentioned below in the last).

## If you still wish to proceed, please clone the project and run it on a local server.
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
   ```

#### Deploying to a Server (e.g., Heroku, AWS, etc.)

When deploying to cloud platforms like Heroku, AWS EC2, Google Cloud, or similar platforms, this approach might not work as expected for the following reasons:

Ephemeral File Systems: On many cloud platforms (like Heroku), the file system is ephemeral, which means files saved to the server may not persist across server restarts. This means that if your server restarts, the uploaded files could be lost.

No Permanent Disk Storage: Most cloud environments don't provide permanent storage in the way local machines do. In such cases, you need to use a cloud storage service (e.g., AWS S3, Google Cloud Storage) for persistent file storage.

#### Solution for Cloud Deployment

If you want to store videos in a cloud environment (like AWS S3 or Google Cloud Storage), you would need to:

Use Cloud Storage (e.g., AWS S3): You can modify your multer configuration to upload videos to cloud storage instead of your local file system.
