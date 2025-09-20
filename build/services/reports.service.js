"use strict";
// import pdfGenerator from "../utility/pdfGenerator";
// import formatDate from "../utility/dateFormat";
// import numberToWords from "../utility/numberToWord";
// import thousandSeparator from "../utility/thousandSeparator";
// import GoodReceivingService from "./goodReceiving.service";
// import WholesaleService from "./wholesale.service";
// import orderService from "./order.service";
// import dataSource from "../config/db";
// class ReportsService {
//   async StockOnHandReport(getDetails: any, download: boolean = false) {
//     const { productId } = getDetails;
//     try {
//       let query = `SELECT * FROM "Products"`;
//       const queryParams = [];
//       if (productId) {
//         query += ' WHERE "Id" = $1';
//         queryParams.push(productId);
//       }
//       const stockOnHand = await dataSource.query(query, queryParams);
//       if (download) {
//         const printTemplate = await pdfGenerator("stockOnHand", {
//           stockOnHand,
//           thousandSeparator,
//         });
//         return printTemplate;
//       } else {
//         return stockOnHand;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw new Error("An error occurred while fetching order details.");
//     }
//   }
//   async OrderInvoiceReport(getDetails: any) {
//     const getOrder = await orderService.FindById({ id: getDetails }, [
//       "contact",
//       "details",
//       "contact.city",
//       "details.item",
//     ]);
//     const printTemplate = await pdfGenerator("orderInvoice", {
//       ...getOrder,
//       formatDate,
//       numberToWords,
//       thousandSeparator,
//     });
//     return printTemplate;
//   }
//   async WholesaleInvoiceReport(getDetails: any) {
//     const getWholesale = await WholesaleService.FindById({ id: getDetails }, [
//       "contact",
//       "details",
//       "contact.city",
//       "details.product",
//     ]);
//     const printTemplate = await pdfGenerator("wholesaleInvoice", {
//       ...getWholesale,
//       formatDate,
//       numberToWords,
//       thousandSeparator,
//     });
//     return printTemplate;
//   }
//   async GoodsReceivingReport(getDetails: any) {
//     const getGrn = await GoodReceivingService.FindById({ id: getDetails }, [
//       "contact",
//       "details",
//       "contact.city",
//       "details.product",
//     ]);
//     const printTemplate = await pdfGenerator("goodReceivingInvoice", {
//       ...getGrn,
//       formatDate,
//       numberToWords,
//       thousandSeparator,
//     });
//     return printTemplate;
//   }
//   async DeliveryNoteReport(getDetails: any) {
//     const getGrn = await GoodReceivingService.FindById({ id: getDetails }, [
//       "contact",
//       "details",
//       "contact.city",
//       "details.product",
//     ]);
//     const printTemplate = await pdfGenerator("deliveryNote", {
//       ...getGrn,
//       formatDate,
//       thousandSeparator,
//     });
//     return printTemplate;
//   }
//   async FilterOrderReport(getDetails: any, download: boolean = false) {
//     const { fromDate, toDate, customerId } = getDetails;
//     try {
//       let query = `
//             SELECT o.*, c.name AS "customerName",c.phone AS "customerPhone"
//             FROM "Orders" o
//             INNER JOIN "Contacts" c ON o."contactId" = c.id
//             WHERE DATE(o."orderDate") >= $1
//               AND DATE(o."orderDate") <= $2`;
//       const queryParams: any[] = [fromDate, toDate];
//       if (customerId) {
//         query += ' AND o."contactId" = $3';
//         queryParams.push(customerId);
//       }
//       const orderDetails = await dataSource.query(query, queryParams);
//       if (download) {
//         const printTemplate = await pdfGenerator("filterOrderReport", {
//           orderDetails,
//           fromDate,
//           toDate,
//           formatDate,
//           numberToWords,
//           thousandSeparator,
//         });
//         return printTemplate;
//       } else {
//         return orderDetails;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw new Error("An error occurred while fetching order details.");
//     }
//   }
//   async OrderReport(getDetails: any, download: boolean = false) {
//     const { orderId } = getDetails;
//     try {
//       let query = `
//           SELECT o.*, c.*
//           FROM "Orders" o
//           INNER JOIN "Contacts" c ON o."contactId" = c.id
//           INNER JOIN "OrderDetails" od ON od."orderId" = o.id
//           Where o.id = $1`;
//       const queryParams: any[] = [orderId];
//       const orderDetails = await dataSource.query(query, queryParams);
//       if (download) {
//         const printTemplate = await pdfGenerator("orderInvoice", {
//           orderDetails,
//           formatDate,
//           numberToWords,
//           thousandSeparator,
//         });
//         return printTemplate;
//       } else {
//         return orderDetails;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw new Error("An error occurred while fetching order details.");
//     }
//   }
//   async FilterGoodReceivingReport(getDetails: any, download: boolean = false) {
//     const { fromDate, toDate, vendorId } = getDetails;
//     try {
//       let query = `
//             SELECT gr.*, c.name AS "vendorName",c.phone AS "vendorPhone"
//             FROM "GoodReceiving" gr
//             INNER JOIN "Contacts" c ON gr."contactId" = c.id
//             WHERE DATE(gr."receivingDate") >= $1
//               AND DATE(gr."receivingDate") <= $2`;
//       const queryParams: any[] = [fromDate, toDate];
//       if (vendorId) {
//         query += ' AND gr."contactId" = $3';
//         queryParams.push(vendorId);
//       }
//       const grnDetails = await dataSource.query(query, queryParams);
//       if (download) {
//         const printTemplate = await pdfGenerator("filterGoodReceivingReport", {
//           grnDetails,
//           fromDate,
//           toDate,
//           formatDate,
//           numberToWords,
//           thousandSeparator,
//         });
//         return printTemplate;
//       } else {
//         return grnDetails;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw new Error("An error occurred while fetching order details.");
//     }
//   }
//   async OrderMeasurementReport(getDetails: any, download: boolean = false) {
//     const { orderId } = getDetails;
//     try {
//       let query = `
//             SELECT o."number", o."orderDate", od."id",it."name", md."parameter", md."value", md."style" 
//             FROM "Orders" o
// 			      INNER JOIN  "OrderDetails" od ON od."orderId" = o."id"
//             INNER JOIN "MeasurementOrderDetails" md ON od."id" = md."orderDetailId"
//             INNER JOIN "Items" it ON od."itemId" = it."id"
//             WHERE od."orderId" = $1;`;
//       const queryParams: any[] = [orderId];
//       const measurementDetails = await dataSource.query(query, queryParams);
//       if (download) {
//         const printTemplate = await pdfGenerator("measurement", {
//           measurementDetails,
//           formatDate
//         });
//         return printTemplate;
//       } else {
//         return measurementDetails;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw new Error("An error occurred while fetching order details.");
//     }
//   }
//   async FilterWholesaleReport(getDetails: any, download: boolean = false) {
//     const { fromDate, toDate, vendorId } = getDetails;
//     try {
//       let query = `
//             SELECT ws.*, c.name AS "supplierName",c.phone AS "supplierPhone"
//             FROM "Wholesale" ws
//             INNER JOIN "Contacts" c ON ws."contactId" = c.id
//             WHERE DATE(ws."deliveryDate") >= $1
//               AND DATE(ws."deliveryDate") <= $2`;
//       const queryParams: any[] = [fromDate, toDate];
//       if (vendorId) {
//         query += ' AND ws."contactId" = $3';
//         queryParams.push(vendorId);
//       }
//       const wholesaleDetails = await dataSource.query(query, queryParams);
//       if (download) {
//         const printTemplate = await pdfGenerator("filterWholesaleReport", {
//           wholesaleDetails,
//           fromDate,
//           toDate,
//           formatDate,
//           numberToWords,
//           thousandSeparator,
//         });
//         return printTemplate;
//       } else {
//         return wholesaleDetails;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw new Error("An error occurred while fetching order details.");
//     }
//   }
//   async FilterExpenseSummaryReport(getDetails: any, download: boolean = false) {
//     const { fromDate, toDate, businessType, expensesTypeId } = getDetails;
//     try {
//       let query = `
//             SELECT el.remarks, el.amount, el.date, et.name AS "expensesTypeName"
//             FROM "ExpensesLedger" el
//             INNER JOIN "ExpenseTypes" et ON el."expensesTypeId" = et.id
//             WHERE DATE(el."date") >= $1
//               AND DATE(el."date") <= $2
//               AND "businessType" = $3`;
//       const queryParams: any[] = [fromDate, toDate, businessType];
//       if (expensesTypeId) {
//         query += ' AND el."expensesTypeId" = $4';
//         queryParams.push(expensesTypeId);
//       }
//       const expenseDetails = await dataSource.query(query, queryParams);
//       if (download) {
//         const printTemplate = await pdfGenerator("filterExpenseSummary", {
//           expenseDetails,
//           fromDate,
//           toDate,
//           businessType,
//           formatDate,
//           numberToWords,
//           thousandSeparator,
//         });
//         return printTemplate;
//       } else {
//         return expenseDetails;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw new Error("An error occurred while fetching order details.");
//     }
//   }
//   async FilterEmployeeLedgerReport(getDetails: any, download: boolean = false) {
//     const { fromDate, toDate, employeeId } = getDetails;
//     try {
//       // SUM(el."debit" - el."credit") OVER (ORDER BY el."date", el."id") AS balance
//       let query = `
//             SELECT 
//             el."date", 
//             el."debit", 
//             el."credit", 
//             el."remarks",
//             e."name" AS "employeeName", 
//             e."phone" AS "employeePhone",
//             pt."name" AS "paymentType"
//         FROM 
//             "EmployeesLedger" el
//         INNER JOIN 
//             "Employees" e ON el."employeeId" = e.id
//         INNER JOIN 
//             "PaymentTypes" pt ON el."paymentTypeId" = pt.id
//              WHERE DATE(el."date") >= $1
//              AND DATE(el."date") <= $2`;
//       const queryParams: any[] = [fromDate, toDate];
//       if (employeeId) {
//         query += ' AND el."employeeId" = $3';
//         queryParams.push(employeeId);
//       }
//       query += ' ORDER BY el."date"';
//       const employeeLedger = await dataSource.query(query, queryParams);
//       if (download) {
//         const printTemplate = await pdfGenerator("employeeLedger", {
//           employeeLedger,
//           fromDate,
//           toDate,
//           formatDate,
//           numberToWords,
//           thousandSeparator,
//         });
//         return printTemplate;
//       } else {
//         return employeeLedger;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw new Error("An error occurred while fetching order details.");
//     }
//   }
//   async OrderLedgerReport(getDetails: any, download: boolean = false) {
//     const { fromDate, toDate, contactId } = getDetails;
//     try {
//       let query = `
//           WITH customerLedgerReport AS (
//     SELECT 
//         "contactId",
//         NULL AS "date",
//         NULL AS "orderNumber",
//         NULL AS "orderId",
//         'BALANCE B/D' AS "narration",
//         COALESCE(SUM("netBalanceAmount"), 0) AS "debit",
//         0 AS "credit",
//         1 AS "sortOrder"
//     FROM "Orders"
//     WHERE DATE("orderDate") <= $2
//       AND "contactId" = $3
//     GROUP BY "contactId"
//     UNION ALL
//     SELECT 
//         "contactId",
//         DATE("orderDate") AS "date",
//         Number AS "orderNumber",
//         id AS "orderId",
//         CONCAT('STITCHING ORDER OF ', UPPER("reference"), ' FOR ') AS "narration",
//         "totalAmount" AS "debit",
//         0 AS "credit",
//         2 AS "sortOrder"
//     FROM "Orders"
//     WHERE "contactId" = $3
//       AND DATE("orderDate") BETWEEN $1 AND $2
//     UNION ALL
//     SELECT 
//         "contactId",
//         DATE("orderDate") AS "date",
//         Number AS "orderNumber",
//         id AS "orderId",
//         CONCAT('DELIVERED STITCHING ORDER OF ', UPPER("reference"), ' FOR ') AS "narration",
//         0 AS "debit",
//         "receivedAmount" AS "credit",
//         3 AS "sortOrder"
//     FROM "Orders"
//     WHERE "contactId" = $3
//       AND DATE("orderDate") BETWEEN $1 AND $2
//     UNION ALL
//     SELECT 
//         "contactId",
//         DATE("date") AS "date",
//         NULL AS "orderNumber",
//         NULL AS "orderId",
//         'BALANCE PAYMENT COLLECTED THROUGH LEDGER' AS "narration",
//         0 AS "debit",
//         SUM("collectedAmount") AS "credit",
//         4 AS "sortOrder"
//     FROM "ReceiveMoneyAccounts"
//     WHERE "contactId" = $3
//       AND DATE("date") BETWEEN $1 AND $2
//     GROUP BY "contactId", DATE("date")
// )
// SELECT 
//     "date",
//     "orderId",
//     "orderNumber",
//     "narration",
//     "debit",
//     "credit"
// FROM customerLedgerReport
// ORDER BY  "date", "orderId","sortOrder";
//             `;
//       const queryParams: any[] = [fromDate, toDate, contactId];
//       const orderLedger = await dataSource.query(query, queryParams);
//       if (download) {
//         const printTemplate = await pdfGenerator("orderLedger", {
//           orderLedger,
//           fromDate,
//           toDate,
//           formatDate,
//           numberToWords,
//           thousandSeparator,
//         });
//         return printTemplate;
//       } else {
//         return orderLedger;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw new Error("An error occurred while fetching order details.");
//     }
//   }
//   async WholesaleLedgerReport(getDetails: any, download: boolean = false) {
//     const { fromDate, toDate, supplierId } = getDetails;
//     try {
//       let query = ``;
//       const queryParams: any[] = [fromDate, toDate, supplierId];
//       const orderLedger = await dataSource.query(query, queryParams);
//       if (download) {
//         const printTemplate = await pdfGenerator("orderLedger", {
//           orderLedger,
//           fromDate,
//           toDate,
//           formatDate,
//           numberToWords,
//           thousandSeparator,
//         });
//         return printTemplate;
//       } else {
//         return orderLedger;
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       throw new Error("An error occurred while fetching order details.");
//     }
//   }
//   async InventoryActivityReport(getDetails: any, download: boolean = false) {
//     const { fromDate, toDate, productId } = getDetails;
//     try {
//       let query = `
//             WITH openingBalance AS (
//                 SELECT 
//                     p.id AS productId, 
//                     p."name" AS productName, 
//                     p."UOM" AS productUOM, 
//                     COALESCE(SUM(grd."quantity"), 0)::numeric AS opening 
//                 FROM 
//                     "GoodReceiving" gr
//                     JOIN "GoodReceivingDetails" grd ON gr.id = grd."goodReceivingId"
//                     JOIN "Products" p ON grd."productId" = p.id 
//                 WHERE 
//                     gr."receivingDate" < $1 
//                 GROUP BY 
//                     p.id, p."name", p."UOM"
//                 HAVING SUM(grd."quantity") IS NOT NULL
//             ),
//             goodReceiving AS (
//                 SELECT 
//                     p.id AS productId, 
//                     p."name" AS productName, 
//                     p."UOM" AS productUOM, 
//                     DATE(gr."receivingDate")::text AS date, 
//                     gr."number" AS docNumber, 
//                     grd.quantity::numeric AS stockIn 
//                 FROM 
//                     "GoodReceiving" gr
//                     JOIN "GoodReceivingDetails" grd ON gr.id = grd."goodReceivingId"
//                     JOIN "Products" p ON grd."productId" = p.id 
//                 WHERE 
//                     gr."receivingDate" BETWEEN $1 AND $2
//             ),
//             wholesale AS (
//                 SELECT 
//                     p.id AS productId, 
//                     p."name" AS productName, 
//                     p."UOM" AS productUOM, 
//                     DATE(w."deliveryDate")::text AS date, 
//                     w."number" AS docNumber, 
//                     wd.quantity::numeric AS stockOut 
//                 FROM 
//                     "Wholesale" w
//                     JOIN "WholesaleDetails" wd ON wd."wholesaleId" = w.id 
//                     JOIN "Products" p ON wd."productId" = p.id 
//                 WHERE 
//                     w."deliveryDate" BETWEEN $1 AND $2
//             ),
//             inventoryUnion AS (
//                 SELECT 
//                     ob.productId, 
//                     ob.productName, 
//                     ob.productUOM, 
//                     NULL::text AS date, 
//                     '-' AS docNumber, 
//                     'Opening Balance' AS description, 
//                     ob.opening, 
//                     NULL::numeric AS stockIn, 
//                     NULL::numeric AS stockOut, 
//                     1 AS sortOrder 
//                 FROM 
//                     openingBalance ob
//                 UNION ALL 
//                 SELECT 
//                     NULL::integer AS productId, 
//                     NULL::text AS productName, 
//                     NULL::text AS productUOM, 
//                     NULL::text AS date, 
//                     '-' AS docNumber, 
//                     'Opening Balance' AS description, 
//                     0::numeric AS opening, 
//                     NULL::numeric AS stockIn, 
//                     NULL::numeric AS stockOut, 
//                     1 AS sortOrder 
//                 WHERE NOT EXISTS (SELECT 1 FROM openingBalance)
//                 UNION ALL 
//                 SELECT 
//                     gr.productId, 
//                     gr.productName, 
//                     gr.productUOM, 
//                     gr.date, 
//                     gr.docNumber, 
//                     'Good Receiving Customer' AS description, 
//                     NULL::numeric AS opening, 
//                     gr.stockIn, 
//                     NULL::numeric AS stockOut, 
//                     2 AS sortOrder 
//                 FROM 
//                     goodReceiving gr
//                 UNION ALL 
//                 SELECT 
//                     w.productId, 
//                     w.productName, 
//                     w.productUOM, 
//                     w.date, 
//                     w.docNumber, 
//                     'Wholesale Customer' AS description, 
//                     NULL::numeric AS opening, 
//                     NULL::numeric AS stockIn, 
//                     w.stockOut, 
//                     3 AS sortOrder 
//                 FROM 
//                     wholesale w
//             )
//             SELECT 
//                 iu.productName, 
//                 iu.productUOM, 
//                 iu.date, 
//                 iu.docNumber, 
//                 iu.description, 
//                 iu.opening, 
//                 iu.stockIn, 
//                 iu.stockOut 
//             FROM 
//                 inventoryUnion iu
//             WHERE 
//                 iu.productId = $3 OR iu.productId IS NULL
//             ORDER BY 
//                 CASE WHEN iu.description = 'Opening Balance' THEN 0 ELSE 1 END, 
//                 iu.date, 
//                 iu.sortOrder;`
//       const queryParams: any[] = [fromDate, toDate, productId];
//       const inventoryActivity = await dataSource.query(query, queryParams);
//       if (download) {
//         const printTemplate = await pdfGenerator("inventoryActivity", {
//           inventoryActivity,
//           fromDate,
//           toDate,
//           formatDate,
//           numberToWords,
//           thousandSeparator,
//         });
//         return printTemplate;
//       } else {
//         return inventoryActivity;
//       }
//       // console.log('eee',query);
//     } catch (error) {
//       console.error("Error:", error);
//       throw new Error("An error occurred while fetching order details.");
//     }
//   }
//   async ProfitAndLoss(getDetails: any, download: boolean = false) {
//       const { fromDate, toDate } = getDetails;
//       try {
//         const query1 = `Select it."name" AS name, SUM(o."netAmount") AS amount  
//                               FROM "Orders" AS o 
//                               INNER JOIN "OrderDetails" AS od ON od."orderId" = o.id 
//                               INNER JOIN "Items" AS it ON it.id = od."itemId" 
//                               WHERE DATE(o."orderDate") >= $1 AND DATE(o."orderDate") <= $2 
//                               GROUP BY it."name";`;
//         const query2 = `SELECT et."name" AS name, SUM(el."amount") AS amount FROM "ExpensesLedger" AS el 
//                   INNER JOIN "ExpenseTypes" AS et ON et.id = el."expensesTypeId"
//                   WHERE el."businessType" = 'Wholesale' AND DATE(el."date") >= $1 AND DATE(el."date") <= $2
//                   GROUP BY et."name";`;
//         const query3 = `SELECT 'COST OF GOODS SOLD' AS name, SUM(gr."totalNetAmount") AS amount FROM "GoodReceiving" AS gr 
//                      WHERE DATE(gr."receivingDate") >= $1 AND DATE(gr."receivingDate") <= $2;`;
//         const executeQuery = async (query: string, params: any[]): Promise<any[]> => {
//           const result = await dataSource.query(query, params);
//           return result;
//         };
//         let results = [];
//         results.push(await executeQuery(query1, [fromDate, toDate]));
//         results.push(await executeQuery(query2, [fromDate, toDate]));
//         results.push(await executeQuery(query3, [fromDate, toDate]));
//         results = this.checkEmptyArrays(results);
//         if (results.length === 0) {
//           throw new Error("No data found for the given date range.");
//         }
//         if (download) {
//           const printTemplate = await pdfGenerator("profitAndLoss", {
//             results,
//             fromDate,
//             toDate,
//             formatDate,
//             numberToWords,
//             thousandSeparator,
//           });
//           return printTemplate;
//         } else {
//           return results;
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         throw new Error("An error occurred while fetching order details.");
//       }
//     }
//     checkEmptyArrays(data: any[]): any[] {
//       for (let i = 0; i < data.length; i++) {
//         if (data[i].length === 0) {
//           return [];
//         }
//       }
//       return data;
//     }
// }
// export default new ReportsService();
