import graphql from 'graphql';
import _ from 'lodash';
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;
const books = [
    { name: 'Fight', genre: 'Fantasy', id: '1', authorId: '1' },
    { name: '1984', genre: 'Dystopian', id: '2', authorId: '2' },
    { name: 'To Kill a Mockingbird', genre: 'Classic', id: '3', authorId: '3' },
    { name: 'The Hobbit', genre: 'Fantasy', id: '4', authorId: '4' },
    { name: 'Dune', genre: 'Science Fiction', id: '5', authorId: '5' }
];
const authors = [
    { name: 'James', age: 44, id: '1' },
    { name: 'Maria', age: 32, id: '2' },
    { name: 'Liam', age: 27, id: '3' },
    { name: 'Sophia', age: 38, id: '4' },
    { name: 'Daniel', age: 50, id: '5' }
];
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }
        }
    }),
});
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    }),
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        }
    }
});
export default new GraphQLSchema({
    query: RootQuery
});