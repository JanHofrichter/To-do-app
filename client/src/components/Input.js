export default function Input({ value, func }) {
  return (
    <input
      placeholder="Add task"
      className="form-control"
      type="text"
      name="name"
      value={value}
      onChange={func}
    />
  );
}
