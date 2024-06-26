import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectRoutes = ({ route, children }) => {
  const { role, userInfo } = useSelector((state) => state.auth);
  //   check role
  if (role) {
    if (userInfo) {
      if (route.role) {
        if (userInfo.role === route.role) {
          if (route.status) {
            if (route.status === userInfo.status) {
              return <Suspense fallback={null}>{children}</Suspense>;
            } else {
              if (userInfo.status === "pending") {
                return <Navigate to={"/seller/account-pending"} />;
              } else {
                return <Navigate to={"/seller/account-inactive"} />;
              }
            }
          } else {
            if (route.visibility) {
              if (route.visibility.some((r) => r === userInfo.status)) {
                return <Suspense fallback={null}>{children}</Suspense>;
              } else {
                return <Navigate to={"/seller/account-pending"} />;
              }
            } else {
              return <Suspense fallback={null}>{children}</Suspense>;
            }
          }
        } else {
          return <Navigate to={"/unauthorized"} />;
        }
      } else {
        if (route.ability === "seller") {
          return <Suspense fallback={null}>{children}</Suspense>;
        }
      }
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectRoutes;
