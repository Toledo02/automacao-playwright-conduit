type TokenValues = Record<string, string>;

function randomDigits(length: number): string {
  let result = '';

  for (let index = 0; index < length; index += 1) {
    result += Math.floor(Math.random() * 10).toString();
  }

  return result;
}

function formatYmd(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');

  return `${year}${month}${day}`;
}

export function createRunId(date = new Date()): string {
  return `${formatYmd(date)}-${date.getTime()}-${randomDigits(4)}`;
}

function normalizeExtraTokens(extraTokens?: Record<string, string | number>): TokenValues {
  if (!extraTokens) {
    return {};
  }

  const normalized: TokenValues = {};

  for (const [key, value] of Object.entries(extraTokens)) {
    const token = key.startsWith('{{') && key.endsWith('}}') ? key : `{{${key}}}`;
    normalized[token] = String(value);
  }

  return normalized;
}

export function defaultTokenMap(runId: string, date = new Date()): TokenValues {
  return {
    '{{runId}}': runId,
    '{{ts}}': String(date.getTime()),
    '{{dateYMD}}': formatYmd(date),
    '{{rand4}}': randomDigits(4),
  };
}

export function withRuntimeTokens(
  baseTokens: TokenValues,
  extraTokens?: Record<string, string | number>
): TokenValues {
  return {
    ...baseTokens,
    ...normalizeExtraTokens(extraTokens),
  };
}

function resolveUnknown(value: unknown, tokens: TokenValues): unknown {
  if (typeof value === 'string') {
    let output = value;

    for (const [token, tokenValue] of Object.entries(tokens)) {
      output = output.split(token).join(tokenValue);
    }

    return output;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => resolveUnknown(entry, tokens));
  }

  if (value && typeof value === 'object') {
    const mapped = Object.entries(value).map(([key, entry]) => [key, resolveUnknown(entry, tokens)]);
    return Object.fromEntries(mapped);
  }

  return value;
}

export function resolveDynamicTokens<T>(value: T, tokens: TokenValues): T {
  return resolveUnknown(value, tokens) as T;
}
