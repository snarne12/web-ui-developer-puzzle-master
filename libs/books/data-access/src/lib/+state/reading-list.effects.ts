import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.confirmedAddToReadingList({ book })),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ item })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  showAddSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReadingListActions.confirmedAddToReadingList),
        map((action) => {
          const snackbarRef = this.snackBar.open('Book added to reading list', 'Undo', {
            duration: 3000
          });
          snackbarRef.onAction().subscribe(() => {
            this.store.dispatch(ReadingListActions.undoLastAction()); // Dispatch undo if "Undo" is clicked
          });
        })
      ),
    { dispatch: false }
  );


  showRemoveSnackbar$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReadingListActions.confirmedRemoveFromReadingList),
        map((action) => {
          const snackbarRef = this.snackBar.open('Book removed from reading list', 'Undo', {
            duration: 3000
          });
          snackbarRef.onAction().subscribe(() => {
            this.store.dispatch(ReadingListActions.undoLastAction()); 
           }); 
          }) 
        ), { dispatch: false } 
      );


  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(private actions$: Actions, private http: HttpClient,private store: Store, private snackBar: MatSnackBar) {}
}
