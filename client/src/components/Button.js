export default function Button({ label, func, buttonClass }) {
  return (
    <div>
      <button className={buttonClass} onClick={() => func()}>
        {label}
      </button>
    </div>
  );
}
