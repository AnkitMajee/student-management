import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import studentsRouter from './routes/students';
import cohortsRouter from './routes/cohorts';
import coursesRouter from './routes/courses';
import { errorHandler } from './middleware/errorHandler';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentsRouter);
app.use('/api/cohorts', cohortsRouter);
app.use('/api/courses', coursesRouter);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});