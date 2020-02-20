import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Column, Table, AutoSizer } from "react-virtualized";

import actions from "../store/actions/index";
import { Spinner } from "./Spinner";
import { ListActions } from "./list/ListActions";

import { useSort } from "./hooks/useSort";

const ImageContainer = React.memo(({ className, src, alt }) => {
  return <img className={className} src={src} alt={alt} />;
});

function uploadFrontImage({ cellData }) {
  return (
    <div>
      <ImageContainer className="table__image" src={`/api/upload/image/${!!cellData ? "thumb-" + cellData : "thumb-no-photo.jpg"}`} alt={cellData} />
    </div>
  );
}

const getLoading = state => state.banknote;

const BanknotesList = React.memo(function BanknotesList() {
  const banknotesList = useSelector(state => state.banknote.banknotesList);
  const { loading } = useSelector(getLoading);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.fetchBanknotes());
  }, [dispatch]);

  const { sortBy, setSortBy, sortDirection, setSortDirection } = useSort();

  return (
    <div style={{ position: "relative", height: "calc(100vh - 140px)" }}>
      {banknotesList && !loading ? (
        <>
          <AutoSizer>
            {({ width, height }) => (
              <Table
                sortDirection={sortDirection}
                sortBy={sortBy}
                sort={({ sortBy, sortDirection }) => {
                  setSortBy(sortBy);
                  setSortDirection(sortDirection);
                }}
                className="table table--banknote"
                width={width}
                height={height}
                headerHeight={60}
                rowHeight={90}
                rowCount={banknotesList.length}
                rowGetter={({ index }) => banknotesList[index]}>
                <Column label="Name" dataKey="title" width={width * 0.2} />
                <Column width={width * 0.1} label="Front" dataKey="imageFront" cellData="" cellRenderer={uploadFrontImage} />
                <Column width={width * 0.1} label="Back" dataKey="imageReverse" cellData="" cellRenderer={uploadFrontImage} />
                <Column label="Country" dataKey="country" width={width * 0.1} />
                <Column label="Value" dataKey="value" width={width * 0.1} />
                <Column label="Currency" dataKey="currency" width={width * 0.1} />
                <Column label="Year" dataKey="issueYear" width={width * 0.1} />

                <Column width={width * 0.1} label="Own" dataKey="own" cellRenderer={({ cellData }) => (!!cellData ? "yes" : "no")} />

                <Column width={width * 0.1} label="Actions" dataKey="_id" cellRenderer={({ rowData: { _id, favorite, title } }) => <ListActions id={_id} favorite={favorite} title={title} />} />
              </Table>
            )}
          </AutoSizer>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
});

export default BanknotesList;
