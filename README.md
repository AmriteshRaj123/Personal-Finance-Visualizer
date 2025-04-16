# Personal Finance Visualizer


<img width="649" alt="Screenshot 2025-04-16 at 10 32 38 AM" src="https://github.com/user-attachments/assets/822f5101-eeb1-4f59-9b93-271fe79e0d58" />

A modern web application for tracking and visualizing personal finances. Built with React, Material-UI, and Express.js.

## Features

- Add, edit, and delete financial transactions
- View transactions in a sortable table
- Visualize monthly expenses through interactive charts
- Modern and responsive Material-UI design
- RESTful API backend with MongoDB

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- Chart.js with react-chartjs-2
- Axios for API calls
- date-fns for date formatting
- Vite as build tool

### Backend
- Express.js
- MongoDB with Mongoose
- CORS enabled
- Environment variables support

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Personal-Finance-Visualizer
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/finance-visualizer
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

## API Endpoints

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
