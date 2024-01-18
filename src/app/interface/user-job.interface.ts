import { Approvals } from "./approvals.interface";
import { JobPosition } from "./jobposition.interface";
import { User } from "./user.interface";

export interface UserJob {
    fecha: string | number | Date;
    user: User;
    id: Number,
    salary: number,
    jobPosition?: JobPosition,
    applicationDate: Date;
    approvals: Approvals[];

}