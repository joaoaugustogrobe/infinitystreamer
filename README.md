# InfinityStreamer [Work In Progress]

InfinityStreamer is an open source project that aims to create and manage music livestreams, similar to those lo-fi livestreams that run 24/7 on YouTube. The app is built with a NestJS backend and a VueJS with Tailwind frontend.

## Features

- Create and manage multiple livestreams
- Handle multiple audio and video timelines
- Basic video editing functionality
- User authentication and authorization

## Current status:
- Base endpoints to create a stream (without integration with youtube or any other plataform), timelines and tracks. Also, we have the integration with the Upbeat API for fetching Tracks.
- UI is able to display the Streams and has the base for the Stream Editor, where is possible to render multiple timelines, add tracks from Upbeat and play/pause a AudioTimeline

<img width="1713" alt="Captura de Tela 2023-03-28 às 09 17 56" src="https://user-images.githubusercontent.com/34517408/228233568-753f6821-5f48-4991-839e-524e0d0a6c47.png">

## Installation

To run InfinityStreamer on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/infinitystreamer.git`
2. Run the dabase docker: `docker-compose up -d`
3. Install the dependencies on /api and /ui: `npm install`
4. rename the `.env.example` to `.env` on /api
5. Start the server: `npm run start:dev`
6. Start the frontend: `npm run dev`
7. Server runs on `localhost:3000`
8. Swagger runs on `localhost:3000/api`
9. UI runs on `http://localhost:5173`
