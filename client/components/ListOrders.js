import React, { useCallback, useEffect, useState } from "react";
import { Card, DataTable, Page, Pagination } from "@shopify/polaris";

function formatDateTime(dateTime) {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const second = date.getSeconds();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return `${year}-${month}-${day}  ${hour}:${minutes}:${second}`;
}

const ListOrders = (props) => {
  const { data } = props;

  const rows = data
    ? data?.data?.orders?.edges.map((item) => {
        item.node.createdAt = formatDateTime(item.node.createdAt);
        return Object.values(item.node);
      })
    : [];

  return (
    <div>
      <div>
        <Page>
          <Card>
            <DataTable
              columnContentTypes={["text", "numeric", "text"]}
              headings={["Order number", "Total", "Order date"]}
              rows={rows}
            />
          </Card>
        </Page>
      </div>
    </div>
  );
};

export default ListOrders;
