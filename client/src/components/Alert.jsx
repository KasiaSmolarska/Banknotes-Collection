import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckMarkIcon } from "./svg/CheckMarkIcon";
import { AlertIcon } from "./svg/AlertIcon";
import { AlarmIcon } from "./svg/AlarmIcon";
import actions from "../store/actions/index";

const getAlerts = state => state.alert;

const alertTypes = {
  success: <CheckMarkIcon />,
  info: <AlarmIcon />,
  danger: <AlertIcon />
};

export const Alert = () => {
  const { alerts } = useSelector(getAlerts);

  const dispatch = useDispatch();
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div className={`my-1 alert alert--${alert.type}`} key={alert.id}>
        <div className="alert__content">
          <span className="alert__close" onClick={() => dispatch(actions.removeAlert(alert.id))}>
            X
          </span>
          <div className="alert__icon">{alertTypes[alert.type]}</div>
          {alert.msg}
        </div>
      </div>
    ))
  );
};
