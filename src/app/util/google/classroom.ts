import { classroom_v1, google } from "googleapis";
import { Authorize } from ".";

export class Classroom {

    private static classroom: classroom_v1.Classroom;

    static init(auth?: Authorize) {
        this.classroom = google.classroom({version: 'v1', auth: auth?.authClient});
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
    }


}