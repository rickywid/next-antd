import { HttpClient } from './httpClient';

export class ApiService{
    constructor(cookie?: string) {
        this.cookie = cookie as string;
        this.apiEndpoint = 'http://localhost:3000/api'
    }
    private cookie: string;
    private apiEndpoint: string;

    private headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
    }

    public async getUsers() {
        this.headers['cookie'] = this.cookie;
        return await HttpClient.get(
          `${this.apiEndpoint}/users`,
          this.headers,
        );
      }

      public async createProject(project: FormData) {
        this.headers['cookie'] = this.cookie;
        return await HttpClient.post(
          `${this.apiEndpoint}/projects`,
          this.headers,
          project
        );
      }

      public async getProjects() {
        this.headers['cookie'] = this.cookie;
        return await HttpClient.get(
          `${this.apiEndpoint}/projects`,
          this.headers,
        );
      }
}