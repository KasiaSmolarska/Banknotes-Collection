import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Column, Table, AutoSizer } from "react-virtualized";

import { Spinner } from "./Spinner";
import { ListActions } from "./list/ListActions";

import PropTypes from "prop-types";

import actions from "../store/actions";

const getBanknote = state => state.banknote;

const ImageContainer = React.memo(({ className, src, alt, title }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  return (
    <>
      <img
        ref={ref}
        onClick={() => {
          dispatch(actions.toggleImageModal());
          dispatch(actions.changeImageInModal(ref.current.alt, title));
        }}
        className={className}
        src={src}
        alt={alt}
      />
    </>
  );
});

function uploadFrontImage({ cellData, rowData }) {
  return (
    <div>
      <ImageContainer className="table__image" src={`/api/upload/image/thumb-${cellData}`} alt={cellData} title={rowData.title} />
    </div>
  );
}

const BanknotesTable = (props, context) => {
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
                  localStorage.setItem("sortBy", sortBy);
                  localStorage.setItem("sortDirection", sortDirection);
                }}
                className="table table--banknote"
                width={width}
                height={height}
                headerHeight={60}
                rowHeight={90}
                rowCount={banknotesList.length}
                rowGetter={({ index }) => banknotesList[index]}>
                <Column
                  width={width * 0.1}
                  label={context.translate("table.label.dateCreated")}
                  dataKey="dateCreated"
                  cellData=""
                  cellRenderer={({ cellData }) => (
                    <>
                      <div>
                        <small>{new Date(cellData).toLocaleDateString()}</small>
                      </div>
                      <div>
                        <small>{new Date(cellData).toLocaleTimeString()}</small>
                      </div>
                    </>
                  )}
                />
                <Column
                  label={context.translate("table.label.title")}
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
                <Column width={width * 0.1} label={context.translate("table.label.imageFront")} dataKey="imageFront" cellData="" cellRenderer={uploadFrontImage} />
                <Column width={width * 0.1} label={context.translate("table.label.imageReverse")} dataKey="imageReverse" cellData="" cellRenderer={uploadFrontImage} />
                <Column label={context.translate("table.label.country")} dataKey="country" width={width * 0.1} />
                <Column label={context.translate("table.label.value")} dataKey="value" width={width * 0.1} />
                <Column label={context.translate("table.label.currency")} dataKey="currency" width={width * 0.1} />
                <Column label={context.translate("table.label.issueYear")} dataKey="issueYear" width={width * 0.1} />

                <Column width={width * 0.1} label={context.translate("table.label.own")} dataKey="own" cellRenderer={({ cellData }) => (!!cellData ? "yes" : "no")} />

                <Column
                  width={width * 0.1}
                  label={context.translate("table.label.actions")}
                  dataKey="_id"
                  cellRenderer={({ rowData: { _id, favorite, title } }) => <ListActions classList="dropdown__content--left" id={_id} favorite={favorite} title={title} />}
                />
              </Table>
            )}
          </AutoSizer>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

BanknotesTable.contextTypes = {
  translate: PropTypes.func
};

export default BanknotesTable;
