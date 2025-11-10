export async function POST(req: Request) {
const { name, department, category } = await req.json();
const message = `🆕 มีการแจ้งตั๋วใหม่จาก ${name}\nแผนก: ${department}\nประเภท: ${category}`;
const res = await fetch('https://notify-api.line.me/api/notify', {
method: 'POST',
headers: {
'Authorization': `Bearer ${process.env.LINE_NOTIFY_TOKEN}`,
'Content-Type': 'application/x-www-form-urlencoded'
},
body: new URLSearchParams({ message })
});
return Response.json({ ok: res.ok });
}