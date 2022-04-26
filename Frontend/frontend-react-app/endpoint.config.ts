import { PORTs } from './interfaces';

class UrlHelper {
  private ENV_DIRECTOR: string;

  constructor() {
    // "DEV" || "PROD"
    this.ENV_DIRECTOR = 'DEV';
  }
  public GetEnv(): string {
    return this.ENV_DIRECTOR;
  }

  public GetPort(): PORTs {
    const PORTs: PORTs =
      this.ENV_DIRECTOR === 'DEV'
        ? {
            Node: '3000',
            React: '4000',
          }
        : {
            Node: '/',
            React: '/',
          };

    return PORTs;
  }
}

export default new UrlHelper();
