import {Dayjs} from "dayjs";
import {StudentModel} from "./student.model";

export interface ThesisModel {
  thesisId: number;
  thesisType: string;
  thesisTitle: string;
  thesisRegistrationDate: Dayjs;
  thesisDateOfSubmission: Dayjs;
  thesisDateOfDefense: Dayjs;
  thesisGrade: number;
  thesisTermOfDefense: Dayjs;
  student: StudentModel;
}
