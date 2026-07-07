import { Error } from '../../../components/Error';

export default function ArticleNotFound() {
  return (
    <Error code={404} title="Pagina niet gevonden">
      <p>De pagina die je probeert te bezoeken bestaat niet.</p>
    </Error>
  );
}
