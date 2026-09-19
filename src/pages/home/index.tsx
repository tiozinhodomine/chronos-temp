import { Container } from "../../components/container";
import { CountDown } from "../../components/countdown";
import { MainForm } from "../../components/mainForm";
import { MainTemplate } from "../../templates/mainTemplates";

export function Home() {
  return (
    <MainTemplate>
      <Container>
        <CountDown />
      </Container>

      <Container>
        <MainForm />
      </Container>
    </MainTemplate>
  );
}