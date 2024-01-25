import { Academical } from "./academical.interface"
import { UserJob } from "./user-job.interface"
import { City } from "./city.interface"
import { Gender } from "./gender.interface"
import { HerramientaData } from "./herramienta-data.interface"
import { Employment } from "./employment.interface"
import { UserCV } from "./user-cv.interface"
import { UserPreferredJob } from "./user-preferred-job-interface"
import { Result } from "./exam-results.interface"
import { UserJobAvailability } from "./user-job-availability.interface"
import { Role } from "./role.interface"

export interface User {
    id?: number
    rut?: string
    name: string
    firstLastname?: string
    secondLastname?: string
    gender?: Gender
    email: string
    password?: string
    phone?: string
    linkedin?: string
    city?: City
    address: string
    tools?: HerramientaData[]
    jobs?: Employment[]
    academicalList?: Academical[]
    userJob?: UserJob[]
    userPrefferedJob?: UserPreferredJob
    cv?: UserCV
    results?: Result[];
    availability?: UserJobAvailability,
    roles?: Role[];
}


export type UserEditarDTO = Omit<User, 'roles' | 'availability' | 'phone' | 'linkedin' | 'city' | 'herramientas' | 'tools'> & { roles: string };
export type UserEditarDTO2 = Omit<User, 'roles' | 'availability' | 'linkedin' | 'city' | 'herramientas' | 'tools'> & { roles: string };

export type UserSesionDTO = Omit<User, 'roles' | 'availability' | 'password' | 'linkedin' | 'pais_nom' | 'pais' | 'address' | 'herramientas' | 'tools'>;
