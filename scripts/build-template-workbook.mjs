import fs from "node:fs/promises";
import { Workbook, SpreadsheetFile } from "@oai/artifact-tool";
const output = process.argv[2];
const wb = Workbook.create();
const instructions = wb.worksheets.add("Instructions");
const blank = wb.worksheets.add("Blank register");
const example = wb.worksheets.add("Worked example");
const header = [
  "Reference",
  "Location",
  "Description / action",
  "Trade / contractor",
  "Raised",
  "Due",
  "Status",
  "Original photo reference",
  "Submitted",
  "Completion photo reference",
  "Manager review",
  "Reviewer",
  "Reviewed",
  "Follow-up notes",
];
for (const s of [blank, example]) {
  s.showGridLines = false;
  s.getRange("A1:N26").format.font = {
    name: "IBM Plex Sans",
    size: 11,
    color: "#1A1D23",
  };
  s.getRange("A1:N2").merge();
  s.getRange("A1").values = [
    [
      s === blank
        ? "Snag list - blank register"
        : "Snag list - worked example (fictional)",
    ],
  ];
  s.getRange("A1:N2").format = {
    fill: "#1A1D23",
    font: { name: "IBM Plex Sans", size: 20, bold: true, color: "#FFFFFF" },
  };
  s.getRange("A3").values = [["Project / plot"]];
  s.getRange("B3:F3").merge();
  s.getRange("B3").values = [
    [s === blank ? "Enter project name" : "Example refurbishment - Plot 14"],
  ];
  s.getRange("H3").values = [["Recorded items"]];
  s.getRange("I3").formulas = [["=COUNTA(A7:A26)"]];
  s.getRange("K3").values = [["Accepted items"]];
  s.getRange("L3").formulas = [['=COUNTIF(G7:G26,"Accepted")']];
  s.getRange("A4:N4").merge();
  s.getRange("A4").values = [
    [
      "Use one row per snag. Keep original and completion photos in your project folder. A submission still needs manager review.",
    ],
  ];
  s.getRange("A4:N4").format.font.color = "#6B7280";
  s.getRange("A4:N4").format.rowHeight = 26;
  s.getRange("A6:N6").values = [header];
  s.getRange("A6:N6").format = {
    fill: "#F7F8FA",
    font: { bold: true },
    wrapText: true,
    rowHeight: 42,
    borders: { bottom: { style: "medium", color: "#D8321E" } },
  };
  s.getRange("A7:N26").format = {
    rowHeight: 64,
    wrapText: true,
    verticalAlignment: "top",
    borders: { insideHorizontal: { style: "thin", color: "#D9DCE1" } },
  };
  s.getRange("A7:A26").format.font.name = "IBM Plex Mono";
  for (const col of ["E", "F", "I", "M"])
    s.getRange(`${col}7:${col}26`).setNumberFormat("dd/mm/yyyy");
  s.getRange("G7:G26").dataValidation = {
    rule: {
      type: "list",
      values: [
        "Open",
        "In progress",
        "Submitted for review",
        "Accepted",
        "Changes requested",
      ],
    },
  };
  s.getRange("K7:K26").dataValidation = {
    rule: {
      type: "list",
      values: ["Pending", "Accepted", "Changes requested"],
    },
  };
  s.getRange("G7:G26").conditionalFormats.add("containsText", {
    text: "Accepted",
    format: { font: { color: "#1F7A4D", bold: true } },
  });
  const widths = [14, 26, 52, 23, 15, 15, 25, 30, 15, 32, 25, 22, 15, 44];
  widths.forEach(
    (width, i) => (s.getRangeByIndexes(0, i, 26, 1).format.columnWidth = width),
  );
  s.freezePanes.freezeRows(6);
  s.freezePanes.freezeColumns(1);
}
example.getRange("A7:N9").values = [
  [
    "S-0042",
    "Kitchen - hob wall",
    "Cracked tile behind hob. Replace damaged tile and make good surrounding grout.",
    "Tiler",
    new Date("2026-09-07T00:00:00Z"),
    new Date("2026-09-11T00:00:00Z"),
    "Submitted for review",
    "S-0042-before.jpg",
    new Date("2026-09-10T00:00:00Z"),
    "S-0042-after.jpg",
    "Pending",
    null,
    null,
    "Compare returned evidence with the original before acceptance.",
  ],
  [
    "S-0043",
    "Bedroom 2 - door frame",
    "Paint damage to the inside face of the frame. Prepare and make good the finish.",
    "Decorator",
    new Date("2026-09-07T00:00:00Z"),
    new Date("2026-09-11T00:00:00Z"),
    "Open",
    "S-0043-before.jpg",
    null,
    null,
    "Pending",
    null,
    null,
    null,
  ],
  [
    "S-0044",
    "Hall - skirting at entrance",
    "Loose skirting at the entrance corner. Refix and make good the joint.",
    "Carpenter",
    new Date("2026-09-07T00:00:00Z"),
    new Date("2026-09-11T00:00:00Z"),
    "Accepted",
    "S-0044-before.jpg",
    new Date("2026-09-09T00:00:00Z"),
    "S-0044-after.jpg",
    "Accepted",
    "Example reviewer",
    new Date("2026-09-10T00:00:00Z"),
    "Fictional example of a reviewed item.",
  ],
];
instructions.showGridLines = false;
instructions.getRange("A1:F20").format = {
  font: { name: "IBM Plex Sans", size: 12, color: "#1A1D23" },
  wrapText: true,
  rowHeight: 40,
};
instructions.getRange("A1:F2").merge();
instructions.getRange("A1").values = [["Snaglist - using the template"]];
instructions.getRange("A1:F2").format = {
  fill: "#1A1D23",
  font: { size: 23, bold: true, color: "#FFFFFF" },
};
instructions.getRange("A1:F20").format.columnWidth = 17;
const notes = [
  [
    "Start here",
    "Make a copy of the blank register for your project. Replace the project name in B3.",
  ],
  [
    "One item, one reference",
    "Give each snag a stable reference. Use that reference in the photo filenames.",
  ],
  [
    "Describe the work",
    "Record the room and exact location, the observed issue and the required next action.",
  ],
  [
    "Assign and date",
    "Name the responsible trade or contractor. Record the date raised and an agreed due date.",
  ],
  [
    "Keep the evidence",
    "The workbook stores photo references, not uploaded photos. Keep the image files in your project folder.",
  ],
  [
    "Review before accepting",
    "Submitted for review means the contractor has responded. Record the manager decision, reviewer and date separately.",
  ],
  [
    "Add more rows",
    "The prepared register contains 20 rows. Extend the formulas and validation ranges when you add further rows.",
  ],
  [
    "Template labels",
    "Open / In progress / Submitted for review / Accepted / Changes requested. These are template labels; app labels may differ.",
  ],
  [
    "Worked example",
    "All names, project details and dates in the example are fictional. The workbook is not an app export.",
  ],
  [
    "Print or share",
    "Use the accompanying PDF for a writing sheet. Share project records only with intended recipients.",
  ],
  ["Get Snaglist", "https://snaglist.dev/snag-list-template"],
];
notes.forEach(([label, copy], i) => {
  const row = i + 4;
  instructions.getRange(`A${row}:B${row}`).merge();
  instructions.getRange(`A${row}`).values = [[label]];
  instructions.getRange(`A${row}:B${row}`).format.font.bold = true;
  instructions.getRange(`C${row}:F${row}`).merge();
  instructions.getRange(`C${row}`).values = [[copy]];
  instructions.getRange(`A${row}:F${row}`).format.rowHeight = 60;
});
await fs.mkdir(output, { recursive: true });
for (const [sheetName, range, file] of [
  ["Instructions", "A1:F14", "instructions"],
  ["Blank register", "A1:G9", "blank-left"],
  ["Blank register", "H1:N9", "blank-right"],
  ["Worked example", "A1:G9", "example-left"],
  ["Worked example", "H1:N9", "example-right"],
]) {
  const image = await wb.render({
    sheetName,
    range,
    scale: 1.25,
    format: "png",
  });
  await fs.writeFile(
    `${output}/${file}.png`,
    new Uint8Array(await image.arrayBuffer()),
  );
}
console.log(
  (
    await wb.inspect({
      kind: "table",
      range: "'Worked example'!H3:L3",
      include: "values,formulas",
      tableMaxRows: 1,
      tableMaxCols: 5,
    })
  ).ndjson,
);
console.log(
  (
    await wb.inspect({
      kind: "match",
      searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
      options: { useRegex: true, maxResults: 10 },
      summary: "formula checks",
    })
  ).ndjson,
);
await (
  await SpreadsheetFile.exportXlsx(wb)
).save(`${output}/snag-list-template.xlsx`);
console.log("Exported editable template.");
