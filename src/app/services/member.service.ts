import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

 
  constructor(
    private http:HttpService
  ) {

   }


getMembers(query:any, page:any, limit:any, orderBy:any, orderDir:any,filter:any) {
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
  if(filter?.is_assign_family){
    params=params.append('is_assign_family',filter.is_assign_family)
  }
  
  if(filter?.currentAreaId){
    params=params.append('areaId',filter.currentAreaId)
  }
  if(filter?.currentGaliMohallaId){
    params=params.append('id',filter.currentGaliMohallaId)
  }
  if(filter?.currentLast_name){
    params=params.append('last_name',filter.currentLast_name)
  }
  return this.http.get(`${environment.apiUrl}/api/member/list`, params);
}

postMember(data:any) {
  return this.http.post(`${environment.apiUrl}/api/member`, data, {});
}

patchMember(data:any) {
  return this.http.patch(`${environment.apiUrl}/api/member`, data, {});
}

deleteMember(id:any) {
  return this.http.delete(`${environment.apiUrl}/api/member`, new HttpParams({fromString: `id=${id}`}))
}
}
