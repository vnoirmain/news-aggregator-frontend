# News Aggregator Frontend

Welcome to the News Aggregator Frontend, a Next.js project that complements the News Aggregator Backend for a seamless news browsing experience. This project allows users to interact with the backend APIs, view news, apply filters, and customize their preferences.

## Overview

The primary features of this project include:

1. **Interactive UI**: A user-friendly interface for browsing and interacting with news content.
2. **Filtering**: Users can search for news, apply filters, and customize their preferences.
3. **Seamless Integration**: Connects with the News Aggregator Backend to fetch and display news data.

## Running the Project with Docker

To run the project locally using Docker, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/vnoirmain/news-aggregator-frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd news-aggregator-frontend
   ```

3. Build the Docker image:

   ```bash
   docker build -t news-aggregator-frontend .
   ```

4. Run the Docker container:

   ```bash
   docker run -p 3000:3000 news-aggregator-frontend
   ```

The project will be accessible at [http://localhost:3000](http://localhost:3000).

## Development

To run the project in development mode:

```bash
docker run -p 3000:3000 -v $(pwd):/app news-aggregator-frontend npm run dev
```
