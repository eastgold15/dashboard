
export interface ProfileType {
  avatar: string;
  createdAt: string;
  email: string;
  id: number;
  nickname: string;
  phone: string;
  qq: string;
  remark: string;
  roles: Role[];
  status: number;
  updatedAt: string;
  username: string;
  [property: string]: any;
}

export interface Role {
  createdAt?: string;
  default?: null;
  id?: number;
  name?: string;
  remark?: string;
  status?: number;
  updatedAt?: string;
  value?: string;
  [property: string]: any;
}


