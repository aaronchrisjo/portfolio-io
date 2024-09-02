import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalStateSubject = new BehaviorSubject<ModalState>(null);
  modalState$: Observable<ModalState> = this.modalStateSubject.asObservable();

  open(modalName: ModalState): void {
    this.modalStateSubject.next(modalName);
  }

  close(): void {
    this.modalStateSubject.next(null);
  }
}

export type ModalState = 'login' | 'signup' | null;
