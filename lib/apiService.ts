import { HttpClient } from './httpClient';

export class ApiService{
    constructor(cookie: string) {
        this.cookie = cookie;
        this.apiEndpoint = 'http://localhost:3000/api'
    }
    private cookie: string;
    private apiEndpoint: string;

    private headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        cookie: this.cookie
    }

    public async getUsers() {
        return await HttpClient.get(
          `${this.apiEndpoint}/users`,
          this.headers,
        );
      }

      public async createProject(project: FormData) {
        return await HttpClient.post(
          `${this.apiEndpoint}/projects`,
          this.headers,
          project
        );
      }
}