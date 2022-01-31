import { PublicationInterface } from './publication.interface';

export interface MembersInterface {
  id: number;
  slug: string;
  fullName: string;
  post?: string;
  disciplines?: string;
  education?: string;
  qualification?: string;
  academicDegree?: string;
  specialties?: string;
  advancedTraining?: string;
  specGuardian?: string;
  totalGuardian?: string;
  avatar?: string;
  publications?: PublicationInterface[];
}
