import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { TarefaLista } from './pages/tarefa-lista/tarefa-lista';
import { TarefaForm } from './pages/tarefa-form/tarefa-form';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'tarefas', component: TarefaLista },
  { path: 'tarefa/nova', component: TarefaForm },
  { path: 'tarefa/editar/:id', component: TarefaForm }
];