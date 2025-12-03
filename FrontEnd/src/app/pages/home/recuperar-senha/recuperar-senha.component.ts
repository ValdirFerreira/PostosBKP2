import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtualizarSenhaModel, ChecaTokenModel } from 'src/app/models/esqueceu-senha/esqueceu-senha';
import { EsqueceuSenhaService } from 'src/app/services/esqueceu-senha.service';
import { CustomValidators } from './custom-validators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-recuperar-senha',
    templateUrl: './recuperar-senha.component.html',
    styleUrls: ['./recuperar-senha.component.scss'],
    standalone: false
})
export class RecuperarSenhaComponent implements OnInit {
 
  
  token: string = '';
  urlSafe: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,

  ) {

    this.route.params.subscribe(params => {
      this.token = params['token'];
    });

  }

  ngOnInit(): void {
 
    var IpsosSecureAccessEndPoint = environment["IpsosSecureAccessEndPoint"];
    var url = IpsosSecureAccessEndPoint + "/alterar-senha-recuperacao/" + this.token + "";
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
