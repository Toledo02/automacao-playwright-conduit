import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type DataStrategy = 'fixed' | 'dynamic' | 'hybrid';

export interface TestDataMeta {
  id: string;
  domain: string;
  version: string;
  lastUpdated: string;
  owner: string;
}

export interface TestDataScenario<
  TPayload = Record<string, unknown>,
  TExpected = Record<string, unknown>
> {
  id: string;
  ctId: string;
  strategy: DataStrategy;
  description: string;
  payload: TPayload;
  expected?: TExpected;
  notes?: string;
}

export interface TestDataFile<
  TPayload = Record<string, unknown>,
  TExpected = Record<string, unknown>
> {
  meta: TestDataMeta;
  scenarios: Array<TestDataScenario<TPayload, TExpected>>;
}

export function resolveDataPath(relativePath: string): string {
  return path.resolve(process.cwd(), relativePath);
}

export async function readTestDataFile<
  TPayload = Record<string, unknown>,
  TExpected = Record<string, unknown>
>(relativePath: string): Promise<TestDataFile<TPayload, TExpected>> {
  const fullPath = resolveDataPath(relativePath);
  const raw = await readFile(fullPath, 'utf-8');

  return JSON.parse(raw) as TestDataFile<TPayload, TExpected>;
}

export async function readScenario<
  TPayload = Record<string, unknown>,
  TExpected = Record<string, unknown>
>(
  relativePath: string,
  scenarioId: string
): Promise<TestDataScenario<TPayload, TExpected>> {
  const data = await readTestDataFile<TPayload, TExpected>(relativePath);
  const scenario = data.scenarios.find((item) => item.id === scenarioId);

  if (!scenario) {
    const availableScenarios = data.scenarios.map((item) => item.id).join(', ');
    throw new Error(
      `Scenario "${scenarioId}" not found in ${relativePath}. Available: ${availableScenarios}`
    );
  }

  return scenario;
}

export async function readScenarioPayload<TPayload = Record<string, unknown>>(
  relativePath: string,
  scenarioId: string
): Promise<TPayload> {
  const scenario = await readScenario<TPayload>(relativePath, scenarioId);
  return scenario.payload;
}
