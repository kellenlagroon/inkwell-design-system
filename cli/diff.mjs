/** A small unified line diff so the CLI does not need Git in consumer projects. */
export function unifiedDiff(before, after, oldName, newName, context = 3) {
  if (before === after) return "";
  const oldLines = before.split("\n");
  const newLines = after.split("\n");
  const rows = oldLines.length + 1;
  const cols = newLines.length + 1;
  // Avoid unbounded memory for unusually large, heavily edited consumer files.
  if (rows * cols > 25_000_000) {
    return `--- ${oldName}\n+++ ${newName}\nFiles differ; open them in a local diff tool for the full comparison.\n`;
  }
  const lengths = Array.from({ length: rows }, () => new Uint32Array(cols));
  for (let i = oldLines.length - 1; i >= 0; i--) {
    for (let j = newLines.length - 1; j >= 0; j--) {
      lengths[i][j] = oldLines[i] === newLines[j]
        ? lengths[i + 1][j + 1] + 1
        : Math.max(lengths[i + 1][j], lengths[i][j + 1]);
    }
  }
  const operations = [];
  let i = 0;
  let j = 0;
  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length && oldLines[i] === newLines[j]) {
      operations.push({ kind: " ", line: oldLines[i] }); i++; j++;
    } else if (i < oldLines.length && (j === newLines.length || lengths[i + 1][j] >= lengths[i][j + 1])) {
      operations.push({ kind: "-", line: oldLines[i] }); i++;
    } else {
      operations.push({ kind: "+", line: newLines[j] }); j++;
    }
  }
  const oldPositions = [1];
  const newPositions = [1];
  for (const operation of operations) {
    oldPositions.push(oldPositions.at(-1) + (operation.kind === "+" ? 0 : 1));
    newPositions.push(newPositions.at(-1) + (operation.kind === "-" ? 0 : 1));
  }
  const hunks = [];
  let cursor = 0;
  while (cursor < operations.length) {
    while (cursor < operations.length && operations[cursor].kind === " ") cursor++;
    if (cursor === operations.length) break;
    let start = Math.max(0, cursor - context);
    let end = cursor + 1;
    while (end < operations.length) {
      if (operations[end].kind !== " ") { end++; continue; }
      let next = end;
      while (next < operations.length && operations[next].kind === " ") next++;
      if (next < operations.length && next - end <= context * 2) { end = next + 1; continue; }
      end = Math.min(operations.length, end + context);
      break;
    }
    const oldCount = oldPositions[end] - oldPositions[start];
    const newCount = newPositions[end] - newPositions[start];
    hunks.push(`@@ -${oldPositions[start]},${oldCount} +${newPositions[start]},${newCount} @@\n${operations.slice(start, end).map(({ kind, line }) => `${kind}${line}`).join("\n")}`);
    cursor = end;
  }
  return `--- ${oldName}\n+++ ${newName}\n${hunks.join("\n")}\n`;
}
