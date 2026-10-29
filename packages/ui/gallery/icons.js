import briefcase from "lucide-static/icons/briefcase.svg?raw";
import check from "lucide-static/icons/check.svg?raw";
import chevronRight from "lucide-static/icons/chevron-right.svg?raw";
import circleAlert from "lucide-static/icons/circle-alert.svg?raw";
import circleCheck from "lucide-static/icons/circle-check.svg?raw";
import download from "lucide-static/icons/download.svg?raw";
import externalLink from "lucide-static/icons/external-link.svg?raw";
import image from "lucide-static/icons/image.svg?raw";
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

/** Wraps a Lucide SVG in the decorative icon element. */
const icon = (svg, extra = "") => `<span class="ui-icon ${extra}" aria-hidden="true">${svg}</span>`;

export const icons = {
  briefcase: icon(briefcase),
  check: icon(check),
  chevronRight: icon(chevronRight),
  circleAlert: icon(circleAlert),
  circleCheck: icon(circleCheck),
  download: icon(download),
  externalLink: icon(externalLink),
  image: icon(image),
  info: icon(info),
  list: icon(list),
  logOut: icon(logOut),
  moon: icon(moon),
  pencil: icon(pencil),
  plus: icon(plus),
  spinner: icon(loader, "ui-button__spinner"),
  sun: icon(sun),
  trash: icon(trash),
  triangleAlert: icon(triangleAlert),
  upload: icon(upload),
  user: icon(user),
  x: icon(x),
};
