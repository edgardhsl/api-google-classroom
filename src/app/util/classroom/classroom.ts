import { classroom_v1, google  } from "googleapis";
import { Authorize } from ".";
import { CourseAPI } from "./api/course";
import { UserAPI } from "./api/user";

export class Classroom {

    course!: CourseAPI;
    user!: UserAPI;

    private static _classroom: classroom_v1.Classroom;
    private static _authorize: Authorize;
    static get auth() {
        return this._authorize;
    }

    constructor() {
        if (Classroom._classroom) {
            this.course = new CourseAPI(Classroom._classroom);
            this.user = new UserAPI(Classroom._classroom);
        }
    }

    static async init(auth?: Authorize) {
        if (auth !== undefined) {
            Classroom._authorize = auth;
            Classroom._classroom = google.classroom({version: 'v1', auth: auth?.authClient});
        }
    }

    /* private static classroom: classroom_v1.Classroom;

    static init(auth?: Authorize) {
        this.classroom = google.classroom({version: 'v1', auth: auth?.authClient});
    }

    public static async createCourse(course: classroom_v1.Params$Resource$Courses$Create) {
        try {
            return this.classroom.courses.create(course);
        } catch (ex) {
            console.log(ex);
            return {code: -1, message: 'Não foi possível retornar a lista de cursos.'}
        }
    }

    public static async getCourseList() {
        try {
            return this.classroom.courses.list();
        } catch (ex) {
            console.log(ex);
            return {code: -1, message: 'Não foi possível retornar a lista de cursos.'}
        }
    }

    public static async getCourse(courseId: string) {
        try {
            return this.classroom.courses.get({id: courseId});
        } catch (ex) {
            console.log(ex);
            return {code: -1, message: 'Não foi possível retornar o curso com o id indicado.'}
        }
    }

    public static async getCourseAnnouncements(courseId: string) {
        try {
            return this.classroom.courses.announcements.list({courseId: courseId});
        } catch (ex) {
            console.log(ex);
            return {code: -1, message: 'Não foi possível retornar a lista de anúncios.'}
        }
    }

    public static async createCourseAnnouncements(courseId: string, body: any) {
        try {
            return this.classroom.courses.announcements.create({courseId: courseId, requestBody: body});
        } catch (ex) {
            console.log(ex);
            return {code: -1, message: 'Não foi possível retornar a lista de anúncios.'}
        }
    }

    public static async getCourseStudents(courseId: string) {
        try {
            return this.classroom.courses.students.list({courseId: courseId});
        } catch (ex) {
            console.log(ex);
            return {code: -1, message: 'Não foi possível retornar a lista de estudantes.'}
        }
    } */


}