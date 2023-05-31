import Link from 'next/link';

export default function Example() {
  return (
    <>
      <div className="homePageContainer">
        <h2>Horário de funcionamento</h2>
        <table>
          <thead>
            <tr>
              <th>Segunda à Quinta</th>
              <th>Sexta e Sábado</th>
              <th>Domingos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>9h até 18h</td>
              <td>6h até 18h</td>
              <td>8h30 até 12h</td>
            </tr>
          </tbody>
        </table>
        <h2>Serviços</h2>
        <p>
          Atualmente estamos realizando os seguintes serviços: corte de cabelo,
          barba, sobrancelha com ou sem hena e manutenção de dread.
        </p>
        <br />
        <p>
          Para agendar seu horário basta clicar no botão abaixo e preencher o
          formulário.
        </p>
        <Link href="/dashboard/agendar">
          <button>Agendar Horário</button>
        </Link>
      </div>
    </>
  );
}
