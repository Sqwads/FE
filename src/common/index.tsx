import moment from "moment";

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

 export const getTimeDifference = (startDateString: string, endDateString: string) => {
    const startDate = moment(startDateString); // Convert to Moment.js date
    const endDate = moment(endDateString); // Get today's date

    const isFuture = startDate.isAfter(endDate, "day"); // Check if the date is in the future

    const monthsDiff = Math.abs(endDate.diff(startDate, "months"));
    const weeksDiff = Math.abs(endDate.diff(startDate, "weeks"));
    const daysDiff = Math.abs(endDate.diff(startDate, "days"));

    let timeDifference;
    
    if (monthsDiff >= 1) {
        timeDifference = `${monthsDiff} month${monthsDiff > 1 ? "s" : ""}`;
    } else if (weeksDiff >= 1) {
        timeDifference = `${weeksDiff} week${weeksDiff > 1 ? "s" : ""}`;
    } else {
        timeDifference = `${daysDiff} day${daysDiff > 1 ? "s" : ""}`;
    }

    return timeDifference
  };

  export const getDayDifference = (startDateString: string, endDateString: string)=>{
    const startDate = moment(startDateString); // Convert to Moment.js date
    const endDate = moment(endDateString); // Get today's date
    const todayDate = moment()

    

    const endDay = Math.abs(endDate.diff(startDate, "days"));
    const currentDay =  Math.abs(todayDate.diff(startDate, "days"));

   

    return{
      endDay,
      currentDay
    }
  }

  export function getInitials(input: string): string {
    const techAbbreviations: Record<string, string> = {
      javascript: "JS",
      typescript: "TS",
      react: "R",
      angular: "NG",
      vue: "V",
      nodejs: "Node",
      html: "HTML",
      css: "CSS",
    };

    const lowerInput = input.toLowerCase();
    if (techAbbreviations[lowerInput]) {
      return techAbbreviations[lowerInput];
    }

    const words = input.trim().split(" ");
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return (words[0][0] + words[1][0]).toUpperCase();
  }

  export function extractPlainTextFromHTML(html: string): string {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

export function generateSlug(text: string) {
  return text
    .toLowerCase()                             // Convert to lowercase
    .trim()                                    // Remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, '')              // Remove non-alphanumeric characters
    .replace(/\s+/g, '-')                      // Replace spaces with hyphens
    .replace(/-+/g, '-');                      // Collapse multiple hyphens
}
