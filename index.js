// import {ApolloServer} from '@apollo/server';
const {ApolloServer} = require("apollo-server");
const neo4j = require("neo4j-driver");
const {Neo4jGraphQL} = require("@neo4j/graphql");

const driver = neo4j.driver(
   // "bolt://localhost:7687",
   // neo4j.auth.basic("neo4j", "Calum1964")
   "neo4j+s://04592e7a.databases.neo4j.io",
   neo4j.auth.basic("neo4j", "5wps6NWGi_QXSnius_H9n-uWdb_CjnBsXO7e4gfhTMw")
);

const typeDefs = `
  type Business {
  businessId: ID!
  name: String!
  city: String!
  state: String!
  address: String!
  location: Point!
  reviews: [Review!]! @relationship(type: "REVIEWS", direction: IN)
  categories: [Category!]!
    @relationship(type: "IN_CATEGORY", direction: OUT)
}
type User {
  userID: ID!
  name: String!
  reviews: [Review!]! @relationship(type: "WROTE", direction: OUT)
}
type Review {
  reviewId: ID!
  stars: Float!
  date: Date!
  text: String
  user: User! @relationship(type: "WROTE", direction: IN)
  business: Business! @relationship(type: "REVIEWS", direction: OUT)
}
type Category {
  name: String!
  businesses: [Business!]!
    @relationship(type: "IN_CATEGORY", direction: IN)
}
`;

const neoSchema = new Neo4jGraphQL({typeDefs, driver});

neoSchema.getSchema().then((schema) => {
   const server = new ApolloServer({schema});
   server.listen().then(({url}) => {
      console.log(`GraphQL server ready at ${url}`);
   });
});
