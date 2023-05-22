import { classroom_v1, google } from "googleapis";
import { Authorize } from "..";

export class UserAPI {

    private _classroom: classroom_v1.Classroom;

    constructor(_classroom: classroom_v1.Classroom) {
        this._classroom = _classroom;
    }

    public async invite(invitation: classroom_v1.Params$Resource$Invitations$Create) {
        try {
            return this._classroom.invitations.create(invitation);
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível retornar a lista de cursos.' }
        }
    }

    public async get(userId: string) {
        try {
            return this._classroom.userProfiles.get({ userId: userId });
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível retornar o curso com o id indicado.' }
        }
    }

    public async list(courseId: string) {
        try {
            return this._classroom.courses.students.list({ courseId: courseId });
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível retornar o curso com o id indicado.' }
        }
    }

}