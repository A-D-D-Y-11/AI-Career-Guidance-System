# AI-Based Career Guidance System

This is a full-stack MERN application designed to provide users with personalized career suggestions using the power of Google's Gemini AI. The project is fully containerized with Docker for easy setup and deployment.

## Features

-   **User Authentication:** Secure user registration and login system using JSON Web Tokens (JWT).
-   **AI-Powered Suggestions:** Integrates with the Google Gemini API to provide intelligent and nuanced career advice based on user input.
-   **Professional UI/UX:** A modern, responsive, and dark-themed user interface built with Material-UI (MUI), featuring a professional landing page and dashboard.
-   **User Profile & History:** Users have a profile page where they can view a complete history of their past career searches.
-   **Scalable Backend:** The Node.js backend is built with a professional controller/service architecture and includes server-side validation with Zod.
-   **Containerized with Docker:** The entire application (frontend and backend) is containerized using Docker and Docker Compose for consistent and reliable deployment.

## Tech Stack

**Frontend:**
-   React.js
-   Material-UI (MUI) for components and styling
-   React Router for navigation
-   Axios for API requests

**Backend:**
-   Node.js
-   Express.js
-   MongoDB with Mongoose
-   JSON Web Token (JWT) for authentication
-   Bcrypt.js for password hashing
-   Zod for validation
-   Google Generative AI SDK (Gemini)

**Database:**
-   MongoDB Atlas

**DevOps:**
-   Docker
-   Docker Compose

## Setup and Installation

### Prerequisites

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [Docker Desktop](https://www.docker.com/products/docker-desktop/)
-   A MongoDB Atlas account and connection string
-   A Google Gemini API key

---

### Method 1: Running with Docker (Recommended)

This is the simplest way to get the entire application running with a single command.

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd career-guidance-project
    ```

2.  **Create the backend `.env` file:**
    -   Navigate to the `server` directory.
    -   Create a file named `.env`.
    -   Add the following environment variables, replacing the placeholder values with your actual keys:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=a_very_strong_secret_key_for_jwt
        PORT=5001
        GEMINI_API_KEY=your_google_gemini_api_key
        ```

3.  **Build and run the containers:**
    -   Navigate back to the root project directory.
    -   Run the following command:
        ```bash
        docker-compose up --build
        ```

4.  **Access the application:**
    -   Frontend: `http://localhost:3000`
    -   Backend: `http://localhost:5001`

---

### Method 2: Running Locally (Without Docker)

#### Backend Server

1.  **Navigate to the `server` directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create the `.env` file** as described in the Docker setup above.

4.  **Start the server:**
    ```bash
    npm run dev
    ```

#### Frontend Client

1.  **Open a new terminal** and navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the client:**
    ```bash
    npm start
    ```
