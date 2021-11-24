import { Authorize, Classroom } from "./app/util/google";
import { GoogleAPIServer } from "./server";

const server = new GoogleAPIServer();
Classroom.init(new Authorize(__dirname + '/app/config/credentials.json'));

server.start(3000);