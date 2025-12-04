import { type SVGProps } from "react";

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

