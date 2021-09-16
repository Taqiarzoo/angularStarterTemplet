import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(
    private http:HttpService
  ) { 

  }

  getFamilies(query:any, page:any, limit:any, orderBy:any, orderDir:any,filter:any) {
    console.log(filter.areaId)
    console.log(filter.is_assign_family)
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }
    if (limit) {
      params = params.append('limit', limit.toString());
    }
    if (orderBy) {
      params = params.append('order_by', orderBy);
    }
    if (orderDir) {
      params = params.append('order_direction', orderDir);
    }
    if (query) {
      params = params.append('q', query);
    }
    if(filter?.is_head_assign){
      params=params.append('is_head_assign',filter.is_head_assign)
    }
    
    if(filter?.is_relation_define){
      params=params.append('is_relation_define',filter.is_relation_define)
    }
    if(filter?.currentGaliMohallaId){
      params=params.append('galimohallaId',filter.currentGaliMohallaId)
    }
    if(filter?.currentLast_name){
      params=params.append('last_name',filter.currentLast_name)
    }
    return this.http.get(`${environment.apiUrl}/api/family`, params);
  }
  
  createFamily(data:any) {
    return this.http.post(`${environment.apiUrl}/api/family/create`, data, {});
  }

  selectHead(data:any) {
    return this.http.post(`${environment.apiUrl}/api/family/selectHead`, data, {});
  }

  setRalationship(data:any) {
    return this.http.post(`${environment.apiUrl}/api/family`, data, {});
  }

  getFamily(headId:any) {
    let params = new HttpParams();
    if (headId) {
      params = params.append('page', headId.toString());
    }
    return this.http.get(`${environment.apiUrl}/api/family`, params);
  }
  
  patchFamily(data:any) {
    return this.http.patch(`${environment.apiUrl}/api/family`, data, {});
  }
  
  deleteFamily(id:any) {
    return this.http.delete(`${environment.apiUrl}/api/family`, new HttpParams({fromString: `id=${id}`}))
  }
}
