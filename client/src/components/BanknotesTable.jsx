import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Column, Table, AutoSizer } from "react-virtualized";

import { Spinner } from "./Spinner";
import { ListActions } from "./list/ListActions";

import actions from "../store/actions";

const ImageContainer = React.memo(({ className, src, alt }) => {
  const ref = useRef(null);

  return <img ref={ref} onClick={() => console.log(ref)} className={className} src={src} alt={alt} />;
});

function uploadFrontImage({ cellData }) {
  return (
    <div>
      <ImageContainer className="table__image" src={`/api/upload/image/thumb-${cellData}`} alt={cellData} />
    </div>
  );
}

const getBanknote = state => state.banknote;

const BanknotesTable = React.memo(function BanknotesList() {
  const banknotesList = useSelector(state => state.banknote.banknotesList);
  const { loading, sortBy, sortDirection } = useSelector(getBanknote);
  const dispatch = useDispatch();
  return (
    <div style={{ position: "relative", height: "calc(100vh - 170px)" }}>
      {banknotesList && !loading ? (
        <>
          <AutoSizer>
            {({ width, height }) => (
              <Table
                sortDirection={sortDirection}
                sortBy={sortBy}
                sort={({ sortBy, sortDirection }) => {
                  dispatch(actions.sortBanknotes(sortBy, sortDirection));
                }}
                className="table table--banknote"
                width={width}
                height={height}
                headerHeight={60}
                rowHeight={90}
                rowCount={banknotesList.length}
                rowGetter={({ index }) => banknotesList[index]}>
                <Column
                  label="Name"
                  dataKey="title"
                  width={width * 0.2}
                  cellRenderer={({ cellData, rowData: { _id } }) => (
                    <Link className="list__label-link" style={{ color: "inherit" }} to={`/banknotes/${_id}`}>
                      <span className="list__element-icon--magnify">
                        <Icon icon="MagnifyPlusIcon" width="22" height="22" />
                      </span>{" "}
                      {cellData}
                    </Link>
                  )}
                />
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

export default BanknotesTable;
