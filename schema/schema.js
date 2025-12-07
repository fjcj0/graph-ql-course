import graphql from 'graphql';
import _ from 'lodash';
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;
const books = [
    { name: 'Fight', genre: 'Fantasy', id: '1' },
    { name: '1984', genre: 'Dystopian', id: '2' },
    { name: 'To Kill a Mockingbird', genre: 'Classic', id: '3' },
    { name: 'The Hobbit', genre: 'Fantasy', id: '4' },
    { name: 'Dune', genre: 'Science Fiction', id: '5' }
];
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        }
    }),
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID

                }
            },
            resolve(parent, args) {
                return _.find(books, { id: args.id });
            },
        }
    }
});
export default new GraphQLSchema({
    query: RootQuery
});