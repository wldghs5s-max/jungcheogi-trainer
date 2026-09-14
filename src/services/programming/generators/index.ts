import { GeneratorRegistry } from '../registry';
import { ArrayTraceGenerator } from './ArrayTraceGenerator';
import { BlankCompletionGenerator } from './BlankCompletionGenerator';
import { BugFindingGenerator } from './BugFindingGenerator';
import { FunctionReturnGenerator } from './FunctionReturnGenerator';
import { LoopOutputGenerator } from './LoopOutputGenerator';
import { NestedLoopGenerator } from './NestedLoopGenerator';
import { PointerResultGenerator } from './PointerResultGenerator';
import { RecursiveCallGenerator } from './RecursiveCallGenerator';
import { StringOperationGenerator } from './StringOperationGenerator';
import { StructClassGenerator } from './StructClassGenerator';

export * from './BaseGenerator';
export * from './LoopOutputGenerator';
export * from './NestedLoopGenerator';
export * from './ArrayTraceGenerator';
export * from './StringOperationGenerator';
export * from './FunctionReturnGenerator';
export * from './RecursiveCallGenerator';
export * from './PointerResultGenerator';
export * from './StructClassGenerator';
export * from './BlankCompletionGenerator';
export * from './BugFindingGenerator';

let isRegistered = false;

// 레지스트리가 비워질 때 등록 상태 플래그도 함께 리셋
GeneratorRegistry.addOnClearListener(() => {
  isRegistered = false;
});

export function resetDefaultGeneratorsRegistration(): void {
  isRegistered = false;
}

/**
 * 10종의 기본 프로그래밍 문제 독립 생성기들을 레지스트리에 등록합니다.
 */
export function registerDefaultGenerators(): void {
  if (isRegistered) return;

  GeneratorRegistry.register(new LoopOutputGenerator());
  GeneratorRegistry.register(new NestedLoopGenerator());
  GeneratorRegistry.register(new ArrayTraceGenerator());
  GeneratorRegistry.register(new StringOperationGenerator());
  GeneratorRegistry.register(new FunctionReturnGenerator());
  GeneratorRegistry.register(new RecursiveCallGenerator());
  GeneratorRegistry.register(new PointerResultGenerator());
  GeneratorRegistry.register(new StructClassGenerator());
  GeneratorRegistry.register(new BlankCompletionGenerator());
  GeneratorRegistry.register(new BugFindingGenerator());

  isRegistered = true;
}

