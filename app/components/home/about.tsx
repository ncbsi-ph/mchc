import { SectionTitle } from '@/app/helpers';

export default function About() {
  return (
    <section className="my-28 text-center">
      <div className="container">
        <SectionTitle
          heading="WELCOME TO METRO CALACA HOSPITAL CORP."
          subHeading="WELCOME TO METRO CALACA HOSPITAL CORP."
        />
        <p className="py-5 text-lg">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, quo ex.
          Sunt repellat non voluptatum! Debitis, ullam assumenda? Accusantium
          doloremque maiores, eligendi quis est ut ex minima libero nemo optio?
          Dolore maxime id, illo natus ducimus accusantium quia quis aut
          assumenda odit! Odit, temporibus cumque et laboriosam dignissimos quis
          tempora, minima quam eum consectetur repellat. Voluptatum illum
          ratione voluptate nobis! Cum reprehenderit officiis dolore explicabo
          maxime nobis ullam corrupti obcaecati sequi? Explicabo est vitae vero?
          Esse quas rem nulla eligendi eum, quaerat repellendus beatae
          inventore, possimus natus, voluptates aspernatur neque. Blanditiis
          ratione veritatis amet, laborum alias est expedita odit fuga autem
          laudantium deleniti iste quo ipsam qui, adipisci a, quisquam sed at
          debitis numquam. Cupiditate facilis perspiciatis quas ex blanditiis?
          Voluptatem neque aut assumenda ullam voluptas aperiam iusto ipsa.
          Autem provident neque necessitatibus ratione tempore eos, aut deleniti
          recusandae reprehenderit porro molestias in, labore sint quidem
          facilis iusto! Porro, accusamus.
        </p>
      </div>
      <iframe
        src={`https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FONC.MCHC%2Fvideos%2F300225206201462%2F&show_text=false&width=560&t=0`}
        title="METRO CALACA HOSPITAL CORP."
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="w-full h-[256px] md:w-[711px] md:h-[400px] md:m-auto rounded-md"
      />
    </section>
  );
}
