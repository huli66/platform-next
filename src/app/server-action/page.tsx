import { Input } from "@/components/ui/input";
import { createData, findData } from "./actions";
import { Button } from "@/components/ui/button";
import { SubmitButton } from "./submit-button";

export default async function ServerActionPage() {
  const data = await findData();
  return (
    <div>
      <h1>Server Action</h1>
      <form action={createData}>
        <Input type="text" name="item" />
        <SubmitButton />
      </form>
      <ol>
        {data.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </div>
  );
}