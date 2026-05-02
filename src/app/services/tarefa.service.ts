import { Injectable } from '@angular/core';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private tarefas: Tarefa[] = [];

  constructor() {
    this.carregarDoLocalStorage();
  }

  listar(): Tarefa[] {
    return this.tarefas;
  }

  buscarPorId(id: number): Tarefa | undefined {
    return this.tarefas.find(t => t.id === id);
  }

  adicionar(tarefa: Omit<Tarefa, 'id' | 'concluida' | 'dataCriacao'>) {
    const novaTarefa: Tarefa = {
      id: this.gerarId(),
      ...tarefa,
      concluida: false,
      dataCriacao: new Date()
    };

    this.tarefas.push(novaTarefa);
    this.salvarNoLocalStorage();
  }

  editar(id: number, dados: Partial<Tarefa>) {
    const tarefa = this.buscarPorId(id);

    if (tarefa) {
      tarefa.titulo = dados.titulo ?? tarefa.titulo;
      tarefa.descricao = dados.descricao ?? tarefa.descricao;
      tarefa.categoria = dados.categoria ?? tarefa.categoria;
      tarefa.prioridade = dados.prioridade ?? tarefa.prioridade;

      this.salvarNoLocalStorage();
    }
  }

  excluir(id: number) {
    this.tarefas = this.tarefas.filter(t => t.id !== id);
    this.salvarNoLocalStorage();
  }

  alterarStatus(id: number) {
    const tarefa = this.buscarPorId(id);

    if (tarefa) {
      tarefa.concluida = !tarefa.concluida;
      tarefa.dataConclusao = tarefa.concluida ? new Date() : undefined;
      this.salvarNoLocalStorage();
    }
  }

  private gerarId(): number {
    if (this.tarefas.length === 0) {
      return 1;
    }

    return Math.max(...this.tarefas.map(t => t.id)) + 1;
  }

  private salvarNoLocalStorage() {
    localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
  }

  private carregarDoLocalStorage() {
    const dados = localStorage.getItem('tarefas');

    if (dados) {
      this.tarefas = JSON.parse(dados);
    }
  }
}