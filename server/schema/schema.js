const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// dummy data
// const books = [
//   { name: 'End Game', genre: 'Fantasy', id: '1', authorId: '1' },
//   { name: 'Infinity War', genre: 'Fantasy', id: '2', authorId: '2' },
//   { name: 'Thrones', genre: 'Sci-Fi', id: '3', authorId: '3' },
//   { name: 'Voltron', genre: 'Fantasy', id: '4', authorId: '1' },
//   { name: 'Star Wars', genre: 'Fantasy', id: '5', authorId: '1' },
//   { name: 'Thundercat', genre: 'Sci-Fi', id: '6', authorId: '2' },
//   { name: 'Silver Hawks', genre: 'Sci-Fi', id: '7', authorId: '3' }
// ];

// const authors = [
//   { name: 'AJ Speller', age: 44, id: '1' },
//   { name: 'CB Speller', age: 1, id: '2' },
//   { name: 'Amir Knight', age: 13, id: '3' }
// ];

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    book: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        console.log(parent);
        // return _.filter(books, { authorId: parent.id });
        return Book.find({
          authorId: parent.id
        });
      }
    }
  })
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
        console.log(parent);
        // return _.find(authors, { id: parent.authorId });
        return Author.findById(parent.authorId);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // code to get data from db/other source
        // return _.find(books, { id: args.id });
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // code to get data from db/other source
        // return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return books;
        return Book.findById({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.findById({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorID
        });
        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
