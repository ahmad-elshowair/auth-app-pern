import express, { Application, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/config';
import routes from './routes';
import cors from "cors"

const app: Application = express();

const port = config.port || 3000;

// add a limiter of requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: "you have requested a lot, in 15 mins you can try again later",
});

// use a middleware of parsing incoming requests
app.use(express.json());

// user cors
app.use(cors());

// use a middleware of parsing incoming requests
app.use(express.urlencoded({ extended: true }));

// user the limiter
app.use(limiter);

// securing the express requests
app.use(helmet());


app.use(morgan('tiny'));
// use the routes
app.use(routes);


app.get("/", (req: Request, res: Response) => {
  res.send("Hey dud from the main route");
});


app.listen(port, () => {
  console.log(`sever works on http://localhost:${port}`);
});