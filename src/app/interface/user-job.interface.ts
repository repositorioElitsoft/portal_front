import { JobPosition } from "./jobposition.interface";
import { UserJobAvailability } from "./user-job-availability.interface";

export interface UserJob{ 
    fecha: string | number | Date;
    user: any;
    id: Number,
    salary: number,
    jobPosition?: JobPosition,
    availability?: UserJobAvailability,
    applicationDate: Date;
    approvals: any;
    
}