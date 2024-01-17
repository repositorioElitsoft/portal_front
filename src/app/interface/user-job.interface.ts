import { Approvals } from "./approvals.interface";
import { JobPosition } from "./jobposition.interface";
import { UserJobAvailability } from "./user-job-availability.interface";
import { User } from "./user.interface";

export interface UserJob{ 
    fecha: string | number | Date;
    user: User;
    id: Number,
    salary: number,
    jobPosition?: JobPosition,
    availability?: UserJobAvailability,
    applicationDate: Date;
    approvals: Approvals[];
    
}