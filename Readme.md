1. Build and Start the App with Docker
Run the following command to build and start the application using Docker Compose: docker-compose up --build
This will build the necessary images for your app and bring up the required containers, including the database.

2. Copy the Database Initialization Script
After the containers are up and running, copy the init.sql file into the database container: docker cp init.sql db:/init.sql

3. Execute the SQL Script to Populate the Database
Run the SQL script inside the database container to set up the necessary database structure and populate it with initial data: docker exec -it db psql -U postgres -d nawy -f /init.sql

Project Overview
This application is designed to manage apartments and projects, providing functionalities such as:

Apartment Management: You can add, search, and view apartments.

Project Management: Filter apartments by project and manage apartment data based on project selection.

Features
Apartment Search: Search for apartments by ID or name.

Project Filter: Filter apartments based on a specific project.

Pagination: Navigate through pages of apartments, with proper pagination controls.

Add New Apartments: Toggle the form to add new apartments and submit data to the database.

Backend
The backend of this application is powered by a PostgreSQL database running inside a Docker container. The database is initialized using an SQL script (init.sql), which creates the necessary schema and populates it with initial data.

Database (nawy): This contains the tables for apartments, projects, and relevant relationships.

APIs: The backend APIs allow fetching apartments based on specific filters such as apartment ID, name, or project ID. These APIs support searching, pagination, and CRUD operations for apartments.

The database is containerized using Docker and managed via Docker Compose. This setup ensures that the backend service is easily portable and scalable.

Frontend Explanation
The frontend is a React application designed to manage apartments and projects. It provides the following features:

Search Functionality: Users can search for apartments by name or ID. The frontend checks if the search query is numeric (for apartment IDs) or a string (for apartment names) and calls the appropriate API.

Project Filter: A dropdown allows users to filter apartments by project. When a project is selected, only the apartments associated with that project are shown. The user can also clear the filter.

Apartment Listing: Apartments are displayed in a grid layout. Each apartment is represented as a card that shows its details.

Pagination: The frontend supports pagination, allowing users to navigate through different pages of apartments.

Add Apartment Form: The frontend includes a form to add new apartments. The form can be toggled and submitted to the backend to create new apartments.

The frontend uses React Hooks (useState, useEffect) for state management and API calls. It also uses Axios or similar libraries to fetch data from the backend APIs.

Running the App Locally
After following the steps to set up the app using Docker, you can access the app locally by navigating to http://localhost:3000 in your browser.

You should be able to see the apartment listing, search, pagination, and project filtering features working as expected.

