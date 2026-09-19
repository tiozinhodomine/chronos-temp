import { Link } from "react-router-dom";

import { Container } from "../../components/container";
import { GenericHTML } from "../../components/genericHTML";
import { Heading } from "../../components/heading";
import { MainTemplate } from "../../templates/mainTemplates";

export function NotFound() {
  return (
    <MainTemplate>
      <Container>
        <GenericHTML>
          <Heading>404 — Página não encontrada</Heading>

          <p>
            A página que você tentou abrir não existe (ou foi para outra
            dimensão do tempo).
          </p>

          <p>
            Você pode voltar para a <Link to="/">página principal</Link>, ver o{" "}
            <Link to="/history">histórico</Link> ou ler sobre a{" "}
            <Link to="/about-pomodoro">Técnica Pomodoro</Link>.
          </p>
        </GenericHTML>
      </Container>
    </MainTemplate>
  );
}
