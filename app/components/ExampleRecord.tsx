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
    copy: "In this example, the contractor receives the snag’s location and description through a Contractor link.",
    status: "Open",
  },
  {
    label: "Review",
    title: "Check the work that comes back",
    copy: "In this example, a completion photo is submitted for review. It does not confirm that the manager has accepted the work.",
    status: "Submitted for review",
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
        Fictional workflow illustration · not an app screenshot or a live Contractor link
      </figcaption>
    </figure>
  );
}
