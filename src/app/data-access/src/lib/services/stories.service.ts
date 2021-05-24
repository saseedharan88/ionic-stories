import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  private baseURL: string = 'http://localhost:3000';
  constructor(private base: BaseService) {}

  public getStories() {
    return this.base.get(`${this.baseURL}/posts`);
  }
}
