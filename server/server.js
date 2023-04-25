const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");

const routes = require("./routes");

const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");

const db = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.use(routes);

  db.once("open", () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};
// Call the async function to start the server
startApolloServer();
