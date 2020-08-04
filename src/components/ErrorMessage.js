export default function ErrorMessage({ message }) {
  return (
    <aside>
      {message}
      <style jsx>{`
        aside {
          margin-top: 5px;
          padding: 1.5em;
          font-size: 14px;
          color: white;
          background-color: #ff5555;
        }
      `}</style>
    </aside>
  );
}
