import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Column, Table, AutoSizer } from "react-virtualized";

import actions from "../store/actions/index";
import { Spinner } from "./Spinner";
import EditForm from "./banknoteForm/EditForm";
import { ListActions } from "./list/ListActions";

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
const getBanknote = state => state.banknote;
const getShowModal = state => state.banknote;

const BanknotesList = React.memo(function BanknotesList() {
  const { banknote } = useSelector(getBanknote);
  const { showedModalToEditBanknote } = useSelector(getShowModal);

  const banknotesList = useSelector(state => state.banknote.banknotesList);
  const { loading } = useSelector(getLoading);

  const [sortBy, setSortBy] = useState("title");
  const [sortDirection, setSortDirection] = useState("ASC");

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.fetchBanknotes());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(actions.sortBanknotes(sortBy, sortDirection));
  }, [sortBy, sortDirection]);

  return (
    <div style={{ position: "relative", height: "calc(100vh - 138px)" }}>
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
                headerHeight={20}
                rowHeight={70}
                rowCount={banknotesList.length}
                rowGetter={({ index }) => banknotesList[index]}>
                <Column label="Name" dataKey="title" width={400} />
                <Column label="Country" dataKey="country" width={130} />
                <Column width={200} label="Own" dataKey="own" cellRenderer={({ cellData }) => (!!cellData ? "yes" : "no")} />
                <Column width={130} label="Image" dataKey="imageFront" cellData="" cellRenderer={uploadFrontImage} />
                <Column width={130} label="Actions" dataKey="_id" cellRenderer={({ rowData: { _id, favorite, title } }) => <ListActions id={_id} favorite={favorite} title={title} />} />
              </Table>
            )}
          </AutoSizer>
          {showedModalToEditBanknote && <EditForm initialValues={banknote} />}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
});

export default BanknotesList;
