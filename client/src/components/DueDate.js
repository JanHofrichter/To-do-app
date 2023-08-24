export default function DueDate({ value, func }) {
  return (
    <input
      type="date"
      name="date_until"
      value={value}
      onChange={func}
      min="2022-01-01"
    />
  );
}
