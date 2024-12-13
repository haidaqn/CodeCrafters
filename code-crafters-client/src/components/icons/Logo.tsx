import React from "react";
import {useTheme} from "@/components/providers/theme-provider.tsx";

const strokeColors = {
  light: "#000000",
  dark: "#FFFFFF",
};

export const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const {theme} = useTheme();

  // @ts-ignore
  const strokeColor: any = strokeColors[theme] || strokeColors.light;

  return (
    <svg {...props} width="31" height="18" viewBox="0 0 31 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M28.4507 1.5L20.1174 16.5H2.54927L10.8826 1.5H28.4507Z" stroke={strokeColor} strokeWidth="3"/>
      <path d="M11 1.5L20 16.5" stroke={strokeColor} strokeWidth="3"/>
    </svg>
  );
};
