import { HTTPBaseAuthService } from "./base.service";

export class BlogPostService extends HTTPBaseAuthService {
  private static classInstance?: BlogPostService;
  private epName: string = `blogposts`;

  constructor(access?: string) {
    super(access);
  }

  public static getInstance(access?: string) {
    this.classInstance = new BlogPostService(access);

    return this.classInstance;
  }

  public get = async () => {
    const response = await this.instance.get(`/${this.epName}/`);
    return response;
  };
}
