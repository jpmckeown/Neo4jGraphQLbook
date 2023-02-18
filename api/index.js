// import {ApolloServer} from '@apollo/server';
const {ApolloServer} = require("apollo-server");
const jwt = require("jsonwebtoken");
const neo4j = require("neo4j-driver");
const {Neo4jGraphQL} = require("@neo4j/graphql");
require('dotenv').config();

const driver = neo4j.driver(
   // "bolt://localhost:7687",
   // neo4j.auth.basic("neo4j", "Calum1964")
   "neo4j+s://04592e7a.databases.neo4j.io",
   neo4j.auth.basic("neo4j", "5wps6NWGi_QXSnius_H9n-uWdb_CjnBsXO7e4gfhTMw")
);

const resolvers = {
   Business: {
      waitTime: (obj, args, context, info) => {
         const options = [0, 5, 10, 15, 30, 45];
         return options[Math.floor(Math.random() * options.length)];
      }
   }
}

const typeDefs = `
   type Query{
      fuzzyBusinessByName(searchString: String): [Business!]! @cypher(
         statement: """
         CALL db.index.fulltext.queryNodes('businessNameIndex', $searchString+'~')
         YIELD node RETURN node
         """
      )
   }

  type Business {
  businessId: ID!
  waitTime: Int! @customResolver
  averageStars: Float!
   @auth(rules: [{ isAuthenticated: true }])
   @cypher(statement:"MATCH (this)<-[:REVIEWS]-(r:Review) RETURN avg(r.stars)")
  recommended(first: Int=1): [Business!]! 
   @cypher( statement: """
   MATCH (this)<-[:REVIEWS]-(:Review)<-[:WROTE]-(u:User)
   MATCH (u)-[:WROTE]->(:Review)-[:REVIEWS]->(rec:Business)
   WITH rec, ORDER BY score DESC LIMIT $first
   """
  )
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
  userId: ID!
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
   businessCount: Int! @cypher(statement: """
      MATCH (b:Business)-[:IN_CATEGORY]->(this:Category)
      RETURN count(b)
   """
   )
}
`;

// Neo4jGraphQLAuthPlugin
const {Neo4jGraphQLAuthJWTPlugin} = require("@neo4j/graphql-plugin-auth")
// const {Neo4jGraphQLAuthJWKSPlugin} = require("@neo4j/graphql-plugin-auth")

// auth: new Neo4jGraphQLAuthJWTPlugin({
//    secret: process.env.JWT_SECRET,
// auth: new Neo4jGraphQLAuthJWKSPlugin({
//    jwksEndpoint: "https://mckeown.me/.well-known/jwks.json",
const neoSchema = new Neo4jGraphQL({
   typeDefs, resolvers, driver, plugins: {
      auth: new Neo4jGraphQLAuthJWTPlugin({
         secret: process.env.JWT_SECRET,
      }),
   },
}); // test Auth failure above: process.env.JWT_WRONG,

neoSchema.getSchema().then((schema) => {
   const server = new ApolloServer({
      schema,
      context: ({req})=>({req}),
   });
   server.listen().then(({url}) => {
      console.log(`GraphQL server ready at ${url}`);
   });
});

console.log("JWT_SECRET", process.env.JWT_SECRET)
