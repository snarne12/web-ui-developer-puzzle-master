import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedTestingModule } from '@tmo/shared/testing';
import { Store } from '@ngrx/store';
import { ReadingListComponent } from './reading-list.component';
import { BooksFeatureModule } from '@tmo/books/feature';
import {  ReadingListItem } from '@tmo/shared/models';
import { getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MockStore } from '@ngrx/store/testing';
describe('ReadingListComponent', () => {
  let component: ReadingListComponent;
  let fixture: ComponentFixture<ReadingListComponent>;
  let store : MockStore;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, SharedTestingModule]
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch removeFromReadingList action when removeFromReadingList is called', () => {
    const item: ReadingListItem = {
    "bookId": "FSVTDwAAQBAJ",
    "title": "Eloquent JavaScript, 3rd Edition",
    "authors": [
        "Marijn Haverbeke"
    ],
    "description": "As with previous editions, Haverbeke continues to teach through extensive examples and immerses you in code from the start, while exercises and full-chapter projects give you hands-on experience with writing your own programs.",
    "publisher": "No Starch Press",
    "publishedDate": "2018-12-04T00:00:00.000Z",
    "coverUrl": "http://books.google.com/books/content?id=FSVTDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    "isAdded": false
}; 
const spy = spyOn(store, 'dispatch')

    component.removeFromReadingList(item);
    expect(spy).toHaveBeenCalledWith(removeFromReadingList({ item }));
  });
});
