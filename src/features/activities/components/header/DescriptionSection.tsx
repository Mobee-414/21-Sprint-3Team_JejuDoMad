type Props = {
  description: string;
};

export default function DescriptionSection({ description }: Props) {
  return (
    <section className="mt-20">
      <h2 className="text-lg font-bold md:text-xl">체험 설명</h2>

      <p className="mt-3 text-sm leading-relaxed font-medium whitespace-pre-line text-gray-700">
        {description}
      </p>
    </section>
  );
}
