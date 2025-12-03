import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { firstValueFrom, forkJoin } from 'rxjs';
import { PadraoComboFiltro } from 'src/app/models/padrao-combo-filtro/padrao-combo-filtro';

import { AuthService } from 'src/app/services/auth.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FiltroGlobalService } from 'src/app/services/filtro-global.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'filtro-global',
  templateUrl: './filtro-global.component.html',
  styleUrls: ['./filtro-global.component.scss'],
  standalone: false
})
export class FiltroGlobalComponent implements OnInit {

  constructor(public router: Router,
    private authService: AuthService,
    public filtroService: FiltroGlobalService,
    public menuService: MenuService
  ) { }


  ngOnInit(): void {

    if (!this.filtroService.listaTarget)
      this.CarregaFiltrosIniciais();
    else {
      this.Filtrar();
    }
  }

  CarregaFiltrosIniciais() {
    this.CarregarDenominators();
    
    const call_0 = this.filtroService.FiltroTarget();
    const call_1 = this.filtroService.FiltroRegiao();
    const call_2 = this.filtroService.FiltroDemografico();
    const call_3 = this.filtroService.FiltroOnda();

    forkJoin([call_0, call_1, call_2, call_3]).subscribe(s => {
      this.filtroService.listaTarget = s[0];
      this.filtroService.ModelTarget = s[0][0];


      this.filtroService.listaRegiao = s[1];

      this.filtroService.listaDemografico = s[2];
      this.filtroService.listaOnda = s[3];
      this.filtroService.ModelOnda = s[3][0];

      this.executaFiltrar();
    })


    /*
    // this.CarregarDenominators();

    this.filtroService.FiltroTarget()
      .subscribe((response: Array<PadraoComboFiltro>) => {
        this.filtroService.listaTarget = response;
        this.filtroService.ModelTarget = response[0];
        this.filtroService.ModelDenominators = response[0];
        // INICIO FILTRO 2

        this.filtroService.FiltroRegiao()
          .subscribe((response: Array<PadraoComboFiltro>) => {
            this.filtroService.listaRegiao = response;

            // this.filtroService.ModelRegiao = response[0];
            // INICIO FILTRO 3
            this.filtroService.FiltroDemografico()
              .subscribe((response: Array<PadraoComboFiltro>) => {
                this.filtroService.listaDemografico = response;
                // this.filtroService.ModelDemografico = response[0];
                // INICIO FILTRO 4
                this.filtroService.FiltroOnda()
                  .subscribe((response: Array<PadraoComboFiltro>) => {
                    this.filtroService.listaOnda = response;
                    this.filtroService.ModelOnda = response[0];


                    this.filtroService.FiltroMarcas(this.filtroService.ModelRegiao)
                      .subscribe((response: Array<PadraoComboFiltro>) => {

                        this.filtroService.listaMarcas = response;

                        this.Filtrar();
                      }, (error) => console.error(error),
                        () => {
                        }
                      )

                  }, (error) => console.error(error),
                    () => {
                    }
                  )

              }, (error) => console.error(error),
                () => {
                }
              )
          }, (error) => console.error(error),
            () => {
            }
          )

      }, (error) => console.error(error),
        () => {
        }
      )
      */
  }


  CarregarDenominators() {

    this.filtroService.listaDenominators = new Array<PadraoComboFiltro>();

    var item1 = new PadraoComboFiltro();
    item1.IdItem = 1;
    item1.DescItem = "Masterbrand";
    this.filtroService.listaDenominators.push(item1);

    var item2 = new PadraoComboFiltro();
    item2.IdItem = 2;
    item2.DescItem = "Denominators";
    this.filtroService.listaDenominators.push(item2);

    this.filtroService.ModelDenominators = item1;
  }


  FiltroTarget() {
    this.filtroService.FiltroTarget()
      .subscribe((response: Array<PadraoComboFiltro>) => {
        this.filtroService.listaTarget = response;
        // this.filtroService.ModelTarget = response[0];

      }, (error) => console.error(error),
        () => {
        }
      )


  }

  FiltroOnda() {
    this.filtroService.FiltroOnda()
      .subscribe((response: Array<PadraoComboFiltro>) => {
        this.filtroService.listaOnda = response;
        this.filtroService.ModelOnda = response[0];

      }, (error) => console.error(error),
        () => {
        }
      )
  }

  async FiltroMarcas() {
    const response = await firstValueFrom(this.filtroService.FiltroMarcas(this.filtroService.ModelRegiao));

    this.filtroService.listaMarcas = response;
    this.filtroService.ModelMarcas = response[0];
  }

  FiltroDemografico() {
    this.filtroService.FiltroDemografico()
      .subscribe((response: Array<PadraoComboFiltro>) => {
        this.filtroService.listaDemografico = response;
        // this.filtroService.ModelDemografico = response[0];

      }, (error) => console.error(error),
        () => {
        }
      )
  }

  FiltroRegiao() {
    this.filtroService.FiltroRegiao()
      .subscribe((response: Array<PadraoComboFiltro>) => {
        this.filtroService.listaRegiao = response;
        // this.filtroService.ModelRegiao = response[0];

      }, (error) => console.error(error),
        () => {
        }
      )
  }


  Filtrar() {
    if (this.router.url.includes('/dashboard-one')) {
      EventEmitterService.get("emit-dashboard-one").emit();
    }

    if (this.router.url.includes('/dashboard-awareness')) {
      EventEmitterService.get("emit-dashboard-two").emit();
    }


    if (this.router.url.includes('/dashboard-funil')) {
      EventEmitterService.get("emit-dashboard-three").emit();
    }

    if (this.router.url.includes('/dashboard-imagem-pura')) {
      EventEmitterService.get("emit-dashboard-four").emit();
    }

    if (this.router.url.includes('/dashboard-posicionamento-marca')) {
      EventEmitterService.get("emit-dashboard-five").emit();
    }

    if (this.router.url.includes('/dashboard-brand-creator')) {
      EventEmitterService.get("emit-dashboard-six").emit();
    }

    if (this.router.url.includes('/dashboard-comunicacao')) {
      EventEmitterService.get("emit-dashboard-seven").emit();
    }

    if (this.router.url.includes('/dashboard-consideration')) {
      EventEmitterService.get("emit-dashboard-eight").emit();
    }

    if (this.router.url.includes('/dashboard-adhoc-section')) {
      EventEmitterService.get("emit-dashboard-nine").emit();
    }





    if (this.filtroService.filtroMobileAtivo) {
      this.filtroService.filtroMobileAtivo = true;
      var el = document.getElementById('global-filter')
      if (el != undefined)
        el.classList.remove('filter-close')


    }
    else {
      this.filtroService.filtroMobileAtivo = false;
      var el = document.getElementById('global-filter')
      if (el != null)
        el.classList.add('filter-close')
    }

    var el = document.getElementById('global-filter')
    if (el != null) {
      el.classList.add('filter-close')
      this.filtroService.filtroMobileAtivo = false;
    }
  }

  async executaFiltrar() {
    this.filtroService.filtroEmitter = false;

    await this.FiltroMarcas();

    this.Filtrar();

  }

  FiltrarMobile() {
    var el = document.getElementById('global-filter')
    if (el != null)
      el.classList.add('filter-close')
    // EventEmitterService.get("emit-dashboard-one").emit();

    this.Filtrar();
  }

  closeFiltro() {
    var el = document.getElementById('global-filter')
    if (el != null) {
      el.classList.add('filter-close')
      this.filtroService.filtroMobileAtivo = false;
    }
  }

}

