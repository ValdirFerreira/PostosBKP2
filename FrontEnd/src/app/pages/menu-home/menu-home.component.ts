import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import { FiltroPadrao } from 'src/app/models/Filtros/FiltroPadrao';
import { saveAs } from "file-saver";
import { FiltroGlobalService } from 'src/app/services/filtro-global.service';
import { MenuService } from 'src/app/services/menu.service';
import { DownloadArquivoService } from 'src/app/services/download-arquivo.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { TranslateService } from '@ngx-translate/core';

interface Proprietario {
  id: number;
  nome: string;
  email: string;
  posicao: string;
  ativo: boolean;
}

@Component({
    selector: 'app-menu-home',
    templateUrl: './menu-home.component.html',
    styleUrls: ['./menu-home.component.scss'],
    standalone: false
})
export class MenuHomeComponent implements OnInit {


  constructor(public router: Router,
    public menuService: MenuService,
    private translate: TranslateService,
    public filtroService: FiltroGlobalService, private downloadArquivoService: DownloadArquivoService
  ) { }


 
 
 // estado da tela
  abaAtiva: 'ativo' | 'inativo' = 'ativo';
  pesquisa: string = '';
  filtroSelecionado: string = 'Todos';

  // paginação
  pageSize = 6;            // linhas por página (ajuste conforme necessidade)
  currentPage = 1;

  // dados mockados completos (simulam dados do backend)
  private allData: Proprietario[] = [
    { id: 1, nome: 'Rodrigo Gómes', email: 'meu-email@email.com', posicao: 'Proprietário', ativo: true },
    { id: 2, nome: 'Alice Silva', email: 'meu-email@email.com', posicao: 'Proprietário', ativo: true },
    { id: 3, nome: 'Bruno Oliveira', email: 'meu-email@email.com', posicao: 'Proprietário', ativo: true },
    { id: 4, nome: 'Camila Souza', email: 'meu-email@email.com', posicao: 'Proprietário', ativo: true },
    { id: 5, nome: 'Daniel Costa', email: 'meu-email@email.com', posicao: 'Proprietário', ativo: true },
    { id: 6, nome: 'Elisa Pereira', email: 'meu-email@email.com', posicao: 'Proprietário', ativo: true },
    { id: 7, nome: 'João Santos', email: 'joao@email.com', posicao: 'Proprietário', ativo: false },
    { id: 8, nome: 'Mariana Lopes', email: 'mariana@email.com', posicao: 'Proprietário', ativo: false },
    { id: 9, nome: 'Gustavo Melo', email: 'gustavo@email.com', posicao: 'Proprietário', ativo: true },
    { id: 10, nome: 'Fernanda Nunes', email: 'fernanda@email.com', posicao: 'Proprietário', ativo: true },
    { id: 11, nome: 'Ricardo Alves', email: 'ricardo@email.com', posicao: 'Proprietário', ativo: true },
    { id: 12, nome: 'Lara Dias', email: 'lara@email.com', posicao: 'Proprietário', ativo: true },
    
    // adicione mais se precisar testar mais páginas
  ];



  ngOnInit(): void {
    this.resetPagination();
  }

  // retorna a lista filtrada por aba (ativo/inativo), pesquisa e filtro adicional
  get filteredList(): Proprietario[] {
    const abaFiltro = this.abaAtiva === 'ativo';
    const q = this.pesquisa.trim().toLowerCase();

    let list = this.allData.filter(x => x.ativo === abaFiltro);

    if (this.filtroSelecionado !== 'Todos') {
      // exemplo: caso queira filtrar por posição ou outro critério
      list = list.filter(x => x.posicao === this.filtroSelecionado);
    }

    if (q) {
      list = list.filter(x =>
        x.nome.toLowerCase().includes(q) ||
        x.email.toLowerCase().includes(q)
      );
    }

    return list;
  }

  // lista paginada presente na tela
  get pagedList(): Proprietario[] {
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

  // utilitário para resetar paginação quando lista muda
  private resetPagination() {
    this.currentPage = 1;
  }

  // Ações de exemplo (editar / remover / ver)
  editar(item: Proprietario) {
    console.log('editar', item);
    // abrir modal / rota de edição
  }

  remover(item: Proprietario) {
    console.log('remover', item);
    // lógica para remover (mock: apenas log)
  }

  ver(item: Proprietario) {
    console.log('ver', item);
    // abrir detalhes
  }



///////////////////////////////////////////////////////////////////////////////////
// Cadastro 
///////////////////////////////////////////////////////////////////////////////////

 activeCadastro:boolean= false;

 changeCadastro(value:boolean)
 {
  this.activeCadastro = value
 }



 form = {
    nomeFantasia: '',
    razaoSocial: '',
    cnpj: '',
    status: 'Ativo'
  };



  goBack() {
    this.activeCadastro = false;
  }

 
 model = {
    nome: '',
    cpf: '',
    status: 'Ativo'
  };

  cancelar() {
    console.log('Cadastro cancelado');
  }

  salvar() {
    console.log('Dados enviados:', this.model);
  }


}
