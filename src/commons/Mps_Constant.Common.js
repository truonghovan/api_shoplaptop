const MPS_RESULTS = {
  RUNTIME_ERRROR: "-2",
  ERROR: "-1",
  CLEAR: "0",
  SUCCESS: "1",
  DATA_EXIST: "2",
  PERMISSION: "3",
  DATA_USING: "4",
  LOGIC_ENDATE: "5",
  LOGIC_STARTDATE: "6",
  LOGIC_REPEATTIME_WITH_STARTDATE_ENDDATE: "7",
  CONFLICT_TIME_BOOKROOM: "8",
  ERROR_REPEAT_TYPE: "9",
  IMPORT_ERROR: "10",
  ACCOUNT_INCORECT: "11",
  ACCOUNT_COMPANYNAME_INCORRECT: "12",
  ACCOUNT_EXPIRED: "13",
  ACCOUNT_INACTIVE: "14",
  DATA_NOT_EXIST: "15",
  DATE_NOT_CORRECT: "16",
};

const MPS_TRANSACTION_TYPE = {
  Receipt: 1,
  Issue: 2,
  ReturnToSuppier: 3,
  CustomerReturn: 4,
  Physical: 5,
  Sales_RestaurantInvoice: 7,
  Sales_RestaurantReturn: 8,
  TransferIssue: 9,
  TransferReceipt: 10,
  Kitchen: 12,
  Product_Price: 6,
};

const MPS_SYSTEM_PARAMETER = {
  Receipt_Type: {
    BillsCollection: "1002-001",
  },
  Payment_Type: {
    BillPayment: "1003-001",
  },
  CashBook_Payment_Method: {
    Transfer: "1004-001",
    Cash: "1004-002",
  },
  Partner_Type: {
    Individual: "1005-001",
    Enterprise: "1005-002",
  },
  Partner_Group: {
    Customer: "1006-001",
    Supplier: "1006-002",
  },
  Position: {
    Branch_Management: "1008-001",
    Cashier: "1008-002",
    WareHouse_PIC: "1008-003",
    Security: "1008-004",
  },

  Status: {
    Active: "1009-001",
    Inactive: "1009-002",
  },
  LanguageStatus: {
    En: "1010-001",
    Vn: "1010-002",
  },
  Gender: {
    Male: "1011-001",
    Female: "1011-002",
  },
  Contract_Type: {
    ContractBuy: "1016-001",
    ContractSell: "1016-002",
  },

  RoomAndTable_Group: {
    Vip: "1017-001",
    Normal: "1017-002",
    Other: "1017-003",
  },
  PhysicalStatus: {
    New: "1018-000",
    Draft: "1018-001",
    Complete: "1018-002",
    Cancelled: "1018-003",
  },
  InvoiceStatus: {
    New: "1019-000",
    Draft: "1019-001",
    Complete: "1019-002",
    Cancelled: "1019-003",
  },
  CashBook_Status: {
    Draft: "1019-001",
    Complete: "1019-002",
    Cancelled: "1019-003",
  },
  TransactionStatus: {
    New: "1020-000",
    Draft: "1020-001",
    Complete: "1020-002",
    Cancelled: "1020-003",
  },
  Partner_Status: {
    Cooperating: "1021-001",
    Stop: "1021-002",
  },
  BranchStatus: {
    Working: "1022-001",
    Stop: "1022-002",
  },
  EmployeeStatus: {
    PartTime: "1023-001",
    FullTime: "1023-002",
    Probationary: "1023-003",
    Quit: "1023-004",
  },
  ProductPriceStatus: {
    Draft: "1024-001",
    Complete: "1024-002",
  },
  InquiryStatus: {
    Period: "1025-001",
    Date: "1025-002",
  },
  PointSetting: {
    Payment_Point: "1026-001",
    Accumulate_No: "1026-002",
    Accumulate: "1026-003",
    Accumulate_Money: "1026-004",
    Accumulate_Point: "1026-005",
    Exchange_Point: "1026-006",
    Exchange_Money: "1026-007",
  },
  StudentType: {
    Offical: "1027-001",
    Temporary: "1027-002",
  },
  StudentGroup: {
    PrimarySchool: "1028-001",
    HighSchool: "1028-002",
    Collage: "1028-003",
  },
  StudentStatus: {
    New: "1029-001",
    Studying: "1029-002",
    Owe: "1029-003",
    Stop: "1029-004",
    Cancel: "1029-005",
  },
  TeacherType: {
    Offical: "1030-001",
    Temporary: "1030-002",
  },
  TeacherGroup: {
    PrimarySchool: "1031-001",
    HighSchool: "1031-002",
    Collage: "1031-003",
  },
  KitchenStatus: {
    Waiting: "1032-001",
    Completed: "1032-002",
    Cancelled: "1032-003",
  },
  KitchenOperationStatus: {
    Waiting: "1033-001",
    Processing: "1033-002",
    Completed: "1033-003",
  },
  TeacherStatus: {
    New: "1034-001",
    Offical: "1034-002",
    Stop: "1034-003",
    Cancel: "1034-004",
  },
  SubjectStatus: {
    Active: "1035-001",
    Stop: "1035-002",
    Cancel: "1035-003",
  },
  EducationRoomGroup: {
    Moderate: "1036-001",
    Advance: "1036-002",
    Optimal: "1036-003",
  },
  EducationRoomStatus: {
    New: "1037-001",
    Using: "1037-002",
    Empty: "1037-003",
    Repairing: "1037-004",
    Cancel: "1037-005",
  },
  ClassStatus: {
    New: "1038-001",
    Active: "1038-002",
    Stop: "1038-003",
    Cancel: "1038-004",
    Finish: "1038-005",
  },
  ScheduleStatus: {
    New: "1039-001",
    Active: "1039-002",
    Compensate: "1039-003",
    Extra: "1039-004",
    Cancel: "1039-005",
    Finish: "1039-006",
  },
  LeaveCategory: {
    AnnualLeave: "1039-001",
    BHXH_Leave: "1039-002",
    MarriedLeave: "1039-003",
    FuneralLeave: "1039-004",
    Prenatal_PostnatalLeave: "1039-005",
    MaternityLeave: "1039-006",
    UnpaidLeave: "1039-007",
    PrenatalCheckUpLeave: "1039-008",
    SickLeave: "1039-009",
    OrtherLeave: "1039-010",
    CompensationLeave: "1039-011",
  },
  LeaveType: {
    PaidLeave: "1040-001",
    UnpaidLeave: "1040-001",
  },
  TimeRange: {
    Normal: "1041-001",
    Hours: "1041-002",
  },
  TaskStatus: {
    New: "1042-001",
    Pending: "1042-002",
    Stuck: "1042-003",
    Done: "1042-004",
    Cancel: "1042-005",
  },
  CurrentSubnet: {
    Subnet: "1043-001",
  },
  Work_Date_Type: {
    workday: "1044-001",
    companyoffday: "1044-002",
    weekend: "1044-003",
    holiday: "1044-004",
  },
  UserPermission: {
    MasterLevel: "1046-001",
    BranchLevel: "1046-002",
    MemberLevel: "1046-003",
  },
  OverTimeReason: {
    CompanyOrder: "1047-001",
    DoOwnTask: "1047-002",
  },
  ApplicationStatus: {
    New: "1048-001",
    Approve: "1048-002",
    Reject: "1048-003",
  },
  WarrantyStatus: {
    New: "1049-001",
    Handling: "1049-002",
    Done: "1049-003",
    Cancelled: "1049-004",
  },
  WarrantyProductStatus: {
    Warranty: "1050-001",
    Fix: "1050-002",
  },
  CandidateStatus: {
    ReceivedResume: "1051-001",
    Checking: "1051-002",
    Interview: "1051-003",
    JobOffer: "1051-004",
    Recruited: "1051-005",
  },
  ApplyPosition: {
    Intern: "1052-001",
    JuniorDev: "1052-002",
    SeniorDev: "1052-003",
    Tester: "1052-004",
    Manager: "1052-005",
  },
  MaritalStatus: {
    Single: "1053-001",
    Married: "1053-002",
    Separated: "1053-003",
    Divorced: "1053-004",
  },
  Degree: {
    Student: "1054-001",
    Bachelor: "1054-002",
    Master: "1054-003",
    Doctoral: "1054-004",
  },
  CandidateSkill: {
    CPlusPlus: "1055-001",
    Javascript: "1055-002",
    ReactJs: "1055-003",
    MongoDb: "1055-004",
    NodeJs: "1055-005",
  },
  Partner_FeedbackStatus: {
    NewReceived: "1056-001",
    Processing: "1056-002",
    Cancle: "1056-003",
    Completed: "1056-004",
  },

  News_Status: {
    New: "1057-001",
    Expired: "1057-002",
  },

  CompanyStatus:{
    Using:'1059-001',
    NotUsing:'1059-002',
    UsingTrial:'1059-003'
},
  Parking_TicketStatus: {
    Use: '1060-001',
    StopedUsing: '1060-002',
  },
  Parking_TicketType: {
    MonthTicket: '1061-001',
    WeekTicket: '1061-002',
  },
  Range_Of_Vehicle: {
    Bike: '1062-001',
    Motorbike: '1062-002',
    Car: '1062-003',
  },
  Parking_CardStatus: {
    Use: "1063-001",
    StopedUsing: "1063-002",
  },
  MeetingRoom_Status: {
    booked: "2020-001",
    notBooked: "2020-002",
  },
  MeetingRoom_Status_Process: {
    waiting: "2021-001",
    success: "2021-002",
    failure: "2021-003",
  },
  TypeOfBookRoom: {
    normal: "3021-001",
    daily: "3021-002",
    monthly: "3021-003",
    annually: "3021-004",
    weekly: "3021-005",
  },
  Repeat_Day: {
    monday: "4021-006",
    tuesday: "4021-007",
    webnesday: "4021-008",
    thursday: "4021-009",
    friday: "4021-010",
    saturday: "4021-011",
    sunday: "4021-012",
  },
  Action_Todo_Type: {
    action_daily: "3022-002",
    action_weekly: "3022-003",
    action_monthly: "3022-004",
    action_annually: "3022-005",
  },
  Todo_Status: {
    New: "3033-001",
    Pending: "3033-002",
    Done: "3033-003",
    Cancel: "3033-004",
  },
  Recruit_Level: {
    Intern: "4022-001",
    Junior: "4022-002",
    Staff: "4022-003",
    Manager: "4022-004",
  },
  Recruit_WorkType: {
    PartTime: "4023-001",
    FullTime: "4023-002",
    OtherTime: "4023-003",
  },
}
const MPS_SYSTEM_PARAMETER_TYPE = {
  ItemAttributes: "1001",
  ReceiptType: "1002",
  PaymentType: "1003",
  PaymentMethod: "1004",
  PartnerType: "1005",
  PartnerGroup: "1006",
  Department: "1007",
  Position: "1008",
  Status: "1009",
  Language: "1010",
  Gender: "1011",
  PurchaseOrderCategory: "1012",
  Currency: "1013",
  TransportationType: "1014",
  StatusDelivery: "1015",
  ContracType: "1016",
  RoomAndTableGroup: "1017",
  PhysicalStatus: "1018",
  InvoiceStatus: "1019",
  TransactionStatus: "1020",
  PartnerStatus: "1021",
  BranchStatus: "1022",
  EmployeeStatus: "1023",
  ProductPriceStatus: "1024",
  InquiryStatus: "1025",
  PointSetting: "1026",
  StudentType: "1027",
  StudentGroup: "1028",
  StudentStatus: "1029",
  TeacherType: "1030",
  TeacherGroup: "1031",
  KitchenStatus: "1032",
  KitchenOperationStatus: "1033",
  TeacherStatus: "1034",
  SubjectStatus: "1035",
  EducationRoomGroup: "1036",
  EducationRoomStatus: "1037",
  ClassStatus: "1038",
  ScheduleStatus: "1039",
  MeetingRoom_Status: "2020",
  MeetingRoom_Status_Process: "2021",
  LeaveCategory: "1045",
  LeaveType: "1040",
  TimeRange: "1041",
  RepeatType: "3021",
  RepeatDay: "4021",
  WorkDateType: "1044",
  TaskStatus: "1042",
  Action_Todo_Type: "3022",
  UserPermission: "1046",
  OverTimeReason: "1047",
  Todo_Status: "3033",
  ApplicationStatus: "1048",
  WarrantyStatus: "1049",
  WarrantyProductStatus: "1050",
  CandidateStatus: "1051",
  RecruitLevel: "4022",
  RecruitWorkType: "4023",
  MaritalStatus: "1053",
  Degree: "1054",
  CandidateSkill: "1055",
  Partner_FeedbackStatus: "1056",
  SystemCompanyStatus:'1059',
  News_Status: "1057",
  Parking_TicketStatus: '1060',
  Parking_TicketType: '1061',
  Range_Of_Vehicle: '1062',
  Parking_CardStatus: "1063",
  }; 

const MPS_BALANCE = {
  Plus: 1,
  Minus: -1,
};

const MPS_TRANSACTION_PREFIX = {
  Receipt: "PNK",
  Issue: "PXK",
  Physical: "PKK",
  AdjustIssue: "DCN",
  AdjustReceipt: "DCX",
  TransferIssue: "XCK",
  TransferReceipt: "NCK",
  Sales_RestaurantInvoice: "HD",
  Sales_RestaurantReturn: "TH",
  Product_Price: "BG",
  Other: "OTHER",
  CashBook_Receipt: "PT",
  CashBook_Payment: "PC",
  Kitchen: "PCB",
  ContactHistory: "LH",
  Sales_InvoiceMinimart: "HD",
  Sales_ReturnMinimart: "TH",
  Trial: "TRIAL",
  MeetingRoom_Calendar: "BK",
  Education_Schedule: "TKB",
  CommentList: "COMMENTLIST",
  Comment: "COMMENT",
  Warranty_Receipt: "TNBH",
  Partner: "PN",
};

const MPS_DOCUMENT_CODE_LENGTH = {
  Receipt: 4,
  Issue: 4,
  Physical: 4,
  AdjustIssue: 8,
  AdjustReceipt: 8,
  Kitchen: 4,
  Sales_RestaurantInvoice: 4,
  Sales_RestaurantReturn: 4,
  Product_Price: 4,
  Other: 8,
  CashBook: 4,
  CashBook_Receipt: 4,
  CashBook_Payment: 4,
  TransferIssue: 4,
  TransferReceipt: 4,
  ContactHistory: 4,
  Sales_InvoiceMinimart: 4,
  Sales_ReturnMinimart: 4,
  Trial: 5,
  MeetingRoom_Calendar: 4,
  Education_Schedule: 6,
  CommentList: 4,
  Comment: 6,
  System_Company: 5,
  Warranty_Receipt: 4,
  Partner: 4,
  Sum: 10,
};

const MPS_SCREEN_NO = {
  ModuleNameT_ScreenNameT: 999,
  User: 1,
  Role: 2,
  Employee: 3,
  System_Parameter: 4,
  Products: 5,
  ProductCategory: 6,
  ProductPrice: 7,
  ProductUnit: 8,
  ProductGroup: 9,
  Sales_RestaurantInvoice: 10,
  Restaurant_Report_ByBranch: 1001,
  Restaurant_Report_ByTime: 1002,
  Restaurant_Report_ByProduct: 1003,
  Restaurant_Report_ByEmployee: 1004,
  Restaurant_Report_ByPartner: 1005,
  Sales_RestaurantReturn: 11,
  Sales_RestaurantKitchen: 12,
  Sales_InvoiceMinimart: 13,
  MiniMart_Report_ByBranch: 1301,
  MiniMart_Report_ByTime: 1302,
  MiniMart_Report_ByProduct: 1303,
  MiniMart_Report_ByEmployee: 1304,
  MiniMart_Report_ByPartner: 1305,
  MiniMart_Report_ByProductGroup: 1306,
  MiniMart_Report_BySupplier: 1307,
  Sales_ReturnMinimart: 14,
  Inventory_Issue: 15,
  Inventory_Receipt: 16,
  Inventory_Physical: 18,
  Inventory_Inquiry: 19,
  Report_Inquiry: 1901,
  Report_InventoryReceipt: 1601,
  Partner: 20,
  Partner_ContactHistory: 21,
  CashBook: 22,
  CashBook_Report_ByBranch: 2201,
  CashBook_Report_ByTime: 2202,
  CashBook_Report_ByEmployee: 2203,
  CashBook_Report_ByPartner: 2204,
  Branch: 24,
  PurchaseOrders: 25,
  Article: 26,
  Approve_Manager: 29,
  InventoryWarehouse: 30,
  RoomAndTable: 31,
  History: 32,
  Project_Mng: 33,
  Project_Report_ByTime: 3301,
  Project_Report_ByProject: 3302,
  Project_Report_ByEmployee: 3303,
  Project_Role: 34,
  Project_Task: 35,
  System_AdditionalField: 36,
  InventoryTransferIssue: 37,
  InventoryTransferReceipt: 38,
  CompanyInfor: 39,
  Promotions: 40,
  Project_TimeSheet: 41,
  Project_LogTime: 43,
  Report_CashBook: 44,
  DocumentTemplate: 45,
  Documents: 46,
  Project_Calendar: 47,
  Education_Student: 51,
  Education_Teacher: 52,
  Education_Subject: 53,
  Education_Class: 54,
  Education_Room: 55,
  Education_TeacherSchedule: 56,
  Report_Education_Class: 5601,
  Report_Time_Teaching: 5602,
  Report_Education_Roll_Call: 5603,
  Todo_Template: 59,
  Project_Gantt: 60,
  MeetingRoom: 61,
  MeetingRoom_Report_by_Room: 6101,
  MeetingRoom_Report_by_Branch: 6102,
  MeetingRoom_Report_by_Employee: 6103,
  MeetingRoom_Report_by_Time: 6104,
  MeetingRoom_Category: 62,
  MeetingRoom_Floor: 63,
  MeetingRoom_Device: 64,
  MeetingRoom_Device_Category: 65,
  MeetingRoom_Calendar: 66,
  Todo: 68,
  Attendance_Reports: 69,
  Hr_LeaveApplication: 70,
  Hr_OverTime: 71,
  BusinessTrip: 72,
  Hr_WorkSchedule: 73,
  Warranty_Activation: 74,
  Warranty_Manager: 75,
  Warranty_Report_ByTime: 7501,
  Warranty_Report_ByStore: 7502,
  Warranty_Report_ByCustomer: 7503,
  Warranty_Report_ByProduct: 7504,
  Warranty_Report_ByProductGroup: 7505,
  Partner_PointSetting: 76,
  Partner_RewardPoint: 77,
  TimeKeeping: 79,
  Warranty_ActivationUser: 80,
  Warranty_Receipt: 81,
  Warranty_Search: 83,
  Company: 84,
  Production_Receipt: 85,
  Production_Report_ByTime: 8501,
  Production_Inquiry: 8502,
  Production_ReceiptInquiry: 8503,
  Company_Business: 86,
  Recruit_Candidate: 87,
  Recruit_Candidate_Filter: 8701,
  Recruit_Report_ByStatus: 8702,
  Recruit_Report_ByTime: 8703,
  Recruit_Report_ByJobDescription: 8704,
  Recruit_JobDescription: 88,
  Recruit_PostManager: 89,
  Wiki_Home: 90,
  Wiki_Posts: 91,
  Wiki_Report_ByTime: 9101,
  Wiki_Report_ByCategory: 9102,
  Wiki_Category: 92,
  Post_Category: 93,
  Post_Content: 94,
  Recruit_InterviewResult: 95,
  System_Setting: 96,
  System_SettingDocumentNo: 97,
  System_PrintSetting: 103,
  System_Company_Report_ByStatus: 106,
  System_Company_Report_ByTime: 107,
  System_Company_About_To_Expire: 108,
  Partner_Report_ByTime: 2001,
  Hr_Report_ByTime: 301,
  Education_Lesson: 98,
  Education_Test: 99,
  Landing_Media: 100,
  Education_AttendanceStudent: 101,
  Landing_AboutUs: 102,
  System_APIAccessTocken: 105,
  Parking_InOut: 109,
  Parking_Ticket: 106,
  System_City: 109,
  System_District: 110,
  System_Ward: 111,
};

const MEETINGROOM_STATUS = {
  notBooked: "2020-002",
};

const LOG_CATEGORY = {
  search: "search",
  create: "create",
  update: "update",
  delete: "delete",
  login: "login",
  import: "import",
  view: "view",
};

const LOG_STATUS = {
  new: "new",
  done: "done",
};

const LOG_NOTIFICATION = {
  new: "0",
  finished: "1",
  cancel: "2",
  processing: "3",
  data_exist: "4",
  permission: "5",
  old_data: "6",
};

const STATUS = {
  activated: "1009-001",
};

const MPS_SPECIFIC_ERROR = {
  System_User: {
    Code_Existed: 1,
    Email_Existed: 2,
    Phone_Existed: 3,
  },
};

const DateNow = new Date();
const TIMESHEET_TIMEWORK = {
  Office_Time: {
    In: new Date(
      DateNow.getFullYear(),
      DateNow.getMonth(),
      DateNow.getDate(),
      8,
      30,
      0
    ),
    Out: new Date(
      DateNow.getFullYear(),
      DateNow.getMonth(),
      DateNow.getDate(),
      17,
      30,
      0
    ),
  },
  Over_Time: {
    In: new Date(
      DateNow.getFullYear(),
      DateNow.getMonth(),
      DateNow.getDate(),
      17,
      30,
      0
    ),
    Out: new Date(
      DateNow.getFullYear(),
      DateNow.getMonth(),
      DateNow.getDate(),
      8,
      30,
      0
    ),
  },
};

const MPS_LOG_ACTION = {
  Search: "search",
  Create: "create",
  Update: "update",
  Delete: "delete",
  Login: "login",
  Import: "import",
  GetById: "getById",
  GetDataFilter: "getDataFilter",
  Authorization: "Authorization",
};

const MPS_LOG_TYPE = {
  Info: "Info",
  Error: "Error",
  Sucess: "Sucess",
};

const DEFAULT_UNIQUECODE = "315893540";
module.exports = {
  MPS_RESULTS,
  MPS_TRANSACTION_TYPE,
  MPS_SYSTEM_PARAMETER_TYPE,
  MPS_BALANCE,
  MPS_SPECIFIC_ERROR,
  MPS_SYSTEM_PARAMETER,
  MPS_TRANSACTION_PREFIX,
  MPS_DOCUMENT_CODE_LENGTH,
  MPS_SCREEN_NO,
  LOG_CATEGORY,
  LOG_NOTIFICATION,
  LOG_STATUS,
  STATUS,
  TIMESHEET_TIMEWORK,
  MPS_LOG_TYPE,
  MPS_LOG_ACTION,
  DEFAULT_UNIQUECODE,
};