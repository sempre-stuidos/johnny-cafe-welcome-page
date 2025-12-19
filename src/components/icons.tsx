"use client";

import { type SVGProps } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// Decorative Line Component
export const DecorativeLine = ({
  className,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width="538"
    height="59"
    viewBox="0 0 538 59"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M1.50015 14.5299C3.54335 14.7871 6.92564 18.4994 8.39517 19.6547C22.5248 30.7635 34.5139 44.7018 52.0413 50.2689C100.088 65.5297 156.71 53.6729 204.2 41.9074C269.528 25.7225 333.662 2.30079 401.88 1.51546C449.332 0.96917 497.773 14.91 536.5 42.4468"
      stroke="#B29738"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DecorativeLine1 = ({
  className,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width="447"
    height="22"
    viewBox="0 0 447 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.5004 7.74633C16.5947 12.0616 30.3603 21.2238 46.6671 20.0289C68.2016 18.4509 89.0509 10.2409 110.056 5.90394C129.532 1.88272 147.56 1.43441 166.945 5.95511C186.208 10.4476 202.021 20.8766 222.611 20.4895C233.233 20.2898 242.761 17.5123 252.723 14.3994C265.608 10.3731 279.016 7.2695 292.278 4.47097C312.079 0.292627 332.215 0.558935 351.889 5.03392C367.119 8.49798 381.517 14.7979 397.5 14.7065C413.598 14.6144 429.705 9.25016 445.5 6.82513"
      stroke="#B29738"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

// Facebook Icon Component
export const Facebook = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// TikTok Icon Component
export const TikTok = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// Star with Line Divider Component
export const StarDivider = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    width="553"
    height="143"
    viewBox="0 0 553 143"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path d="M0 71.5C64.4085 75.1667 67.359 78.145 71 143C74.641 78.1379 77.5985 75.1667 142 71.5C77.5915 67.8333 74.641 64.855 71 0C67.359 64.8621 64.4015 67.8333 0 71.5Z" fill="#B29738"/>
    <path d="M563 71L118 70V73L563 72V71Z" fill="#B29738"/>
  </svg>
);

// Star Icon Component
export const StarIcon = ({ className, fill, ...props }: SVGProps<SVGSVGElement> & { fill?: string }) => {
  const { theme } = useTheme();
  
  // Use theme-aware color if no fill is provided
  const starFill = fill || (theme === "night" ? "#B29738" : "#5C4127");
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M38 19C20.7639 19.9744 19.9744 20.7658 19 38C18.0256 20.7639 17.2342 19.9744 0 19C17.2361 18.0256 18.0256 17.2342 19 0C19.9744 17.2361 20.7658 18.0256 38 19Z"
        fill={starFill}
      />
    </svg>
  );
};

// Calendar Icon
export const CalendarIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#B29738"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

// Location Icon
export const LocationIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#B29738"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

// Phone Icon
export const PhoneIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#B29738"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

// External Link Icon
export const ExternalLinkIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

export const ArcedDecor = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="91"
    height="91"
    viewBox="0 0 91 91"
    fill="none"
    className={className}
    {...props}
  >
    <path d="M0 91.481H1.612C1.612 41.9281 41.9201 1.612 91.481 1.612V0C41.0335 0 0 41.0415 0 91.481Z" fill="#B29738"/>
    <path d="M10.075 91.4812H11.687C11.687 47.4817 47.4815 11.6872 91.481 11.6872V10.0752C46.5868 10.0752 10.075 46.5951 10.075 91.4812Z" fill="#B29738"/>
    <path d="M20.15 91.4824H21.762C21.762 53.0362 53.0348 21.7634 91.481 21.7634V20.1514C52.1482 20.1514 20.15 52.1496 20.15 91.4824Z" fill="#B29738"/>
    <path d="M30.225 91.4806H31.837C31.837 58.5958 58.5881 31.8366 91.481 31.8366V30.2246C57.7015 30.2246 30.225 57.7012 30.225 91.4806Z" fill="#B29738"/>
    <path d="M40.3 91.4808H41.912C41.912 64.1493 64.1415 41.9118 91.481 41.9118V40.2998C63.2549 40.2998 40.3 63.2627 40.3 91.4808Z" fill="#B29738"/>
    <path d="M50.375 91.481H51.987C51.987 69.7029 69.7029 51.987 91.481 51.987V50.375C68.8082 50.375 50.375 68.8163 50.375 91.481Z" fill="#B29738"/>
    <path d="M60.45 91.4812H62.062C62.062 75.2564 75.2562 62.0622 91.481 62.0622V60.4502C74.3696 60.4502 60.45 74.3698 60.45 91.4812Z" fill="#B29738"/>
    <path d="M70.525 91.4824H72.137C72.137 80.819 80.8095 72.1384 91.481 72.1384V70.5264C79.9229 70.5264 70.525 79.9243 70.525 91.4824Z" fill="#B29738"/>
    <path d="M80.6 91.4806H82.212C82.212 86.3706 86.3709 82.2116 91.481 82.2116V80.5996C85.4763 80.5996 80.6 85.484 80.6 91.4806Z" fill="#B29738"/>
  </svg>
);

