import { HTTPBaseAuthService } from "./base.service";

export class AuthService extends HTTPBaseAuthService {
  private static classInstance?: AuthService;
  private epName: string = `auth`;

  constructor(access?: string) {
    super(access);
  }

  public static getInstance(access?: string) {
    this.classInstance = new AuthService(access);

    return this.classInstance;
  }

  public authenticate = async (username: string, password: string) => {
    const payload = { username, password };
    const response = await this.instance.post(`/${this.epName}`, payload);
    return response;
  };

  public verify = async () => {
    const response = await this.instance.get(`/verify`);
    return response;
  };
}
