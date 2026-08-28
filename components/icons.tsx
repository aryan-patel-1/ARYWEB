import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </IconBase>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m5 12 4 4L19 6" />
    </IconBase>
  );
}

export function WindowIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M7 6.5h.01M10 6.5h.01" />
    </IconBase>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </IconBase>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3 1.3 4.2a5 5 0 0 0 3.5 3.5L21 12l-4.2 1.3a5 5 0 0 0-3.5 3.5L12 21l-1.3-4.2a5 5 0 0 0-3.5-3.5L3 12l4.2-1.3a5 5 0 0 0 3.5-3.5L12 3Z" />
    </IconBase>
  );
}

export function NfcIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7.5 8.5a5 5 0 0 1 0 7M4.5 5.5a9 9 0 0 1 0 13" />
      <path d="M11 10.5a2 2 0 0 1 0 3M15 8.5a5 5 0 0 0 0 7M18 5.5a9 9 0 0 0 0 13" />
    </IconBase>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
    </IconBase>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </IconBase>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" />
    </IconBase>
  );
}

export function RocketIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 5c3.5-3.5 6-2 6-2s1.5 2.5-2 6l-5 5-4-4 5-5Z" />
      <path d="m9 10-4 1-2 2 6 1M13 14l-1 5-2 2-1-7M15 8h.01" />
    </IconBase>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </IconBase>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </IconBase>
  );
}
