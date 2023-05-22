import { Classroom } from 'app/util/classroom';
import { classroom_v1 } from 'googleapis';

export class StudentConsumer {

    private classroom = new Classroom();

    async sync(data: any) {
        const responses = [];

        for (let invite of await this._castToClassroom(data)) {
            responses.push(await this.classroom.user.invite(invite));
        }

        return responses;
    }

    private async _castToClassroom(data: any[]): Promise<classroom_v1.Params$Resource$Invitations$Create[]> {
        const courses = await this.classroom.course.list();

        console.log(courses.data.courses);

        if(!courses.data.courses) return [];

        return courses.data.courses!.map((course) => data.map((user) => ({
            requestBody: {
                userId: user.email,
                courseId: course.id,
                role: 'STUDENT'

            }
        }))).flat(1);
    }
}