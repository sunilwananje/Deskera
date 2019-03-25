import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  public testimonials;
  public subscriptions: Subscription;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.subscriptions = this.apiService.getTestimonials().subscribe((data:any) => {

      this.testimonials = data;
      });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
