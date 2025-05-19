
export default function TaskHeader({
    title,
    description
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-extrabold text-2xl text-center leading-tight mb-2 text-gray-50">
        {title}
      </h1>
      <p className="text-base text-gray-100 leading-relaxed mb-4">
        {description}
      </p>
    </div>
  );
}