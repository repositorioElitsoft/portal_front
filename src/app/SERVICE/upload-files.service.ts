import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileDescriptor } from '../interface/file-descriptor.interface';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  upload(file: FormData, usr_id: number): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}/upload/${usr_id}`;
    const req = new HttpRequest("POST", url, file, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(usr_id: number): Observable<FileDescriptor[]> {
    const url = `${this.baseUrl}/files/${usr_id}`;
    return this.http.get<FileDescriptor[]>(url);
  }

  deleteFile(filename: string, usr_id: number): Observable<void> {
    const url = `${this.baseUrl}/delete/${usr_id}/${filename}`;
    return this.http.delete<void>(url);
  }
}