import { getServer } from './modules/server';

const server = getServer();

// start listening
const port = 80;
server.listen(port, () => console.log(`server is listening on port ${port}.`));
