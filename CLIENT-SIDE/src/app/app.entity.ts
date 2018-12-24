export enum TypeAction {
    View=1,
    Create,
    Edit
};
  
export enum Permission{
    Admin = 0,
    Teacher,
    Student
}
  
export enum TypeInput {
    Text = 0,
    Select
}
  
export const TypeValid = {
    Required: "required",
    MinLength: "minlength",
    MaxLength: "maxlength",
    Pattern: "pattern",
    Email: "email"
}

export const SelectObject = [
    { value: Permission.Admin, title: 'Admin' },
    { value: Permission.Teacher, title: 'Giáo viên' },
    { value: Permission.Student, title: 'Sinh viên'}
  ]