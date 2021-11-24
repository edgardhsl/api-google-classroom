import { Server } from "@overnightjs/core";
import { CourseController } from "./app/controllers/courses.controller";
import * as express from 'express';

export class GoogleAPIServer extends Server {
 
    constructor() {
        super();
        
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        
        let courseController = new CourseController();
        
        super.addControllers([courseController]);
    }
 
    public start(port: number) {     
        this.app.listen(port, () => console.log('Server listening on port: ' + port))
    }
}