import { useState, useEffect } from "react";
import { deviceTypeWidth } from "@/src/client/utils/deviceType.util";

type UseDeviceTypeProps =
  | "mobile-640"
  | "tablet-768"
  | "desktop-1024"
  | "extra-desktop-1280"
  | "extra-big-desktop-1536";

const useDeviceType = (device: UseDeviceTypeProps): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const getDeviceTypeWidth = (deviceType: UseDeviceTypeProps): number => {
    const mapping: { [key in UseDeviceTypeProps]: number } = {
      "mobile-640": deviceTypeWidth.sm,
      "tablet-768": deviceTypeWidth.md,
      "desktop-1024": deviceTypeWidth.lg,
      "extra-desktop-1280": deviceTypeWidth.xl,
      "extra-big-desktop-1536": deviceTypeWidth["2xl"],
    };

    return mapping[deviceType];
  };

  useEffect(() => {
    const handleResize = (): void =>
      setIsMobile(window.innerWidth <= getDeviceTypeWidth(device));

    handleResize(); // Check the initial size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [device]);

  return isMobile;
};

export default useDeviceType;
