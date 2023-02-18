// version 3 Apollo
const {ApolloServer} = require("apollo-server");
const jwt = require("jsonwebtoken");
const neo4j = require("neo4j-driver");
const {Neo4jGraphQL} = require("@neo4j/graphql");
require('dotenv').config();

// import {ApolloServer} from '@apollo/server';

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
extend type User @auth(rules: [
   {operations: [READ], where:{userId: "$jwt.sub"}}
   {operations: [CREATE,UPDATE,DELETE], roles: ["admin"]}
])

type Review {
  reviewId: ID!
  stars: Float!
  date: Date!
  text: String
  user: User! @relationship(type: "WROTE", direction: IN)
  business: Business! @relationship(type: "REVIEWS", direction: OUT)
}
extend type Review @auth( 
   rules: [{
      operations: [CREATE, UPDATE]
      bind: {user: {userId: "$jwt.sub" }}
   }
])

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

const {Neo4jGraphQLAuthJWKSPlugin,} = require("@neo4j/graphql-plugin-auth")

const neoSchema = new Neo4jGraphQL({
   typeDefs, resolvers, driver, plugins: {
      auth: new Neo4jGraphQLAuthJWKSPlugin({
         jwksEndpoint: "https://mckeown.me/.well-known/jwks.json",
      }),
   },
});

neoSchema.getSchema().then((schema) => {
   const server = new ApolloServer({
      schema,
      context: ({req})=>({req}),
   });
   server.listen({port: process.env.PORT_SERVER || 3001}).then(({url}) => {
      console.log(`GraphQL server ready at ${url}`);
   });
});
