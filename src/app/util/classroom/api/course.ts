import { classroom_v1, google } from "googleapis";

export class CourseAPI {

    private _classroom: classroom_v1.Classroom;

    constructor(_classroom: classroom_v1.Classroom) {        
        this._classroom = _classroom;
    }

    public async create(course: classroom_v1.Params$Resource$Courses$Create) {
        try {
            return this._classroom.courses.create(course);
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível retornar a lista de cursos.' }
        }
    }

    public async list() {
        try {
            return this._classroom.courses.list();
        } catch (ex) {
            console.log(ex);
            throw { code: -1, message: 'Não foi possível retornar a lista de cursos.' }
        }
    }

    public async get(courseId: string) {
        try {
            return this._classroom.courses.get({ id: courseId });
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível retornar o curso com o id indicado.' }
        }
    }

    public async remove(courseId: string) {
        try {
            this._classroom.courses.update({ id: courseId, requestBody: { courseState: 'ARCHIVED', name: 'a' }  });
            //return this._classroom.courses.delete({ id: courseId  });
        } catch (ex) {
            console.log(ex);
            return { code: -1, message: 'Não foi possível deletar o curso com o id indicado.' }
        }
    }

}