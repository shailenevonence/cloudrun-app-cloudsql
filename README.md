```markdown
# Express App with PostgreSQL Database Connection

This repository contains an Express.js application that connects to a PostgreSQL database using Knex.js for handling user login authentication. The application serves as a simple login page and handles login form submissions to authenticate users against a PostgreSQL database.

## Prerequisites

Before running the application, ensure you have the following:

- Node.js installed on your machine
- Access to a PostgreSQL database
- Google Cloud Platform (GCP) account with necessary permissions for creating Artifact Registry and deploying Cloud Run services

## Setup Instructions

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone <repository_url>
cd <repository_directory>
```

### 2. Install Dependencies

Install the required Node.js dependencies:

```bash
npm install
```

### 3. PostgreSQL Configuration

Replace the placeholder values in the code with your PostgreSQL connection details:

```javascript
// PostgreSQL connection configuration using Knex
const dbConfig = {
  client: 'pg', // PostgreSQL client
  connection: {
    host: process.env.INSTANCE_HOST, // PostgreSQL host
    port: process.env.DB_PORT, // PostgreSQL port
    user: process.env.DB_USER, // PostgreSQL user
    password: process.env.DB_PASS, // PostgreSQL password
    database: process.env.DB_NAME, // PostgreSQL database name
  },
  // ... Specify additional properties here for Knex configuration.
  // ...
};
```

### 4. Running the Application Locally

Start the application locally:

```bash
npm start
```

The server will start on `http://localhost:4000`. Access this URL in your browser to view the login page.

### 5. Creating Artifact Registry

#### Building Docker Image

To containerize the application, build a Docker image:

```bash
docker build -t <image_name> .
```

Replace `<image_name>` with your desired image name.

#### Artifact Registry Setup

1. **Access Google Cloud Console:**
    - Go to [Google Cloud Console](https://console.cloud.google.com/).
    - Sign in to your Google account.

2. **Open Artifact Registry:**
    - In the Google Cloud Console, navigate to the **Navigation menu** (☰) and select **Artifact Registry** under the "Tools" section.

3. **Create a Repository:**
    - Inside the Artifact Registry, click on **Create Repository**.
    - Provide a name for your repository and select the location where you want the repository to be created.
    - Click on "Create" to create the repository.

4. **Push the Docker Image to Artifact Registry:**
    - Tag the built image with the Artifact Registry location:

        ```bash
        docker tag <image_name> gcr.io/<project_id>/<repository_name>/<image_name>:<tag>
        ```

        Replace `<project_id>`, `<repository_name>`, `<image_name>`, and `<tag>` with your GCP project ID, Artifact Registry repository name, Docker image name, and tag.

    - Push the Docker image to the Artifact Registry:

        ```bash
        docker push gcr.io/<project_id>/<repository_name>/<image_name>:<tag>
        ```

        This command will upload the Docker image to the specified Artifact Registry repository in your GCP project.

### 6. Deploying to Cloud Run

#### Cloud Run Deployment

Deploy the Docker image to Cloud Run:

```bash
gcloud run deploy <service_name> \
--image gcr.io/<project_id>/<repository_name>/<image_name>:<tag> \
--platform managed \
--port 4000 \
--set-env-vars INSTANCE_HOST=<PostgreSQL_host>,DB_PORT=<PostgreSQL_port>,DB_USER=<PostgreSQL_user>,DB_PASS=<PostgreSQL_password>,DB_NAME=<PostgreSQL_database_name>

```

Replace the placeholders with the appropriate values:

- `<service_name>`: Name for your Cloud Run service.
- `<project_id>`, `<repository_name>`, `<image_name>`, `<tag>`: Your GCP project ID, Artifact Registry repository name, Docker image name, and tag.
- `<PostgreSQL_host>`, `<PostgreSQL_port>`, `<PostgreSQL_user>`, `<PostgreSQL_password>`, `<PostgreSQL_database_name>`: Your PostgreSQL database details.

Ensure to replace `<service_name>` and provide the actual details for PostgreSQL connection in the `--set-env-vars` flags.

This command deploys your Docker image to Cloud Run, configures the service to run on port 4000, and sets the specified environment variables required for connecting to the PostgreSQL database.


### 7. Cloud Run Environment Variables

Define environment variables in Cloud Run:

- `INSTANCE_HOST`: PostgreSQL host
- `DB_PORT`: PostgreSQL port
- `DB_USER`: PostgreSQL user
- `DB_PASS`: PostgreSQL password
- `DB_NAME`: PostgreSQL database name

Ensure to set these environment variables in the Cloud Run service configuration with appropriate values for your PostgreSQL database.

---

This README provides a guide to set up and deploy the Express.js application with a PostgreSQL database connection to Google Cloud Run via Artifact Registry. Adjustments might be needed according to your specific project setup and configurations.
```

This updated README includes the additional steps for creating an Artifact Registry in GCP, tagging, and pushing the Docker image to the Artifact Registry. It should provide a comprehensive guide for setting up and deploying the application. Adjust the placeholders (`<repository_url>`, `<image_name>`, `<project_id>`, `<tag>`, etc.) with your actual project details before using the instructions.
