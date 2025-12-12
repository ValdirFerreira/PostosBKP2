import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { FiltroGlobalService } from 'src/app/services/filtro-global.service';
import { MenuService } from 'src/app/services/menu.service';
import { DownloadArquivoService } from 'src/app/services/download-arquivo.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { TranslateService } from '@ngx-translate/core';
import { PainelPostosService } from 'src/app/services/painel-postos.service';
import { Proprietario } from 'src/app/models/PainelPostos/Proprietario';
import { ProprietarioCadastrarRequest } from 'src/app/models/PainelPostos/ProprietarioCadastrarRequest';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { DialogDynamicComponent } from 'src/app/components/dialog-dynamic/dialog-dynamic.component';
import { MatDialog } from '@angular/material/dialog';
import { PostoModel, ServicoCategoria } from 'src/app/models/PainelPostos/PostoModel';
import { DownloadService } from 'src/app/services/download.service';
import { AssociacaoPostoConsultarPeloIDResponse, FilePostos } from 'src/app/models/PainelPostos/FilePostos';



@Component({
  selector: 'list-postos',
  templateUrl: './list-postos.component.html',
  styleUrls: ['./list-postos.component.scss'],
  standalone: false
})
export class ListPostosComponent implements OnInit {

  @Input() IdProprietario: number = 0;
   @Input() NomeProprietario: string ="";

  constructor(public router: Router,
    public menuService: MenuService,
    private translate: TranslateService,
    public filtroService: FiltroGlobalService, private downloadArquivoService: DownloadArquivoService,
    public service: PainelPostosService,
    public dialog: MatDialog,
    public downloadService: DownloadService,
  ) { }



  @Output() close = new EventEmitter<boolean>();

  fechar() {
    this.close.emit(false); // Envia para o pai
  }


  // estado da tela
  abaAtiva: 'ativo' | 'inativo' = 'ativo';
  pesquisa: string = '';
  filtroSelecionado: string = 'Todos';

  // paginação
  pageSize = 6;            // linhas por página (ajuste conforme necessidade)
  currentPage = 1;


  ngOnInit(): void {
    this.resetPagination();
  }


  // retorna a lista filtrada por aba (ativo/inativo), pesquisa e filtro adicional
  get filteredList(): AssociacaoPostoConsultarPeloIDResponse[] {
    // const abaFiltro = this.abaAtiva === 'ativo' ? 1 : 2;
    // const q = this.pesquisa.trim().toLowerCase();

    // let list = this.allData.filter(x => x.CodStatus === abaFiltro);

    // if (this.filtroSelecionado !== 'Todos') {
    //   // exemplo: caso queira filtrar por posição ou outro critério
    //   list = list.filter(x => x.Funcao === this.filtroSelecionado);
    // }

    // if (q) {
    //   list = list.filter(x =>
    //     x.Nome.toLowerCase().includes(q) ||
    //     x.Funcao.toLowerCase().includes(q) ||
    //     x.Email.toLowerCase().includes(q)
    //   );
    // }

    // return list;

    return this.allData;
  }

  // lista paginada presente na tela
  get pagedList(): AssociacaoPostoConsultarPeloIDResponse[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredList.slice(start, start + this.pageSize);
  }

  // quantas páginas existem na lista atual
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredList.length / this.pageSize));
  }

  // constrói array de páginas para render
  get pages(): number[] {
    const total = this.totalPages;
    const pages: number[] = [];
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  // trocar aba e resetar paginação para 1
  trocarAba(aba: 'ativo' | 'inativo') {
    this.abaAtiva = aba;
    this.resetPagination();
  }

  // ao digitar pesquisa
  onPesquisar() {
    this.resetPagination();
  }

  // navegação de pagina
  goToPage(page: number) {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    this.currentPage = page;
    // caso queira manter foco ou scroll para topo da tabela, pode implementar aqui
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  allData: Array<AssociacaoPostoConsultarPeloIDResponse> = [];

  // utilitário para resetar paginação quando lista muda
  private resetPagination() {
    this.service.ConsultarAssociacaoPeloID(this.IdProprietario).subscribe({
      next: (res) => {
        this.allData = res;
      }
    });

    this.currentPage = 1;
  }


   @Output() IdEdit = new EventEmitter<number>();
  // Ações de exemplo (editar / remover / ver)
  editar(item: AssociacaoPostoConsultarPeloIDResponse) {
    console.log('editar', item);

    this.IdEdit.emit(item.CodPostoAssociacao); // Envia para o pai

    this.close.emit(false); // Envia para o pai

  }

  remover(item: AssociacaoPostoConsultarPeloIDResponse) {
    console.log('remover', item);
    // lógica para remover (mock: apenas log)
  }

  ver(item: AssociacaoPostoConsultarPeloIDResponse) {
    console.log('ver', item);
    // abrir detalhes
  }


  OpenModalCancelar() {
    const dialogRef = this.dialog.open(DialogDynamicComponent);
    dialogRef.componentInstance.typeDialog = 0;
    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULTADO RECEBIDO:", result);

      if (result?.cancel) {
        window.location.reload();
      }
    });

  }

  OpenModalErro(mensagensErro: string[]) {
    const dialogRef = this.dialog.open(DialogDynamicComponent);
    dialogRef.componentInstance.mensagensErro = mensagensErro;

    dialogRef.componentInstance.typeDialog = 999;
    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULTADO RECEBIDO:", result);

    });
  }




  cancelar() {
    window.location.reload();

  }

}
