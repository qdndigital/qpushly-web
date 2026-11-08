const { chromium } = require('playwright'); const fs=require('fs'); const path=require('path');
const list=JSON.parse(fs.readFileSync(__dirname+'/banners.json'));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1700,height:1000},deviceScaleFactor:1});
await p.goto('file://'+__dirname+'/banners.html');await p.waitForTimeout(600);
for(const [name,id] of list){const out=path.join(__dirname,'out',name+'.png');fs.mkdirSync(path.dirname(out),{recursive:true});await p.locator('#'+id).screenshot({path:out});}
await b.close();})();
