import { TestBed, inject } from '@angular/core/testing';

import { Note.RemoteService } from './note.remote.service';

describe('Note.RemoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Note.RemoteService]
    });
  });

  it('should be created', inject([Note.RemoteService], (service: Note.RemoteService) => {
    expect(service).toBeTruthy();
  }));
});
