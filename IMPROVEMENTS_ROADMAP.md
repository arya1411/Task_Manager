# Task Manager - Improvements Roadmap

This document provides a prioritized roadmap for improving the Task Manager application.

---

## 🚨 Critical Issues (Fix Immediately)

### 1. Bug Fixes
**Estimated Time:** 15 minutes

#### Bug #1: Typo in API Path
**File:** `Frontend/src/utils/apiPath.js`
```javascript
// Current (Line with typo)
UPDATE_TODO_CHEKCLIST : (taskId) => `/api/tasks/${taskId}/todo`,

// Fix
UPDATE_TODO_CHECKLIST : (taskId) => `/api/tasks/${taskId}/todo`,
```

#### Bug #2: Wrong Mongoose Method
**File:** `Backend/controllers/authController.js` (Line 97)
```javascript
// Current (Incorrect)
const user = await User.findOne(req.user.id);

// Fix
const user = await User.findById(req.user.id);
```

#### Bug #3: Variable Name Mismatch
**File:** `Backend/controllers/authController.js` (Lines 112-120)
```javascript
// Current (Inconsistent variable names)
const updateUser = await user.save();
res.json({
    _id : updateUser._id,
    name : updatedUser.name,    // ❌ Uses undeclared variable
    email : updatedUser.email,  // ❌ Uses undeclared variable
    role : updatedUser.role,    // ❌ Uses undeclared variable
    token : generateToken(updateUser._id),
});

// Fix (Consistent naming)
const updatedUser = await user.save();
res.json({
    _id : updatedUser._id,
    name : updatedUser.name,
    email : updatedUser.email,
    role : updatedUser.role,
    token : generateToken(updatedUser._id),
});
```

---

## 🔴 High Priority (Week 1-2)

### 2. Add Environment Configuration
**Estimated Time:** 30 minutes

Create `.env.example` file:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URL=mongodb://localhost:27017/task_manager

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_characters

# Client Configuration
CLIENT_URL=http://localhost:5173

# Admin Configuration
ADMIN_INVITE_TOKEN=your_admin_secret_token
```

### 3. Add Basic Security Improvements
**Estimated Time:** 1-2 hours

Install security packages:
```bash
cd Backend
npm install helmet express-rate-limit express-mongo-sanitize
```

Update `server.js`:
```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

// Add security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Prevent NoSQL injection
app.use(mongoSanitize());
```

### 4. Add Health Check Endpoint
**Estimated Time:** 15 minutes

Add to `server.js`:
```javascript
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
```

---

## 🟡 Medium Priority (Week 3-4)

### 5. Add Testing Infrastructure
**Estimated Time:** 4-6 hours

#### Backend Tests
```bash
cd Backend
npm install --save-dev jest supertest
```

Create `Backend/package.json` test script:
```json
"scripts": {
    "test": "jest --coverage",
    "test:watch": "jest --watch"
}
```

Create sample test file `Backend/__tests__/auth.test.js`:
```javascript
const request = require('supertest');
const app = require('../server');

describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
    });
});
```

#### Frontend Tests
```bash
cd Frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### 6. Add API Documentation
**Estimated Time:** 3-4 hours

```bash
cd Backend
npm install swagger-jsdoc swagger-ui-express
```

Create `Backend/swagger.js`:
```javascript
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Manager API',
            version: '1.0.0',
            description: 'API documentation for Task Manager',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
```

Update `server.js`:
```javascript
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
```

### 7. Add Request Validation
**Estimated Time:** 2-3 hours

```bash
cd Backend
npm install joi
```

Create `Backend/validations/taskValidation.js`:
```javascript
const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string().required().min(3).max(100),
    description: Joi.string().allow('').max(1000),
    priority: Joi.string().valid('Low', 'Medium', 'High'),
    status: Joi.string().valid('Pending', 'In_Progress', 'Completed'),
    dueDate: Joi.date().required(),
    assignedTo: Joi.array().items(Joi.string()).min(1).required(),
});

module.exports = { createTaskSchema };
```

---

## 🟢 Low Priority (Week 5-8)

### 8. Add Docker Support
**Estimated Time:** 2-3 hours

Create `Dockerfile` in Backend:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Create `docker-compose.yml` in root:
```yaml
version: '3.8'
services:
  backend:
    build: ./Backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URL=mongodb://mongo:27017/task_manager
    depends_on:
      - mongo
  
  frontend:
    build: ./Frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
  
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### 9. Add Logging
**Estimated Time:** 1 hour

```bash
cd Backend
npm install winston morgan
```

Create `Backend/utils/logger.js`:
```javascript
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = logger;
```

### 10. Add CI/CD Pipeline
**Estimated Time:** 2-3 hours

Create `.github/workflows/ci.yml`:
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install Backend Dependencies
      run: |
        cd Backend
        npm ci
    
    - name: Run Backend Tests
      run: |
        cd Backend
        npm test
    
    - name: Install Frontend Dependencies
      run: |
        cd Frontend
        npm ci
    
    - name: Build Frontend
      run: |
        cd Frontend
        npm run build
```

---

## 🔵 Future Enhancements (Month 2-3)

### 11. Advanced Features
- Task search and advanced filtering
- Email notifications (using NodeMailer or SendGrid)
- Real-time updates (Socket.io)
- Task comments and discussions
- File attachments for tasks
- Activity logs and audit trail
- Calendar view for tasks
- Task dependencies
- Recurring tasks
- Task templates
- Export tasks to CSV/PDF
- Mobile app (React Native)

### 12. Performance Optimizations
- Redis caching for frequently accessed data
- Database indexing
- Query optimization
- Lazy loading for frontend
- Image optimization
- CDN for static assets

### 13. User Experience Improvements
- Dark mode toggle
- Keyboard shortcuts
- Drag-and-drop task management
- Bulk operations
- Advanced notifications
- Task reminders
- Time tracking
- Task history/changelog

---

## 📊 Progress Tracking

| Priority | Item | Status | Estimated Time | Actual Time |
|----------|------|--------|----------------|-------------|
| Critical | Fix bugs | ⏳ Pending | 15 min | - |
| High | Environment config | ⏳ Pending | 30 min | - |
| High | Security improvements | ⏳ Pending | 2 hours | - |
| High | Health check | ⏳ Pending | 15 min | - |
| Medium | Testing infrastructure | ⏳ Pending | 6 hours | - |
| Medium | API documentation | ⏳ Pending | 4 hours | - |
| Medium | Request validation | ⏳ Pending | 3 hours | - |
| Low | Docker support | ⏳ Pending | 3 hours | - |
| Low | Logging | ⏳ Pending | 1 hour | - |
| Low | CI/CD pipeline | ⏳ Pending | 3 hours | - |

**Total Estimated Time for High Priority Items:** ~3 hours  
**Total Estimated Time for All Listed Items:** ~23 hours

---

## 🎯 Recommended Implementation Order

1. **Day 1:** Fix all critical bugs (15 min)
2. **Day 1:** Add environment configuration (30 min)
3. **Day 1:** Add security improvements (2 hours)
4. **Day 1:** Add health check endpoint (15 min)
5. **Week 1:** Add testing infrastructure (6 hours)
6. **Week 2:** Add API documentation (4 hours)
7. **Week 2:** Add request validation (3 hours)
8. **Week 3:** Add Docker support (3 hours)
9. **Week 3:** Add logging (1 hour)
10. **Week 4:** Add CI/CD pipeline (3 hours)

After completing these improvements, your Task Manager will be significantly more robust, maintainable, and production-ready!

---

**Remember:** Start small, test frequently, and commit often. Good luck! 🚀
