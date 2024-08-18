import Cors from 'cors';
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST','PUT', 'DELETE'],
  origin: '*', 
});

function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export default initMiddleware(cors);
