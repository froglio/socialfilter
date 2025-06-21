# Social Filter 🚀

A powerful **Social Listening** and **Social Media Monitoring** application that leverages AI to generate intelligent search filters and scrape social media posts from X (formerly Twitter). Built with modern web technologies and designed for social media analysts, marketers, and researchers.

## 📋 Table of Contents

- [Concept & Context](#concept--context)
- [Objective](#objective)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## 🎯 Concept & Context

Social Filter addresses the growing need for intelligent social media monitoring and sentiment analysis. In today's digital landscape, businesses and researchers need to track mentions, analyze sentiment, and gather insights from social media platforms efficiently.

Traditional social media monitoring tools often require manual filter creation and lack the intelligence to understand natural language queries. Social Filter bridges this gap by:

- **AI-Powered Filter Generation**: Uses advanced language models to convert natural language queries into sophisticated boolean search filters
- **Intelligent Scraping**: Automatically extracts relevant posts from X using generated filters
- **User-Friendly Interface**: Provides an intuitive web interface for non-technical users
- **Export Capabilities**: Allows users to download screenshots of posts for reporting and analysis

## 🎯 Objective

The primary objective of Social Filter is to democratize social media monitoring by making it accessible to users without technical expertise in boolean search syntax or API programming. The application aims to:

1. **Simplify Social Listening**: Convert natural language requests into precise search filters
2. **Automate Data Collection**: Streamline the process of gathering social media data
3. **Enhance Analysis**: Provide clean, structured data for sentiment analysis and trend monitoring
4. **Improve Efficiency**: Reduce manual work in social media monitoring tasks

## ✨ Key Features

- 🤖 **AI-Generated Filters**: Automatically creates boolean search filters from natural language prompts
- 📅 **Date Range Filtering**: Supports custom date ranges for targeted searches
- 🔍 **Advanced Search**: Uses sophisticated boolean logic for precise results
- 📱 **Social Media Integration**: Direct integration with X (Twitter) for real-time data
- 📊 **Results Visualization**: Clean, organized display of scraped posts
- 📸 **Screenshot Export**: Generate downloadable screenshots of posts
- 🎨 **Modern UI**: Responsive, user-friendly interface built with React
- ⚡ **Real-time Processing**: Fast filter generation and data scraping

## 🏗️ Architecture

Social Filter follows a **client-server architecture** with clear separation of concerns:

```
socialfilter/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Application entry point
│   └── package.json
├── server/                 # Node.js backend API
│   ├── src/
│   │   └── server.ts      # Express server with API endpoints
│   ├── scripts/
│   │   └── twitter_scraper.py  # Python script for X scraping
│   └── package.json
├── utils/                  # Shared utility functions
│   ├── dateUtils.ts       # Date formatting utilities
│   └── decodeHtml.ts      # HTML decoding utilities
└── package.json           # Root package configuration
```

### How It Works

1. **Frontend (React + TypeScript + Vite)**

   - Provides an intuitive user interface for entering search prompts
   - Displays generated filters and search results
   - Handles user interactions and API calls
   - Built with modern React patterns and TypeScript for type safety

2. **Backend (Node.js + Express + TypeScript)**

   - Node based RESTful API server handling filter generation and data scraping
   - Integrates with Groq AI API for intelligent filter generation
   - Manages Python script execution for X scraping
   - Handles screenshot generation and file downloads

3. **Python Integration**

   - Uses `twscrape` library for X data extraction
   - Executes as a separate process for better performance
   - Returns structured JSON data for frontend consumption

4. **AI Integration**
   - Leverages Groq's Llama 3.3 70B model for filter generation
   - Converts natural language to sophisticated boolean search syntax
   - Supports multiple languages and complex search scenarios

## 🛠️ Technologies Used

### Frontend

- **React 19** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Sonner** - Toast notifications
- **Axios** - HTTP client for API communication

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for API development
- **TypeScript** - Type-safe server-side development
- **Puppeteer** - Screenshot generation
- **Archiver** - ZIP file creation
- **Axios** - HTTP client for external API calls

### AI & Data Processing

- **Groq API** - High-performance AI inference
- **Llama 3.3 70B** - Advanced language model
- **twscrape** - X (Twitter) scraping library
- **Python 3** - Data processing and scraping

### Development Tools

- **ESLint** - Code linting and formatting
- **Nodemon** - Development server with auto-reload
- **Concurrently** - Running multiple processes simultaneously

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **Python 3** (v3.8 or higher)
- **npm** or **yarn** package manager
- **Git**

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd socialfilter
```

### Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install client dependencies
npm install --prefix client

# Install server dependencies
npm install --prefix server
```

### Step 3: Install Python Dependencies

```bash
# Navigate to server directory
cd server

# Install Python dependencies
pip install twscrape python-dotenv
```

### Step 4: Environment Configuration

Create a `.env` file in the `server/` directory with the following variables:

```env
# Groq AI API Configuration
GROQ_API_KEY=your_groq_api_key_here

# X (Twitter) Account Credentials
USERNAME=your_twitter_username
PASSWORD=your_twitter_password
EMAIL=your_twitter_email
EMAIL_PASSWORD=your_email_password

# X (Twitter) Cookies (optional, for enhanced authentication)
COOKIES_CT0=your_ct0_cookie
COOKIES_AUTH_TOKEN=your_auth_token
COOKIES_GUEST_ID=your_guest_id
```

### Step 5: Start the Application

```bash
# From the root directory
npm start
```

This will start both the client (port 5173) and server (port 3000) simultaneously.

## ⚙️ Configuration

### API Keys Setup

1. **Groq API Key**: Sign up at [Groq Console](https://console.groq.com/) and obtain your API key
2. **X Account**: Use a valid X account for scraping (consider using a dedicated account for this purpose)

### Environment Variables

| Variable             | Description                           | Required |
| -------------------- | ------------------------------------- | -------- |
| `GROQ_API_KEY`       | Groq AI API key for filter generation | Yes      |
| `USERNAME`           | X username for scraping               | Yes      |
| `PASSWORD`           | X password for scraping               | Yes      |
| `EMAIL`              | X email address                       | Yes      |
| `EMAIL_PASSWORD`     | Email password for X account          | Yes      |
| `COOKIES_CT0`        | X session cookie                      | No       |
| `COOKIES_AUTH_TOKEN` | X authentication token                | No       |
| `COOKIES_GUEST_ID`   | X guest ID                            | No       |

## 📖 Usage

### 1. Access the Application

Open your browser and navigate to `http://localhost:5173`

### 2. Enter Your Search Prompt

In the search prompt field, describe what you're looking for in natural language. For example:

- "Find posts criticizing our new product launch"
- "Search for positive mentions of our brand in the last week"
- "Look for complaints about customer service"

### 3. Set Date Range

Choose the start and end dates for your search period.

### 4. Generate Filters

Click "Generate Filters" to let the AI create sophisticated boolean search filters based on your prompt.

### 5. Select and Execute Filters

Review the generated filters and click on any filter to execute the search and retrieve posts.

### 6. View Results

Browse through the scraped posts in the results grid. Each post shows:

- Content text
- Publication date
- Author information
- Direct link to the post

### 7. Export Screenshots (Optional)

Use the download feature to generate screenshots of posts for reporting purposes.

## 🔌 API Endpoints

### POST `/generate-filters`

Generates boolean search filters from natural language prompts.

**Request Body:**

```json
{
  "prompt": "Find posts criticizing our new product",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31"
}
```

**Response:**

```json
{
  "filters": [
    "(critic* OR complaint* OR negative OR bad OR terrible) AND product since:2024-01-01 until:2024-01-31 lang:pt",
    "(disappointed OR unsatisfied OR poor) AND product since:2024-01-01 until:2024-01-31 lang:pt"
  ]
}
```

### POST `/scrape`

Executes a search filter and returns scraped posts.

**Request Body:**

```json
{
  "filter": "(critic* OR complaint*) AND product since:2024-01-01 until:2024-01-31 lang:pt"
}
```

**Response:**

```json
{
  "posts": [
    {
      "url": "https://x.com/user/status/123456789",
      "content": "Post content here...",
      "date": "2024-01-15T10:30:00Z",
      "author": {
        "username": "username",
        "name": "Display Name",
        "avatar": "https://pbs.twimg.com/profile_images/..."
      }
    }
  ]
}
```

### POST `/download-posts`

Generates screenshots of posts and returns a ZIP file.

**Request Body:**

```json
{
  "posts": [
    {
      "content": "Post content",
      "date": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Response:** ZIP file containing PNG screenshots

### Development Guidelines

- Follow TypeScript best practices
- Maintain consistent code formatting with ESLint
- Add appropriate error handling
- Include comments for complex logic
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Notes

- **Rate Limiting**: Be mindful of X's rate limits and terms of service
- **Account Security**: Use dedicated accounts for scraping to avoid affecting personal accounts
- **Data Privacy**: Respect user privacy and comply with relevant data protection regulations
- **API Usage**: Monitor your Groq API usage to manage costs effectively

---

**Built with ❤️ for the social media monitoring community**
