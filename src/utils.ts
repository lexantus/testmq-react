/**
 * Request for data
 * @param url request
 * @returns data
 */
export async function getData<T>(url: string): Promise<T[]> {
  const res = await fetch(url);

  if (res.ok) {
    return await res.json();
  }

  throw new Error();
}

export function getParamTitle(
  paramRusName: string,
  period: [string, string]
): string {
  return period[0] === period[1]
    ? `${paramRusName} за ${period[0]} год`
    : `${paramRusName} c ${period[0]} по ${period[1]} год`;
}
