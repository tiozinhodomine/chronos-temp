import { Link } from "react-router-dom";

import { Container } from "../../components/container";
import { GenericHTML } from "../../components/genericHTML";
import { Heading } from "../../components/heading";
import { MainTemplate } from "../../templates/mainTemplates";

export function AboutPomodoro() {
  return (
    <MainTemplate>
      <Container>
        <GenericHTML>
          <Heading>A Técnica Pomodoro</Heading>

          <p>
            A Técnica Pomodoro é uma metodologia de produtividade criada por{" "}
            <strong>Francesco Cirillo</strong>. Ela divide o trabalho em blocos
            de tempo (os “Pomodoros”) intercalados com pausas, para manter o
            foco e evitar o cansaço mental.
          </p>

          <h2>Como funciona no Chronos?</h2>

          <ul>
            <li>
              <strong>1. Defina uma tarefa</strong> na página inicial.
            </li>
            <li>
              <strong>2. Trabalhe com foco</strong> pelo tempo configurado
              (padrão: 25 minutos).
            </li>
            <li>
              <strong>3. Faça uma pausa curta</strong> (padrão: 5 minutos).
            </li>
            <li>
              <strong>4. A cada 4 ciclos de foco</strong>, faça uma pausa longa
              (padrão: 15 minutos).
            </li>
          </ul>

          <h3>Ciclos organizados</h3>
          <p>
            O Chronos avança automaticamente entre foco → descanso curto → foco
            → … e, a cada quatro focos, sugere o descanso longo.
          </p>

          <h3>Histórico</h3>
          <p>
            Todas as tarefas concluídas ou interrompidas ficam salvas no{" "}
            <Link to="/history">histórico</Link>, com filtros e busca por nome.
            Os dados permanecem no navegador mesmo após atualizar a página
            (localStorage).
          </p>

          <p>
            Volte para a <Link to="/">página principal</Link> e comece seu
            próximo ciclo!
          </p>
        </GenericHTML>
      </Container>
    </MainTemplate>
  );
}
