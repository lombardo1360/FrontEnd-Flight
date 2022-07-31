
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import Swal from 'sweetalert2';

import { Journey } from '../models/journey.model';
import { RequestF } from '../models/request.model';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {

  requestFlight: RequestF;
  journey!: Journey;
  price!: number ;

  public dataForm!: FormGroup;



  constructor(private apiFlight: FlightService,
              private fb: FormBuilder
  )
  {
      this.requestFlight = {origin: '', destination: ''}

  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required]
    },{
      validators:[this.diferent]
    });
  }

  diferent(form: FormGroup){
    const origin = form.get('origin')?.value;
    const destination= form.get('destination')?.value;

    return origin != destination ? null: {notSame:true};
  }


  getFlight(){
    this.requestFlight = this.dataForm.value;
    this.apiFlight.getFlight(this.requestFlight).subscribe(response=>{
      console.log(response);
      if(response.origin !== null){
        this.journey = response;
      }else{
        Swal.fire({
          title: 'No se encontro una ruta',
          text: "Vuelva a consultar",
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        this.journey.price = 0;
      }
     })

  }


}
