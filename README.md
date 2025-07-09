# NeighborFit

NeighborFit helps you find neighborhoods that match your lifestyle preferences, such as commute time, crime rate, green spaces, cost of living, and internet access.

## Features
- User-friendly form to input your preferences
- Displays top matching neighborhoods
- Responsive design using Bootstrap
- Backend server for data processing

## Project Structure
- `index.html` – Main web page
- `style.css` – Custom styles
- `script.js` – Frontend logic
- `server.js` – Node.js backend server
- `neighborhoods.json` – Neighborhood data

## Setup Instructions

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed

### 2. Install Dependencies
This project does not require extra dependencies beyond Node.js (unless you add more features).

### 3. Run the Server
Open a terminal in the project directory and run:

```
node server.js
```

### 4. Open the App
- If the server serves the frontend, open the URL shown in the terminal (e.g., http://localhost:3000).
- Otherwise, open `index.html` directly in your browser (some features may require running via the server).

## Customization
- Edit `neighborhoods.json` to update or add neighborhood data.
- Adjust frontend logic in `script.js` as needed.

## License
MIT
