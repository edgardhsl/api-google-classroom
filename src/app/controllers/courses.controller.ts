import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import { Classroom } from '../util/google';

@Controller('api/courses')
export class CourseController {

    @Get('')
    @Middleware([])
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const response: any = await Classroom.getCourseList();
            const list = response?.data?.courses.filter((courses: any) => courses.enrollmentCode);
            res.status(200).json(list);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }

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
            console.error(ex);
            return res.status(500).json(ex);
        }
    }

}