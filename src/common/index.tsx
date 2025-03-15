export function formatTextToSentenceCase (input:string) {
    return input
      .replace(/[_-]/g, " ") // Replace underscores and dashes with spaces
      .split(" ") // Split into words
      .map((word:string) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join words back together
}

export const sortList = (key:string, list: string[])=>{
  return  list?.sort((a: any, b: any) =>
      a[key] > b[key] ? 1 : -1
  )
}

export function trimSentence(sentence: string, maxLength=90) {
  return sentence.length > maxLength ? sentence.slice(0, maxLength) + "..." : sentence;
}
