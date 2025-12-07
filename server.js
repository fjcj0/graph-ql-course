import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
const app = express();
app.use(express.json());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
app.listen(4210, () => console.log(`Your localhost: http://localhost:4210`));