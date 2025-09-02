import Link from "next/link";

export default function PingxingRouteLayout({ children, student, team }: { children: React.ReactNode, student: React.ReactNode, team: React.ReactNode }) {
  return (
    <div>
      <div>PingxingRouteLayout</div>
      <div>
        <Link href="/pingxing-route">Home</Link>
        <Link href="/pingxing-route/student-manage">StudentManage</Link>
        <Link href="/pingxing-route/student-system">StudentSystem</Link>
      </div>
      {student}
      {team}
      {children}
      {/* {isLogin ? loginPage : registerPage} */}
    </div>
  );
}