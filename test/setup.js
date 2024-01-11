/** @format */

module.exports = () => {
  const validToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmOTNiNGIwZGM0NTVjOGY3MTc1YmYiLCJuYW1lIjoiQWNjb3VudCBGb3VyIiwiZW1haWwiOiJhY2NvdW50X2ZvdXJAdGVzdC5jb20iLCJpYXQiOjE3MDQ5NTY4NTIsImV4cCI6MTcwNzU0ODg1Mn0.S6BKSJXB8gtCUZs7uQWARZnWQUeCjxmvWLB_Y6Yuulg"; // Replace with a valid token
  global.chai.request.defaults.headers.common["x-access-token"] = validToken; // Set token globally
};
