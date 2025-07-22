export default function isObjectValid(obj: any): boolean {
    for (const key in obj) {
      if (obj[key] === undefined || obj[key] === null || obj[key] === "") {
        return false;
      }
    }
    return true;
  }