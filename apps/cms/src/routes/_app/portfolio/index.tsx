import { useQueries } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { experienceList, profileQuery, skillList } from "../../../api/queries";
import { PageHeader } from "../../../components/AppShell";
import { LoadError, StatusBadge } from "../../../components/feedback";
import { Icon } from "../../../components/Icon";

export const Route = createFileRoute("/_app/portfolio/")({ component: PortfolioOverview });

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

/** The Portfolio section's landing page: each of its pages, what's in it, and what's waiting on the Owner. */
function PortfolioOverview() {
  const [profile, experience, skills] = useQueries({ queries: [profileQuery, experienceList, skillList] });
  const queries = [profile, experience, skills];
  const failed = queries.some((query) => query.isError);
  const loading = queries.some((query) => query.isPending);
  const firstSetup = profile.data === null && experience.data?.length === 0 && skills.data?.length === 0;
  const drafts = experience.data?.filter((item) => item.status === "draft").length ?? 0;

  return (
    <>
      <PageHeader title="Portfolio" />
      <p className="ui-visually-hidden" role="status">
        {loading ? "Loading your Portfolio" : failed ? "" : "Portfolio loaded"}
      </p>
      {failed ? (
        <LoadError
          what="your Portfolio"
          onRetry={() => {
            for (const query of queries) if (query.isError) query.refetch();
          }}
          retrying={queries.some((query) => query.isFetching)}
        />
      ) : (
        <>
          {firstSetup && (
            <div className="ui-message" data-tone="info" role="status">
              <Icon name="info" />
              <p className="ui-message__title">Your Portfolio is empty</p>
              <p className="ui-message__body">
                Visitors see a “being set up” page until your profile is Published. Start with the profile, then add
                your skills and experience.
              </p>
            </div>
          )}
          <ul className="ui-overview" aria-busy={loading || undefined}>
            <Row
              to="/portfolio/profile"
              name="Profile"
              description="Your name, introduction, portrait and contact links"
              loading={profile.isPending}
            >
              {profile.data ? <StatusBadge status={profile.data.status} /> : "Not started"}
            </Row>
            <Row
              to="/portfolio/experience"
              name="Experience"
              description="Your roles, newest first, with the stack each one used"
              loading={experience.isPending}
            >
              {experience.data?.length ? plural(experience.data.length, "role", "roles") : "None yet"}
              {drafts > 0 && (
                <span className="ui-status" data-status="draft">
                  {plural(drafts, "Draft", "Drafts")}
                </span>
              )}
            </Row>
            <Row
              to="/portfolio/skills"
              name="Skills"
              description="The technologies in the Stack band, in your order"
              loading={skills.isPending}
            >
              {skills.data?.length ? plural(skills.data.length, "skill", "skills") : "None yet"}
            </Row>
          </ul>
        </>
      )}
    </>
  );
}

function Row({
  to,
  name,
  description,
  loading,
  children,
}: {
  to: "/portfolio/profile" | "/portfolio/experience" | "/portfolio/skills";
  name: string;
  description: string;
  loading: boolean;
  children: ReactNode;
}) {
  return (
    <li>
      <Link className="ui-overview__item" to={to}>
        <span>
          <span className="ui-overview__name">{name}</span>
          <span className="ui-overview__description">{description}</span>
        </span>
        <span className="ui-overview__state">
          {loading ? (
            <span className="ui-skeleton" data-shape="line" aria-hidden="true" style={{ width: "6rem" }} />
          ) : (
            children
          )}
        </span>
        <Icon name="chevronRight" />
      </Link>
    </li>
  );
}
