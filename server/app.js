const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect(
  'mongodb://ajspeller:ajspeller1@ds151486.mlab.com:51486/graphql_net_ninja',
  { useNewUrlParser: true }
);
mongoose.connection.once('open', () =>
  console.log(`Database connection successful!`)
);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log(`Now listening for requests on port 4000`);
});
