import Link from "next/link"

export default function InterceptingLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <div>
      <div>InterceptingLayout</div>
      {children}
      {modal}
    </div>
  );
}