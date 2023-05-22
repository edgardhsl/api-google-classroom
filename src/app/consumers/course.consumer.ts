import { Classroom } from "app/util/classroom";
import { classroom_v1 } from "googleapis";

export class CourseConsumer {

    private classroom = new Classroom();
    private courses: classroom_v1.Schema$Course[] = [];

    async sync(params: any[]) {
        this.courses = (await this.classroom.course.list()).data.courses!;
        const responses: any[] = [];

        this._removingExistingCourses(params);

        for (const course of this._castToClassroom(params)) {
            responses.push(await this.classroom.course.create(course));
        }

        return responses;
    }

    private _castToClassroom(params: any[]): classroom_v1.Params$Resource$Courses$Create[] {
        return params.map((item: any) => {
            const course: classroom_v1.Params$Resource$Courses$Create = {
                requestBody: {
                    name: item.nome,
                    ownerId: "diga.bento@gmail.com",
                    
                }
            }

            return course;
        });
    }

    private _removingExistingCourses(params: any[]) {
        if(!this.courses) return;

        for(let course of this.courses) {
            const index = params.findIndex(item => item.nome == course.name);
            console.log(index);
            if(index !== -1) params.splice(index, 1);
        }

        /* params = this.courses.fr(curso => {
            return !this.courses.find(course => {
                console.log(course.name, curso.nome, `[${course.name == curso.nome}]`);
                return course.name == curso.nome;
            });
        }); */
    }
}