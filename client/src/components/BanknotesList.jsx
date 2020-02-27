import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { List, AutoSizer } from "react-virtualized";
import { useSelector } from "react-redux";
import { ListActions } from "./list/ListActions";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";

import actions from "../store/actions";

const ImageContainer = React.memo(({ className, src, alt, title }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  return (
    <img
      onClick={() => {
        dispatch(actions.toggleImageModal());
        dispatch(actions.changeImageInModal(ref.current.alt, title));
      }}
      ref={ref}
      className={className}
      src={src}
      alt={alt}
    />
  );
});

const renderDefaultListRow = (key, value) => {
  return (
    <div key={key} className={`list__row list__${key}`}>
      <div className="list__label">
        <span className="hidden-xs">{key}:</span>
        <span className="list__element-value">{value}</span>
      </div>
    </div>
  );
};

const renderImageListRow = (key, value, id, title) => {
  return (
    <div key={key} className={`list__${key}`}>
      <ImageContainer className="list__image" src={`/api/upload/image/thumb-${value}`} alt={value} title={title} />
    </div>
  );
};

const renderTitleListRow = (key, value, id) => {
  return (
    <div key={key} className={`list__row list__${key}`}>
      <div className="list__label">
        <Link className="list__label-link" style={{ color: "inherit" }} to={`/banknotes/${id}`}>
          <span className="list__element-icon--magnify">
            <Icon icon="MagnifyPlusIcon" />
          </span>
          <span className="hidden-xs">{key}:</span>
          <span className="list__element-value">{value}</span>
        </Link>
      </div>
    </div>
  );
};

const rows = {
  title: renderTitleListRow,
  country: renderDefaultListRow,
  value: renderDefaultListRow,
  currency: renderDefaultListRow,
  imageFront: renderImageListRow,
  issueYear: renderDefaultListRow
};

export const BanknotesList = () => {
  const { banknotesList, loading } = useSelector(state => state.banknote);

  const rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) => {
    return (
      <div key={key} style={style} className="list__element py-1">
        {Object.entries(banknotesList[index]).map(([key, value]) => {
          return Object.entries(rows).map(([rowKey, rowValue]) => {
            if (rowKey === key) {
              return rowValue(key, value, banknotesList[index]._id, banknotesList[index].title);
            }
          });
        })}
        <div className="list__actions">
          <ListActions classList="dropdown__content--left" id={banknotesList[index]._id} favorite={banknotesList[index].favorite} title={banknotesList[index].title} />
        </div>
      </div>
    );
  };
  return (
    <div style={{ position: "relative", height: "calc(100vh - 170px)" }}>
      {banknotesList && !loading ? (
        <AutoSizer>
          {({ width, height }) => {
            return <List className="list list--banknote" width={width} height={height} rowCount={banknotesList.length} rowHeight={140} rowGetter={({ index }) => banknotesList[index]} rowRenderer={rowRenderer} />;
          }}
        </AutoSizer>
      ) : (
        <p>dupa</p>
      )}
    </div>
  );
};
