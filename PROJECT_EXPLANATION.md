# LuxEstate - Full-Stack Real Estate Application Document

Welcome to your upgraded **LuxEstate** project! This document explains the technology stack, the file structure, the database schemas, and how the different components of your application interact.

---

## 1. Technology Stack (Tech Stack)

We transitioned this project from a static webpage to a modern **Full-Stack Application** using:

*   **Frontend (Client-side):**
    *   **React (v18):** Powering the interactive UI components, states, and client-side page routing without full page refreshes.
    *   **Babel:** Used to translate React's JSX syntax directly in the browser.
    *   **Vanilla CSS:** Custom styles for layout grids, color tokens, margins, cards, forms, and glassmorphism.
    *   **Leaflet.js & OpenStreetMap:** A free, open-source mapping library that displays maps and locations without requiring complex API keys or credit card setups.
*   **Backend (Server-side):**
    *   **Node.js:** A JavaScript runtime used to build the server that runs on your computer.
    *   **Express.js:** A minimal web framework for Node.js used to build APIs and serve the frontend files.
*   **Database (Storage):**
    *   **SQL (SQLite3):** A lightweight, file-based SQL database engine. The entire database is stored in a single file called `database.sqlite` inside your project folder—no external database server installation is needed!

---

## 2. Project File Structure

```text
real-estate-app/
├── database.sqlite       # The SQL database file (created automatically)
├── index.html            # Main HTML entry page (loads Leaflet, React CDNs)
├── styles.css            # CSS stylesheet defining look and feel
├── app.jsx               # React application code (Pages, map logic, dashboard)
├── server.js             # Node.js backend server, seeds SQL data, hosts APIs
├── package.json          # Node.js dependencies list (Express, SQLite3, CORS)
└── package-lock.json     # Locks npm package versions
```

---

## 3. Database Schemas (SQL Tables)

We have two tables in the SQLite database:

### A. `properties` Table
Stores details of all 30 properties.
*   `id` (INTEGER, Primary Key): Unique identifier for each listing.
*   `title` (TEXT): Name of the listing (e.g. "Sea-facing Luxury Villa").
*   `location` (TEXT): City/Neighborhood (e.g. "Rushikonda, Visakhapatnam").
*   `price` (INTEGER): Cost in INR.
*   `bedrooms` (INTEGER): Number of beds.
*   `bathrooms` (REAL): Number of baths.
*   `area` (INTEGER): Square footage.
*   `image` (TEXT): Unsplash image URL.
*   `featured` (INTEGER): `1` if it is featured on the home page, `0` if not.
*   `type` (TEXT): Villa, Apartment, House, Penthouse, or Estate.
*   `status` (TEXT): "Sale" or "Rent".
*   `description` (TEXT): Narrative text.
*   `agent_name` (TEXT): Assigned agent (e.g. "K. Venkata Rao").
*   `agent_phone` (TEXT): Contact number.
*   `latitude` / `longitude` (REAL): GPS coordinates (e.g. `17.7818`, `83.3778` for Rushikonda).

### B. `messages` Table
Stores inquiry messages submitted by users.
*   `id` (INTEGER, Primary Key): Unique message ID.
*   `property_id` (INTEGER): Listing ID.
*   `property_title` (TEXT): Listing title.
*   `name` (TEXT): Buyer's name.
*   `email` (TEXT): Buyer's email.
*   `phone` (TEXT): Buyer's phone number.
*   `message` (TEXT): Message text.
*   `date_sent` (TEXT): Timestamp in ISO format.

---

## 4. API Reference (Backend Endpoints)

The Node.js backend server (`server.js`) exposes these REST endpoints:

1.  **`GET /api/properties`**:
    *   Retrieves listings.
    *   Supports query parameters for filtering:
        *   `?search=Visakhapatnam` (Searches titles, locations, and descriptions).
        *   `?type=Villa` (Filters by property type).
        *   `?status=Rent` (Filters by rent vs sale).
2.  **`GET /api/properties/:id`**:
    *   Fetches the complete details for a single property by its ID.
3.  **`POST /api/messages`**:
    *   Saves a contact message. Request body contains client details.
4.  **`GET /api/messages`**:
    *   Fetches all inquiries to display on the Admin Dashboard.

---

## 5. Code Explanation Bit-by-Bit

### A. The HTML Wrapper (`index.html`)
The page has a single container: `<div id="root"></div>`.
It loads the stylesheets and React scripts:
*   Imports **Leaflet.js CSS and JS** to initialize the map interface.
*   Loads **React** and **ReactDOM** from UNPKG CDNs.
*   Loads **Babel** to run the browser JSX compiler.
*   Runs `<script type="text/babel" src="app.jsx"></script>` to boot the frontend.

### B. The React App (`app.jsx`)
Coordinates the state and renders pages based on the current `page` state variable (`home`, `listings`, `details`, `login`, `register`, `admin`).

1.  **Utilities (`formatPrice` & `formatPriceIndian`):**
    *   `formatPrice` formats raw integers into Indian Rupees (INR).
    *   `formatPriceIndian` formats prices elegantly for labels (e.g. `₹85 Crore` or `₹4.5 Lakh`) to keep the UI clean.
2.  **The Interactive Map (`PropertyDetails` page):**
    *   Inside a `useEffect` hook, the page initializes a Leaflet map targeting `<div id="property-map">`.
    *   `L.map('map-inner').setView([latitude, longitude], 14)` centers the map.
    *   `L.marker([latitude, longitude]).addTo(map)` drops a red location pin that opens a popup description on click.
3.  **The Dynamic Range Meter (`Listings` page):**
    *   Determines the maximum price among listings matching selected filters (Villa, Apartment, Rent, Buy).
    *   Limits are set dynamically: filtering "For Rent" narrows the slider bounds to Lakhs, while "For Buy" expands it to Crores.
    *   Adjusts step intervals (e.g., `5,000` steps for rent, `5,000,000` steps for sales) to make sliding feel smooth and natural.
4.  **Form Inquiries:**
    *   Submits inputs to `POST /api/messages` asynchronously using the JavaScript `fetch` API and displays a clean status bubble to the user.
5.  **Admin Inquiries Dashboard:**
    *   A table-based view listing entries from the `messages` table in the database so you can monitor who is inquiring about what.

### C. The Express Server (`server.js`)
*   Initializes the database connection.
*   Sets up SQL tables (`properties`, `messages`).
*   Runs a seeder function. If the database is new and empty, it inserts the 30 Indian real estate listings with customized coordinates, agent names, and numbers.
*   Declares express routing for frontend static directories and `/api/...` calls.

---

## 6. How to Run Locally

If you need to start the application again in the future:
1.  Open terminal in the project directory.
2.  Start the Node.js server:
    ```bash
    node server.js
    ```
3.  Open `http://localhost:3000` in your web browser.
