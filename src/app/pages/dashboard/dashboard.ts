import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/tarefa';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  tarefas: Tarefa[] = [];

  total = 0;
  pendentes = 0;
  concluidas = 0;
  altas = 0;
  medias = 0;
  baixas = 0;

  constructor(private tarefaService: TarefaService) {}

  ngOnInit() {
    this.tarefas = this.tarefaService.listar();
    this.calcularEstatisticas();
  }

  calcularEstatisticas() {
    this.total = this.tarefas.length;
    this.pendentes = this.tarefas.filter(t => !t.concluida).length;
    this.concluidas = this.tarefas.filter(t => t.concluida).length;
    this.altas = this.tarefas.filter(t => t.prioridade === 'Alta').length;
    this.medias = this.tarefas.filter(t => t.prioridade === 'Média').length;
    this.baixas = this.tarefas.filter(t => t.prioridade === 'Baixa').length;
  }
}