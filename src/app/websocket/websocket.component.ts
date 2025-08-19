import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-websocket',
  standalone: true,
  imports: [],
  templateUrl: './websocket.component.html',
  styleUrl: './websocket.component.scss'
})
export class WebsocketComponent {

  private subscription: Subscription = new Subscription;
  public messages: any[] = [];

  ngOnInit(): void {
    // Create an observable for SSE
    const sse$ = new Observable<any>((observer) => {
      const eventSource = new EventSource('https://example.com/sse');

      eventSource.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };

      eventSource.onerror = (error) => {
        observer.error(error); 
        eventSource.close(); 
      };

      return () => {
        eventSource.close(); 
      };
    });

    this.subscription = sse$.subscribe({
      next: (message) => {
        console.log('Received:', message);
        this.messages.push(message); 
      },
      error: (err) => console.error('SSE error:', err)
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
