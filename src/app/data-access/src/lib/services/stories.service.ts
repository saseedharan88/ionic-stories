import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStory } from '../model/stories.interface';
// import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  private baseURL = 'http://localhost:3000';
  private stories: Observable<IStory[]>;
  private storyCollection: AngularFirestoreCollection<IStory>;

  constructor(private afs: AngularFirestore) {
    this.storyCollection = this.afs.collection<IStory>('stories');
    this.stories = this.storyCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getStories() {
    return this.stories;
  }
}
