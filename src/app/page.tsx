import { requestMagicLinkAction, createCaptureAction, saveReviewAction, signOutAction } from "@/app/actions";
import { ProcessingPoller } from "@/components/processing-poller";
import { getCurrentSession } from "@/lib/server/auth";
import { listPendingMagicLinks, listCapturesForUser, processPendingCaptures } from "@/lib/server/store";
import type { CaptureRecord } from "@/lib/types";

export const dynamic = "force-dynamic";

function formatTimestamp(value: string): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function statusLabel(status: CaptureRecord["status"]): string {
  switch (status) {
    case "processing":
      return "Processing";
    case "needs_review":
      return "Needs review";
    case "reviewed":
      return "Reviewed";
    case "failed":
      return "Failed";
  }
}

function reviewFollowUps(capture: CaptureRecord): string {
  if (capture.review) {
    return capture.review.followUps.join("\n");
  }

  return capture.generatedFollowUps.join("\n");
}

export default async function HomePage() {
  await processPendingCaptures();

  const session = await getCurrentSession();

  if (!session) {
    const pendingLinks = await listPendingMagicLinks();

    return (
      <main className="shell shell-auth">
        <section className="hero hero-auth">
          <p className="eyebrow">Insight Tracker</p>
          <h1>Capture first. Organize after the signal survives review.</h1>
          <p className="lede">
            This first slice proves hosted sign-in, inbox capture, and human-reviewed outputs without
            hiding the auth or processing boundaries.
          </p>
        </section>

        <section className="card auth-card">
          <div className="card-head">
            <h2>Request a magic link</h2>
            <p>Emails are previewed inside the app until a real delivery provider is wired in.</p>
          </div>

          <form action={requestMagicLinkAction} className="stack-form">
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" placeholder="you@example.com" required />
            </label>
            <button type="submit" className="button">
              Create sign-in link
            </button>
          </form>
        </section>

        <section className="card preview-card">
          <div className="card-head">
            <h2>Development link preview</h2>
            <p>Single-user by design for now. The latest unconsumed links stay visible here.</p>
          </div>

          {pendingLinks.length === 0 ? (
            <p className="empty-state">No pending links yet.</p>
          ) : (
            <ul className="preview-list">
              {pendingLinks.map((link) => (
                <li key={`${link.email}-${link.createdAt}`} className="preview-item">
                  <div>
                    <strong>{link.email}</strong>
                    <p>{formatTimestamp(link.createdAt)}</p>
                  </div>
                  <a className="button button-secondary" href={link.href}>
                    Open link
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    );
  }

  const captures = await listCapturesForUser(session.email);
  const hasProcessing = captures.some((capture) => capture.status === "processing");

  return (
    <main className="shell">
      <ProcessingPoller active={hasProcessing} />

      <section className="hero">
        <div>
          <p className="eyebrow">Personal signal inbox</p>
          <h1>Inbox-first capture with traceable review.</h1>
          <p className="lede">
            Text lands first, processing stays explicit, and reviewed outputs remain linked to the raw
            source instead of disappearing into loose notes.
          </p>
        </div>

        <form action={signOutAction} className="session-strip">
          <div>
            <strong>{session.email}</strong>
            <p>Signed in through the current development magic-link boundary.</p>
          </div>
          <button type="submit" className="button button-secondary">
            Sign out
          </button>
        </form>
      </section>

      <section className="grid">
        <article className="card capture-card">
          <div className="card-head">
            <h2>Capture</h2>
            <p>Keep it fast. Event grouping stays deferred until the core loop earns it.</p>
          </div>

          <form action={createCaptureAction} className="stack-form">
            <label className="field">
              <span>Quick text capture</span>
              <textarea
                name="sourceText"
                placeholder="Met Maya after the hiring workshop. She wants a follow-up note and an intro to the design lead."
                rows={8}
                required
              />
            </label>
            <button type="submit" className="button">
              Add to inbox
            </button>
          </form>
        </article>

        <article className="card inbox-card">
          <div className="card-head">
            <h2>Inbox</h2>
            <p>
              Source text stays read-only. The editable layer is the insight and follow-up set that
              survives review.
            </p>
          </div>

          {captures.length === 0 ? (
            <p className="empty-state">No captures yet. Add one to see the processing and review flow.</p>
          ) : (
            <div className="capture-list">
              {captures.map((capture) => (
                <article key={capture.id} className="capture-panel">
                  <header className="capture-header">
                    <div>
                      <span className={`status-chip status-${capture.status}`}>{statusLabel(capture.status)}</span>
                      <h3>{formatTimestamp(capture.createdAt)}</h3>
                    </div>
                    <p>{capture.review ? "Reviewed output retained." : "Awaiting or preparing review."}</p>
                  </header>

                  <div className="source-block">
                    <p className="block-label">Raw capture</p>
                    <p>{capture.sourceText}</p>
                  </div>

                  <div className="source-block">
                    <p className="block-label">Transcript</p>
                    <p>{capture.transcript ?? "Queued for processing. This view refreshes automatically."}</p>
                  </div>

                  {capture.status === "processing" ? (
                    <p className="queue-note">Processing is simulated through a local async boundary for now.</p>
                  ) : null}

                  {capture.generatedInsight ? (
                    <div className="candidate-block">
                      <p className="block-label">Generated insight</p>
                      <p>{capture.generatedInsight}</p>
                    </div>
                  ) : null}

                  {capture.generatedFollowUps.length > 0 ? (
                    <div className="candidate-block">
                      <p className="block-label">Candidate follow-ups</p>
                      <ul className="candidate-list">
                        {capture.generatedFollowUps.map((candidate) => (
                          <li key={candidate}>{candidate}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {capture.status !== "processing" && capture.status !== "failed" ? (
                    <form action={saveReviewAction} className="review-form">
                      <input type="hidden" name="captureId" value={capture.id} />
                      <label className="field">
                        <span>Insight</span>
                        <textarea
                          name="insight"
                          rows={4}
                          defaultValue={capture.review?.insight ?? capture.generatedInsight ?? ""}
                          required
                        />
                      </label>
                      <label className="field">
                        <span>Follow-ups</span>
                        <textarea
                          name="followUps"
                          rows={5}
                          defaultValue={reviewFollowUps(capture)}
                          placeholder="One follow-up per line. Leave blank for an insight-only review."
                        />
                      </label>
                      <button type="submit" className="button">
                        Confirm review
                      </button>
                    </form>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
