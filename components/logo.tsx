import React from "react";

type Props = {
  xl?: boolean;
  light?: boolean;
};

const Logo = (props: Props): JSX.Element => {
  const size = props.xl ? "44" : "32";
  const fontColour = props.light ? "text-white" : "text-primary";
  const svgColour = props.light ? "#FFFFFF" : "#D44927";
  const fontStyle = props.xl ? "font-bold text-4xl" : "font-bold text-2xl";

  return (
    <span className={` inline-flex items-end ${fontStyle} ${fontColour}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.3364 18.0934C9.3364 14.4852 6.41738 11.5662 2.80915 11.5662C2.50509 11.5662 2.22129 11.5864 1.9375 11.627C1.97804 7.08627 5.64708 3.4375 10.1675 3.4375C14.7285 3.4375 18.4178 7.12681 18.4178 11.6675C18.4178 13.4514 17.8299 15.1947 16.7556 16.6136C16.6542 16.7555 16.5326 16.8974 16.4312 17.0393C14.992 18.9245 14.1203 21.2962 14.1203 23.8504C14.1203 25.4315 14.4447 26.9315 15.0325 28.2897C11.627 27.2964 9.15396 24.1544 9.15396 20.4448C9.15396 19.634 9.3364 18.8637 9.3364 18.0934ZM27.0938 15.8636C27.0938 16.2082 26.81 16.492 26.4654 16.492C26.1005 16.492 25.8167 16.2082 25.8167 15.8636C25.8167 15.4987 26.1005 15.2149 26.4654 15.2149C26.81 15.2149 27.0938 15.4987 27.0938 15.8636ZM15.9245 23.8504C15.9245 19.411 19.0056 15.7014 23.1206 14.6879C23.9518 11.9918 25.0464 13.0257 26.3235 14.4041C27.4384 14.5257 28.4924 14.8906 29.3641 15.7014C29.8911 16.2082 30.256 16.7555 29.952 17.4853C29.283 19.1678 25.8167 18.661 25.4113 19.2894C25.4518 19.6745 25.4923 20.0597 25.4923 20.4448C25.4923 24.8842 21.803 28.614 17.3232 28.614C17.2826 28.614 17.2421 28.614 17.2218 28.614C16.3907 27.2153 15.9245 25.5937 15.9245 23.8504Z"
          fill={svgColour}
        />
      </svg>
      skwirl
    </span>
  );
};

export { Logo };
