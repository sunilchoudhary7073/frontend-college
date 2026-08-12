// import React, { useRef } from "react";
// import { useReactToPrint } from "react-to-print";

// export default function Receipt() {
//   const printRef = useRef();

//   const handlePrint = useReactToPrint({
//     contentRef: printRef,
//     documentTitle: "Fee Receipt",
//   });

//   const receipt = {
//     receiptNo: "REC-2026-001",
//     date: "",
//     studentName: "",
//     // admissionNo: "",
//     course: "",
//     semester: "2nd",
//     totalFees: 50000,
//     paidAmount: 20000,
//     dueAmount: 30000,
//     paymentMode: "Cash",
//     transactionId: "TXN123456",
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-10">
//       <div className="text-center mb-5 no-print">
//         <button
//           onClick={handlePrint}
//           className="bg-blue-600 text-white px-5 py-2 rounded"
//         >
//           Print Receipt
//         </button>
//       </div>

//       <div
//         ref={printRef}
//         className="w-[210mm] min-h-[297mm] mx-auto bg-white p-10 shadow"
//       >
//         <div className="text-center border-b pb-4">
//           <h1 className="text-3xl font-bold">ABC COLLEGE</h1>
//           <p>Jaipur, Rajasthan</p>
//           <h2 className="text-xl font-bold mt-3">
//             FEES PAYMENT RECEIPT
//           </h2>
//         </div>

//         <div className="grid grid-cols-2 gap-5 mt-6">
//           <p>
//             <strong>Receipt No :</strong> {receipt.receiptNo}
//           </p>

//           <p>
//             <strong>Date :</strong> {receipt.date}
//           </p>

//           <p>
//             <strong>Student :</strong> {receipt.studentName}
//           </p>

//           <p>
//             <strong>Admission No :</strong> {receipt.admissionNo}
//           </p>

//           <p>
//             <strong>Course :</strong> {receipt.course}
//           </p>

//           <p>
//             <strong>Semester :</strong> {receipt.semester}
//           </p>
//         </div>

//         <table className="w-full border mt-8">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-3">Description</th>
//               <th className="border p-3">Amount</th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr>
//               <td className="border p-3">Total Fees</td>
//               <td className="border p-3">
//                 ₹{receipt.totalFees}
//               </td>
//             </tr>

//             <tr>
//               <td className="border p-3">Paid Amount</td>
//               <td className="border p-3">
//                 ₹{receipt.paidAmount}
//               </td>
//             </tr>

//             <tr>
//               <td className="border p-3">Due Amount</td>
//               <td className="border p-3">
//                 ₹{receipt.dueAmount}
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <div className="mt-8">
//           <p>
//             <strong>Payment Mode :</strong> {receipt.paymentMode}
//           </p>

//           <p>
//             <strong>Transaction ID :</strong> {receipt.transactionId}
//           </p>
//         </div>

//         <div className="flex justify-between mt-24">
//           <div>
//             <p>Student Signature</p>
//           </div>

//           <div>
//             <p>Authorized Signature</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }