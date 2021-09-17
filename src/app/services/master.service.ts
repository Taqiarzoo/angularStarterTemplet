import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private http:HttpService
  ) {

   }
  

    getLastNames(areaId:any,galiMohallaId:any){
      let params = new HttpParams();
      if(areaId){
        params=params.append('areaId',areaId)
      }
      if(galiMohallaId){
        params=params.append('galiMohallaId',galiMohallaId)
      }
     
      return this.http.get(`${environment.apiUrl}/api/masters/last_names`,params)
    }

    

    getMembershipType(){
      return this.http.get(`${environment.apiUrl}/api/masters/membership_type`,{})
    }

    createMembershipType(data:any){
      return this.http.post(`${environment.apiUrl}/api/masters/membership_type`,data,{})
    }

    updateMembershipType(data:any){
      return this.http.patch(`${environment.apiUrl}/api/masters/membership_type`,data,{})
    }

    getAddressType(){
      return this.http.get(`${environment.apiUrl}/api/masters/address_type`,{})
    }

    postAddressType(data:any){
      return this.http.post(`${environment.apiUrl}/api/masters/address_type`,data,{})
    }

    updateAddressType(data:any){
      return this.http.patch(`${environment.apiUrl}/api/masters/address_type`,data,{})
    }


    getCountry(){
      return this.http.get(`${environment.apiUrl}/api/masters/countries`,{})
    }

    getState(countryId:any){
      let params = new HttpParams();
      if(countryId){
        params=params.append('countryId',countryId)
      }
      return this.http.get(`${environment.apiUrl}/api/masters/states`,params)
    }

    getcities(countryId:any,stateId:any){
      let params = new HttpParams();
      if(countryId){
        params=params.append('countryId',countryId)
      }
      if(stateId){
        params=params.append('stateId',stateId)
      }

      return this.http.get(`${environment.apiUrl}/api/masters/cities`,params)
    }

    getArea(countryId:any,stateId:any,cityId:any){
      let params = new HttpParams();
      if(countryId){
        params=params.append('countryId',countryId)
      }
      if(stateId){
        params=params.append('stateId',stateId)
      }
      if(cityId){
        params=params.append('cityId',cityId)
      }
      return this.http.get(`${environment.apiUrl}/api/masters/area`,params)
    }

    createArea(data:any){
      return this.http.post(`${environment.apiUrl}/api/masters/area`,data,{})
    }

    updateArea(data:any){
      return this.http.patch(`${environment.apiUrl}/api/masters/area`,data,{})
    }


  getGalliMohalla(areaId:any){
    let params = new HttpParams();
    if(areaId){
      params=params.append('areaId',areaId)
    }
   
    return this.http.get(`${environment.apiUrl}/api/masters/galli_mohalla`,params)
  }
  createGalliMohalla(data:any){
    return this.http.post(`${environment.apiUrl}/api/masters/galli_mohalla`,data,{})
  }

  updateGalliMohalla(data:any){
    return this.http.patch(`${environment.apiUrl}/api/masters/galli_mohalla`,data,{})
  }

  getRelations(){
    return this.http.get(`${environment.apiUrl}/api/masters/relations`,{})
  }

  createRelations(data:any){
    return this.http.post(`${environment.apiUrl}/api/masters/relations`,data,{})
  }

  updateRelations(data:any){
    return this.http.patch(`${environment.apiUrl}/api/masters/relations`,data,{})
  }
}



