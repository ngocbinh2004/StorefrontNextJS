function removeDiacritics(str: string) {
  const diacriticsMap: { [key: string]: string } = {
    'àáảãạăắằẵặâấầẩẫậ': 'a',
    'èéẻẽẹêếềểễệ': 'e',
    'ìíỉĩị': 'i',
    'òóỏõọôồốổỗộơờớởỡợ': 'o',
    'ùúủũụưừứửữự': 'u',
    'ỳýỷỹỵ': 'y',
    'đ': 'd',
  }

  for (const diacritics in diacriticsMap) {
    for (const char of diacritics) {
      str = str.replace(new RegExp(char, 'g'), diacriticsMap[diacritics])
    }
  }

  return str
}

declare global {
  interface String {
    removeDiacritics(): string;
  }
}

String.prototype.removeDiacritics = function () {
  return removeDiacritics(this.toString());
};

export { removeDiacritics }