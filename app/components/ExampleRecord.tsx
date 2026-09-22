import { useState } from "react";
import { Pin } from "./Brand";
import { track } from "../lib/analytics";
const stages = [
  {
    label: "Capture",
    title: "Record what needs attention",
    copy: "Cracked tile behind the hob. Replace the tile and make good the surrounding grout.",
    status: "Open",
  },
  {
    label: "Share",
    title: "Give the contractor the record",
    copy: "The contractor receives the snag’s location and description through a Contractor link and opens it in a browser, with no account.",
    status: "Open",
  },
  {
    label: "Review",
    title: "Review the returned evidence",
    copy: "The contractor’s completion photo is a submission. It waits for the manager’s review and does not close the snag by itself.",
    status: "Awaiting review",
  },
];
export function ExampleRecord({
  interactive = false,
}: {
  interactive?: boolean;
}) {
  const [step, setStep] = useState(0);
  const s = stages[step];
  return (
    <figure className="example-record">
      <div className="record-top">
        <span>Plot 14 · Kitchen</span>
        <Pin />
      </div>
      <div className="record-body">
        <div className="record-meta">
          <span className="snag-ref">S-0042</span>
          <span className="status-label">{s.status}</span>
        </div>
        <h3>
          Cracked tile
          <br />
          behind the hob
        </h3>
        <p>{s.copy}</p>
        <dl>
          <div>
            <dt>Location</dt>
            <dd>Kitchen · hob wall</dd>
          </div>
          <div>
            <dt>Assigned trade</dt>
            <dd>Tiler</dd>
          </div>
          <div>
            <dt>Due date</dt>
            <dd>11 September 2026</dd>
          </div>
        </dl>
      </div>
      {interactive && (
        <div className="record-controls">
          <p aria-live="polite">{s.title}</p>
          <div className="step-buttons">
            {stages.map((stage, i) => (
              <button
                key={stage.label}
                aria-pressed={step === i}
                onClick={() => {
                  setStep(i);
                  track(
                    "workflow_step_viewed",
                    "record",
                    stage.label.toLowerCase(),
                  );
                }}
              >
                {stage.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <figcaption>
        {interactive
          ? "Fictional illustration · not an app screenshot or a live Contractor link."
          : "Fictional snag record · not an app screenshot."}
      </figcaption>
    </figure>
  );
}
