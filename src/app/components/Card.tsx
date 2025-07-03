'use client';

type CardProps = {
  title: string;
};

export default function Card({ title }: CardProps) {
  return (
    <div className="bg-white p-2 rounded shadow hover:shadow-md transition-shadow">
      {title}
    </div>
  );
}
