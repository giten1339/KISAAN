"use client";

import React from "react";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

//merge sort algorithm
import mergeSort from "@/algorithms/mergeSort";

export default function App({ orders }) {
   console.log("orders", orders);

   const totalsByDate = {};

   orders.forEach((order) => {
      const date = new Date(order.createdAt).toISOString().split("T")[0];
      totalsByDate[date] =
         (totalsByDate[date] || 0) + order.item.price * order.item.quantity;
   });

   const totalsArray = mergeSort(
      Object.entries(totalsByDate).map(([date, total]) => ({
         date,
         total,
      }))
   );

   console.log("totalsArray", totalsArray);

   ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
   );

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: "top",
         },
         title: {
            display: true,
            text: "total sales",
         },
      },
   };

   const labels = totalsArray?.map((total) => total.date);
   // console.log(labels);

   const data = {
      labels,
      datasets: [
         {
            label: "Orders",
            data: totalsArray.map((total) => total.total),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
         },
      ],
   };

   return <Line options={options} data={data} />;
}
