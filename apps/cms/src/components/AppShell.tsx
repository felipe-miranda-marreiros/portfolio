import { bindThemeSwitch } from "@portfolio/ui/theme";
import { Link, useNavigate } from "@tanstack/react-router";
import { type ReactNode, useEffect, useRef } from "react";
import { setSignedIn } from "../auth";
import { Icon, type IconName } from "./Icon";

const NAV: { to: "/profile" | "/experience" | "/skills"; label: string; icon: IconName }[] = [
  { to: "/profile", label: "Profile", icon: "user" },
  { to: "/experience", label: "Experience", icon: "briefcase" },
  { to: "/skills", label: "Skills", icon: "list" },
];

/** The CMS frame: sidebar navigation, theme switch, View Portfolio and Sign out around the page. */
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
      <aside className="ui-app-shell__sidebar">
        <Link className="ui-app-shell__brand" to="/profile">
          Portfolio CMS
        </Link>
        <nav aria-label="Content">
          <ul className="ui-app-shell__nav">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} activeProps={{ "aria-current": "page" }}>
                  <Icon name={item.icon} />
                  <span>{item.label}</span>
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
                <Icon name="externalLink" />
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
                <Icon name="logOut" />
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

/** The page's `<h1>`, optional status and its actions, at the top of main. */
export function PageHeader({ title, status, actions }: { title: string; status?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="ui-app-shell__header">
      <div className="ui-app-shell__heading">
        <h1 className="ui-app-shell__title">{title}</h1>
        {status}
      </div>
      {actions && <div className="ui-app-shell__actions">{actions}</div>}
    </header>
  );
}
