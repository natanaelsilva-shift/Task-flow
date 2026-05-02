import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/tarefa';

@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tarefa-lista.html',
  styleUrl: './tarefa-lista.css'
})
export class TarefaLista {

  tarefas: Tarefa[] = [];
  tarefasFiltradas: Tarefa[] = [];

  busca: string = '';
  filtroCategoria: string = '';
  filtroPrioridade: string = '';
  filtroStatus: string = '';

  constructor(private tarefaService: TarefaService) {}

  ngOnInit() {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.tarefas = this.tarefaService.listar();
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.tarefasFiltradas = this.tarefas.filter(t => {
      const matchBusca =
        t.titulo.toLowerCase().includes(this.busca.toLowerCase()) ||
        t.descricao.toLowerCase().includes(this.busca.toLowerCase());

      const matchCategoria =
        !this.filtroCategoria || t.categoria === this.filtroCategoria;

      const matchPrioridade =
        !this.filtroPrioridade || t.prioridade === this.filtroPrioridade;

      const matchStatus =
        !this.filtroStatus ||
        (this.filtroStatus === 'concluida' && t.concluida) ||
        (this.filtroStatus === 'pendente' && !t.concluida);

      return matchBusca && matchCategoria && matchPrioridade && matchStatus;
    });
  }

  alterarStatus(id: number) {
    this.tarefaService.alterarStatus(id);
    this.carregarTarefas();
  }

  excluir(id: number) {
    if (confirm('Deseja excluir esta tarefa?')) {
      this.tarefaService.excluir(id);
      this.carregarTarefas();
    }
  }
}