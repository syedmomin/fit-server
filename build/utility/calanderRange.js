"use strict";
// export default function dateFilter(dateRange: string) {
//     let startDate: string;
//     let endDate: string = formatDate(new Date(), "yyyy-MM-dd", "en");
//     switch (dateRange) {
//       case "today":
//         startDate = endDate;
//         break;
//       case "yesterday":
//         const yesterday = new Date();
//         yesterday.setDate(yesterday.getDate() - 1);
//         startDate = formatDate(yesterday, "yyyy-MM-dd", "en");
//         endDate = startDate;
//         break;
//       case "week":
//         const startOfWeek = new Date();
//         startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
//         startDate = formatDate(startOfWeek, "yyyy-MM-dd", "en");
//         break;
//       case "year":
//         const startOfYear = new Date(new Date().getFullYear(), 0, 1);
//         startDate = formatDate(startOfYear, "yyyy-MM-dd", "en");
//         break;
//       default:
//         throw new Error("Invalid date range");
//     }
//     const result = {
//       startDate: startDate,
//       endDate: endDate,
//     };
//     return result;
//   }
