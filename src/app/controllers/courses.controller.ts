import { Controller, Get, Middleware } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import { Classroom } from '../util/classroom';

@Controller('api/courses')
export class CourseController {
    
    private classroom = new Classroom();

    @Get('')
    @Middleware([])
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = await this.classroom.course.list();
            const list = response?.data?.courses.filter((courses: any) => courses.enrollmentCode);
            res.status(200).json(list);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }

    @Get('deleteAll')
    @Middleware([])
    async deleteAll(req: Request, res: Response, next: NextFunction) {
        try {
            const courses: any = await this.classroom.course.list();
            const response = [];

            console.log(typeof courses.data.courses);

            for(let course of courses.data.courses) {
                try {                    
                    response.push(await this.classroom.course.remove(course.id));
                } catch (error) {
                    console.log(error);
                }
            }

            res.status(200).json(response);
        } catch (ex) {
            console.log(ex);
            return res.status(500).json(ex);
        }
    }

/* 
    @Get(':id')
    @Middleware([])
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = Classroom.getCourse(req.params.id);
            const list = response?.data?.courses.filter((courses: any) => courses.enrollmentCode);
            res.status(200).json(list);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }

    @Get(':id/students')
    @Middleware([])
    async getStudents(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = await Classroom.getCourseStudents(req.params.id);
            const list = response?.data?.students;
            res.status(200).json(list);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }

    @Get(':id/announcements')
    @Middleware([])
    async getAnnouncements(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = await Classroom.getCourseAnnouncements(req.params.id);
            const list = response.data.announcements;
            res.status(200).json(list);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }

    @Post(':id/announcements')
    @Middleware([])
    async createAnnouncements(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = await Classroom.createCourseAnnouncements(req.params.id, {});
            const list = response.data.announcements;
            res.status(200).json(list);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }
 */
}