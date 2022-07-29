import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
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
  moneda: string = "USD";
  price!: number ;

  dataForm!: FormGroup;


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
    });


  }

  // conversion(){
  //   console.log("entra")
  //   if(this.moneda == "USD"){
  //     console.log("entra1")
  //     this.price = this.journey.price;
  //   }
  //   if(this.moneda == "COP"){
  //     console.log("entra2")
  //     const operacion = this.journey.price * 4300;
  //     this.price = operacion;
  //   }
  // }

  getFlight(){
    this.requestFlight = this.dataForm.value;
    this.apiFlight.getFlight(this.requestFlight).subscribe(response=>{
      console.log(response);
      if(response.origin !== null){
        this.journey = response;
      }else{
        console.log("no");
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
      }
     })

  }


}
