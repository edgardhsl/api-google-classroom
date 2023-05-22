import { Authorize, Classroom } from "./app/util/classroom";
import { GoogleAPIServer } from "./server";

Classroom.init(new Authorize(__dirname + '/app/config/credentials.json'));

const server = new GoogleAPIServer();
server.start(4444);