import arrowDown from "lucide-static/icons/arrow-down.svg?raw";
import arrowUp from "lucide-static/icons/arrow-up.svg?raw";
import briefcase from "lucide-static/icons/briefcase.svg?raw";
import check from "lucide-static/icons/check.svg?raw";
import circleAlert from "lucide-static/icons/circle-alert.svg?raw";
import circleCheck from "lucide-static/icons/circle-check.svg?raw";
import externalLink from "lucide-static/icons/external-link.svg?raw";
import info from "lucide-static/icons/info.svg?raw";
import list from "lucide-static/icons/list.svg?raw";
import loader from "lucide-static/icons/loader-circle.svg?raw";
import logOut from "lucide-static/icons/log-out.svg?raw";
import moon from "lucide-static/icons/moon.svg?raw";
import pencil from "lucide-static/icons/pencil.svg?raw";
import plus from "lucide-static/icons/plus.svg?raw";
import sun from "lucide-static/icons/sun.svg?raw";
import trash from "lucide-static/icons/trash-2.svg?raw";
import triangleAlert from "lucide-static/icons/triangle-alert.svg?raw";
import upload from "lucide-static/icons/upload.svg?raw";
import user from "lucide-static/icons/user.svg?raw";
import x from "lucide-static/icons/x.svg?raw";

const svgs = {
  arrowDown,
  arrowUp,
  briefcase,
  check,
  circleAlert,
  circleCheck,
  externalLink,
  info,
  list,
  loader,
  logOut,
  moon,
  pencil,
  plus,
  sun,
  trash,
  triangleAlert,
  upload,
  user,
  x,
};

export type IconName = keyof typeof svgs;

/** A decorative Lucide icon; the text or accessible name next to it carries the meaning. */
export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <span
      className={`ui-icon ${className}`.trim()}
      aria-hidden="true"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: the SVGs are bundled Lucide files, not user input.
      dangerouslySetInnerHTML={{ __html: svgs[name] }}
    />
  );
}

/** The spinner child a button shows while `aria-busy` is set. */
export const Spinner = () => <Icon name="loader" className="ui-button__spinner" />;
