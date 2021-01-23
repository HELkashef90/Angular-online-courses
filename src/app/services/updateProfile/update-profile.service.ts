import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(private httpClient: HttpClient) { }

  updateProfile(body) {
    return this.httpClient.put(environment._updateProfile, body)
  }
}
