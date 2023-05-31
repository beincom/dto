import { IActivityLogBaseUseCase } from './activity-log-base-use-case.dto';
import { ACTIVITY_LOG_USE_CASES } from './enums';
import * as AllActivityLogUseCasesExported from './use-cases';

export * from './constants';
export * from './enums';
export * from './dtos';
export * from './helpers';
export * from './use-cases';
export * from './activity-log-base-use-case.dto';

/**
 * Export all the activity log use case classes as map
 * Used for the consumer/bindings
 */
const ActivityLogUseCaseClasses = [...Object.values(AllActivityLogUseCasesExported)].filter(
  (useCaseClass) => useCaseClass.hasOwnProperty('useCase'),
);
export const ActivityLogUseCaseClassesMap: Map<ACTIVITY_LOG_USE_CASES, IActivityLogBaseUseCase> =
  new Map(
    ActivityLogUseCaseClasses.map((useCaseClass) => [
      useCaseClass['useCase'],
      useCaseClass as any as IActivityLogBaseUseCase,
    ]),
  );
