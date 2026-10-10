export const dynamic = "force-static";

// vCard 3.0 is the version both iOS and Android contacts import cleanly;
// lines must end in CRLF
const vcard = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:Fang;Mark;;;",
  "FN:Mark Fang",
  "ORG:Rice University",
  "TITLE:CS & Philosophy",
  "EMAIL;TYPE=INTERNET:yf57@rice.edu",
  "URL;TYPE=LinkedIn:https://www.linkedin.com/in/mark-fang-60217a304/",
  "URL;TYPE=GitHub:https://github.com/weirdguppy1",
  "NOTE:Interested in consumer apps\\, roblox dev\\, and philosophy.",
  "END:VCARD",
].join("\r\n");

export function GET() {
  return new Response(vcard + "\r\n", {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="mark-fang.vcf"',
    },
  });
}
