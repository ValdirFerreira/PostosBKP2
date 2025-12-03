import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'footer-bottom',
    templateUrl: './footer-bottom.component.html',
    styleUrls: ['./footer-bottom.component.scss'],
    standalone: false
})
export class FooterBottomComponent implements OnInit {
  @Input('titulo') tituloPagina: string;
  @Input() pageAtual: string;
  filtro: boolean = false;

  @Input() positionFixa: boolean = false;

  anoPortal: string = "";

  constructor(public router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.anoPortal = this.anoAtualFormatada();
  }

  dataAtualFormatada() {
    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(),
      mesF = mes.length == 1 ? '0' + mes : mes,
      anoF = data.getFullYear(),
      horas = new Date().getHours(),
      horasF = horas < 10 ? '0' + horas : horas,
      minutos = new Date().getMinutes(),
      minutosF = minutos < 10 ? '0' + minutos : minutos,
      segundos = new Date().getSeconds(),
      segundosF = segundos < 10 ? '0' + segundos : segundos
    return anoF + mesF + diaF + horasF + minutosF + segundosF
  }


  anoAtualFormatada() {
    var data = new Date(),
      anoF = data.getFullYear().toString();
    return anoF;
  }


  sairPortal() {
    this.authService.UsuarioAutenticado(false);
    this.router.navigate(['/login']);
  }
}

