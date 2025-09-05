'use server';

import { sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const data = ['read', 'write'];

export async function findData() {
  // await sleep(1000);
  return data;
}

export async function createData(formData: FormData) {
  const item = formData.get('item');
  // await sleep(1000);
  data.push(item as string);
  revalidatePath('/server-action'); // 刷新当前页面数据
}