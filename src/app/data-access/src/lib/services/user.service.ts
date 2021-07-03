import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IUser } from '../model/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  private users: Observable<IUser[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.usersCollection = this.afs.collection<IUser>('users');
    this.users = this.usersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  signUp(email: string, password: string) {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }

  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }

  signOut() {
    this.afAuth.signOut();
  }

  getUsers() {
    return this.users;
  }

  profileUpdate(user: IUser) {
    console.log('user::', user);
    this.usersCollection.doc(user.uid).set(user);
  }
}
