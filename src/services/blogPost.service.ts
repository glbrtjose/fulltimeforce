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

  public get = async (id?: string, page = 1, size = 10) => {
    const response = await this.instance.get(
      `/${this.epName}/${id || ""}?page=${page}&size=${size}`
    );
    return response;
  };

  public update = async (id: string, value: any) => {
    const payload = value;
    const response = await this.instance.patch(
      `/${this.epName}/${id || ""}`,
      payload
    );
    return response;
  };

  public create = async (value: any) => {
    const payload = value;
    const response = await this.instance.post(`/${this.epName}/`, payload);
    return response;
  };

  public delete = async (id: string) => {
    const response = await this.instance.delete(`/${this.epName}/${id}`);
    return response;
  };
}
