import * as fs from 'fs';
import * as path from 'path';

const OUTPUT_DIR = path.join(__dirname, 'output');

export function ensureOutputDir(): void {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

export function captureRun(
  name: string,
  runFn: () => { passed: number; failed: number },
): { passed: number; failed: number } {
  const lines: string[] = [];

  const origLog = console.log;
  const origError = console.error;

  console.log = (...args: unknown[]) => {
    const line = args.map(String).join(' ');
    lines.push(line);
    origLog(...args);
  };

  console.error = (...args: unknown[]) => {
    const line = args.map(String).join(' ');
    lines.push(line);
    origError(...args);
  };

  let result: { passed: number; failed: number };
  try {
    result = runFn();
  } finally {
    console.log = origLog;
    console.error = origError;
  }

  const filePath = path.join(OUTPUT_DIR, `${name}.txt`);
  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf-8');

  return result;
}

export function writeSummary(results: { name: string; passed: number; failed: number }[]): void {
  const lines: string[] = [];
  const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
  const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);

  lines.push('=== SAMPLE RUN SUMMARY ===');
  lines.push(`Date: ${new Date().toISOString()}`);
  lines.push('');
  lines.push(`${'Module'.padEnd(30)} ${'Passed'.padStart(8)} ${'Failed'.padStart(8)}`);
  lines.push('─'.repeat(48));

  for (const r of results) {
    const status = r.failed > 0 ? ' ✗' : ' ✓';
    lines.push(
      `${r.name.padEnd(30)} ${String(r.passed).padStart(8)} ${String(r.failed).padStart(8)}${status}`,
    );
  }

  lines.push('─'.repeat(48));
  lines.push(
    `${'TOTAL'.padEnd(30)} ${String(totalPassed).padStart(8)} ${String(totalFailed).padStart(8)}`,
  );
  lines.push('');

  if (totalFailed > 0) {
    lines.push(`${totalFailed} image(s) missing — see individual module files for details.`);
  } else {
    lines.push('All images OK.');
  }

  const filePath = path.join(OUTPUT_DIR, 'summary.txt');
  fs.writeFileSync(filePath, lines.join('\n') + '\n', 'utf-8');
}
