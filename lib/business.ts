// Checks format/checksum, not registration or current company activity.
export function isValidSiret(input: string): boolean {
  const value = input.replace(/\s/g, "");
  if (!/^\d{14}$/.test(value) || /^0+$/.test(value)) return false;
  const digits = [...value].map(Number);
  if (value.startsWith("356000000")) return digits.reduce((a, b) => a + b, 0) % 5 === 0;
  return digits.reduce((sum, digit, index) => {
    const n = index % 2 === 0 ? digit * 2 : digit;
    return sum + (n > 9 ? n - 9 : n);
  }, 0) % 10 === 0;
}
