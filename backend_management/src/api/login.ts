import service from "./axios";


interface LoginParams {
  login:string,
  password:string
}
export const login = (data: LoginParams) => {
  return service.post("/admin/auth/login", data);
}