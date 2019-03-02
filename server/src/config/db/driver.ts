import { v1 as neo4j } from 'neo4j-driver';

const uri = process.env.NEO4J_URI || 'bolt://localhost';
const username = process.env.NEO4J_USERNAME || '';
const password = process.env.NEO4J_PASSWORD || '';

let driver: neo4j.Driver | null = null;

export default (): neo4j.Driver => {
  if (!driver) {
    driver = neo4j.driver(uri, neo4j.auth.basic('', ''));
  }

  return driver as neo4j.Driver;
}

