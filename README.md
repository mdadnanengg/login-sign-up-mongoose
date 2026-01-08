# Login Sign-Up API

Simple Express.js authentication API with MongoDB and Mongoose.

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file:

```env
PORT=8080
MongoDB_URL='mongodb://0.0.0.0:27017/userDB'
```

## Run

```bash
npm run dev
```

Server runs on `http://localhost:8080`

## Routes

### POST Endpoints

- `POST /register` - Register new user
- `POST /login` - Login user

## cURL Examples

### Register User

```bash
curl -X POST http://localhost:8080/register \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=johndoe" \
  -d "mobileNumber=1234567890" \
  -d "email=john@example.com" \
  -d "password=mypassword" \
  -d "confirmPassword=mypassword"
```

### Login User

```bash
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=johndoe" \
  -d "password=mypassword"
```
