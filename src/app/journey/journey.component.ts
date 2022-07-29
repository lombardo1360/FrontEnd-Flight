import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../models/flight.model';
import { Journey } from '../models/journey.model';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {

  @Input() journey!: Journey;
  @Input() price!: number;


  constructor() { }

  ngOnInit(): void {

  }



}
