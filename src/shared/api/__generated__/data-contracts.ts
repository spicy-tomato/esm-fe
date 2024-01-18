/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type AssignInvigilatorNumerateOfShiftToFacultyData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type AssignInvigilatorNumerateOfShiftToFacultyPayload = any;

export type AssignInvigilatorsNumberToFacultyData =
  ESMApplicationCommonModelsResultESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDto;

/** @format int32 */
export type AssignInvigilatorsNumberToFacultyPayload = number;

export type AssignInvigilatorsToShiftsData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type AssignInvigilatorsToShiftsPayload = Record<string, string>;

export type AutoAssignTeachersToGroupsData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type AutoAssignTeachersToShiftData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type CalculateInvigilatorNumerateOfShiftForEachFacultyData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type ChangePasswordData = ESMApplicationCommonModelsResultSystemBoolean;

export type ChangePasswordPayload =
  ESMApplicationAuthCommandsChangePasswordChangePasswordCommand;

export type ChangeStatusData = ESMApplicationCommonModelsResultSystemBoolean;

export type ChangeStatusPayload =
  ESMApplicationExaminationsCommandsChangeStatusChangeStatusRequest;

export type CreateDepartmentData = ESMApplicationCommonModelsResultSystemGuid;

export type CreateDepartmentPayload =
  ESMApplicationDepartmentsCommandsCreateDepartmentCreateDepartmentCommand;

export type CreateExaminationData = ESMApplicationCommonModelsResultSystemGuid;

export type CreateExaminationPayload =
  ESMApplicationExaminationsCommandsCreateCreateCommand;

export type CreateFacultyData =
  ESMApplicationCommonModelsResultESMDomainDtosFacultyFacultySummary;

export type CreateFacultyPayload =
  ESMApplicationFacultiesCommandsCreateCreateCommand;

export type CreateModuleData = ESMApplicationCommonModelsResultSystemGuid;

export type CreateModuleFacultyData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type CreateModuleFacultyPayload = any;

export type CreateModulePayload =
  ESMApplicationModulesCommandsCreateCreateCommand;

export type CreateRoomData = ESMApplicationCommonModelsResultSystemGuid;

export type CreateRoomPayload = ESMApplicationRoomsCommandsCreateCreateCommand;

export type CreateUserData = ESMApplicationCommonModelsResultSystemGuid;

export type CreateUserPayload =
  ESMApplicationDepartmentsCommandsCreateUserInDepartmentCreateUserInDepartmentCommand;

export interface ESMApplicationAuthCommandsChangePasswordChangePasswordCommand {
  newPassword?: string;
  oldPassword?: string;
}

export interface ESMApplicationAuthCommandsLoginLoginCommand {
  password?: string;
  userName?: string;
}

export interface ESMApplicationAuthQueriesMySummaryInfoInternalDepartment {
  faculty?: ESMApplicationAuthQueriesMySummaryInfoInternalFaculty | null;
  /** @format uuid */
  id?: string;
}

export interface ESMApplicationAuthQueriesMySummaryInfoInternalFaculty {
  displayId?: string | null;
  /** @format uuid */
  id?: string;
  name?: string;
}

export interface ESMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto {
  department?: ESMApplicationAuthQueriesMySummaryInfoInternalDepartment | null;
  faculty?: ESMApplicationAuthQueriesMySummaryInfoInternalFaculty | null;
  fullName?: string | null;
  /** @format uuid */
  id?: string;
  isMale?: boolean | null;
  phoneNumber?: string | null;
  roles?: string[];
}

export interface ESMApplicationCommonModelsError {
  /**
   *
   *
   * 100 = Continue
   *
   * 101 = SwitchingProtocols
   *
   * 102 = Processing
   *
   * 103 = EarlyHints
   *
   * 200 = OK
   *
   * 201 = Created
   *
   * 202 = Accepted
   *
   * 203 = NonAuthoritativeInformation
   *
   * 204 = NoContent
   *
   * 205 = ResetContent
   *
   * 206 = PartialContent
   *
   * 207 = MultiStatus
   *
   * 208 = AlreadyReported
   *
   * 226 = IMUsed
   *
   * 300 = Ambiguous
   *
   * 301 = Moved
   *
   * 302 = Redirect
   *
   * 303 = RedirectMethod
   *
   * 304 = NotModified
   *
   * 305 = UseProxy
   *
   * 306 = Unused
   *
   * 307 = RedirectKeepVerb
   *
   * 308 = PermanentRedirect
   *
   * 400 = BadRequest
   *
   * 401 = Unauthorized
   *
   * 402 = PaymentRequired
   *
   * 403 = Forbidden
   *
   * 404 = NotFound
   *
   * 405 = MethodNotAllowed
   *
   * 406 = NotAcceptable
   *
   * 407 = ProxyAuthenticationRequired
   *
   * 408 = RequestTimeout
   *
   * 409 = Conflict
   *
   * 410 = Gone
   *
   * 411 = LengthRequired
   *
   * 412 = PreconditionFailed
   *
   * 413 = RequestEntityTooLarge
   *
   * 414 = RequestUriTooLong
   *
   * 415 = UnsupportedMediaType
   *
   * 416 = RequestedRangeNotSatisfiable
   *
   * 417 = ExpectationFailed
   *
   * 421 = MisdirectedRequest
   *
   * 422 = UnprocessableEntity
   *
   * 423 = Locked
   *
   * 424 = FailedDependency
   *
   * 426 = UpgradeRequired
   *
   * 428 = PreconditionRequired
   *
   * 429 = TooManyRequests
   *
   * 431 = RequestHeaderFieldsTooLarge
   *
   * 451 = UnavailableForLegalReasons
   *
   * 500 = InternalServerError
   *
   * 501 = NotImplemented
   *
   * 502 = BadGateway
   *
   * 503 = ServiceUnavailable
   *
   * 504 = GatewayTimeout
   *
   * 505 = HttpVersionNotSupported
   *
   * 506 = VariantAlsoNegotiates
   *
   * 507 = InsufficientStorage
   *
   * 508 = LoopDetected
   *
   * 510 = NotExtended
   *
   * 511 = NetworkAuthenticationRequired
   */
  code?: SystemNetHttpStatusCode | null;
  message?: string;
  property?: string | null;
}

export interface ESMApplicationCommonModelsResultESMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto {
  data?: ESMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto;
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsDto {
  data?: Record<
    string,
    ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemResponseItem[]
  >;
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDto {
  data?: ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDto;
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultESMDomainDtosExaminationExaminationSummary {
  data?: ESMDomainDtosExaminationExaminationSummary;
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultESMDomainDtosFacultyFacultySummary {
  data?: ESMDomainDtosFacultyFacultySummary;
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultESMDomainDtosGeneratedToken {
  data?: ESMDomainDtosGeneratedToken;
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemBoolean {
  data?: boolean;
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableESMApplicationTeachersQueriesGetGetDto {
  data?: ESMApplicationTeachersQueriesGetGetDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableESMDomainDtosUserUserSummary {
  data?: ESMDomainDtosUserUserSummary[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDto {
  data?: ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDto {
  data?: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDto {
  data?: ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDto {
  data?: ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDto {
  data?: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetRelatedExaminationsRelatedExaminationDto {
  data?: ESMApplicationExaminationsQueriesGetRelatedExaminationsRelatedExaminationDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationFacultiesQueriesGetAllGetAllDto {
  data?: ESMApplicationFacultiesQueriesGetAllGetAllDto[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMDomainDtosUserUserSummary {
  data?: ESMDomainDtosUserUserSummary[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMDomainEntitiesExaminationData {
  data?: ESMDomainEntitiesExaminationData[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemCollectionsGenericListESMDomainEntitiesExaminationEvent {
  data?: ESMDomainEntitiesExaminationEvent[];
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationCommonModelsResultSystemGuid {
  /** @format uuid */
  data?: string;
  errors?: ESMApplicationCommonModelsError[] | null;
  success?: boolean;
}

export interface ESMApplicationDepartmentsCommandsCreateDepartmentCreateDepartmentCommand {
  displayId?: string | null;
  /** @format uuid */
  facultyId?: string | null;
  name?: string;
}

export interface ESMApplicationDepartmentsCommandsCreateUserInDepartmentCreateUserInDepartmentCommand {
  departmentId?: string;
  email?: string;
  fullName?: string;
  isMale?: boolean;
  phoneNumber?: string | null;
  teacherId?: string | null;
}

export interface ESMApplicationDepartmentsCommandsImportDepartmentImportDepartmentCommand {
  files?: File[];
}

export interface ESMApplicationDepartmentsCommandsUpdateDepartmentUpdateDepartmentCommand {
  departmentId?: string;
  displayId?: string;
  facultyId?: string;
  name?: string;
}

export interface ESMApplicationExaminationsCommandsChangeStatusChangeStatusRequest {
  /** @format date-time */
  createdAt?: string;
  /**
   *
   *
   * 0 = None
   *
   * 1 = Idle
   *
   * 2 = Setup
   *
   * 4 = AssignFaculty
   *
   * 8 = AssignInvigilator
   *
   * 16 = Closed
   */
  status?:
    | 'None'
    | 'Idle'
    | 'Setup'
    | 'AssignFaculty'
    | 'AssignInvigilator'
    | 'Closed';
}

export interface ESMApplicationExaminationsCommandsCreateCreateCommand {
  /** @format date-time */
  createdAt?: string;
  description?: string | null;
  displayId?: string | null;
  /** @format date-time */
  expectEndAt?: string | null;
  /** @format date-time */
  expectStartAt?: string | null;
  name?: string;
}

export interface ESMApplicationExaminationsCommandsUpdateTeacherAssignmentUpdateTeacherAssignmentDto {
  departmentId?: string | null;
  temporaryInvigilatorName?: string | null;
  userId?: string | null;
}

export interface ESMApplicationExaminationsCommandsUpdateUpdateCommand {
  description?: string | null;
  displayId?: string | null;
  examinationId?: string;
  /** @format date-time */
  expectEndAt?: string | null;
  /** @format date-time */
  expectStartAt?: string | null;
  name?: string | null;
  /** @format date-time */
  updatedAt?: string | null;
}

export interface ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDto {
  assignNumerate?: Record<string, ESMDomainDtosExaminationShiftGroupDataCell>;
  departmentAssign?: boolean;
  /** @format uuid */
  id?: string;
  /** @format int32 */
  invigilatorsCount?: number;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method?: 'Select' | 'Write' | 'Practice' | 'Oral' | 'Report1' | 'Report2';
  module?: ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDtoInternalModule;
  /** @format int32 */
  roomsCount?: number;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt?: string;
}

export interface ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDtoInternalFaculty {
  name?: string;
}

export interface ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDtoInternalModule {
  displayId?: string;
  faculty?: ESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDtoInternalFaculty;
  name?: string;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDto {
  /** @format int32 */
  candidatesCount?: number;
  invigilatorShift?: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalInvigilatorShift[];
  isDuplicated?: boolean;
  room?: ESMDomainDtosRoomRoomSummary;
  shiftGroup?: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalShiftGroup;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalDepartment {
  displayId?: string | null;
  faculty?: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalFaculty | null;
  name?: string;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalFaculty {
  displayId?: string | null;
  name?: string;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalInvigilatorShift {
  /** @format uuid */
  id?: string;
  invigilator?: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalTeacher | null;
  /** @format int32 */
  orderIndex?: number;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalShiftGroup {
  departmentAssign?: boolean;
  /** @format uuid */
  id?: string;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method?: 'Select' | 'Write' | 'Practice' | 'Oral' | 'Report1' | 'Report2';
  module?: ESMDomainDtosModuleModuleSimple;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt?: string;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalTeacher {
  department?: ESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDtoInternalDepartment | null;
  fullName?: string;
  /** @format uuid */
  id?: string;
  invigilatorId?: string | null;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDto {
  /** @format int32 */
  candidatesCount?: number;
  /** @format int32 */
  examsCount?: number;
  /** @format uuid */
  id?: string;
  /** @format int32 */
  invigilatorsCount?: number;
  room?: ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalRoom;
  shiftGroup?: ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalShiftGroup;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalModule {
  /** @format int32 */
  credits?: number;
  displayId?: string;
  name?: string;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalRoom {
  displayId?: string;
}

export interface ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalShiftGroup {
  departmentAssign?: boolean;
  /** @format uuid */
  id?: string;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method?: 'Select' | 'Write' | 'Practice' | 'Oral' | 'Report1' | 'Report2';
  module?: ESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDtoInternalModule;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt?: string;
}

export interface ESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsItemResponseItem {
  isPriority?: boolean;
}

export interface ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDto {
  /** @format uuid */
  departmentId?: string | null;
  facultyShiftGroup?: ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalFacultyShiftGroup;
  /** @format uuid */
  id?: string;
  temporaryInvigilatorName?: string | null;
  user?: ESMDomainDtosUserUserSimple | null;
}

export interface ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalFacultyShiftGroup {
  /** @format uuid */
  id?: string;
  shiftGroup?: ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalShiftGroup;
}

export interface ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalModule {
  displayId?: string;
  name?: string;
}

export interface ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalShiftGroup {
  module?: ESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDtoInternalModule;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt?: string;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDto {
  /** @format uuid */
  handedOverUserId?: string | null;
  /** @format uuid */
  id?: string;
  invigilatorShift?: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalInvigilatorShift[];
  report?: string | null;
  room?: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalRoom;
  shiftGroup?: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalShiftGroup;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalDepartment {
  displayId?: string | null;
  faculty?: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalFaculty | null;
  name?: string;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalFaculty {
  displayId?: string | null;
  name?: string;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalInvigilatorShift {
  /** @format uuid */
  id?: string;
  invigilator?: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalUser | null;
  /** @format int32 */
  orderIndex?: number;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalModule {
  displayId?: string;
  faculty?: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalFaculty;
  name?: string;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalRoom {
  displayId?: string;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalShiftGroup {
  departmentAssign?: boolean;
  /** @format uuid */
  id?: string;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method?: 'Select' | 'Write' | 'Practice' | 'Oral' | 'Report1' | 'Report2';
  module?: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalModule;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt?: string;
}

export interface ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalUser {
  department?: ESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDtoInternalDepartment | null;
  fullName?: string;
  /** @format uuid */
  id?: string;
  invigilatorId?: string | null;
}

export interface ESMApplicationExaminationsQueriesGetRelatedExaminationsRelatedExaminationDto {
  displayId?: string;
  /** @format uuid */
  id?: string;
  name?: string;
}

export interface ESMApplicationFacultiesCommandsCreateCreateCommand {
  displayId?: string | null;
  name?: string;
}

export interface ESMApplicationFacultiesCommandsUpdateUpdateRequest {
  displayId?: string;
  name?: string;
}

export interface ESMApplicationFacultiesQueriesGetAllGetAllDto {
  departments?: ESMApplicationFacultiesQueriesGetAllGetAllDtoInternalDepartment[];
  displayId?: string | null;
  /** @format uuid */
  id?: string;
  name?: string;
}

export interface ESMApplicationFacultiesQueriesGetAllGetAllDtoInternalDepartment {
  displayId?: string | null;
  /** @format uuid */
  id?: string;
  name?: string;
}

export interface ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDto {
  assignNumerate?: Record<string, ESMDomainDtosExaminationShiftGroupDataCell>;
  departmentAssign?: boolean;
  /** @format uuid */
  id?: string;
  /** @format int32 */
  invigilatorsCount?: number;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method?: 'Select' | 'Write' | 'Practice' | 'Oral' | 'Report1' | 'Report2';
  module?: ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDtoInternalModule;
  /** @format int32 */
  roomsCount?: number;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt?: string;
}

export interface ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDtoInternalFaculty {
  name?: string;
}

export interface ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDtoInternalModule {
  displayId?: string;
  faculty?: ESMApplicationGroupsCommandsAssignInvigilatorsNumberToFacultyAssignInvigilatorsNumberToFacultyDtoInternalFaculty;
  name?: string;
}

export interface ESMApplicationGroupsCommandsUpdateTemporaryNameToTeacherUpdateTemporaryNameToTeacherRequest {
  userId?: string;
}

export interface ESMApplicationModulesCommandsCreateCreateCommand {
  departmentId?: string | null;
  displayId?: string;
  facultyId?: string;
  name?: string;
}

export interface ESMApplicationModulesCommandsImportImportCommand {
  files?: File[];
}

export interface ESMApplicationRoomsCommandsCreateCreateCommand {
  /** @format int32 */
  capacity?: number;
  displayId?: string;
}

export interface ESMApplicationShiftsCommandsUpdateUpdateRequest {
  handoverTeacherId?: string | null;
  report?: string | null;
}

export interface ESMApplicationTeachersCommandsUpdateUpdateRequest {
  departmentId?: string | null;
  email?: string;
  fullName?: string;
  isMale?: boolean;
  teacherId?: string | null;
}

export interface ESMApplicationTeachersQueriesGetGetDto {
  /** @format date-time */
  createdAt?: string;
  department?: ESMDomainDtosDepartmentDepartmentSummary | null;
  email?: string | null;
  faculty?: ESMDomainDtosFacultyFacultySummary | null;
  fullName?: string;
  /** @format uuid */
  id?: string;
  invigilatorId?: string | null;
  isMale?: boolean;
  phoneNumber?: string | null;
  userName?: string;
}

export type ESMDomainCommonBaseEvent = object;

export interface ESMDomainDtosDepartmentDepartmentSummary {
  displayId?: string | null;
  faculty?: ESMDomainDtosFacultyFacultySummary | null;
  /** @format uuid */
  id?: string;
  name?: string;
}

export interface ESMDomainDtosExaminationExaminationSummary {
  /** @format date-time */
  createdAt?: string;
  createdBy?: ESMDomainDtosUserUserSummary;
  description?: string | null;
  displayId?: string;
  /** @format date-time */
  expectEndAt?: string | null;
  /** @format date-time */
  expectStartAt?: string | null;
  /** @format uuid */
  id?: string;
  name?: string;
  /**
   *
   *
   * 0 = None
   *
   * 1 = Idle
   *
   * 2 = Setup
   *
   * 4 = AssignFaculty
   *
   * 8 = AssignInvigilator
   *
   * 16 = Closed
   */
  status?:
    | 'None'
    | 'Idle'
    | 'Setup'
    | 'AssignFaculty'
    | 'AssignInvigilator'
    | 'Closed';
  /** @format date-time */
  updatedAt?: string | null;
}

export interface ESMDomainDtosExaminationShiftGroupDataCell {
  /** @format int32 */
  actual?: number;
  /** @format int32 */
  calculated?: number;
  /** @format int32 */
  maximum?: number;
}

export interface ESMDomainDtosFacultyFacultySummary {
  displayId?: string | null;
  /** @format uuid */
  id?: string;
  name?: string;
}

export interface ESMDomainDtosGeneratedToken {
  /** @format date-time */
  expiration?: string;
  token?: string;
}

export interface ESMDomainDtosModuleModuleSimple {
  /** @format int32 */
  credits?: number;
  displayId?: string;
  faculty?: ESMDomainDtosFacultyFacultySummary;
  /** @format uuid */
  id?: string;
  name?: string;
}

export interface ESMDomainDtosRoomRoomSummary {
  /** @format int32 */
  capacity?: number | null;
  displayId?: string;
  /** @format uuid */
  id?: string;
}

export interface ESMDomainDtosUserUserSimple {
  /** @format date-time */
  createdAt?: string;
  email?: string;
  fullName?: string;
  /** @format uuid */
  id?: string;
  invigilatorId?: string | null;
  isMale?: boolean;
}

export interface ESMDomainDtosUserUserSummary {
  /** @format date-time */
  createdAt?: string;
  department?: ESMDomainDtosDepartmentDepartmentSummary | null;
  email?: string | null;
  faculty?: ESMDomainDtosFacultyFacultySummary | null;
  fullName?: string;
  /** @format uuid */
  id?: string;
  invigilatorId?: string | null;
  isMale?: boolean;
  phoneNumber?: string | null;
  role?: string;
  userName?: string;
}

export interface ESMDomainEntitiesCandidate {
  candidateShift?: ESMDomainEntitiesCandidateShift[];
  displayId?: string;
  examinationModules?: ESMDomainEntitiesCandidateExaminationModule[];
  /** @format uuid */
  id?: string;
  isStudent?: boolean;
  name?: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface ESMDomainEntitiesCandidateExaminationModule {
  candidate?: ESMDomainEntitiesCandidate;
  /** @format uuid */
  candidateId?: string;
  /** @format date-time */
  createAt?: string;
  /** @format date-time */
  deletedAt?: string | null;
  examination?: ESMDomainEntitiesExamination;
  /** @format uuid */
  examinationId?: string;
  /** @format uuid */
  id?: string;
  module?: ESMDomainEntitiesModule;
  /** @format uuid */
  moduleId?: string;
}

export interface ESMDomainEntitiesCandidateShift {
  candidate?: ESMDomainEntitiesCandidate;
  /** @format uuid */
  candidateId?: string;
  /** @format uuid */
  id?: string;
  /** @format int32 */
  orderIndex?: number;
  shift?: ESMDomainEntitiesShift;
  /** @format uuid */
  shiftId?: string;
}

export interface ESMDomainEntitiesDepartment {
  /** @format date-time */
  created?: string;
  /** @format uuid */
  createdBy?: string | null;
  departmentShiftGroups?: ESMDomainEntitiesDepartmentShiftGroup[];
  displayId?: string | null;
  domainEvents?: ESMDomainCommonBaseEvent[];
  faculty?: ESMDomainEntitiesFaculty | null;
  /** @format uuid */
  facultyId?: string | null;
  /** @format uuid */
  id?: string;
  /** @format date-time */
  lastModified?: string | null;
  /** @format uuid */
  lastModifiedBy?: string | null;
  name?: string;
  teachers?: ESMDomainEntitiesTeacher[];
}

export interface ESMDomainEntitiesDepartmentShiftGroup {
  department?: ESMDomainEntitiesDepartment | null;
  /** @format uuid */
  departmentId?: string | null;
  facultyShiftGroup?: ESMDomainEntitiesFacultyShiftGroup;
  /** @format uuid */
  facultyShiftGroupId?: string;
  /** @format uuid */
  id?: string;
  temporaryInvigilatorName?: string | null;
  user?: ESMDomainIdentityApplicationUser | null;
  /** @format uuid */
  userId?: string | null;
}

export interface ESMDomainEntitiesExamination {
  candidatesOfModule?: ESMDomainEntitiesCandidateExaminationModule[];
  /** @format date-time */
  created?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format uuid */
  createdBy?: string | null;
  description?: string | null;
  displayId?: string | null;
  domainEvents?: ESMDomainCommonBaseEvent[];
  events?: ESMDomainEntitiesExaminationEvent[];
  /** @format date-time */
  expectEndAt?: string | null;
  /** @format date-time */
  expectStartAt?: string | null;
  /** @format uuid */
  id?: string;
  /** @format date-time */
  lastModified?: string | null;
  /** @format uuid */
  lastModifiedBy?: string | null;
  name?: string;
  shiftGroups?: ESMDomainEntitiesShiftGroup[];
  /**
   *
   *
   * 0 = None
   *
   * 1 = Idle
   *
   * 2 = Setup
   *
   * 4 = AssignFaculty
   *
   * 8 = AssignInvigilator
   *
   * 16 = Closed
   */
  status?:
    | 'None'
    | 'Idle'
    | 'Setup'
    | 'AssignFaculty'
    | 'AssignInvigilator'
    | 'Closed';
  /** @format date-time */
  updatedAt?: string | null;
}

export interface ESMDomainEntitiesExaminationData {
  /** @format int32 */
  candidatesCount?: number | null;
  /** @format int32 */
  credit?: number | null;
  /** @format date-time */
  date?: string | null;
  department?: string | null;
  departmentAssign?: boolean | null;
  /** @format date-time */
  endAt?: string | null;
  errors?: Record<string, ESMDomainEntitiesExaminationDataError>;
  examination?: ESMDomainEntitiesExamination;
  /** @format uuid */
  examinationId?: string;
  faculty?: string | null;
  /** @format uuid */
  id?: string;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method?: ESMDomainEnumsExamMethod | null;
  moduleClass?: string | null;
  moduleId?: string | null;
  moduleName?: string | null;
  rooms?: string | null;
  /** @format int32 */
  roomsCount?: number | null;
  /** @format int32 */
  shift?: number | null;
  /** @format date-time */
  startAt?: string | null;
  suggestions?: Record<
    string,
    SystemCollectionsGenericKeyValuePairSystemStringSystemString[] | null
  >;
}

export interface ESMDomainEntitiesExaminationDataError {
  message?: string;
}

export interface ESMDomainEntitiesExaminationEvent {
  /** @format date-time */
  createAt?: string;
  examination?: ESMDomainEntitiesExamination;
  /** @format uuid */
  examinationId?: string;
  /** @format uuid */
  id?: string;
  /**
   *
   *
   * 0 = None
   *
   * 1 = Idle
   *
   * 2 = Setup
   *
   * 4 = AssignFaculty
   *
   * 8 = AssignInvigilator
   *
   * 16 = Closed
   */
  status?:
    | 'None'
    | 'Idle'
    | 'Setup'
    | 'AssignFaculty'
    | 'AssignInvigilator'
    | 'Closed';
}

export interface ESMDomainEntitiesFaculty {
  /** @format date-time */
  created?: string;
  /** @format uuid */
  createdBy?: string | null;
  departments?: ESMDomainEntitiesDepartment[];
  displayId?: string | null;
  domainEvents?: ESMDomainCommonBaseEvent[];
  facultyShiftGroups?: ESMDomainEntitiesFacultyShiftGroup[];
  /** @format uuid */
  id?: string;
  /** @format date-time */
  lastModified?: string | null;
  /** @format uuid */
  lastModifiedBy?: string | null;
  name?: string;
  teachers?: ESMDomainEntitiesTeacher[];
}

export interface ESMDomainEntitiesFacultyShiftGroup {
  /** @format int32 */
  calculatedInvigilatorsCount?: number;
  departmentShiftGroups?: ESMDomainEntitiesDepartmentShiftGroup[];
  faculty?: ESMDomainEntitiesFaculty;
  /** @format uuid */
  facultyId?: string;
  /** @format uuid */
  id?: string;
  /** @format int32 */
  invigilatorsCount?: number;
  shiftGroup?: ESMDomainEntitiesShiftGroup;
  /** @format uuid */
  shiftGroupId?: string;
}

export interface ESMDomainEntitiesInvigilatorShift {
  /** @format date-time */
  createdAt?: string;
  /** @format date-time */
  deletedAt?: string | null;
  /** @format uuid */
  id?: string;
  invigilator?: ESMDomainIdentityApplicationUser | null;
  /** @format uuid */
  invigilatorId?: string | null;
  /** @format int32 */
  orderIndex?: number;
  /** @format int32 */
  paid?: number;
  shift?: ESMDomainEntitiesShift;
  /** @format uuid */
  shiftId?: string;
}

export interface ESMDomainEntitiesModule {
  candidatesOfExamination?: ESMDomainEntitiesCandidateExaminationModule[];
  /** @format int32 */
  credits?: number;
  department?: ESMDomainEntitiesDepartment | null;
  /** @format uuid */
  departmentId?: string | null;
  displayId?: string;
  /** @format int32 */
  durationInMinutes?: number;
  faculty?: ESMDomainEntitiesFaculty;
  /** @format uuid */
  facultyId?: string;
  /** @format uuid */
  id?: string;
  name?: string;
}

export interface ESMDomainEntitiesRoom {
  /** @format int32 */
  capacity?: number | null;
  displayId?: string;
  /** @format uuid */
  id?: string;
  shift?: ESMDomainEntitiesShift[];
}

export interface ESMDomainEntitiesShift {
  candidateShift?: ESMDomainEntitiesCandidateShift[];
  /** @format int32 */
  candidatesCount?: number;
  /** @format int32 */
  examsCount?: number;
  handedOverUser?: ESMDomainIdentityApplicationUser | null;
  /** @format uuid */
  handedOverUserId?: string | null;
  /** @format uuid */
  id?: string;
  invigilatorShift?: ESMDomainEntitiesInvigilatorShift[];
  /** @format int32 */
  invigilatorsCount?: number;
  report?: string | null;
  room?: ESMDomainEntitiesRoom;
  /** @format uuid */
  roomId?: string | null;
  shiftGroup?: ESMDomainEntitiesShiftGroup;
  /** @format uuid */
  shiftGroupId?: string;
}

export interface ESMDomainEntitiesShiftGroup {
  departmentAssign?: boolean;
  examination?: ESMDomainEntitiesExamination;
  /** @format uuid */
  examinationId?: string;
  facultyShiftGroups?: ESMDomainEntitiesFacultyShiftGroup[];
  /** @format uuid */
  id?: string;
  /** @format int32 */
  invigilatorsCount?: number;
  /**
   *
   *
   * 0 = Select
   *
   * 1 = Write
   *
   * 2 = Practice
   *
   * 3 = Oral
   *
   * 4 = Report1
   *
   * 5 = Report2
   */
  method?: 'Select' | 'Write' | 'Practice' | 'Oral' | 'Report1' | 'Report2';
  module?: ESMDomainEntitiesModule;
  /** @format uuid */
  moduleId?: string;
  /** @format int32 */
  roomsCount?: number;
  /** @format int32 */
  shift?: number | null;
  shifts?: ESMDomainEntitiesShift[];
  /** @format date-time */
  startAt?: string;
}

export interface ESMDomainEntitiesTeacher {
  /** @format date-time */
  created?: string;
  /** @format uuid */
  createdBy?: string | null;
  department?: ESMDomainEntitiesDepartment | null;
  /** @format uuid */
  departmentId?: string | null;
  domainEvents?: ESMDomainCommonBaseEvent[];
  examinations?: ESMDomainEntitiesExamination[];
  faculty?: ESMDomainEntitiesFaculty | null;
  /** @format uuid */
  facultyId?: string | null;
  fullName?: string;
  handedOverShifts?: ESMDomainEntitiesShift[];
  /** @format uuid */
  id?: string;
  invigilatorShifts?: ESMDomainEntitiesInvigilatorShift[];
  isMale?: boolean;
  /** @format date-time */
  lastModified?: string | null;
  /** @format uuid */
  lastModifiedBy?: string | null;
  teacherId?: string | null;
  user?: ESMDomainIdentityApplicationUser;
  /** @format uuid */
  userId?: string;
}

/**
 *
 *
 * 0 = Select
 *
 * 1 = Write
 *
 * 2 = Practice
 *
 * 3 = Oral
 *
 * 4 = Report1
 *
 * 5 = Report2
 * @format int32
 */
export enum ESMDomainEnumsExamMethod {
  Select = 0,
  Write = 1,
  Practice = 2,
  Oral = 3,
  Report1 = 4,
  Report2 = 5,
}

/**
 *
 *
 * 0 = None
 *
 * 1 = Idle
 *
 * 2 = Setup
 *
 * 4 = AssignFaculty
 *
 * 8 = AssignInvigilator
 *
 * 16 = Closed
 * @format int32
 */
export enum ESMDomainEnumsExaminationStatus {
  None = 0,
  Idle = 1,
  Setup = 2,
  AssignFaculty = 4,
  AssignInvigilator = 8,
  Closed = 16,
}

export interface ESMDomainIdentityApplicationUser {
  /** @format int32 */
  accessFailedCount?: number;
  concurrencyStamp?: string | null;
  email?: string | null;
  emailConfirmed?: boolean;
  /** @format uuid */
  id?: string;
  lockoutEnabled?: boolean;
  /** @format date-time */
  lockoutEnd?: string | null;
  normalizedEmail?: string | null;
  normalizedUserName?: string | null;
  passwordHash?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  securityStamp?: string | null;
  teacher?: ESMDomainEntitiesTeacher | null;
  twoFactorEnabled?: boolean;
  userName?: string | null;
}

export type GetAllFacultyData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationFacultiesQueriesGetAllGetAllDto;

export type GetAllGroupsData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllGroupsGetAllGroupsDto;

export type GetAllShiftsData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllShiftsGetAllShiftDto;

export type GetAllTeacherData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableESMApplicationTeachersQueriesGetGetDto;

export interface GetAllTeacherParams {
  IsFaculty?: boolean;
  IsInvigilator?: boolean;
}

export type GetAvailableInvigilatorsInShiftGroupData =
  ESMApplicationCommonModelsResultESMApplicationExaminationsQueriesGetAvailableInvigilatorsInGroupsGetAvailableInvigilatorsInGroupsDto;

export type GetEventsData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMDomainEntitiesExaminationEvent;

export type GetGroupsByFacultyIdData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetGroupsByFacultyIdGetGroupsByFacultyIdDto;

export type GetHandoverDataData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetHandoverDataHandoverDataDto;

export type GetMySummaryInfoData =
  ESMApplicationCommonModelsResultESMApplicationAuthQueriesMySummaryInfoMySummaryInfoDto;

export type GetRelatedData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetRelatedExaminationsRelatedExaminationDto;

export interface GetRelatedParams {
  IsActive?: boolean;
}

export type GetShiftsData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMApplicationExaminationsQueriesGetAllShiftsDetailsShiftDetailsDto;

export type GetSummaryData =
  ESMApplicationCommonModelsResultESMDomainDtosExaminationExaminationSummary;

export type GetTemporaryDataData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMDomainEntitiesExaminationData;

export type GetUserData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericListESMDomainDtosUserUserSummary;

export type ImportDepartmentData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type ImportDepartmentPayload =
  ESMApplicationDepartmentsCommandsImportDepartmentImportDepartmentCommand;

export type ImportExaminationData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type ImportExaminationModuleData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type ImportExaminationModulePayload =
  ESMApplicationModulesCommandsImportImportCommand;

export interface ImportExaminationPayload {
  /** @format date-time */
  CreatedAt?: string;
  /** @format binary */
  File?: File;
}

export type ImportRoomData = ESMApplicationCommonModelsResultSystemBoolean;

export interface ImportRoomPayload {
  Files?: File[];
}

export type LoginData =
  ESMApplicationCommonModelsResultESMDomainDtosGeneratedToken;

export type LoginPayload = ESMApplicationAuthCommandsLoginLoginCommand;

export type ResetPasswordData = ESMApplicationCommonModelsResultSystemBoolean;

export interface ResetPasswordParams {
  userId?: string;
}

export type SearchData =
  ESMApplicationCommonModelsResultSystemCollectionsGenericIEnumerableESMDomainDtosUserUserSummary;

export interface SearchParams {
  FullName?: string;
}

export interface SystemCollectionsGenericKeyValuePairSystemStringSystemString {
  key?: string;
  value?: string;
}

/**
 *
 *
 * 100 = Continue
 *
 * 101 = SwitchingProtocols
 *
 * 102 = Processing
 *
 * 103 = EarlyHints
 *
 * 200 = OK
 *
 * 201 = Created
 *
 * 202 = Accepted
 *
 * 203 = NonAuthoritativeInformation
 *
 * 204 = NoContent
 *
 * 205 = ResetContent
 *
 * 206 = PartialContent
 *
 * 207 = MultiStatus
 *
 * 208 = AlreadyReported
 *
 * 226 = IMUsed
 *
 * 300 = Ambiguous
 *
 * 301 = Moved
 *
 * 302 = Redirect
 *
 * 303 = RedirectMethod
 *
 * 304 = NotModified
 *
 * 305 = UseProxy
 *
 * 306 = Unused
 *
 * 307 = RedirectKeepVerb
 *
 * 308 = PermanentRedirect
 *
 * 400 = BadRequest
 *
 * 401 = Unauthorized
 *
 * 402 = PaymentRequired
 *
 * 403 = Forbidden
 *
 * 404 = NotFound
 *
 * 405 = MethodNotAllowed
 *
 * 406 = NotAcceptable
 *
 * 407 = ProxyAuthenticationRequired
 *
 * 408 = RequestTimeout
 *
 * 409 = Conflict
 *
 * 410 = Gone
 *
 * 411 = LengthRequired
 *
 * 412 = PreconditionFailed
 *
 * 413 = RequestEntityTooLarge
 *
 * 414 = RequestUriTooLong
 *
 * 415 = UnsupportedMediaType
 *
 * 416 = RequestedRangeNotSatisfiable
 *
 * 417 = ExpectationFailed
 *
 * 421 = MisdirectedRequest
 *
 * 422 = UnprocessableEntity
 *
 * 423 = Locked
 *
 * 424 = FailedDependency
 *
 * 426 = UpgradeRequired
 *
 * 428 = PreconditionRequired
 *
 * 429 = TooManyRequests
 *
 * 431 = RequestHeaderFieldsTooLarge
 *
 * 451 = UnavailableForLegalReasons
 *
 * 500 = InternalServerError
 *
 * 501 = NotImplemented
 *
 * 502 = BadGateway
 *
 * 503 = ServiceUnavailable
 *
 * 504 = GatewayTimeout
 *
 * 505 = HttpVersionNotSupported
 *
 * 506 = VariantAlsoNegotiates
 *
 * 507 = InsufficientStorage
 *
 * 508 = LoopDetected
 *
 * 510 = NotExtended
 *
 * 511 = NetworkAuthenticationRequired
 * @format int32
 */
export enum SystemNetHttpStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  Processing = 102,
  EarlyHints = 103,
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  MultiStatus = 207,
  AlreadyReported = 208,
  IMUsed = 226,
  Ambiguous = 300,
  Moved = 301,
  Redirect = 302,
  RedirectMethod = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  RedirectKeepVerb = 307,
  PermanentRedirect = 308,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  RequestEntityTooLarge = 413,
  RequestUriTooLong = 414,
  UnsupportedMediaType = 415,
  RequestedRangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  MisdirectedRequest = 421,
  UnprocessableEntity = 422,
  Locked = 423,
  FailedDependency = 424,
  UpgradeRequired = 426,
  PreconditionRequired = 428,
  TooManyRequests = 429,
  RequestHeaderFieldsTooLarge = 431,
  UnavailableForLegalReasons = 451,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505,
  VariantAlsoNegotiates = 506,
  InsufficientStorage = 507,
  LoopDetected = 508,
  NotExtended = 510,
  NetworkAuthenticationRequired = 511,
}

export type UpdateDepartmentData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type UpdateDepartmentPayload =
  ESMApplicationDepartmentsCommandsUpdateDepartmentUpdateDepartmentCommand;

export type UpdateExaminationData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type UpdateExaminationPayload =
  ESMApplicationExaminationsCommandsUpdateUpdateCommand;

export type UpdateExamsCountData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type UpdateExamsCountPayload = Record<string, number>;

export type UpdateFacultyData = ESMApplicationCommonModelsResultSystemBoolean;

export type UpdateFacultyPayload =
  ESMApplicationFacultiesCommandsUpdateUpdateRequest;

export type UpdateInfoData = ESMApplicationCommonModelsResultSystemBoolean;

export type UpdateInfoPayload =
  ESMApplicationTeachersCommandsUpdateUpdateRequest;

export type UpdateShiftData = ESMApplicationCommonModelsResultSystemBoolean;

export type UpdateShiftExaminationData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type UpdateShiftExaminationPayload = any;

export type UpdateShiftPayload =
  ESMApplicationShiftsCommandsUpdateUpdateRequest;

export type UpdateTeacherAssignmentData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type UpdateTeacherAssignmentPayload = Record<
  string,
  ESMApplicationExaminationsCommandsUpdateTeacherAssignmentUpdateTeacherAssignmentDto
>;

export type UpdateTemporaryNameToTeacherData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type UpdateTemporaryNameToTeacherPayload =
  ESMApplicationGroupsCommandsUpdateTemporaryNameToTeacherUpdateTemporaryNameToTeacherRequest;

export type UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupData =
  ESMApplicationCommonModelsResultSystemBoolean;

export type UpdateTemporaryTeacherToUserIdInDepartmentShiftGroupPayload = any;
