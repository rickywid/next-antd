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
        cookie: 'auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiamltIiwiaWF0IjoxNTkwODIzOTk1fQ.6njVxIvKsguyLE-t2aoePTtXNU98yDztk9ejo0Xd1Zo'
    }

    public async getUsers() {
        return await HttpClient.get(
          `${this.apiEndpoint}/users`,
          this.headers,
        );
      }

      // GET PROJECTS

      // GET PROJECT

      // CREATE PROJECT
      public async createProject(project: FormData) {
        return await HttpClient.post(
          `${this.apiEndpoint}/projects`,
          this.headers,
          project
        );
      }
      // UPLOAD IMAGE


}