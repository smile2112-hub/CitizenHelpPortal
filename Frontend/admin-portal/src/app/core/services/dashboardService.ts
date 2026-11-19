import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService 
{
  private apiUrl = '/api/Dashboard/dashboard';
  constructor(private http: HttpClient) { }

  getDashboard() 
  {    
    return this.http.get<any>(this.apiUrl);
  }

}