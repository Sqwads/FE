export function formatTextToSentenceCase (input:string) {
    return input
      .replace(/[_-]/g, " ") // Replace underscores and dashes with spaces
      .split(" ") // Split into words
      .map((word:string) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join words back together
}