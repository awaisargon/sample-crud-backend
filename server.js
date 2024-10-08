require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/error');
const notFound = require('./middleware/notFound');
const swaggerSpec = require('./docs/swagger');

// Connect to database
connectDB();

const app = express();

// Set security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
        styleSrc: ["'self'", "cdn.example.com"],
        imgSrc: ["data:", "cdn.example.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      }
    },
    hsts: {
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true
    },
    referrerPolicy: { policy: "same-origin" },
    frameguard: { action: "deny" },
    dnsPrefetchControl: { allow: false },
    ieNoOpen: true,
    noSniff: true,
    hidePoweredBy: true
  })
);

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // Limit each IP to 100 requests
  message: 'Too many requests, please try again later',
});
app.use('/api/', apiLimiter);

// Body parser
app.use(express.json({ limit: '10kb' }));

// Prevent XSS attacks
app.use(xss());

// Sanitize data
app.use(mongoSanitize());

// Compress responses
app.use(compression());

// Enable CORS with domain restrictions
const corsOptions = {
  origin: [`${process.env.FRONTEND_URL}`],  // Restrict to your domain
  methods: 'GET,POST,PATCH,DELETE',
  credentials: true,
};
app.use(cors(corsOptions));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cars', require('./routes/carRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));

// Not found middleware
app.use(notFound);

// Error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
