const CodeList = ({ stack }: { stack: string[] }) => (
  <div className="code-list">
    {stack.map((s) => (
      <p className="code-list__item" key={s}>
        {s}
      </p>
    ))}
  </div>
)

export default CodeList
