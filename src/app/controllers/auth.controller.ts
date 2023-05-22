import { Controller, Get, Middleware, Post } from '@overnightjs/core';
import { Classroom } from 'app/util/classroom';
import { NextFunction, Request, Response } from 'express';
import { resolve } from 'path';

@Controller('auth')
export class AuthController {

    @Get('authorize')
    @Middleware([])
    async auth(req: Request, res: Response, next: NextFunction) {
        try {            
            res.redirect(Classroom!.auth!.authUrl!);
        } catch (ex) {
            return res.status(500).json(ex);
        }
    }

    @Get('oauth2callback')
    @Middleware([])
    async callback(req: Request, res: Response, next: NextFunction) {
        try {
            if(!req.query.code) throw 'O código de autenticação não foi gerado.';

            Classroom.auth.authorize(req.query.code.toString());
            
            res.sendFile(resolve(__dirname + '/../view/auth/authenticated.html'));
        } catch (ex) {
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