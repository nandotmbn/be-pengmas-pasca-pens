/* eslint-disable @typescript-eslint/no-unused-vars */
interface AuthRegisterInterface {
  username: string;
  email: string;
  password: string;
}

interface AuthRegisterRequestQuery {
  page: number;
  limit: number;
}

interface AuthRegisterRequestParams {
  role_id: string;
}

interface AuthRegisterResponseBody {
  username: string;
  email: string;
  rolesId: string;
  password: string;
}

interface AuthRegisterRequestBody {
  username: string;
  email: string;
  rolesId: string;
  password: string;
}


interface AuthLoginInterface {
  credential: string;
  password: string;
}

interface AuthLoginRequestQuery {
  page: number;
  limit: number;
}

interface AuthLoginRequestParams {
  role_id: string;
}

interface AuthLoginResponseBody {
  username: string;
  email: string;
  rolesId: string;
  password: string;
}

interface AuthLoginRequestBody {
  credential: string;
  password: string;
}