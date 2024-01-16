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
  upload(file: FormData, id: number): Observable<HttpEvent<any>> {
    const url = `${this.baseUrl}/upload/${id}`;
    const req = new HttpRequest("POST", url, file, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getFiles(id: number): Observable<FileDescriptor[]> {
    const url = `${this.baseUrl}/files/${id}`;
    return this.http.get<FileDescriptor[]>(url);
  }
  deleteFile(filename: string, id: number): Observable<void> {
    const url = `${this.baseUrl}/delete/${id}/${filename}`;
    return this.http.delete<void>(url);
  }

  downloadCertification(filename: string, id: number): Observable<Blob> {
    const url = `${this.baseUrl}/download-certs/${id}/${filename}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}