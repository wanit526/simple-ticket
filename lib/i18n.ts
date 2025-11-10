
export type Lang = 'th' | 'en';

export const dict = {
  th: {
    appTitle: 'Simple Ticket',
    formTitle: 'แจ้งปัญหา',
    formDesc: 'กรอกแบบฟอร์มเพื่อสร้างตั๋ว และทีม IT Support จะติดต่อกลับ',
    name: 'ชื่อผู้แจ้ง',
    dept: 'แผนก',
    category: 'ประเภทปัญหา',
    description: 'อาการ/รายละเอียด',
    priority: 'ความด่วน',
    submit: 'ส่งตั๋ว',
    sending: 'กำลังส่ง...',
    success: 'ส่งตั๋วเรียบร้อยแล้ว ขอบคุณค่ะ/ครับ',
    files: 'ไฟล์แนบ',
    dashboard: 'Support Dashboard',
    status: 'สถานะ',
    filter: 'ตัวกรอง',
    receive: 'รับงาน',
    close: 'ปิดงาน',
    assignee: 'ผู้ดูแล',
    login: 'เข้าสู่ระบบ',
    notAuth: 'บัญชีนี้ยังไม่ได้รับสิทธิ์ Support'
  },
  en: {
    appTitle: 'Simple Ticket',
    formTitle: 'Report an Issue',
    formDesc: 'Fill the form to create a ticket. IT Support will contact you back.',
    name: 'Requester name',
    dept: 'Department',
    category: 'Category',
    description: 'Description',
    priority: 'Priority',
    submit: 'Submit ticket',
    sending: 'Submitting...',
    success: 'Ticket submitted. Thank you!',
    files: 'Attachments',
    dashboard: 'Support Dashboard',
    status: 'Status',
    filter: 'Filters',
    receive: 'Take',
    close: 'Close',
    assignee: 'Assignee',
    login: 'Sign in',
    notAuth: 'This account is not authorized as Support.'
  }
} as const;
