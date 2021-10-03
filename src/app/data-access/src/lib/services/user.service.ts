import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from, throwError, of } from 'rxjs';
import { catchError, map, mergeMap, take } from 'rxjs/operators';
import { IUser } from '../model/users.interface';
// import { Console } from 'console';

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

  createUser(user) {
    return from(this.afs.collection('users').add(user)).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err);
      })
    );
  }

  fetchUserById(uid) {
    let docRef = this.afs.collection('users', (ref) =>
      ref.where('uid', '==', 'cp2dff1iwfTjx3wBNamdLXHEGhj1')
    );
    return of(docRef.snapshotChanges().pipe(take(1)));
  }

  updateUser(user: IUser) {

    this.fetchUserById('abc').pipe(mergeMap(result => {
      return result
    }))

    this.fetchUserById('abc').then((res) => {
      console.log('userDoc:', res);
      if (res.length > 0) {
        let id = res[0].payload.doc.id;
              this.afs
                .collection('users')
                .doc(id)
                .update({ firstName: user.firstName, lastName: user.lastName });
      }
    });

    // let docRef = this.afs.collection('users', (ref) =>
    //   ref.where('uid', '==', 'abc')
    // );

    // docRef.snapshotChanges().subscribe(
    //   (res) => {
    //     console.log('ree:', res);
    //     if (res) {
    //       let id = res[0].payload.doc.id;
    //     }
    //   },
    //   (error) => {
    //     console.log('erro:', error);
    //   }
    // );

    // doc
    //   .snapshotChanges()
    //   .pipe(
    //     map((res) => {
    //       console.log('here atleast');
    //       // if (res[0].payload) {
    //       let id = res[0].payload.doc.id;

          // this.afs
          //   .collection('users')
          //   .doc(id)
          //   .update({ firstName: user.firstName, lastName: user.lastName })
    //         .then(
    //           (result) => {
    //             console.log('here::', result);
    //             return result;
    //           },
    //           (error) => {
    //             return error;
    //             console.log('helllll::', error);
    //           }
    //         );
    //       // .pipe(
    //       //   catchError((err: HttpErrorResponse) => {
    //       //     return throwError(err);
    //       //   })
    //       // );
    //       // }
    //     })
    //   )
    //   .subscribe((res) => {
    //     console.log('kyare:', res);
    //   });
    // console.log('ss:', snapShot);
    // return snapShot;
    // return doc.snapshotChanges().subscribe((res: any) => {
    //   if (res[0].payload) {
    //     let id = res[0].payload.doc.id;
    //     return from(
    //       this.afs
    //         .collection('users')
    //         .doc(id)
    //         .update({ firstName: user.firstName, lastName: user.lastName })
    //     ).pipe(
    //       catchError((err: HttpErrorResponse) => {
    //         return throwError(err);
    //       })
    //     );
    //   }
    // });
  }

  signOut() {
    this.afAuth.signOut();
  }

  getUsers() {
    return this.users;
  }

  profileUpdate(user: IUser) {
    this.usersCollection.doc(user.uid).set(user);
  }
}
