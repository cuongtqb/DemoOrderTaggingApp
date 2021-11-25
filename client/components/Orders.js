import React, { useCallback, useState, useEffect } from "react";
import {
  Heading,
  Page,
  Card,
  Tabs,
  Button,
  TextField,
  Pagination,
} from "@shopify/polaris";
import axios from "axios";
import ListOrders from "./ListOrders";

const OrderTagging = () => {
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const [isNext, setIsNext] = useState();
  const [isPrev, setIsPrev] = useState();
  const [query, setQuery] = useState({
    input: "",
    cursorAfter: "",
    cursorBefore: "",
    numOrdersFirst: 5,
    numOrdersLast: 5,
  });

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  const fetchData = useCallback(async () => {
    if (query.input) {
      const response = await axios.get("search", { params: query });
      setData(response);
      const pageInfo = response?.data?.orders?.pageInfo;
      if (Object.keys(pageInfo).includes("hasNextPage")) {
        setIsNext(pageInfo.hasNextPage);
      }
      if (Object.keys(pageInfo).includes("hasPreviousPage")) {
        setIsPrev(pageInfo.hasPreviousPage);
      }
    }
  }, [query]);

  const handleNext = () => {
    const listItem = data?.data?.orders?.edges;
    const cursor = listItem[listItem.length - 1].cursor;
    const newQuery = {
      cursorAfter: cursor,
      cursorBefore: "",
    };
    setQuery({ ...query, ...newQuery });
  };

  const handlePrev = () => {
    const cursor = data?.data?.orders?.edges[0].cursor;
    const newQuery = {
      cursorBefore: cursor,
      cursorAfter: "",
    };
    setQuery({ ...query, ...newQuery });
  };

  const handleSearch = () => {
    const newText = { input: value };
    setQuery({ ...query, ...newText });
  };

  return (
    <>
      <div>
        <div style={{ display: "inline-block", marginRight: "15px" }}>
          Order tag
        </div>
        <div
          style={{
            width: "200px",
            display: "inline-block",
            marginRight: "15px",
          }}
        >
          <TextField value={value} onChange={handleChange} autoComplete="off" />
        </div>
        <div style={{ display: "inline-block" }}>
          <Button outline onClick={handleSearch} disabled={!value}>
            Search
          </Button>
        </div>
      </div>
      <div>{data && data.length !== 0 && <ListOrders data={data} />}</div>
      <div>
        {data && data.length !== 0 && (
          <div style={{ margin: "auto", width: "100px" }}>
            <Pagination
              hasPrevious={isPrev}
              onPrevious={handlePrev}
              hasNext={isNext}
              onNext={handleNext}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default OrderTagging;
