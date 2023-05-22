import { Server } from "@overnightjs/core";
import { CourseController } from "./app/controllers/courses.controller";
import * as express from 'express';
import { KafkaConsumer } from "app/util/kafka/kafka.consumer";
import { EachMessagePayload } from "kafkajs";
import { CourseConsumer } from "app/consumers/course.consumer";
import { KafkaMessage } from "app/util/kafka/kafka.message";
import { StudentConsumer } from "app/consumers/student.consumer";
import { AuthController } from "app/controllers/auth.controller";

export class GoogleAPIServer extends Server {
 
    constructor() {
        super();
        
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));        

        let courseController = new CourseController();   
        let authController = new AuthController();   
             
        super.addControllers([courseController, authController]);
        
       this.initializeKafka();
    }
 
    public start(port: number) {     
        this.app.listen(port, () => console.log('Server listening on port: ' + port))
    }
    
    public initializeKafka() {
        const kafkaConsumer = new KafkaConsumer();
        kafkaConsumer.addConsumer({ 
            topics: ['classroom-courses', 'classroom-category', 'classroom-student', 'classroom-classwork'] }, 
            { eachMessage: (p) => this._syncMessage(p) }
        );
    }

    private async _syncMessage(payload: EachMessagePayload) {
        try {
            if (!payload.message.value) return;

            switch (payload.topic) {
                case    'classroom-courses': new CourseConsumer().sync(KafkaMessage.toJSON(payload.message.value)).catch(console.log); break;
                case   'classroom-student': new StudentConsumer().sync(KafkaMessage.toJSON(payload.message.value)).catch(console.log); break;
                /* case 'classroom-classwork': await new ClassworkConsumer().sync(KafkaMessage.toJSON(payload.message.value)); break; */
                /** others consumers */
            }
        } catch (error) {
            console.error(error);
        }
    }
}