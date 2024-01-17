export interface UserJobApproval {
    jobId: number;
    userId: number;
    isApproved: boolean;
    date: Date;

}


export type CreateUserJobApprovalDTO = Omit<UserJobApproval, 'jobId' | 'userId' | 'date'>;