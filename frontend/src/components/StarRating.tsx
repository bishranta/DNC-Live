export function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: 1 | 2 | 3 | 4 | 5) => void;
}) {
  return (
    <div className="flex gap-2">
      {([1, 2, 3, 4, 5] as const).map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          className={`text-3xl transition ${
            star <= value ? "text-dnc-orange" : "text-slate-300 hover:text-dnc-orange/50"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
