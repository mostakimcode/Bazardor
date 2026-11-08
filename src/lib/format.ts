// সংখ্যাকে বাংলা অঙ্কে রূপান্তর করে (১,৮৫০ / ৬৩.৫০)
export const toBn = (num: number, digits?: number) => {
  return num.toLocaleString("bn-BD", {
    minimumFractionDigits: digits ?? 0,
    maximumFractionDigits: digits ?? 2,
  });
};

// ১২৩ হলে ১২৩, ৬৩.৫ হলে ৬৩.৫০
export const toBnPrice = (num: number) => {
  return Number.isInteger(num) ? toBn(num) : toBn(num, 2);
};

const unitMap = {
  kg: { full: "প্রতি কেজি", short: "কেজি" },
  litre: { full: "প্রতি লিটার", short: "লিটার" },
  dozen: { full: "প্রতি ডজন", short: "ডজন" },
  piece: { full: "প্রতি পিস", short: "পিস" },
};

export const unitFull = (unit: keyof typeof unitMap) => unitMap[unit].full;
export const unitShort = (unit: keyof typeof unitMap) => unitMap[unit].short;
