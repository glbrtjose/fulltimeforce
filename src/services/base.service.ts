import axios, { AxiosInstance } from "axios";

interface RefreshToken {
  status: number;
  data: {
    hashToken: string;
  };
}

export abstract class HTTPBaseAuthService {
  protected instance: AxiosInstance;
  protected token: string | null = null;
  protected readonly baseURL: string = `${process.env.REACT_APP_API_URL}`;

  public constructor(access?: string) {
    if (access) this.token = access;
    const baseURL = this.baseURL;
    const multiple = 11;
    const timeout = 60000 * multiple;
    this.instance = axios.create({
      baseURL,
      timeout,
    });
    this.instance.defaults.timeout = timeout;
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use((response: any) => {
      const { data } = response;
      const result = data;
      if (response.headers && response.headers.authorization) {
        const responseToken = (response.headers.authorization as string).split(
          " "
        )[1];
        this.token = responseToken;
        localStorage.setItem("hashToken", this.token);
      }
      return result;
    }, this.handleError);
  };

  private handleRequest = async (config: any) => {
    if (this.token !== null)
      config.headers["Authorization"] = `Bearer ${this.token}`;
    return config;
  };

  private handleError = async (error: any) => {
    let result: any;
    const statusCodes = [0, 401, 403, 504];
    const code: any = error.response?.status;
    const defaultMessage = "Please try again later";
    if (statusCodes.includes(code)) {
      const { config, response }: any = error;
      const originalRequest: any = config;
      const message: any = error?.response?.data;
      result = await this.refreshToken(code, message?.detail);
      switch (code) {
        case 401:
          result.redirect = {
            destination: "/login",
          };
          break;
        case 403:
          result.redirect = {
            destination: "/404",
          };
          break;
        case 504:
          if (!originalRequest?._retry) {
            originalRequest._retry = true;
            try {
              const { headers, ...content } = originalRequest;
              result = await this.instance({
                headers: {
                  "Content-Type": headers["Content-Type"],
                },
                ...content,
              });
            } catch (error) {
              console.log("error: ", error);
            }
          }
          break;
      }
    } else {
      result = { message: error.message };
    }
    return result;
  };

  private async refreshToken(
    status: number,
    message = ""
  ): Promise<RefreshToken> {
    const result: any = {
      status,
      message: message || "Please try again later",
      result: false,
    };
    return result;
  }

  public reloadToken(token: string) {
    if (!!token) {
      localStorage.setItem("token", token);
      this.token = token;
    }
  }
}
