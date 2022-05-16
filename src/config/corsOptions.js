const whiteList = [
  'https://localhost:3000',
]
const corsOptions = {
  origin(origin, callback) {
    if(whiteList.includes(origin) || !origin){
      callback(null, true)
    } else {
      callback(new Error('Not Allowed by CORS'))
    }
  }
}

export default corsOptions;
