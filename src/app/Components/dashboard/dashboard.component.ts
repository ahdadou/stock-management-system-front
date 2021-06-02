import { Component, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { OrderService } from 'src/app/Shared/services/order.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private OorderService:OrderService){

  }
  public barChartOptions = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
  }
  };
  public barChartLabels =['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendedi', 'Semedi', 'dimanche'];
  public lineChartLabels =[];;
  public barChartData : {data , label}[]= [
    // {data: [65, 59, 80, 81, 56, 55, 40,0], label: 'Series A'},
    // // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  // public barChartData : number[]= [
  //   // {data: [65, 59, 80, 81, 56, 55, 40,0], label: 'Series A'},
  //   // // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  // ];
  public lineChartData=[];
  ngOnInit(): void {
          this.getTotalProdouctsOrdered()
          this.getTotalPriceByProducts();
  }
  getTotalPriceByProducts(){
     this.OorderService.TotalPriceByProducts().subscribe((resp:any)=>{
      this.barChartData = [{data: resp, label: 'Somme d \' achat chqaue jour'}]
    })
  }
  getTotalProdouctsOrdered(){
    this.OorderService.TotalProdouctsOrdered().subscribe( d=>{
      const product=[]
      const productNumber=[]
      for  (const item of d) {
        productNumber.push(item.nombreProduct)
        product.push(item.name)
        if(productNumber.length===10){
          break;
        }
       
      }
      this.lineChartLabels = product;
      this.lineChartData = [{data: productNumber, label: 'Produits le Plus Achat'}]
    })
  }
  }
   


