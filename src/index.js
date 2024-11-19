import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

async function App() {
  await initMongoConnection();
  setupServer();
}

App();
