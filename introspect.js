const {toGraphQLTypeDefs} = require('@neo4j/introspector');
const neo4j = require('neo4j-driver')
const fs = require('fs')

const driver = neo4j - driver(
   "neo4j+s://04592e7a.databases.neo4j.io",
   neo4j.auth.basic("neo4j", "5wps6NWGi_QXSnius_H9n-uWdb_CjnBsXO7e4gfhTMw")
)

const sessionFactory = () => driver.session({defaultAccessMode: neo4j.session.READ})

async function main() {
   const typeDefs = await toGraphQLTypeDefs(sessionFactory)
   fs.writeFileSync('schema.graphql', typeDefs)
   await driver.close()
}
main()
