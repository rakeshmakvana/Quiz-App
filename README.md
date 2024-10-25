# Quiz Application

An Quiz Application built with React, Node.js, Express, and MongoDB. This application allows users to add quizes and take quizes for realtime qustion and answer, and a responsive UI.

## Features

- Create, Delete Quiz
- Take a Quiz and qustion and answer give 
- Show your progress result in quiz
- Responsive and user-friendly interface
- Data stored in MongoDB Atlas

## Technologies Used

- **Frontend:** React, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **CSS Framework:** Bootstrap CSS

## Environment Variables

Before running the application, set up the following environment variables :-

  MONGO_URI  = your db link

  PORT = 5000


## Getting Started

### Clone the Repository

```bash
git clone https://github.com/rakeshmakvana/Quiz-App
```

## Frontend Setup

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```

## Backend Setup

```bash
cd backend
```

```bash
npm install
```

```bash
npm start
```

## URLs

Frontend URL: http://localhost:5173

Backend URL: http://localhost:5000

## Usage

The quiz app allows users to add quizzes in various languages, including both questions and answers. 
Users can take quizzes in any language, with an exam-style format. At the end of each quiz, 
results are displayed and stored in the user's history.

## Troubleshooting

If you encounter any issues while running the application, please ensure :-

You have set the correct environment variables.
The MongoDB Atlas connection string is correct and your IP is whitelisted.
Both frontend and backend servers are running without errors.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
