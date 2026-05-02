import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tarefa-form.html',
  styleUrl: './tarefa-form.css'
})
export class TarefaForm {

  tarefa: any = {
    titulo: '',
    descricao: '',
    categoria: '',
    prioridade: ''
  };

  constructor(
    private tarefaService: TarefaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const tarefa = this.tarefaService.buscarPorId(Number(id));
      if (tarefa) {
        this.tarefa = { ...tarefa };
      }
    }
  }

  salvar() {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.tarefa.titulo.length < 3) {
      alert('O título deve ter no mínimo 3 caracteres.');
      return;
    }

    if (!this.tarefa.categoria || !this.tarefa.prioridade) {
      alert('Preencha categoria e prioridade.');
      return;
    }

    if (id) {
      this.tarefaService.editar(Number(id), this.tarefa);
    } else {
      this.tarefaService.adicionar(this.tarefa);
    }

    this.router.navigate(['/tarefas']);
  }
}