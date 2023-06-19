import {StudentModel} from "./student.model";

export interface ThesisModel {
  thesisId: number;
  thesisType: string;
  thesisTitle: string;
  thesisRegistrationDate: Date;
  thesisDateOfSubmission: Date;
  thesisDateOfDefense: Date;
  thesisGrade: number;
  thesisCommission: ThesisCommissionDTO[];
  student: StudentDTO;
}

export interface ThesisCommissionDTO {
  professor: ProfessorDTO;
  role: string;
}

export interface ProfessorDTO {
  professorId: string;
  identificationNumber: string;
  fullName: string;
  email: string | null;
}

export interface StudentDTO {
  studentId: string;
  full_name: string;
  indexNumber: string;
}
