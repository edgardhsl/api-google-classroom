import { Classroom } from "app/util/google";
import { classroom_v1 } from "googleapis";

export class CourseConsumer {

    static categories: any[];

    static async sync(params: any[]) {
        const responses: CourseResponse[][] = [];
        this.categories = await this._getCategories(params);

        for (const course of this._castToMoodle(params)) {
            responses.push(await Classroom.createCourse([course]));
        }

        return responses;
    }

    private static async _getCategories(params: any[]): Promise<any[]> {
        return await Moodle.getCategory();
    }

    private static _castToClassroom(params: any[]) {
        return params.map((item: any) => {
            const course: classroom_v1.Params$Resource$Courses$Create = {
                requestBody {
                    id: item.id,
                    item: item.name
                },
            }

            return course;
        });
    }

    private static _normalize(str: string | undefined) {
        return str?.normalize('NFC').replace(/ /g,'').replace(/[^a-zA-Z0-9 ]/g, '') || '';
    }
}