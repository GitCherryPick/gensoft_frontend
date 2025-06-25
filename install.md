# Installing Guide

This repository contains the frontend components and views of the **Pythonidae** project, developed by the **GitCherryPick** team. 
The architecture fllows a modular structure, located inside the application/ folder:
-   `app/`: main views organized by user roles (e.g., student, teacher). Views according to functions inside each role.
-   `components/`: define reusable UI components
-   `hooks/`: custom hooks to ensure consistency across the project
-   `lib/`: API connection logic and helpers
-   `public/`: static assets such as images and themes
-   `styles`: global styles.css

## Local development Setup

1. Clone the repository:
   ```
   git clone https://github.com/GitCherryPick/gensoft_frontend.git
   cd gensoft_frontend
   ```

2. You need to create .env file at the level of the application/ inside the project, you need copy the content of .env.example:
   ```
   NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8010
   NEXT_PUBLIC_SANDBOX_SERVICE_URL=http://localhost:8002
   NEXT_PUBLIC_CONTENT_SERVICE_URL=http://localhost:8003
   NEXT_PUBLIC_AI_SERVICE_URL=http://localhost:8005
   NEXT_PUBLIC_USER_SERVICE_URL=http://localhost:8006
   ```
   > These ports correspond to the backend services, Rfer to the backend project for more details: [backend project](https://github.com/GitCherryPick/gensoft_infraestructure) .
3. In this case, this repository needs Node.js, then execute:
   ```
   npm install
   npm run dev
   ```
6. The project - frontend should now be running locally! :)

## Deployment

We currently use Netlify for deployment, visit the live project here: https://gensoft.netlify.app/home 

### Additional documentation
For more information about the project you need visit [dev.md](https://github.com/GitCherryPick/gensoft_frontend/blob/main/application/DEV.md). 
Or running app with more details: [DEPLOY.md](https://github.com/GitCherryPick/gensoft_frontend/blob/main/application/DEPLOY.md)