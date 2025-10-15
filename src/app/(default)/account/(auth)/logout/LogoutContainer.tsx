"use client";

import UserNextApi from "@/common/api/next/UserNextApi";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";

const LogoutContainer = () => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);

  const doLogout = useCallback(async () => {
    setProcessing(true);
    const logoutErrors = await UserNextApi.logout();
    setProcessing(false);

    router.replace("/");

    //important to reload headerbar (profile component)
    router.refresh();
  }, [router]);

  useEffect(() => {
    doLogout();
  }, [doLogout]);

  return (
    <div className="text-center text-xs">
      <div>
        <Spinner size="sm" />
      </div>{" "}
      <div className="mt-2">Đang đăng xuất khỏi hệ thống...</div>
    </div>
  );
};

export default LogoutContainer;
