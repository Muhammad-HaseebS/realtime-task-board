'use client';

type CardProps = {
  title: string;
};

export default function Card({ title }: CardProps) {
  return (
    <div className="bg-gray-100 p-3 rounded shadow-sm hover:shadow-md transition duration-200 text-sm text-gray-800">
      {title}
    </div>
  );
}
