
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EsqueceuSenhaModel } from 'src/app/models/esqueceu-senha/esqueceu-senha';
import { LoginAcesso, Token } from 'src/app/models/login/login-acesso';
import { Acao } from 'src/app/models/usuario/log';
import { AuthService } from 'src/app/services/auth.service';
import { EsqueceuSenhaService } from 'src/app/services/esqueceu-senha.service';
import { FiltroGlobalService } from 'src/app/services/filtro-global.service';
import { LogService } from 'src/app/services/log.service';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import { Session } from '../guards/session';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CriptografiaService } from 'src/app/services/criptografia.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
  formEsqueciMinhaSenha: FormGroup;
  loadingLogin = false;
  esqueciMinhaSenha = false;
  error = false;
  msgError: string;
  emailEnviado = false;
  usuarioInvalido: boolean = false;

  mostraSenha: boolean = false;

  // Propriedades do esqueci minha senha
  divRecuperarSenha: boolean;
  errorRecuperacao: boolean;
  mensagemDeErroRecuperacao: string = "";
  recuperarSenhaEnviado: boolean;
  erroEnvioSolicitacaoSenha: boolean;

  emailSenhaObrigatorio: boolean = false;


  divFalhaAutenticacao: boolean;
  urlSafe: SafeResourceUrl;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService,
    private session: Session,
    private logService: LogService,
    private esqueceuSenhaService: EsqueceuSenhaService,
    private filtroGlobalService: FiltroGlobalService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
  ) {

   let _session = this.session.getSession();

    if (_session !== null) {
      this.usuarioInvalido = false;
      this.loginForm = this.formBuilder.group({
        login: [_session.Email, Validators.required],
        senha: [_session.Password, Validators.required],
      });
    }
    else {
      this.loginForm = this.formBuilder.group({
        login: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]]
      })
    }

  }

  anoPortal: string = "";
  anoAtualFormatada() {
    var data = new Date(),
      anoF = data.getFullYear().toString();
    return anoF;
  }




  ngOnInit(): void {
        this.authService.IpAddressAPI().then(s => { this.authService.IP = s?.ip ?? "" });
        this.anoPortal = this.anoAtualFormatada();

    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    })
  }



  get form() { return this.loginForm.controls; }

  login() {

    if (!this.form.login.value || !this.form.senha.value) {
      this.emailSenhaObrigatorio = true;
      this.usuarioInvalido = false;
      return;
    }
    else {
      this.emailSenhaObrigatorio = false;
    }

    this.loadingLogin = true;
    this.usuarioInvalido = false;
    this.loginService.login(this.form.login.value, this.form.senha.value, this.authService.IP).subscribe(usuarioModel => {
debugger
      if (usuarioModel && usuarioModel.CodUser > 0) {
        debugger
        var user = new LoginAcesso();
        user.EmailUser = this.form.login.value;
        user.Senha = this.form.senha.value;
        this.loginService.token(user).subscribe((dataToken: Token) => {
          debugger
          this.authService.setToken(dataToken.access_token);
          this.session.createSession(usuarioModel);
          this.authService.UsuarioAutenticado(true);
          this.filtroGlobalService.iniciarSessaoUser();
debugger
          this.router.navigate(['/home']);
          this.loadingLogin = false;
        },
          err => {

            this.usuarioInvalido = true;
            this.error = true;
            this.loadingLogin = false;
            this.authService.UsuarioAutenticado(false);
            if (err.status == 400)
              this.msgError = err.error.Message;
            else {
              this.msgError = err.error;
            }
          })
      }
      else {
        this.usuarioInvalido = true;
      }
    },
      error => {

        if (error.error.ExceptionMessage != undefined) {
          var result = JSON.parse(error.error?.ExceptionMessage);
          if (result.Status > 9000) {
            var IpsosSecureAccessEndPoint = environment["IpsosSecureAccessEndPoint"];
            var IpsosSecureAccessClientKey = environment["IpsosSecureAccessClientKey"];
            var srcUrlFalhaAutenticacao = IpsosSecureAccessEndPoint + "/falha-autenticacao/" + result.Status + "/pt";
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(srcUrlFalhaAutenticacao);
            this.divFalhaAutenticacao = true;

            this.usuarioInvalido = true;

            this.error = true;
            this.loadingLogin = false;
            this.authService.UsuarioAutenticado(false);
            if (error.status == 400)
              this.msgError = error.error.Message;
            else {
              this.msgError = error.error;
            }

            return;
          }
          else {
            this.usuarioInvalido = true;
          }
        }
        else {
          this.usuarioInvalido = true;
        }


      })
  }

  

  fecharFalhaAutenticacao() {
    this.divFalhaAutenticacao = false;
  }


  abrirEsqueciSenha() {
    var IpsosSecureAccessEndPoint = environment["IpsosSecureAccessEndPoint"];
    var IpsosSecureAccessClientKey = environment["IpsosSecureAccessClientKey"];
    let pais = "pt";
    var url = IpsosSecureAccessEndPoint + "/recuperar-senha/" + IpsosSecureAccessClientKey + "/" + pais;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.divRecuperarSenha = true;
    this.mensagemDeErroRecuperacao = "";
  }

  fecharRecuperarSenha() {
    this.divRecuperarSenha = false;
    this.recuperarSenhaEnviado = false;
  }

  // abrirEsqueciSenha() {
  //   this.divRecuperarSenha = true;
  //   this.errorRecuperacao = false;
  //   this.mensagemDeErroRecuperacao = "";
  // }

  // fecharRecuperarSenha() {
  //   this.divRecuperarSenha = false;
  //   this.recuperarSenhaEnviado = false;
  // }

  recuperarSenha() {
    if ((document.getElementById("emailRecover") as HTMLInputElement).value == '') {

      var campoObrigatorio = this.translate.instant('login.campoobrigatorio');
      this.mensagemDeErroRecuperacao = campoObrigatorio;
    } else {
      let request = new EsqueceuSenhaModel(
        (document.getElementById("emailRecover") as HTMLInputElement).value,
        ''
      );

      this.esqueceuSenhaService.iniciarRequisicaoEsqueceuSenha(request).subscribe(response => {
        if (response.StatusCode == 404) {
          this.mensagemDeErroRecuperacao = response.Error;
        } else {
          this.recuperarSenhaEnviado = true;
        }
      },
        error => {
          console.error(error.message);
          this.erroEnvioSolicitacaoSenha = true;
        }, () => {
          this.errorRecuperacao = this.mensagemDeErroRecuperacao ? true : false;
        });
    }
  }


  mostrarSenha() {

    if (this.mostraSenha) {
      this.mostraSenha = false;
    }
    else {
      this.mostraSenha = true;
    }
  }


  registrarIP() {
    try {
      this.logService.getIPAddress().subscribe((res: any) => {

        this.session.createSessionIPLogado(res.ip);
      });
    } catch (error) {
    }
  }


}
