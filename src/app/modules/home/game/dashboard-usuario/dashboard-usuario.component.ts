import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PremiosService } from 'src/app/modules/services/premios.service';

@Component({
  selector: 'app-dashboard-usuario',
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.scss']
})
export class DashboardUsuarioComponent implements OnInit {

  constructor(
    private premiosService: PremiosService,
    private authServices: AuthService,
  ) { }

  user = this.authServices.currentUser;
  listaTrofeos: any[] = [];

  ngOnInit(): void {
    this.getTrofeos();
  }

  getTrofeos(){
    this.premiosService.getTrofeosUser().subscribe(
      (res) => {
        console.log(res);
        this.listaTrofeos = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
