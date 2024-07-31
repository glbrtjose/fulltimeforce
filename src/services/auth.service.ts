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

  public authenticate = async () => {
    const response = await this.instance.post(`/${this.epName}`);
    return response;
  };
}
