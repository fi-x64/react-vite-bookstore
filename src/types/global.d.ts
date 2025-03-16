export {};
declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }
  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface ILogin {
    access_token: string;
    user: {
      email: string;
      phone: string;
      fullname: string;
      role: string;
      avatar: string;
      id: string;
    };
  }

  interface IRegister {
    _id: string;
    fullname: string;
    email: string;
  }

  interface IAppContext {
    isAuthenticated: boolean;
    user: {
      email: string;
      phone: string;
      fullname: string;
      role: string;
      avatar: string;
      id: string;
    };
  }

  interface IUser {
    email: string;
    phone: string;
    fullname: string;
    role: string;
    avatar: string;
    id: string;
  }

  interface IFetchAccount {
    user: IUser;
  }

  interface IUserTable {
    _id: string;
    fullname: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    isActive: string;
    createdAt: Date;
    updatedAt: Date;
  }
}
