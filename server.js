import 'dotenv/config';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}))
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
connectDB().then(() => {
    app.listen(process.env.PORT, () => console.log(`Your localhost: http://localhost:${process.env.PORT}`));
}).catch((error) => {
    console.log(error instanceof Error ? error.message : error);
});