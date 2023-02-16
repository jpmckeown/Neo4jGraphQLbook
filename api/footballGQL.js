// using Introspect automated translate Neo4j to basic GraphQL
// Exercise 3 from Lyon book, page 98 

// template from index.js with Football typeDefs substituted
const {ApolloServer} = require("apollo-server");
const neo4j = require("neo4j-driver");
const {Neo4jGraphQL} = require("@neo4j/graphql");

const driver = neo4j.driver('bolt://44.204.80.7:7687',
                  neo4j.auth.basic('neo4j', 'bigamies-meridians-thunder'), 
                  {/* encrypted: 'ENCRYPTION_OFF' */});

const typeDefs = `
type Match {
	date: Date!
	id: String!
	inTournamentTournaments: [Tournament!]! @relationship(type: "IN_TOURNAMENT", direction: OUT)
	peopleScoredGoal: [Person!]! @relationship(type: "SCORED_GOAL", direction: IN, properties: "ScoredGoalProperties")
	stage: String!
	teamsPlayedIn: [Team!]! @relationship(type: "PLAYED_IN", direction: IN, properties: "PlayedInProperties")
}

type Person {
	coachForSquads: [Squad!]! @relationship(type: "COACH_FOR", direction: OUT)
	dob: Date
	id: String!
	inSquadSquads: [Squad!]! @relationship(type: "IN_SQUAD", direction: OUT)
	name: String!
	representsTeams: [Team!]! @relationship(type: "REPRESENTS", direction: OUT)
	scoredGoalMatches: [Match!]! @relationship(type: "SCORED_GOAL", direction: OUT, properties: "ScoredGoalProperties")
}

interface PlayedInProperties @relationshipProperties {
	minuteOn: String
	penaltyScore: BigInt
	score: BigInt
	type: String
}

interface ScoredGoalProperties @relationshipProperties {
	minute: String!
}

type Squad {
	forTournaments: [Tournament!]! @relationship(type: "FOR", direction: OUT)
	id: String!
	peopleCoachFor: [Person!]! @relationship(type: "COACH_FOR", direction: IN)
	peopleInSquad: [Person!]! @relationship(type: "IN_SQUAD", direction: IN)
	teamsNamed: [Team!]! @relationship(type: "NAMED", direction: IN)
}

type Team {
	id: String!
	name: String!
	namedSquads: [Squad!]! @relationship(type: "NAMED", direction: OUT)
	participatedInTournaments: [Tournament!]! @relationship(type: "PARTICIPATED_IN", direction: OUT)
	peopleRepresents: [Person!]! @relationship(type: "REPRESENTS", direction: IN)
	playedInMatches: [Match!]! @relationship(type: "PLAYED_IN", direction: OUT, properties: "PlayedInProperties")
}

type Tournament {
	id: String!
	matchesInTournament: [Match!]! @relationship(type: "IN_TOURNAMENT", direction: IN)
	name: String!
	shortName: String!
	squadsFor: [Squad!]! @relationship(type: "FOR", direction: IN)
	teamsParticipatedIn: [Team!]! @relationship(type: "PARTICIPATED_IN", direction: IN)
	year: BigInt!
}
`;

const neoSchema = new Neo4jGraphQL({typeDefs, driver});

neoSchema.getSchema().then((schema) => {
   const server = new ApolloServer({schema});
   server.listen().then(({url}) => {
      console.log(`GraphQL server ready at ${url}`);
   });
});
