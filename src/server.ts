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
    
    public initializeKafka() {
        const kafkaConsumer = new KafkaConsumer();
        kafkaConsumer.addConsumer({ topics: ['classroom-category', 'classroom-course', 'classroom-student', 'classroom-classwork'] }, { eachMessage: (p) => this._syncMessage(p) });
    }

    private async _syncMessage(payload: EachMessagePayload) {
        try {
            if (!payload.message.value) return;

            switch (payload.topic) {
                case 'moodle-category': console.log(await CategoryConsumer.sync(KafkaMessage.toJSON(payload.message.value))); break;
                case 'moodle-course': console.log(await CourseConsumer.sync(KafkaMessage.toJSON(payload.message.value))); break;
                /* case 'moodle-student': StudentConsumer.sync(KafkaMessage.toJSON(payload.message.value)); break;
                case 'moodle-classwork': ClassworkConsumer.sync(KafkaMessage.toJSON(payload.message.value)); break; */
            }
        } catch (error) {
            console.error(error);
        }
    }
}