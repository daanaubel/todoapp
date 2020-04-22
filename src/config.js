const prod = {
  BASE_URL: "https://todolooapi.herokuapp.com/api/",
};
const dev = {
  BASE_URL: "http://127.0.0.1:8000/api/",
};
const config = process.env.REACT_APP_STAGE === "production" ? prod : dev;

export default prod;
