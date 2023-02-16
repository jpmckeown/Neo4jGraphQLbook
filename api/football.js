// using Introspect automated translate Neo4j to basic GraphQL
// Exercise 3 from Lyon book, page 98 

// template from book, direct Cypher access
const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://44.204.80.7:7687',
                  neo4j.auth.basic('neo4j', 'bigamies-meridians-thunder'), 
                  {/* encrypted: 'ENCRYPTION_OFF' */});

const query =
  `
  MATCH (t:Tournament {year: $year})<-[:PARTICIPATED_IN]-(team)
  RETURN team.name as team
  `;

const params = {"year": "2019"};

const session = driver.session({database:"neo4j"});

session.run(query, params)
  .then((result) => {
    result.records.forEach((record) => {
        console.log(record.get('team'));
    });
    session.close();
    driver.close();
  })
  .catch((error) => {
    console.error(error);
  });
