import { Link } from "react-router-dom";

export const AboutUs = () => {
  return (
    <div className="background">
      <section className="container mt-5">
        <h1>Inanna</h1>
        <p className="mt-3">
          Inanna surge como un proyecto colaborativo para resolver un problema que
          se viene dando de forma habitual en todas partes del mundo y con demasiada
          frecuencia: animales perdidos cuyos dueños no consiguen volver a verlos,
          ya sea por causas de fuerza mayor o por falta de difusión de los datos del
          animal, porque no tenga chip, este se haya desplazado o los datos estén
          desactualizados.

          <br></br>
          Muchos animales perdidos acaban en la perrera o en refugios, y foros de
          Facebook de diferentes ciudades y provincias publican fotos de animales
          encontrados sin dar con sus dueños. Esta web se forma como un
          conglomerado de todas estas publicaciones, para aquellos usuarios que
          quieran ayudar a los peluditos a volver a su hogar sin necesidad de usar
          redes sociales.
        </p>
      </section>
    </div>
  );
};