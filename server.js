import express from 'express';
const app = express();
app.use(express.json());
app.listen(4210, () => console.log(`Your localhost: http://localhost:4210`));