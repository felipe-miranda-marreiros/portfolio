import { bindThemeSwitch } from "@portfolio/ui/theme";
import { Link, useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect, useRef } from "react";
import { setSignedIn } from "../auth";
import { Icon, type IconName } from "./Icon";

/** Top-level sections; About me and Articles join when they have pages. */
const SECTIONS: { to: "/portfolio"; label: string; icon: IconName }[] = [
  { to: "/portfolio", label: "Portfolio", icon: "briefcase" },
];

/** The CMS frame: a rail with the sections, theme switch, View Portfolio and Sign out, beside the page. */
export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const themeSwitch = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (themeSwitch.current) bindThemeSwitch(themeSwitch.current);
  }, []);
  return (
    <div className="ui-app-shell">
      <a className="ui-skip-link ui-button" href="#main">
        Skip to content
      </a>
      <aside className="ui-app-shell__rail">
        <Link className="ui-app-shell__brand" to="/portfolio" aria-label="Portfolio CMS home">
          CMS
        </Link>
        <nav aria-label="Sections">
          <ul className="ui-app-shell__nav">
            {SECTIONS.map((section) => (
              <li key={section.to}>
                <Link to={section.to} activeProps={{ "aria-current": "page" }}>
                  <Icon name={section.icon} size="md" />
                  <span>{section.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ui-app-shell__footer">
          {/* biome-ignore lint/a11y/useSemanticElements: the segmented switch is a named group of buttons; a fieldset would need a visible legend. */}
          <div className="ui-segmented" role="group" aria-label="Theme" ref={themeSwitch}>
            <button type="button" data-theme-choice="dark" aria-pressed="true" aria-label="Dark theme">
              <Icon name="moon" />
            </button>
            <button type="button" data-theme-choice="light" aria-pressed="false" aria-label="Light theme">
              <Icon name="sun" />
            </button>
          </div>
          <ul className="ui-app-shell__nav">
            <li>
              <a
                href={import.meta.env.VITE_PORTFOLIO_URL ?? "http://localhost:4321/en/"}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="externalLink" size="md" />
                <span>View Portfolio</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  setSignedIn(null);
                  navigate({ to: "/sign-in" });
                }}
              >
                <Icon name="logOut" size="md" />
                <span>Sign out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <main className="ui-app-shell__main" id="main" tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}

type Crumb = { label: string; to: "/portfolio" | "/portfolio/experience" };

/** The crumb back to the Portfolio section overview. */
export const PORTFOLIO: Crumb = { label: "Portfolio", to: "/portfolio" };

/** The page's breadcrumb, `<h1>`, optional status and its actions, at the top of main. */
export function PageHeader({
  title,
  crumbs,
  status,
  actions,
}: {
  title: string;
  crumbs?: Crumb[];
  status?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="ui-app-shell__header">
      <div className="ui-app-shell__heading">
        {crumbs && (
          <nav className="ui-breadcrumb" aria-label="Breadcrumb">
            <ol>
              {crumbs.map((crumb) => (
                <li key={crumb.to}>
                  <Link className="ui-link" data-variant="standalone" data-tone="muted" to={crumb.to}>
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="ui-app-shell__title-row">
          <h1 className="ui-app-shell__title">{title}</h1>
          {status}
        </div>
      </div>
      {actions && <div className="ui-app-shell__actions">{actions}</div>}
    </header>
  );
}
