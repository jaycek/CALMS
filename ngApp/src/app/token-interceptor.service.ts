import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private injector:Injector) { }
  
 intercept(req,nxt){
  let authService = this.injector.get(AuthService);
  let tokenizedReq=req.clone(
    {
     setHeaders:{
       // Authorization:'Bearer ab.bb.cc'
       Authorization: `Bearer ${authService.getToken()}`
     }

    }
  )
  return nxt.handle(tokenizedReq);

}
}


