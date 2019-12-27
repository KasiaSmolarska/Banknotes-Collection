import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Column, Table, AutoSizer, WindowScroller } from "react-virtualized";

import actions from "../store/actions/index";

const BanknotesList = () => {
  const banknotesList = useSelector(state => state.banknote.banknotesList);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actions.fetchBanknotes());
  }, [actions]);

  function uploadFrontImage({ cellData }) {
    return (
      <div>
        <img className="table__image" src={`/api/upload/image/${cellData ? cellData : "no-photo.jpg"}`} alt={cellData} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative", height: "calc(100vh - 138px)" }}>
      {banknotesList && (
        <AutoSizer>
          {({ width, height }) => (
            <Table className="table table--banknote" width={width} height={height} headerHeight={20} rowHeight={70} rowCount={banknotesList.length} rowGetter={({ index }) => banknotesList[index]}>
              <Column label="Name" dataKey="title" width={400} />
              <Column width={200} label="Own" dataKey="own" />
              <Column width={130} label="Image" dataKey="imageFront" cellData="" cellRenderer={uploadFrontImage} />
            </Table>
          )}
        </AutoSizer>
      )}
    </div>
  );
};

export default BanknotesList;
